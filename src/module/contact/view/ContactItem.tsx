import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
        <Text style={styles.avatarText}>{contact.initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
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
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  phone: {
    fontSize: 13,
    color: '#8E8E93',
  },
  arrow: {
    fontSize: 20,
    color: '#C7C7CC',
  },
});
