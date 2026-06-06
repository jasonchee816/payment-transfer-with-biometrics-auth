import { View, StyleSheet } from 'react-native';
import { BodyText, HeadingText } from '../../../component/AppText';
import LabelValueCard from '../../../component/LabelValueCard';
import PrimaryButton from '../../../component/PrimaryButton';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransferRoutes } from '../constants';

type Props = NativeStackScreenProps<Main.TransferStackParamList, typeof TransferRoutes.TransferSuccess>;

export default function TransferSuccessScreen({ navigation, route }: Props) {
  const { transactionId, recipientName, amount } = route.params;

  const handleDone = () => {
    navigation
      .getParent<NativeStackNavigationProp<Main.RootStackParamList>>()
      ?.popToTop();
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

      <LabelValueCard
        style={styles.summaryCard}
        rows={[
          { label: 'Amount', value: `RM ${amount}` },
          { label: 'To', value: recipientName },
          { label: 'Reference', value: transactionId },
        ]}
      />

      <View style={styles.actions}>
        <PrimaryButton label="Done" onPress={handleDone} />
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
    marginBottom: 32,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
});
