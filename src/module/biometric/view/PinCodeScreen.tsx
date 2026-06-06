import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { BodyText, HeadingText } from '../../../component/AppText';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { isSensorAvailable, authenticateWithOptions, BiometricStrength } from '@sbaiahmed1/react-native-biometrics';
import type { BiometricSensorInfo } from '@sbaiahmed1/react-native-biometrics';
import { TransferRoutes } from '../../transfer/constants';
import { KEYPAD, PIN_LENGTH } from '../constants';
import { BiometricImages } from '../constants/images';
import { usePinCodeCallbacks } from '../store/PinCodeCallbackContext';
import {
  getPinAttempts,
  incrementPinAttempts,
  isPinLocked,
  MAX_PIN_ATTEMPTS,
  resetPinAttempts,
  verifyPin,
} from '../storage/pinStorage';

type BiometryType = NonNullable<BiometricSensorInfo['biometryType']>;
type Props = NativeStackScreenProps<Main.TransferStackParamList, typeof TransferRoutes.PinCode>;

function PinDot({ filled }: { filled: boolean }) {
  return <View style={[styles.dot, filled && styles.dotFilled]} />;
}

export default function PinCodeScreen({ navigation, route }: Props) {
  const { recipientName, amount } = route.params;
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_PIN_ATTEMPTS - getPinAttempts());
  const [isProcessing, setIsProcessing] = useState(false);
  const [biometryType, setBiometryType] = useState<BiometryType | null>(null);
  const { consume } = usePinCodeCallbacks();

  const logout = useCallback(() => {
    navigation
      .getParent<NativeStackNavigationProp<Main.RootStackParamList>>()
      ?.popToTop();
    // To add actual auth and logout behaviour
  }, [navigation]);

  const handleLockout = useCallback(() => {
    Alert.alert(
      'Account Locked',
      'Too many incorrect PIN attempts. Please log in again.',
      [{ text: 'OK', onPress: logout }],
    );
  }, [logout]);

  useEffect(() => {
    if (isPinLocked()) {
      handleLockout();
    }
  }, [handleLockout]);

  const handleSuccess = useCallback(async () => {
    resetPinAttempts();
    const { onSuccess } = consume();
    if (!onSuccess) return;
    setIsProcessing(true);
    try {
      await onSuccess();
    } finally {
      setIsProcessing(false);
    }
  }, [consume]);

  const attemptBiometrics = useCallback(async () => {
    try {
      const { success } = await authenticateWithOptions({
        title: 'Confirm Transfer',
        subtitle: `Sending ${amount} to ${recipientName}`,
        cancelLabel: 'Use PIN',
        disableDeviceFallback: true,
        biometricStrength: BiometricStrength.Strong,
        allowDeviceCredentials: false,
      });

      if (success) {
        handleSuccess();
      }
    } catch {
      // auth failed or was cancelled — user can retry via the icon or use PIN
    }
  }, [handleSuccess, amount, recipientName]);

  useEffect(() => {
    isSensorAvailable().then(({ available, biometryType: type }) => {
      if (available && type && type !== 'None' && type !== 'Unknown') {
        setBiometryType(type);
        attemptBiometrics();
      }
    });
    // intentionally run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKey = (key: string) => {
    if (isProcessing) return;
    if (key === '⌫') {
      setPin(prev => prev.slice(0, -1));
      setError(false);
      return;
    }
    if (pin.length >= PIN_LENGTH) return;

    const next = pin + key;
    setPin(next);

    if (next.length === PIN_LENGTH) {
      handleVerifyPin(next);
    }
  };

  const handleVerifyPin = (code: string) => {
    if (verifyPin(code)) {
      handleSuccess();
      return;
    }

    Vibration.vibrate();
    const totalFailed = incrementPinAttempts();
    const remaining = MAX_PIN_ATTEMPTS - totalFailed;

    if (remaining <= 0) {
      handleLockout();
    } else {
      setError(true);
      setAttemptsLeft(remaining);
      setPin('');
    }
  };

  const showBiometricButton = biometryType !== null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeadingText size={26} style={styles.title}>Enter PIN</HeadingText>
        <BodyText color="#8E8E93">Confirm your identity to proceed</BodyText>
      </View>

      <View style={styles.dotsRow}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <PinDot key={i} filled={i < pin.length} />
        ))}
      </View>

      {error && (
        <BodyText size={14} color="#FF3B30" style={styles.errorText}>
          Incorrect PIN.{' '}
          {attemptsLeft === 1
            ? 'Last attempt before lockout.'
            : `${attemptsLeft} attempts remaining.`}
        </BodyText>
      )}

      {isProcessing ? (
        <ActivityIndicator style={styles.spinner} size="large" color="#007AFF" />
      ) : (
        <View style={styles.keypad}>
          {KEYPAD.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.keypadRow}>
              {row.map((key, colIdx) => {
                if (key === null) {
                  if (showBiometricButton) {
                    return (
                      <TouchableOpacity
                        key={colIdx}
                        style={styles.key}
                        onPress={attemptBiometrics}
                        activeOpacity={0.6}>
                        <Image
                          source={
                            biometryType === 'FaceID'
                              ? BiometricImages.faceId
                              : BiometricImages.fingerprint
                          }
                          style={styles.biometricIcon}
                        />
                      </TouchableOpacity>
                    );
                  }
                  return <View key={colIdx} style={styles.keyEmpty} />;
                }
                return (
                  <TouchableOpacity
                    key={colIdx}
                    style={[styles.key, key === '⌫' && styles.keyBackspace]}
                    onPress={() => handleKey(key)}
                    activeOpacity={0.6}>
                    <BodyText
                      size={key === '⌫' ? 22 : 26}
                      color={key === '⌫' ? '#007AFF' : undefined}>
                      {key}
                    </BodyText>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      )}
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
    marginBottom: 6,
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
    marginBottom: 8,
  },
  spinner: {
    marginTop: 48,
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
  keyEmpty: {
    width: 78,
    height: 78,
  },
  biometricIcon: {
    width: 32,
    height: 32,
    tintColor: '#007AFF',
  },
});
