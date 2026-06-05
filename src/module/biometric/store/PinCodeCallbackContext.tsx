import { createContext, useContext, useRef } from 'react';

type PinCodeCallbacks = {
  onSuccess?: () => Promise<void>;
};

type PinCodeCallbackContextValue = {
  register: (callbacks: PinCodeCallbacks) => void;
  consume: () => PinCodeCallbacks;
};

const PinCodeCallbackContext = createContext<PinCodeCallbackContextValue | null>(null);

export function PinCodeCallbackProvider({ children }: { children: React.ReactNode }) {
  // A ref avoids re-renders when callbacks are written; the values are
  // only read imperatively (on pin success), never observed by React.
  const callbacksRef = useRef<PinCodeCallbacks>({});

  const register = (callbacks: PinCodeCallbacks) => {
    callbacksRef.current = { ...callbacksRef.current, ...callbacks };
  };

  const consume = (): PinCodeCallbacks => {
    const snapshot = callbacksRef.current;
    callbacksRef.current = {};
    return snapshot;
  };

  return (
    <PinCodeCallbackContext.Provider value={{ register, consume }}>
      {children}
    </PinCodeCallbackContext.Provider>
  );
}

export function usePinCodeCallbacks(): PinCodeCallbackContextValue {
  const ctx = useContext(PinCodeCallbackContext);
  if (!ctx) {
    throw new Error('usePinCodeCallbacks must be used inside PinCodeCallbackProvider');
  }
  return ctx;
}
