import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { BoldText } from './AppText';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ label, onPress, loading = false, disabled = false, style }: Props) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <BoldText size={17} color="#FFFFFF">{label}</BoldText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
  },
});
