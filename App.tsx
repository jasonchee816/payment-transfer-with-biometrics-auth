import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/module/home/view/HomeScreen';
import TransferScreen from './src/module/transfer/view/TransferScreen';
import TransactionHistoryScreen from './src/module/transactionHistory/view/TransactionHistoryScreen';
import ContactListScreen from './src/module/contact/view/ContactListScreen';
import PinCodeScreen from './src/module/biometric/view/PinCodeScreen';

export type RootStackParamList = {
  Home: undefined;
  TransactionHistory: undefined;
  Transfer: undefined;
  ContactList: undefined;
  PinCode: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#F2F2F7' },
            headerTitleStyle: { fontWeight: '600', fontSize: 17 },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: '#F2F2F7' },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'My Wallet' }}
          />
          <Stack.Screen
            name="Transfer"
            component={TransferScreen}
            options={{ title: 'Send Money' }}
          />
          <Stack.Screen
            name="ContactList"
            component={ContactListScreen}
            options={{ title: 'Select Contact' }}
          />
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistoryScreen}
            options={{ title: 'History' }}
          />
          <Stack.Screen
            name="PinCode"
            component={PinCodeScreen}
            options={{ title: 'Confirm Transfer', headerBackTitle: 'Back' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
