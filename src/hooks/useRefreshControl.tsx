import { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';

/**
 * Wraps React Query's isFetching + refetch into a RefreshControl-ready interface.
 *
 * Problem: React Query's `isRefetching` briefly transitions false → true after
 * calling `refetch()`, causing the pull-to-refresh spinner to flicker or reset
 * before the fetch actually starts.
 * Reference: https://github.com/TanStack/query/issues/2380
 *
 * Solution: local `isRefreshing` state is set true immediately on user pull,
 * then synced back to false once `isFetching` resolves.
 */
export function useRefreshControl(
  isFetching: boolean,
  refetch: () => void,
  tintColor: string = '#007AFF',
) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    refetch();
  };

  useEffect(() => {
    if (!isFetching) {
      setIsRefreshing(false);
    }
  }, [isFetching]);

  const refreshControl = (
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      tintColor={tintColor}
    />
  );

  return { isRefreshing, onRefresh, refreshControl };
}
