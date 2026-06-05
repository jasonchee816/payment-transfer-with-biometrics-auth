import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../main/constants/routes';
import { TransferRoutes } from '../constants';

type Props = NativeStackScreenProps<Main.TransferStackParamList, typeof TransferRoutes.TransferSuccess>;

export default function TransferSuccessScreen({ navigation, route }: Props) {
  const { transactionId, recipientName, amount } = route.params;

  const handleDone = () => {
    navigation
      .getParent<NativeStackNavigationProp<Main.RootStackParamList>>()
      ?.popToTop();
  };

  const handleViewHistory = () => {
    navigation.getParent()?.navigate(RootRoutes.TransactionHistory);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>✓</Text>
        </View>
      </View>

      <Text style={styles.title}>Transfer Sent!</Text>
      <Text style={styles.subtitle}>Your money is on its way</Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount</Text>
          <Text style={styles.summaryValue}>${amount}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>To</Text>
          <Text style={styles.summaryValue}>{recipientName}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Reference</Text>
          <Text style={styles.summaryRef}>{transactionId}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleDone}>
          <Text style={styles.primaryButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleViewHistory}>
          <Text style={styles.secondaryButtonText}>View History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  iconText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 32,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#8E8E93',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  summaryRef: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
    fontVariant: ['tabular-nums'],
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
});
