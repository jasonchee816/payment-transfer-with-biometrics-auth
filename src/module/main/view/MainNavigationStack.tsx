import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../home/view/HomeScreen';
import TransactionHistoryStack from '../../transactionHistory/view/TransactionHistoryStack';
import TransferStack from '../../transfer/view/TransferStack';
import { RootRoutes } from '../constants/routes';

const Stack = createNativeStackNavigator<Main.RootStackParamList>();

export default function MainNavigationStack() {
  return (
    <Stack.Navigator
      initialRouteName={RootRoutes.Home}
      screenOptions={{
        headerStyle: { backgroundColor: '#F2F2F7' },
        headerTitleStyle: { fontWeight: '600', fontSize: 17 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#F2F2F7' },
      }}>
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
