import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../home/view/HomeScreen';
import TransactionHistoryScreen from '../../transactionHistory/view/TransactionHistoryScreen';
import TransactionHistoryDetailScreen from '../../transactionHistory/view/TransactionHistoryDetailScreen';
import TransferStack from '../../transfer/view/TransferStack';

const Stack = createNativeStackNavigator<Main.RootStackParamList>();

export default function MainNavigationStack() {
  return (
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
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{ title: 'History' }}
      />
      <Stack.Screen
        name="TransactionHistoryDetail"
        component={TransactionHistoryDetailScreen}
        options={{ title: 'Transaction' }}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
