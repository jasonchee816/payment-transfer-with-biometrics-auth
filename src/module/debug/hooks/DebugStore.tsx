import { createContext, useCallback, useContext, useState } from 'react';

interface DebugStoreContextType {
  flags: Debug.DebugFlags;
  setFlag: <K extends keyof Debug.DebugFlags>(key: K, value: Debug.DebugFlags[K]) => void;
};

const DEFAULT_FLAGS: Debug.DebugFlags = {
  simulateTransferFailure: false,
};

const DebugStoreContext = createContext<DebugStoreContextType>({
  flags: DEFAULT_FLAGS,
  setFlag: () => {},
});

export function DebugStoreProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<Debug.DebugFlags>(DEFAULT_FLAGS);

  const setFlag = useCallback(
    <K extends keyof Debug.DebugFlags>(key: K, value: Debug.DebugFlags[K]) => {
      setFlags(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <DebugStoreContext.Provider value={{ flags, setFlag }}>
      {children}
    </DebugStoreContext.Provider>
  );
}

export function useDebugStore() {
  return useContext(DebugStoreContext);
}
