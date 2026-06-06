import type { Contact } from '../view/ContactItem';

const AVATAR_COLOR = '#007AFF';

export function getInitials(displayName: string): string {
  const parts = displayName.trim().split(' ');
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : displayName.slice(0, 2).toUpperCase();
}

export function appUserToContact(user: Contact.AppUser): Contact {
  return {
    id: user.userId,
    name: user.displayName,
    phone: user.phoneNumber,
    initials: getInitials(user.displayName),
    color: AVATAR_COLOR,
  };
}
