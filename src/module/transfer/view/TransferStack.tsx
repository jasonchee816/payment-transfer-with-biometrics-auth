import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransferScreen from './TransferScreen';
import TransferSuccessScreen from './TransferSuccessScreen';
import ContactListScreen from '../../contact/view/ContactListScreen';
import PinCodeScreen from '../../biometric/view/PinCodeScreen';
import { BackButton, CloseButton } from '../../../component/HeaderBackButton';
import { TransferRoutes } from '../constants';
import { defaultStackScreenOptions } from '../../main/constants/routes';
import { PinCodeCallbackProvider } from '../../biometric/store/PinCodeCallbackContext';

const Stack = createNativeStackNavigator<Main.TransferStackParamList>();

export default function TransferStack() {
  return (
    <PinCodeCallbackProvider>
    <Stack.Navigator
      initialRouteName={TransferRoutes.ContactList}
      screenOptions={{ ...defaultStackScreenOptions, headerLeft: BackButton }}>
      <Stack.Screen
        name={TransferRoutes.ContactList}
        component={ContactListScreen}
        options={{ title: 'Select Contact', headerLeft: CloseButton }}
      />
      <Stack.Screen
        name={TransferRoutes.TransferForm}
        component={TransferScreen}
        options={{ title: 'Send Money' }}
      />
      <Stack.Screen
        name={TransferRoutes.PinCode}
        component={PinCodeScreen}
        options={{ title: 'Confirm Transfer' }}
      />
      <Stack.Screen
        name={TransferRoutes.TransferSuccess}
        component={TransferSuccessScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
    </PinCodeCallbackProvider>
  );
}
