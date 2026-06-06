import { useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BoldText, CaptionText } from '../../../component/AppText';
import ListSeparator from '../../../component/ListSeparator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionHistoryRoutes } from '../constants';
import { useTransactions } from '../hooks/query/useTransactions';
import TransactionItem from './TransactionItem';

type Props = NativeStackScreenProps<Main.TransactionHistoryStackParamList, typeof TransactionHistoryRoutes.TransactionHistoryList>;

function TransactionSeparator() {
  return <ListSeparator indent={70} />;
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
        <CaptionText size={15} align="center" style={styles.errorText}>
          Failed to load transactions.
        </CaptionText>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <BoldText color="#FFFFFF">Retry</BoldText>
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
        ItemSeparatorComponent={TransactionSeparator}
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
    paddingHorizontal: 32,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  listContent: {
    padding: 16,
    gap: 0,
  },
  itemFirst: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  itemLast: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
