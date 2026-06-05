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
    queryKey: AccountQueryKeys.balance,
    queryFn: fetchBalance,
    ...options,
  });
}
