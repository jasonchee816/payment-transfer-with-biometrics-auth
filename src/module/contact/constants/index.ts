const CONTACT_BASE_KEY = 'Contact';

// TODO: Include userId as part of each key (e.g. [CONTACT_BASE_KEY, userId, ...])
// to prevent cached data from leaking across different authenticated users.
export const ContactQueryKeys = {
  contactList: [CONTACT_BASE_KEY, 'deviceContacts'],
} as const;
