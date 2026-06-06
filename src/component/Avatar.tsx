import { View, StyleSheet } from 'react-native';
import { TitleText } from './AppText';

type Props = {
  initials: string;
  size?: number;
  color?: string;
};

export default function Avatar({ initials, size = 46, color = '#007AFF' }: Props) {
  const radius = size / 2;
  const fontSize = Math.round(size * 0.35);

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: radius, backgroundColor: color },
      ]}>
      <TitleText size={fontSize} color="#FFFFFF">{initials}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
