import { ContactApiRoutes } from '../api';

const CONTACT_BASE_KEY = 'Contact';

// TODO: Include userId as part of each key (e.g. [CONTACT_BASE_KEY, userId, ...])
// to prevent cached data from leaking across different authenticated users.
export const ContactQueryKeys = {
  contactList: [CONTACT_BASE_KEY, 'deviceContacts'],
  // Base key used for invalidating all recentTransfers cache entries at once.
  recentTransfersBase: [CONTACT_BASE_KEY, ContactApiRoutes.getUserInfoViaUserId],
  // Per-IDs key ensures a cache miss when the stored ID set changes.
  recentTransfers: (ids: string[]) =>
    [CONTACT_BASE_KEY, ContactApiRoutes.getUserInfoViaUserId, ...ids] as const,
} as const;
