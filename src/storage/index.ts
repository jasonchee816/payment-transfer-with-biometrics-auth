import { createMMKV } from 'react-native-mmkv';

/**
 * Centralised MMKV instances.
 * Each instance gets its own namespace (id) so keys never collide across modules.
 * Add new instances here as new storage namespaces are needed.
 */
export const biometricStorage = createMMKV({ id: 'biometric' });
