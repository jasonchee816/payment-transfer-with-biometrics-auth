import { View, StyleSheet, ScrollView } from 'react-native';
import { CaptionText, HeadingText } from '../../../component/AppText';
import LabelValueCard from '../../../component/LabelValueCard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionHistoryRoutes } from '../constants';

type Props = NativeStackScreenProps<Main.TransactionHistoryStackParamList, typeof TransactionHistoryRoutes.TransactionHistoryDetail>;

export default function TransactionHistoryDetailScreen({ route }: Props) {
  const { id, name, date, amount, type } = route.params;
  const isSent = type === 'sent';
  const sign = isSent ? '-' : '+';
  const amountColor = isSent ? '#FF3B30' : '#34C759';
  const typeLabel = isSent ? 'Sent' : 'Received';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.amountHeader}>
        <View style={[styles.iconCircle, isSent ? styles.iconCircleSent : styles.iconCircleReceived]}>
          <HeadingText>{isSent ? '↑' : '↓'}</HeadingText>
        </View>
        <HeadingText size={40} color={amountColor} style={styles.amount}>
          {sign}{amount}
        </HeadingText>
        <CaptionText size={15}>{typeLabel}</CaptionText>
      </View>

      <LabelValueCard
        rows={[
          { label: 'Recipient', value: name },
          { label: 'Date', value: date },
          { label: 'Status', value: 'Completed', valueColor: '#34C759' },
          { label: 'Reference', value: id },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  amountHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconCircleSent: {
    backgroundColor: '#FFE5E5',
  },
  iconCircleReceived: {
    backgroundColor: '#E5F9ED',
  },
  amount: {
    letterSpacing: -1,
    marginBottom: 4,
  },
});
