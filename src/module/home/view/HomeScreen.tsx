import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../main/constants/routes';
import { useAccountBalance } from '../../account/hooks/query/useAccountBalance';
import { useRefreshControl } from '../../../hooks/useRefreshControl';
import { useTransactions } from '../../transactionHistory/hooks/query/useTransactions';
import TransactionItem from '../../transactionHistory/view/TransactionItem';
import SkeletonLoader from '../../../component/SkeletonLoader';
import {
  HeadingText,
  TitleText,
  BodyText,
  TextColors,
} from '../../../component/AppText';

type Props = NativeStackScreenProps<Main.RootStackParamList, 'Home'>;

type QuickAction = {
  label: string;
  icon: string;
  screen: keyof Main.RootStackParamList;
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Send', icon: '↑', screen: RootRoutes.Transfer },
  { label: 'History', icon: '→', screen: RootRoutes.TransactionHistory },
];

export default function HomeScreen({ navigation }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  // content padding 16 each side + card padding 24 each side
  const cardInnerWidth = windowWidth - 32 - 48;

  const {
    data: availableBalance,
    isLoading: isBalanceLoading,
    isRefetching: isBalanceRefetching,
    refetch: refetchBalance,
  } = useAccountBalance({
    select: data => data?.balance.available,
  });
  const { refreshControl } = useRefreshControl(isBalanceRefetching, refetchBalance);

  const { data: transactionsData } = useTransactions();
  const recentTransactions = transactionsData?.pages[0]?.transactions.slice(0, 3) ?? [];
  const formattedBalance =
    availableBalance
      ? `RM ${availableBalance.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={refreshControl}>
      <View style={styles.balanceCard}>
        <BodyText size={14} color="rgba(255,255,255,0.75)" style={styles.balanceLabel}>
          Available Balance
        </BodyText>
        <SkeletonLoader
          width={cardInnerWidth * 0.85}
          height={52}
          visible={!isBalanceLoading}
          shimmerColors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0.15)']}
          shimmerStyle={styles.balanceSkeletonAmount}
          style={styles.balanceSkeletonAmountWrapper}>
          <HeadingText size={42} color={TextColors.inverse} style={styles.balanceAmount}>
            {formattedBalance}
          </HeadingText>
        </SkeletonLoader>
      </View>

      <TitleText style={styles.sectionTitle}>Quick Actions</TitleText>
      <View style={styles.quickActionsRow}>
        {QUICK_ACTIONS.map(action => (
          <TouchableOpacity
            key={action.label}
            style={styles.quickAction}
            onPress={() => navigation.navigate(action.screen as any)}>
            <View style={styles.quickActionIcon}>
              <BodyText size={20}>{action.icon}</BodyText>
            </View>
            <BodyText size={13} weight="500" color="#3C3C43">
              {action.label}
            </BodyText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <TitleText style={styles.sectionTitle}>Recent Transfers</TitleText>
        <TouchableOpacity onPress={() => navigation.navigate(RootRoutes.TransactionHistory)}>
          <BodyText size={14} weight="500" color={TextColors.accent} style={styles.seeAll}>
            See All
          </BodyText>
        </TouchableOpacity>
      </View>

      <View style={styles.recentList}>
        {recentTransactions.map((item, index) => (
          <TransactionItem
            key={item.id}
            item={item}
            onPress={() => navigation.navigate(RootRoutes.TransactionHistory)}
            style={index < recentTransactions.length - 1 ? styles.itemDivider : undefined}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  balanceCard: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    marginBottom: 10,
  },
  balanceSkeletonAmountWrapper: {
    marginBottom: 20,
  },
  balanceSkeletonAmount: {
    borderRadius: 10,
  },
  balanceAmount: {
    letterSpacing: -1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  seeAll: {
    marginBottom: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EBF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
  },
  itemDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
});
