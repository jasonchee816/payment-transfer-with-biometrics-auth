import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BoldText, CaptionText } from '../../../component/AppText';
import Avatar from '../../../component/Avatar';
import { getInitials } from '../utils';

type Props = {
  user: Contact.AppUser;
  onPress: () => void;
};

export default function UserResultCard({ user, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar initials={getInitials(user.displayName)} />
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
  info: {
    flex: 1,
    gap: 2,
  },
});
