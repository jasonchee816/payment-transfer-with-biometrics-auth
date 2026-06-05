import { AccountApiRoutes } from '../src/api';

const ACCOUNT_BASE_KEY = 'Account';

// TODO: Include userId as part of each key (e.g. [ACCOUNT_BASE_KEY, userId, AccountApiRoutes.fetchBalance])
// to prevent cached data from leaking across different authenticated users.
export const AccountQueryKeys = {
  balance: [ACCOUNT_BASE_KEY, AccountApiRoutes.fetchBalance],
} as const;
