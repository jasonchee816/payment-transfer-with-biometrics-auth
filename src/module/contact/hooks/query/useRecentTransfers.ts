import { getRecentTransferUsers } from '../../storage/recentTransferStorage';

export function useRecentTransfers() {
  return { users: getRecentTransferUsers() };
}
