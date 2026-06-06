import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchBalance } from '../../src/api';
import { AccountQueryKeys } from '../../constants';

type BalanceResponse = Account.Api.FetchBalanceResponse;

type AccountBalanceQueryOptions<TData = BalanceResponse> = Omit<
  UseQueryOptions<BalanceResponse, Error, TData, typeof AccountQueryKeys.balance>,
  'queryKey' | 'queryFn'
>;

export function useAccountBalance<TData = BalanceResponse>(
  options?: AccountBalanceQueryOptions<TData>,
) {
  return useQuery({
    ...options,
    queryKey: AccountQueryKeys.balance,
    queryFn: fetchBalance,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 2, // 2 minutes
  });
}
