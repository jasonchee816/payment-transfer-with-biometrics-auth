import { useRef, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { LabelText, BoldText, CaptionText } from '../../../component/AppText';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { openSettings } from 'react-native-permissions';
import { useContactList } from '../hooks/query/useContactList';
import { useRecentTransfers } from '../hooks/query/useRecentTransfers';
import { useSearchUser } from '../hooks/mutation/useSearchUser';
import { useCheckAppUser } from '../hooks/mutation/useCheckAppUser';
import { appUserToContact } from '../utils';
import { TransferRoutes } from '../../transfer/constants';
import ContactItem, { type Contact } from './ContactItem';
import UserResultCard from './UserResultCard';

type Props = NativeStackScreenProps<Main.TransferStackParamList, typeof TransferRoutes.ContactList>;

function Separator() {
  return <View style={styles.separator} />;
}

export default function ContactListScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInputRef = useRef<TextInput>(null);

  const { contacts, isLoading, permissionDenied } = useContactList(query);
  const { data: recentUsers = [] } = useRecentTransfers();
  const searchUser = useSearchUser();
  const checkAppUser = useCheckAppUser();

  const handleSearch = () => {
    if (!phoneNumber.trim()) {
      return;
    }
    searchUser.reset();
    searchUser.mutate(phoneNumber.trim());
    phoneInputRef.current?.blur();
  };

  const handleSelectContact = (contact: Contact) => {
    if (!contact.phone) {
      Alert.alert('No Phone Number', 'This contact has no phone number on record.');
      return;
    }
    checkAppUser.mutate(contact.phone, {
      onSuccess: user => {
        navigation.navigate(TransferRoutes.TransferForm, {
          recipientId: user.userId,
          recipientName: user.displayName,
          recipientPhone: contact.phone,
        });
      },
      onError: error => {
        Alert.alert(
          'Not an App User',
          error instanceof Error ? error.message : 'Could not verify this contact.',
        );
      },
    });
  };

  const handleSelectRecentUser = (user: Contact.AppUser) => {
    navigation.navigate(TransferRoutes.TransferForm, {
      recipientId: user.userId,
      recipientName: user.displayName,
      recipientPhone: user.phoneNumber,
    });
  };

  const listHeader = (
    <View>
      <View style={styles.section}>
        <LabelText size={13} style={styles.sectionLabel}>Search by phone</LabelText>
        <View style={styles.searchRow}>
          <TextInput
            ref={phoneInputRef}
            style={styles.phoneInput}
            placeholder="e.g. 0123456789"
            placeholderTextColor="#8E8E93"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              searchUser.reset();
            }}
            keyboardType="phone-pad"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={[styles.searchButton, searchUser.isPending && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={searchUser.isPending}>
            {searchUser.isPending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <BoldText color="#FFFFFF">Search</BoldText>
            )}
          </TouchableOpacity>
        </View>

        {searchUser.isError && (
          <CaptionText color="#FF3B30" style={styles.searchError}>
            {searchUser.error instanceof Error
              ? searchUser.error.message
              : 'Something went wrong.'}
          </CaptionText>
        )}

        {searchUser.isSuccess && searchUser.data && (
          <UserResultCard
            user={searchUser.data}
            onPress={() => navigation.navigate(TransferRoutes.TransferForm, {
              recipientId: searchUser.data!.userId,
              recipientName: searchUser.data!.displayName,
              recipientPhone: searchUser.data!.phoneNumber,
            })}
          />
        )}
      </View>

      {recentUsers.length > 0 && !query.trim() && (
        <View style={styles.section}>
          <LabelText size={13} style={styles.sectionLabel}>Recent</LabelText>
          <View style={styles.recentList}>
            {recentUsers.map((user, index) => (
              <View key={user.userId}>
                <ContactItem
                  contact={appUserToContact(user)}
                  onPress={() => handleSelectRecentUser(user)}
                />
                {index < recentUsers.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>
      )}

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

  const listEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }
    if (permissionDenied) {
      return (
        <View style={styles.emptyState}>
          <View style={styles.permissionDeniedCard}>
            <BoldText size={16} style={styles.permissionTitle}>
              Contacts Access Required
            </BoldText>
            <CaptionText align="center" style={styles.permissionDescription}>
              To send money to your contacts, please allow access in your device Settings.
            </CaptionText>
            <TouchableOpacity
              style={styles.openSettingsButton}
              onPress={() => openSettings('application')}>
              <BoldText size={15} color="#FFFFFF">Open Settings</BoldText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.emptyState}>
        <CaptionText size={16}>No contacts found</CaptionText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactItem contact={item} onPress={handleSelectContact} />
        )}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
      />

      <Modal visible={checkAppUser.isPending} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ActivityIndicator size="large" color="#007AFF" />
            <BoldText size={15} style={styles.modalText}>Verifying contact…</BoldText>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    paddingBottom: 32,
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
  searchRow: {
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
  searchError: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  recentList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
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
    padding: 24,
    alignItems: 'center',
  },
  permissionDeniedCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    gap: 10,
    width: '100%',
  },
  permissionTitle: {
    textAlign: 'center',
  },
  permissionDescription: {
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  openSettingsButton: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 36,
    alignItems: 'center',
    gap: 14,
  },
  modalText: {
    color: '#3C3C43',
  },
});
