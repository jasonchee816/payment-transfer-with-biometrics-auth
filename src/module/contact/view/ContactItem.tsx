import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TitleText, CaptionText, BodyText } from '../../../component/AppText';

export type Contact = {
  id: string;
  name: string;
  phone: string;
  initials: string;
  color: string;
};

type Props = {
  contact: Contact;
  onPress: (contact: Contact) => void;
};

export default function ContactItem({ contact, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(contact)}>
      <View style={[styles.avatar, { backgroundColor: contact.color }]}>
        <TitleText size={16} color="#FFFFFF">{contact.initials}</TitleText>
      </View>
      <View style={styles.info}>
        <TitleText size={16} weight="500" style={styles.name}>{contact.name}</TitleText>
        <CaptionText>{contact.phone}</CaptionText>
      </View>
      <BodyText size={20} color="#C7C7CC">›</BodyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
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
});
