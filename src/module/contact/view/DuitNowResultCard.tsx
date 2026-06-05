import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TitleText, BoldText } from '../../../component/AppText';

type Props = {
  result: Contact.DuitNowResult;
  onPress: () => void;
};

export default function DuitNowResultCard({ result, onPress }: Props) {
  const initials = result.name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}>
        <TitleText size={16} color="#FFFFFF">{initials}</TitleText>
      </View>
      <View style={styles.info}>
        <TitleText size={16} weight="500" style={styles.name}>{result.name}</TitleText>
      </View>
      <View style={styles.badge}>
        <BoldText size={13} color="#FFFFFF">Select</BoldText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#007AFF',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    marginBottom: 2,
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
