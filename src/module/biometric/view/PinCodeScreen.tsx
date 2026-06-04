import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'PinCode'>;

const PIN_LENGTH = 6;

const KEYPAD: (string | null)[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [null, '0', '⌫'],
];

function PinDot({ filled }: { filled: boolean }) {
  return <View style={[styles.dot, filled && styles.dotFilled]} />;
}

export default function PinCodeScreen({ navigation }: Props) {
  const [pin, setPin] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleKey = (key: string) => {
    if (key === '⌫') {
      setPin(prev => prev.slice(0, -1));
      setError(false);
      return;
    }
    if (pin.length >= PIN_LENGTH) {
      return;
    }
    const next = pin + key;
    setPin(next);

    if (next.length === PIN_LENGTH) {
      verifyPin(next);
    }
  };

  const verifyPin = (code: string) => {
    // Stub: accept any 6-digit PIN for demo purposes
    const isValid = code.length === PIN_LENGTH;
    if (isValid) {
      navigation.goBack();
    } else {
      Vibration.vibrate([0, 50, 50, 50]);
      setError(true);
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enter PIN</Text>
        <Text style={styles.subtitle}>Confirm your identity to proceed</Text>
      </View>

      <View style={styles.dotsRow}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <PinDot key={i} filled={i < pin.length} />
        ))}
      </View>

      {error && <Text style={styles.errorText}>Incorrect PIN. Please try again.</Text>}

      <View style={styles.keypad}>
        {KEYPAD.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.keypadRow}>
            {row.map((key, colIdx) =>
              key === null ? (
                <View key={colIdx} style={styles.keyEmpty} />
              ) : (
                <TouchableOpacity
                  key={colIdx}
                  style={[styles.key, key === '⌫' && styles.keyBackspace]}
                  onPress={() => handleKey(key)}
                  activeOpacity={0.6}>
                  <Text style={[styles.keyText, key === '⌫' && styles.keyBackspaceText]}>
                    {key}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        ))}
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
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: '#007AFF',
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 8,
  },
  keypad: {
    marginTop: 24,
    gap: 12,
  },
  keypadRow: {
    flexDirection: 'row',
    gap: 20,
  },
  key: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  keyBackspace: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  keyText: {
    fontSize: 26,
    fontWeight: '400',
    color: '#000000',
  },
  keyBackspaceText: {
    fontSize: 22,
    color: '#007AFF',
  },
  keyEmpty: {
    width: 78,
    height: 78,
  },
});
