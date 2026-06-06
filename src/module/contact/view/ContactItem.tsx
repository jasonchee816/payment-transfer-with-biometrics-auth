import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TitleText, CaptionText, BodyText } from '../../../component/AppText';
import Avatar from '../../../component/Avatar';

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
      <Avatar initials={contact.initials} color={contact.color} />
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
    gap: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    marginBottom: 2,
  },
});
