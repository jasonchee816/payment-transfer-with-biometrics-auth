import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainNavigationStack from './src/module/main/view/MainNavigationStack';
import { DebugStoreProvider } from './src/module/debug/hooks/DebugStore';
import FloatingDebugButton from './src/module/debug/view/FloatingDebugButton';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DebugStoreProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={'dark-content'} />
          <NavigationContainer>
            <MainNavigationStack />
          </NavigationContainer>
          <FloatingDebugButton />
        </SafeAreaProvider>
      </DebugStoreProvider>
    </QueryClientProvider>
  );
}
