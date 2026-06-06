import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BoldText, CaptionText, TitleText } from '../../../component/AppText';
import { getInitials } from '../utils';

const AVATAR_COLOR = '#007AFF';

type Props = {
  user: Contact.AppUser;
  onPress: () => void;
};

export default function UserResultCard({ user, onPress }: Props) {
  const initials = getInitials(user.displayName);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: AVATAR_COLOR }]}>
        <TitleText size={16} color="#FFFFFF">{initials}</TitleText>
      </View>
      <View style={styles.info}>
        <BoldText size={15}>{user.displayName}</BoldText>
        <CaptionText>{user.phoneNumber}</CaptionText>
      </View>
      <BoldText size={14} color="#007AFF">Transfer</BoldText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
});
