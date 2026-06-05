import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../main/constants/routes';
import { TransactionHistoryRoutes } from '../constants';

type Props = NativeStackScreenProps<Main.TransactionHistoryStackParamList, typeof TransactionHistoryRoutes.TransactionHistoryDetail>;

export default function TransactionHistoryDetailScreen({ navigation, route }: Props) {
  const { id, name, date, amount, type } = route.params;
  const isSent = type === 'sent';
  const sign = isSent ? '-' : '+';
  const amountColor = isSent ? '#FF3B30' : '#34C759';
  const typeLabel = isSent ? 'Sent' : 'Received';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.amountHeader}>
        <View style={[styles.avatar, { backgroundColor: isSent ? '#FFE5E5' : '#E5F9ED' }]}>
          <Text style={styles.avatarIcon}>{isSent ? '↑' : '↓'}</Text>
        </View>
        <Text style={[styles.amount, { color: amountColor }]}>
          {sign}{amount}
        </Text>
        <Text style={styles.typeLabel}>{typeLabel}</Text>
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

      <TouchableOpacity
        style={styles.transferButton}
        onPress={() =>
          navigation
            .getParent<NativeStackNavigationProp<Main.RootStackParamList>>()
            ?.navigate(RootRoutes.Transfer)
      }>
        <Text style={styles.transferButtonText}>Send Again</Text>
      </TouchableOpacity>
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
      <Text style={styles.detailLabel}>{label}</Text>
      <Text
        style={[
          styles.detailValue,
          valueColor ? { color: valueColor } : undefined,
          mono ? styles.detailValueMono : undefined,
        ]}>
        {value}
      </Text>
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
  avatarIcon: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  amount: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 15,
    color: '#8E8E93',
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
  detailLabel: {
    fontSize: 15,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    maxWidth: '55%',
    textAlign: 'right',
  },
  detailValueMono: {
    fontSize: 13,
    color: '#8E8E93',
    fontVariant: ['tabular-nums'],
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  transferButton: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  transferButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
