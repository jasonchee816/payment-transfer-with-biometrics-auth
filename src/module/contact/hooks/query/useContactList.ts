import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import type { Contact } from '../../view/ContactItem';

type PermissionStatus = 'checking' | 'granted' | 'denied';

const AVATAR_COLOR = '#007AFF';

function getInitials(givenName: string | null, familyName: string | null): string {
  const first = givenName?.charAt(0).toUpperCase() ?? '';
  const last = familyName?.charAt(0).toUpperCase() ?? '';
  return (first + last) || first || last || '?';
}

async function requestContactsPermission(): Promise<boolean> {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.READ_CONTACTS
      : PERMISSIONS.IOS.CONTACTS;

  const current = await check(permission);
  if (current === RESULTS.GRANTED || current === RESULTS.LIMITED) {
    return true;
  }
  if (current === RESULTS.BLOCKED) {
    return false;
  }

  const result = await request(permission);
  return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
}

async function fetchContacts(): Promise<Contact[]> {
  const raw = await Contacts.getAllWithoutPhotos();

  return raw
    .map(c => ({
      id: c.recordID,
      name: [c.givenName, c.familyName].filter(Boolean).join(' '),
      phone: (c.phoneNumbers[0]?.number ?? '') as string,
      initials: getInitials(c.givenName, c.familyName),
      color: AVATAR_COLOR,
    }))
    .filter(c => c.name.trim().length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function useContactList(query: string = '') {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('checking');

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      setContacts(await fetchContacts());
    } catch {
      // log errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    requestContactsPermission().then(granted => {
      setPermissionStatus(granted ? 'granted' : 'denied');
      if (granted) {
        load();
      } else {
        setIsLoading(false);
      }
    });
  }, [load]);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return contacts;
    }
    const lower = query.toLowerCase();
    return contacts.filter(c => c.name.toLowerCase().includes(lower));
  }, [contacts, query]);

  return {
    contacts: filtered,
    isLoading,
    permissionDenied: permissionStatus === 'denied',
  };
}
