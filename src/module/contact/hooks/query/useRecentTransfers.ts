import { useQuery } from '@tanstack/react-query';
import { getUserInfoViaUserId } from '../../api';
import { ContactQueryKeys } from '../../constants';
import { getRecentTransferUserIds } from '../../storage/recentTransferStorage';

export function useRecentTransfers() {
  const ids = getRecentTransferUserIds();

  return useQuery({
    queryKey: ContactQueryKeys.recentTransfers(ids),
    queryFn: () => Promise.all(ids.map(getUserInfoViaUserId)),
    enabled: ids.length > 0,
  });
}
