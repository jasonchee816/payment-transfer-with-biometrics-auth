import { transferStorage } from '../../../storage';

const RECENT_TRANSFER_KEY = 'recentTransferUserIds';
const MAX_RECENT = 3;

export function getRecentTransferUserIds(): string[] {
  const raw = transferStorage.getString(RECENT_TRANSFER_KEY);
  return raw ? (JSON.parse(raw) as string[]) : [];
}

export function recordRecentTransfer(userId: string): void {
  const current = getRecentTransferUserIds();
  const updated = [userId, ...current.filter(id => id !== userId)].slice(0, MAX_RECENT);
  transferStorage.set(RECENT_TRANSFER_KEY, JSON.stringify(updated));
}

export function clearRecentTransfers(): void {
  transferStorage.set(RECENT_TRANSFER_KEY, JSON.stringify([]));
}
