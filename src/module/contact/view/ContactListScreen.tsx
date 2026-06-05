import { useRef, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LabelText, BoldText, CaptionText } from '../../../component/AppText';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useDuitNowSearch } from '../hooks/mutation/useDuitNowSearch';
import { TransferRoutes } from '../../transfer/constants';
import ContactItem, { type Contact } from './ContactItem';
import DuitNowResultCard from './DuitNowResultCard';

type Props = NativeStackScreenProps<Main.TransferStackParamList, typeof TransferRoutes.ContactList>;

const CONTACTS: Contact[] = [
  { id: '1', name: 'Alice Johnson', phone: '+1 (555) 234-5678', initials: 'AJ', color: '#FF6B6B' },
  { id: '2', name: 'Bob Smith',     phone: '+1 (555) 345-6789', initials: 'BS', color: '#4ECDC4' },
  { id: '3', name: 'Carol White',   phone: '+1 (555) 456-7890', initials: 'CW', color: '#45B7D1' },
  { id: '4', name: 'David Lee',     phone: '+1 (555) 567-8901', initials: 'DL', color: '#96CEB4' },
  { id: '5', name: 'Emma Davis',    phone: '+1 (555) 678-9012', initials: 'ED', color: '#FFEAA7' },
  { id: '6', name: 'Frank Miller',  phone: '+1 (555) 789-0123', initials: 'FM', color: '#DDA0DD' },
  { id: '7', name: 'Grace Wilson',  phone: '+1 (555) 890-1234', initials: 'GW', color: '#98D8C8' },
  { id: '8', name: 'Henry Brown',   phone: '+1 (555) 901-2345', initials: 'HB', color: '#F0A500' },
];

function Separator() {
  return <View style={styles.separator} />;
}

export default function ContactListScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInputRef = useRef<TextInput>(null);

  const duitNowSearch = useDuitNowSearch();

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelectContact = (contact: Contact) => {
    navigation.navigate(TransferRoutes.TransferForm, {
      recipientId: contact.id,
      recipientName: contact.name,
    });
  };

  const handleSelectDuitNow = (result: Contact.DuitNowResult) => {
    navigation.navigate(TransferRoutes.TransferForm, {
      recipientId: result.id,
      recipientName: result.name,
    });
  };

  const handleDuitNowSearch = () => {
    if (!phoneNumber.trim()) {
      return;
    }
    duitNowSearch.reset();
    duitNowSearch.mutate(phoneNumber.trim());
    phoneInputRef.current?.blur();
  };

  const listHeader = (
    <View>
      <View style={styles.section}>
        <LabelText size={13} style={styles.sectionLabel}>DuitNow</LabelText>
        <View style={styles.duitNowRow}>
          <TextInput
            ref={phoneInputRef}
            style={styles.phoneInput}
            placeholder="e.g. 0123456789"
            placeholderTextColor="#8E8E93"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              duitNowSearch.reset();
            }}
            keyboardType="phone-pad"
            returnKeyType="search"
            onSubmitEditing={handleDuitNowSearch}
          />
          <TouchableOpacity
            style={[styles.searchButton, duitNowSearch.isPending && styles.searchButtonDisabled]}
            onPress={handleDuitNowSearch}
            disabled={duitNowSearch.isPending}>
            {duitNowSearch.isPending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <BoldText color="#FFFFFF">Search</BoldText>
            )}
          </TouchableOpacity>
        </View>

        {duitNowSearch.isError && (
          <CaptionText color="#FF3B30" style={styles.duitNowError}>
            {duitNowSearch.error instanceof Error
              ? duitNowSearch.error.message
              : 'Something went wrong.'}
          </CaptionText>
        )}

        {duitNowSearch.isSuccess && duitNowSearch.data && (
          <DuitNowResultCard
            result={duitNowSearch.data}
            onPress={() => handleSelectDuitNow(duitNowSearch.data!)}
          />
        )}
      </View>

      <View style={styles.section}>
        <LabelText size={13} style={styles.sectionLabel}>Contacts</LabelText>
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
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactItem contact={item} onPress={handleSelectContact} />
        )}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <CaptionText size={16}>No contacts found</CaptionText>
          </View>
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  section: {
    marginBottom: 8,
  },
  sectionLabel: {
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  duitNowRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  duitNowError: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
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
});
