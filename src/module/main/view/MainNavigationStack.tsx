import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../home/view/HomeScreen';
import TransactionHistoryStack from '../../transactionHistory/view/TransactionHistoryStack';
import TransferStack from '../../transfer/view/TransferStack';
import { RootRoutes, defaultStackScreenOptions } from '../constants/routes';

const Stack = createNativeStackNavigator<Main.RootStackParamList>();

export default function MainNavigationStack() {
  return (
    <Stack.Navigator
      initialRouteName={RootRoutes.Home}
      screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name={RootRoutes.Home}
        component={HomeScreen}
        options={{ title: 'My Wallet' }}
      />
      <Stack.Screen
        name={RootRoutes.TransactionHistory}
        component={TransactionHistoryStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RootRoutes.Transfer}
        component={TransferStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
