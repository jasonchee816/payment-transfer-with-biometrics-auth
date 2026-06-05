import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BodyText, BoldText, CaptionText, HeadingText } from '../../../component/AppText';
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
          <HeadingText size={40} color="#FFFFFF">✓</HeadingText>
        </View>
      </View>

      <HeadingText style={styles.title}>Transfer Sent!</HeadingText>
      <BodyText color="#8E8E93" style={styles.subtitle}>Your money is on its way</BodyText>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <BodyText color="#8E8E93">Amount</BodyText>
          <BoldText>${amount}</BoldText>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <BodyText color="#8E8E93">To</BodyText>
          <BoldText>{recipientName}</BoldText>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <BodyText color="#8E8E93">Reference</BodyText>
          <CaptionText weight="500" style={styles.summaryRef}>{transactionId}</CaptionText>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleDone}>
          <BoldText size={17} color="#FFFFFF">Done</BoldText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleViewHistory}>
          <BoldText size={17} color="#007AFF">View History</BoldText>
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
  title: {
    marginBottom: 6,
  },
  subtitle: {
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
  summaryRef: {
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
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
});
