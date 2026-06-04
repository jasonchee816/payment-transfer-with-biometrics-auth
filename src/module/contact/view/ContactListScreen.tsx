import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<Main.TransferStackParamList, 'ContactList'>;

type Contact = {
  id: string;
  name: string;
  phone: string;
  initials: string;
  color: string;
};

const CONTACTS: Contact[] = [
  { id: '1', name: 'Alice Johnson', phone: '+1 (555) 234-5678', initials: 'AJ', color: '#FF6B6B' },
  { id: '2', name: 'Bob Smith', phone: '+1 (555) 345-6789', initials: 'BS', color: '#4ECDC4' },
  { id: '3', name: 'Carol White', phone: '+1 (555) 456-7890', initials: 'CW', color: '#45B7D1' },
  { id: '4', name: 'David Lee', phone: '+1 (555) 567-8901', initials: 'DL', color: '#96CEB4' },
  { id: '5', name: 'Emma Davis', phone: '+1 (555) 678-9012', initials: 'ED', color: '#FFEAA7' },
  { id: '6', name: 'Frank Miller', phone: '+1 (555) 789-0123', initials: 'FM', color: '#DDA0DD' },
  { id: '7', name: 'Grace Wilson', phone: '+1 (555) 890-1234', initials: 'GW', color: '#98D8C8' },
  { id: '8', name: 'Henry Brown', phone: '+1 (555) 901-2345', initials: 'HB', color: '#F0A500' },
];

function Separator() {
  return <View style={styles.separator} />;
}

function ContactItem({
  contact,
  onPress,
}: {
  contact: Contact;
  onPress: (contact: Contact) => void;
}) {
  return (
    <TouchableOpacity style={styles.contactItem} onPress={() => onPress(contact)}>
      <View style={[styles.avatar, { backgroundColor: contact.color }]}>
        <Text style={styles.avatarText}>{contact.initials}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
      </View>
      <Text style={styles.selectArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function ContactListScreen({ navigation }: Props) {
  const [query, setQuery] = React.useState('');

  const emptyComponent = (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No contacts found</Text>
    </View>
  );

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (_contact: Contact) => {
    navigation.navigate('TransferForm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts"
          placeholderTextColor="#8E8E93"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactItem contact={item} onPress={handleSelect} />
        )}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    padding: 12,
    backgroundColor: '#F2F2F7',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
  },
  contactItem: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 13,
    color: '#8E8E93',
  },
  selectArrow: {
    fontSize: 20,
    color: '#C7C7CC',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 74,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
