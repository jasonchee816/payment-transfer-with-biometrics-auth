# Design Decisions

A record of key architectural and implementation choices made in this codebase, with the reasoning behind each.

---

## 1. Using React Query (`useQuery` / `useMutation`) for server state

React Query is used for all data that originates from — or must eventually be consistent with — a backend: account balance, transaction history, and contact search.

**Why:**
- Automatic loading, error, and success states without manual `useState` boilerplate.
- Built-in request deduplication: multiple components subscribing to the same `queryKey` share one in-flight request.
- `invalidateQueries` on transfer success ensures balance and transaction history are always refetched from the server, keeping the backend as the source of truth rather than patching local state.
- The `select` option allows consumers to derive a specific shape (e.g. `data.balance.available`) without needing a wrapper hook per use case.

**What it is not used for:**
React Query is only appropriate for *server* or *async external* state. It is deliberately not used for pure local-device state such as device contacts — see §2. The boundary case (recent transfers) is discussed in §3.

---

## 2. Not using React Query for device contacts

`useContactList` uses plain `useState` / `useEffect` instead of `useQuery`.

**Why:**
- Contacts live on the device, not a server. React Query's caching, background refetch, and deduplication are all irrelevant here.
- Permission handling is inherently stateful and sequential (check → request → load), which fits a `useEffect` flow more naturally than `queryFn`.
- Using `useQuery` would impose unnecessary ceremony: a `queryKey` to maintain, potential stale-time configuration, and query invalidation calls — none of which map to any real concept for a local device resource.

---

## 3. Using React Query for recent transfers (`useRecentTransfers`)

Recent transfers *do* use `useQuery`, even though the ID list comes from local MMKV storage.

**The split:**
- MMKV holds only `string[]` (user IDs). This is a synchronous, low-PII read.
- The actual display data (`displayName`, `phoneNumber`) is fetched asynchronously via `getUserInfoViaUserId`.

**Why `useQuery` here but not for device contacts:**
- The lookup is *genuinely async* — it goes through the API layer (even if mocked). `useQuery`'s async lifecycle is a natural fit.
- React Query's cache means repeated navigation to the contact list reuses the already-fetched user objects instead of firing fresh requests every mount.
- `invalidateQueries` (called from `useSubmitTransfer` on success) ensures the displayed names are always consistent after a new transfer is recorded.

**Query key design:**
```ts
recentTransfers: (ids: string[]) => [CONTACT_BASE_KEY, 'getUserInfoViaUserId', ...ids]
```
Embedding the ID list in the key means any change to the stored set (new transfer, clear) produces a cache miss and triggers a fresh fetch automatically — no manual invalidation of the per-IDs key is needed.

---

## 4. `useMemo` on the list and `useCallback` on `onPress`, but not on `renderItem`

In `TransactionHistoryScreen`:

```tsx
const transactions = useMemo(
  () => data?.pages.flatMap(p => p.transactions) ?? [],
  [data],
);

const handleItemPress = useCallback(
  (item) => navigation.navigate(...),
  [navigation],
);

// renderItem is NOT memoised:
renderItem={({ item, index }) => (
  <TransactionItem item={item} onPress={handleItemPress} ... />
)}
```

**`useMemo` on `transactions`:**
`data.pages.flatMap(...)` allocates a new array on every render. Because `FlatList` uses referential equality to decide whether to re-render items, passing a new array reference on every parent render would force all items to re-render unnecessarily. `useMemo` ensures the reference is stable as long as `data` has not changed.

**`useCallback` on `handleItemPress`:**
`onPress` is passed as a prop to `TransactionItem`. Keeping its reference stable means `TransactionItem` does not re-render purely because the parent re-rendered (assuming `TransactionItem` is or will be wrapped in `React.memo`).

**Why `renderItem` is not wrapped in `useCallback`:**
`renderItem` takes `{ item, index }` as arguments. Its body uses `transactions.length` — a value derived from the memoised `transactions` array — so it would need `transactions` in its dependency array. Memoising it would therefore produce a new function reference on every `transactions` change anyway, giving zero benefit. The cost of re-creating an inline arrow function per render is negligible; the complexity of incorrectly-dependent `useCallback` is not.

---

## 5. Biometrics design: `PinCodeCallbackContext` for reusability

The biometric / PIN confirmation step is decoupled from the transfer logic via a `useRef`-backed context (`PinCodeCallbackContext`).

**The pattern:**
1. Before navigating to `PinCodeScreen`, the caller registers a callback:
   ```ts
   register({ onSuccess: async () => { /* submit transfer */ } });
   navigation.navigate(TransferRoutes.PinCode, { ... });
   ```
2. `PinCodeScreen` calls `consume()` on success and executes `onSuccess`.

**Why a `useRef` instead of `useState`:**
The callbacks are *imperative* — they are written once before navigation and read once on success. They are never *observed* by the UI. Storing them in `useState` would cause unnecessary re-renders on every `register` call. A `useRef` holds the latest value without triggering the React render cycle.

**Reusability:**
Any screen that requires identity confirmation before proceeding can use the same pattern: register a callback, navigate to `PinCodeScreen`, and receive the result. No transfer-specific logic lives inside the PIN screen itself — it only calls `onSuccess`. Adding biometric confirmation to a new flow (e.g. changing account settings) requires no changes to `PinCodeScreen`.

---

## 6. Security considerations for local storage

### PIN hash

The correct PIN is hashed with SHA-256 (via `sha.js`) using a salt and stored in MMKV:

```ts
hashPin(pin) = SHA256(PIN_HASH_SECRET + pin + PIN_HASH_SECRET)
```

**Limitations of this approach:**

| Concern | Current state | Production recommendation |
|---|---|---|
| Secret management | `PIN_HASH_SECRET` is hardcoded in source | Fetch from a secret manager (AWS Secrets Manager, HashiCorp Vault, etc.) at runtime |
| Hash algorithm | Raw SHA-256 | Use a KDF (PBKDF2, bcrypt, or Argon2) — these are intentionally slow, making brute-force attacks significantly more expensive |
| Storage location | MMKV on-device | PIN verification should be server-side; the device should hold at most a session token |
| MMKV encryption | Not enabled | MMKV supports an encryption key — should be enabled in production, ideally backed by the platform keystore (Keychain on iOS, Android Keystore on Android) |

### Recent transfers

Only `userId` strings are persisted in MMKV. Display name and phone number are resolved at read time by `useRecentTransfers` via `getUserInfoViaUserId`, keeping the on-device PII footprint to a minimum. `useQuery` is used here (unlike device contacts) because the lookup is genuinely async and the result benefits from React Query's cache — repeated navigation to the contact list does not re-fetch while the data is still fresh.

For a production app:
- Enable MMKV encryption.
- Clear stored IDs on logout to prevent leakage between user sessions.

---

## Challenges & Difficulties

### 1. Making biometrics reusable without leaking concerns

The biometric / PIN confirmation step needed to work across multiple flows without coupling `PinCodeScreen` to any specific action. The challenge was letting a caller trigger authentication and receive the result without passing callbacks through navigation params — which React Navigation doesn't support cleanly.

The solution was `PinCodeCallbackContext`: a `useRef`-backed context where the caller registers a callback before navigating, and `PinCodeScreen` consumes it on success. The main subtlety was choosing `useRef` over `useState` — the callbacks are write-once / read-once and never observed by the UI, so `useState` would have caused unnecessary re-renders on every `register` call.

### 2. Navigation param contracts are a leaky abstraction

Passing `recipientPhone` through multiple screens (`ContactListScreen → TransferForm → PinCode → TransferSuccess → useSubmitTransfer`) meant updating types, screens, and the mutation hook every time the shape changed. In a larger app this would be a strong signal to use a different pattern — e.g. a transfer draft store — rather than threading params through navigation.

### 3. Retroactive component extraction

Extracting shared components (`Avatar`, `PrimaryButton`, `LoadingModal`, `LabelValueCard`, `ListSeparator`) after the fact was harder than designing them upfront — each instance had slightly different sizing or spacing baked in, so consolidating them required auditing every callsite before touching anything. The lesson: identifying repeating UI patterns early and extracting them before the third usage is significantly cheaper than doing it retroactively.
