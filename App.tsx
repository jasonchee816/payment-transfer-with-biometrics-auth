import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainNavigationStack from './src/module/main/view/MainNavigationStack';
import { DebugStoreProvider } from './src/module/debug/hooks/DebugStore';
import FloatingDebugButton from './src/module/debug/view/FloatingDebugButton';

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DebugStoreProvider>
        <SafeAreaProvider style={styles.root}>
          <StatusBar barStyle={'dark-content'} backgroundColor="#F2F2F7" />
          <NavigationContainer>
            <MainNavigationStack />
          </NavigationContainer>
          <FloatingDebugButton />
        </SafeAreaProvider>
      </DebugStoreProvider>
    </QueryClientProvider>
  );
}
