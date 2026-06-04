import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { submitTransfer } from '../src/api';
import { useDebugStore } from '../../debug/hooks/DebugStore';
import FixedDecimalCurrencyInput from '../../../component/FixedDecimalCurrencyInput';
import type { FixedDecimalCurrencyInputRef } from '../../../component/FixedDecimalCurrencyInput';

type Props = NativeStackScreenProps<Main.TransferStackParamList, 'TransferForm'>;

export default function TransferScreen({ navigation, route }: Props) {
  const { recipientId, recipientName } = route.params;
  const [amount, setAmount] = React.useState(0);
  const [note, setNote] = React.useState('');
  const { flags } = useDebugStore();
  const currencyInputRef = React.useRef<FixedDecimalCurrencyInputRef>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: submitTransfer,
    onSuccess: response => {
      navigation.navigate('PinCode', {
        transactionId: response.transactionId,
        recipientName,
        amount: amount.toFixed(2),
      });
    },
    onError: error => {
      Alert.alert(
        'Transfer Error',
        error instanceof Error ? error.message : 'Something went wrong.',
      );
    },
  });

  const handleContinue = () => {
    mutate({
      recipientId,
      recipientName,
      amount,
      note: note || undefined,
      simulateFailure: flags.simulateTransferFailure,
    });
  };

  const isReady = amount > 0 && !isPending;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">

      {/* Recipient row — tap Change to go back to ContactList */}
      <View style={styles.recipientCard}>
        <View style={styles.recipientInfo}>
          <Text style={styles.recipientLabel}>To</Text>
          <Text style={styles.recipientName}>{recipientName}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Amount — cash-register input */}
      <View style={styles.amountCard}>
        <Text style={styles.amountLabel}>Amount</Text>
        <FixedDecimalCurrencyInput
          ref={currencyInputRef}
          amount={amount}
          setAmount={setAmount}
          containerStyle={styles.currencyInput}
        />
      </View>

      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="What's it for?"
        placeholderTextColor="#8E8E93"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, !isReady && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!isReady}>
        {isPending ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
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
  recipientLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  changeText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007AFF',
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6E6E73',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  currencyInput: {
    width: '100%',
    minHeight: 64,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6E6E73',
    textTransform: 'uppercase',
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
    backgroundColor: '#007AFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
