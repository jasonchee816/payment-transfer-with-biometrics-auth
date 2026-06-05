import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onPress?: () => void;
  isClose?: boolean;
};

export default function HeaderBackButton({ onPress, isClose = false }: Props) {
  const navigation = useNavigation();
  const onPressBack = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  }
  return (
    <TouchableOpacity onPress={onPressBack} style={styles.button} hitSlop={8}>
      <Text style={isClose ? styles.close : styles.chevron}>
        {isClose ? '✕' : '‹'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    fontSize: 28,
    lineHeight: 30,
    color: '#007AFF',
    fontWeight: '300',
  },
  close: {
    fontSize: 17,
    lineHeight: 22,
    color: '#007AFF',
    fontWeight: '400',
  },
});

export function CloseButton() {
  return <HeaderBackButton isClose />;
}

export function BackButton() {
  return <HeaderBackButton />;
}