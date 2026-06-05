import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../../src/api';
import { TransactionHistoryQueryKeys } from '../../constants';

const PAGE_LIMIT = 20;

export function useTransactions() {
  return useInfiniteQuery({
    queryKey: TransactionHistoryQueryKeys.transactions,
    queryFn: ({ pageParam }) => fetchTransactions({ page: pageParam, limit: PAGE_LIMIT }),
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
  });
}
