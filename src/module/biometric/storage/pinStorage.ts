import { biometricStorage as storage } from '../../../storage';

const PIN_ATTEMPTS_KEY = 'pinFailedAttempts';

export const MAX_PIN_ATTEMPTS = 3;

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
