import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransferScreen from './TransferScreen';
import TransferSuccessScreen from './TransferSuccessScreen';
import ContactListScreen from '../../contact/view/ContactListScreen';
import PinCodeScreen from '../../biometric/view/PinCodeScreen';

const Stack = createNativeStackNavigator<Main.TransferStackParamList>();

export default function TransferStack() {
  return (
    <Stack.Navigator initialRouteName="ContactList">
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{ title: 'Select Contact' }}
      />
      <Stack.Screen
        name="TransferForm"
        component={TransferScreen}
        options={{ title: 'Send Money' }}
      />
      <Stack.Screen
        name="PinCode"
        component={PinCodeScreen}
        options={{ title: 'Confirm Transfer', headerBackTitle: 'Back' }}
      />
      <Stack.Screen
        name="TransferSuccess"
        component={TransferSuccessScreen}
        options={{ title: '', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
