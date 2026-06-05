import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

type Props = {
  item: TransactionHistory.Transaction;
  onPress: (item: TransactionHistory.Transaction) => void;
  style?: StyleProp<ViewStyle>;
};

export default function TransactionItem({ item, onPress, style }: Props) {
  const isSent = item.type === 'sent';
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={() => onPress(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, isSent ? styles.sent : styles.received]}>
          {isSent ? '-' : '+'}{item.amount}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    color: '#8E8E93',
  },
  right: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 18,
    color: '#C7C7CC',
    alignSelf: 'center',
  },
  sent: {
    color: '#FF3B30',
  },
  received: {
    color: '#34C759',
  },
});
