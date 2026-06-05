import { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionHistoryRoutes } from '../constants';
import { useTransactions } from '../hooks/query/useTransactions';
import TransactionItem from './TransactionItem';

type Props = NativeStackScreenProps<Main.TransactionHistoryStackParamList, typeof TransactionHistoryRoutes.TransactionHistoryList>;

function Separator() {
  return <View style={styles.separator} />;
}

export default function TransactionHistoryScreen({ navigation }: Props) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTransactions();

  const transactions = useMemo(
    () => data?.pages.flatMap(p => p.transactions) ?? [],
    [data],
  );

  const handleItemPress = useCallback(
    (item: TransactionHistory.Transaction) => {
      navigation.navigate(TransactionHistoryRoutes.TransactionHistoryDetail, item);
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load transactions.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TransactionItem
            item={item}
            onPress={handleItemPress}
            style={[
              index === 0 && styles.itemFirst,
              index === transactions.length - 1 && styles.itemLast,
            ]}
          />
        )}
        ItemSeparatorComponent={Separator}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#F2F2F7',
  },
  errorText: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    gap: 0,
  },
  summaryCard: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  transferButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  transferButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemFirst: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  itemLast: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 70,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
