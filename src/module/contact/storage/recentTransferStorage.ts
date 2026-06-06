import { transferStorage } from '../../../storage';

const RECENT_TRANSFER_KEY = 'recentTransferUsers';
const MAX_RECENT = 3;

export function getRecentTransferUsers(): Contact.AppUser[] {
  const raw = transferStorage.getString(RECENT_TRANSFER_KEY);
  return raw ? (JSON.parse(raw) as Contact.AppUser[]) : [];
}

export function recordRecentTransfer(user: Contact.AppUser): void {
  const current = getRecentTransferUsers();
  const updated = [user, ...current.filter(u => u.userId !== user.userId)].slice(0, MAX_RECENT);
  transferStorage.set(RECENT_TRANSFER_KEY, JSON.stringify(updated));
}

export function clearRecentTransfers(): void {
  transferStorage.set(RECENT_TRANSFER_KEY, JSON.stringify([]));
}
