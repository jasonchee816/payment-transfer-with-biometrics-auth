import { ContactApiRoutes } from '../api';

const CONTACT_BASE_KEY = 'Contact';

// TODO: Include userId as part of each key (e.g. [CONTACT_BASE_KEY, userId, ContactApiRoutes.searchDuitNow])
// to prevent cached data from leaking across different authenticated users.
export const ContactQueryKeys = {
  duitNowSearch: [CONTACT_BASE_KEY, ContactApiRoutes.searchDuitNow],
} as const;
