import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BodyText } from './AppText';

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
      <BodyText
        size={isClose ? 17 : 28}
        weight={isClose ? undefined : '300'}
        color="#007AFF"
        style={isClose ? styles.close : styles.chevron}>
        {isClose ? '✕' : '‹'}
      </BodyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Platform.OS === 'android' ? 16 : 0,
  },
  chevron: {
    lineHeight: 30,
  },
  close: {
    lineHeight: 22,
  },
});

export function CloseButton() {
  return <HeaderBackButton isClose />;
}

export function BackButton() {
  return <HeaderBackButton />;
}