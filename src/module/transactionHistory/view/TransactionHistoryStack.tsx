import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionHistoryScreen from './TransactionHistoryScreen';
import TransactionHistoryDetailScreen from './TransactionHistoryDetailScreen';
import { BackButton } from '../../../component/HeaderBackButton';
import { TransactionHistoryRoutes } from '../constants';
import { defaultStackScreenOptions } from '../../main/constants/routes';

const Stack = createNativeStackNavigator<Main.TransactionHistoryStackParamList>();

export default function TransactionHistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...defaultStackScreenOptions, headerLeft: BackButton }}>
      <Stack.Screen
        name={TransactionHistoryRoutes.TransactionHistoryList}
        component={TransactionHistoryScreen}
        options={{ title: 'History' }}
      />
      <Stack.Screen
        name={TransactionHistoryRoutes.TransactionHistoryDetail}
        component={TransactionHistoryDetailScreen}
        options={{ title: 'Transaction' }}
      />
    </Stack.Navigator>
  );
}
