import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionHistory'>;

type Transaction = {
  id: string;
  name: string;
  date: string;
  amount: string;
  type: 'sent' | 'received';
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Alice Johnson', date: 'Jun 4, 2026', amount: '$120.00', type: 'sent' },
  { id: '2', name: 'Bob Smith', date: 'Jun 3, 2026', amount: '$50.00', type: 'received' },
  { id: '3', name: 'Carol White', date: 'Jun 2, 2026', amount: '$230.00', type: 'sent' },
  { id: '4', name: 'David Lee', date: 'Jun 1, 2026', amount: '$75.50', type: 'received' },
  { id: '5', name: 'Emma Davis', date: 'May 31, 2026', amount: '$400.00', type: 'sent' },
  { id: '6', name: 'Frank Miller', date: 'May 30, 2026', amount: '$18.99', type: 'received' },
  { id: '7', name: 'Grace Wilson', date: 'May 29, 2026', amount: '$95.00', type: 'sent' },
];

function Separator() {
  return <View style={styles.separator} />;
}

function TransactionItem({ item }: { item: Transaction }) {
  const isSent = item.type === 'sent';
  return (
    <View style={styles.transactionItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={[styles.transactionAmount, isSent ? styles.sent : styles.received]}>
        {isSent ? '-' : '+'}{item.amount}
      </Text>
    </View>
  );
}

export default function TransactionHistoryScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_TRANSACTIONS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Sent</Text>
            <Text style={styles.summaryAmount}>$845.00</Text>
            <TouchableOpacity
              style={styles.transferButton}
              onPress={() => navigation.navigate('Transfer')}>
              <Text style={styles.transferButtonText}>New Transfer</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3C3C43',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 13,
    color: '#8E8E93',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  sent: {
    color: '#FF3B30',
  },
  received: {
    color: '#34C759',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 70,
  },
});
