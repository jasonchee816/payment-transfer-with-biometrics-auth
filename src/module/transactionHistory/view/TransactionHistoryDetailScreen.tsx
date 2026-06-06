import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { BodyText, CaptionText, HeadingText } from '../../../component/AppText';
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
        <View style={[styles.avatar, { backgroundColor: isSent ? '#FFE5E5' : '#E5F9ED' }]}>
          <HeadingText>{isSent ? '↑' : '↓'}</HeadingText>
        </View>
        <HeadingText size={40} color={amountColor} style={styles.amount}>
          {sign}{amount}
        </HeadingText>
        <CaptionText size={15}>{typeLabel}</CaptionText>
      </View>

      <View style={styles.card}>
        <DetailRow label="Recipient" value={name} />
        <RowDivider />
        <DetailRow label="Date" value={date} />
        <RowDivider />
        <DetailRow label="Status" value="Completed" valueColor="#34C759" />
        <RowDivider />
        <DetailRow label="Reference" value={id} mono />
      </View>

    </ScrollView>
  );
}

function RowDivider() {
  return <View style={styles.divider} />;
}

function DetailRow({
  label,
  value,
  valueColor,
  mono,
}: {
  label: string;
  value: string;
  valueColor?: string;
  mono?: boolean;
}) {
  return (
    <View style={styles.detailRow}>
      <CaptionText size={15}>{label}</CaptionText>
      <BodyText
        weight="500"
        align="right"
        size={mono ? 13 : undefined}
        color={mono ? '#8E8E93' : valueColor}
        style={[
          styles.detailValue,
          mono ? styles.detailValueMono : undefined,
        ]}>
        {value}
      </BodyText>
    </View>
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
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  amount: {
    letterSpacing: -1,
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  detailValue: {
    maxWidth: '55%',
  },
  detailValueMono: {
    fontVariant: ['tabular-nums'],
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
});
