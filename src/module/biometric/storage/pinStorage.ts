import shajs from 'sha.js';
import { biometricStorage as storage } from '../../../storage';
import { CORRECT_PIN } from '../constants';

// Ideally this secret should come from a secret manager
// (e.g. AWS Secrets Manager, HashiCorp Vault, or a secure remote config service)
// and must never be hardcoded in source
const PIN_HASH_SECRET = 'dev-only-pin-secret-abc123xyz';

const PIN_HASH_KEY = 'pinHash';
const PIN_ATTEMPTS_KEY = 'pinFailedAttempts';

export const MAX_PIN_ATTEMPTS = 3;

function hashPin(pin: string): string {
  return shajs('sha256')
    .update(PIN_HASH_SECRET + pin + PIN_HASH_SECRET)
    .digest('hex');
}

function getOrInitPinHash(): string {
  const stored = storage.getString(PIN_HASH_KEY);
  if (stored !== undefined) {
    return stored;
  }
  const initial = hashPin(CORRECT_PIN);
  storage.set(PIN_HASH_KEY, initial);
  return initial;
}

export function verifyPin(pin: string): boolean {
  return getOrInitPinHash() === hashPin(pin);
}

export function getPinAttempts(): number {
  return storage.getNumber(PIN_ATTEMPTS_KEY) ?? 0;
}

export function incrementPinAttempts(): number {
  const next = getPinAttempts() + 1;
  storage.set(PIN_ATTEMPTS_KEY, next);
  return next;
}

export function resetPinAttempts(): void {
  storage.remove(PIN_ATTEMPTS_KEY);
}

export function isPinLocked(): boolean {
  return getPinAttempts() >= MAX_PIN_ATTEMPTS;
}
