import { View, StyleSheet } from 'react-native';

type Props = {
  /** Left indent in dp. Defaults to 0 (full-width hairline). */
  indent?: number;
};

export default function ListSeparator({ indent = 0 }: Props) {
  return <View style={[styles.separator, { marginLeft: indent }]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
  },
});
