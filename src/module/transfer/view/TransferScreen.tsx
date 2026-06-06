import { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { BodyText, BoldText, CaptionText, LabelText } from '../../../component/AppText';
import PrimaryButton from '../../../component/PrimaryButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSubmitTransfer } from '../hooks/mutation/useSubmitTransfer';
import { useDebugStore } from '../../debug/hooks/DebugStore';
import { TransferRoutes } from '../constants';
import { useAccountBalance } from '../../account/hooks/query/useAccountBalance';
import FixedDecimalCurrencyInput from '../../../component/FixedDecimalCurrencyInput';
import type { FixedDecimalCurrencyInputRef } from '../../../component/FixedDecimalCurrencyInput';
import { usePinCodeCallbacks } from '../../biometric/store/PinCodeCallbackContext';
import { useRefreshControl } from '../../../hooks/useRefreshControl';

type Props = NativeStackScreenProps<Main.TransferStackParamList, typeof TransferRoutes.TransferForm>;

export default function TransferScreen({ navigation, route }: Props) {
  const { recipientId, recipientName, recipientPhone } = route.params;
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const { flags } = useDebugStore();
  const currencyInputRef = useRef<FixedDecimalCurrencyInputRef>(null);

  const { mutateAsync, isPending } = useSubmitTransfer();
  const { register: registerPinCodeCallbacks } = usePinCodeCallbacks();
  const {
    data: availableBalance,
    isRefetching: isBalanceRefetching,
    refetch: refetchBalance,
  } = useAccountBalance({
    select: data => data?.balance.available,
  });
  const { refreshControl } = useRefreshControl(isBalanceRefetching, refetchBalance);

  const isOverBalance = availableBalance !== undefined && amount > availableBalance;

  const handleContinue = () => {
    const transferRequest = {
      recipientId,
      recipientName,
      recipientPhone,
      amount,
      note: note || undefined,
      simulateFailure: flags.simulateTransferFailure,
    };

    registerPinCodeCallbacks({
      onSuccess: async () => {
        try {
          const response = await mutateAsync(transferRequest);
          navigation.navigate(TransferRoutes.TransferSuccess, {
            transactionId: response.transactionId,
            recipientName,
            amount: amount.toFixed(2),
          });
        } catch (error) {
          Alert.alert(
            'Transfer Failed',
            error instanceof Error ? error.message : 'Something went wrong.',
          );
          navigation.goBack();
        }
      },
    });

    navigation.navigate(TransferRoutes.PinCode, {
      recipientName,
      amount: amount.toFixed(2),
    });
  };

  const isReady = amount > 0 && !isPending && !isOverBalance;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      refreshControl={refreshControl}>

      {/* Recipient row — tap Change to go back to ContactList */}
      <View style={styles.recipientCard}>
        <View style={styles.recipientInfo}>
          <LabelText weight="500">To</LabelText>
          <BoldText size={16}>{recipientName}</BoldText>
          {recipientPhone ? <CaptionText>{recipientPhone}</CaptionText> : null}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BodyText weight="500" color="#007AFF">Change</BodyText>
        </TouchableOpacity>
      </View>

      {/* Amount — cash-register input */}
      <View style={[styles.amountCard, isOverBalance && styles.amountCardError]}>
        <LabelText size={13} color="#6E6E73" style={styles.amountLabel}>Amount</LabelText>
        <FixedDecimalCurrencyInput
          ref={currencyInputRef}
          amount={amount}
          setAmount={setAmount}
          containerStyle={styles.currencyInput}
        />
        {availableBalance !== undefined && (
          <CaptionText
            style={styles.balanceText}
            color={isOverBalance ? '#FF3B30' : undefined}
            weight={isOverBalance ? '500' : undefined}>
            {isOverBalance
              ? `Exceeds available balance of RM ${availableBalance.toFixed(2)}`
              : `Available: RM ${availableBalance.toFixed(2)}`}
          </CaptionText>
        )}
      </View>

      <LabelText size={13} color="#6E6E73" style={styles.label}>Note (optional)</LabelText>
      <TextInput
        style={styles.noteInput}
        placeholder="What's it for?"
        placeholderTextColor="#8E8E93"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <PrimaryButton
        label="Continue"
        onPress={handleContinue}
        loading={isPending}
        disabled={!isReady}
        style={styles.button}
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
    gap: 12,
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  recipientInfo: {
    gap: 2,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  amountCardError: {
    borderWidth: 1.5,
    borderColor: '#FF3B30',
  },
  balanceText: {
    marginTop: 8,
  },
  amountLabel: {
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  currencyInput: {
    width: '100%',
    minHeight: 64,
  },
  label: {
    letterSpacing: 0.5,
  },
  noteInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#000000',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 12,
  },
});
