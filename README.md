# PaymentTransferWithBiometricsAuth

A React Native demo app showcasing a payment transfer flow with biometric and PIN authentication.

## Demo

| iOS | Android |
|-----|---------|
| https://drive.google.com/file/d/1s0Otl9BkR85eXLjkRRAixJ2rZ8pKN8CP/view?usp=sharing | https://drive.google.com/file/d/1QmfxmCpwvwXNTNZlSMkXamYp9xywOAR8/view?usp=sharing |

---

## Prerequisites

- **Node.js** `>= 22.11.0` (current LTS recommended — tested on `v22.16.0`)
- **Yarn** (classic v1)
- React Native environment set up for your target platform — follow the official [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide (includes Xcode for iOS and Android Studio for Android)

## Setup

```sh
# Install dependencies
yarn

# iOS — install CocoaPods
cd ios && pod install && cd ..
```

## Running the App

```sh
# Start Metro
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Assumptions

The following simplifications have been made intentionally for the scope of this demo:

- **All users are bank app users.** Inter-bank transfers (e.g. DuitNow interbank) are not considered. A contact is either a registered app user or not — no external payment rail is involved.

- **Balance and transaction history are invalidated after a successful transfer.** The backend is treated as the source of truth; the UI always refetches rather than optimistically updating local state.

- **Auth and PIN setup flows are skipped.** The correct PIN is pre-seeded on first launch (`111111`). There is no registration, login, or PIN change flow.

- **Only the 3 most recent transfer recipients are stored.** The list is capped at 3 and deduplicates by user — transferring to an existing recipient promotes them to the top.

- **Recent transfers persist locally (MMKV), but only the user ID is stored.** Display name and phone number are resolved on demand via the `getUserInfoViaUserId` API, minimising the PII footprint on-device. The list persists across sessions on the same device but is not synced to a backend or across devices.

- **The PIN hash is stored locally (MMKV).** Ideally PIN verification should be handled server-side. The local hash uses SHA-256 with a hardcoded secret — in production the secret must come from a secret manager
