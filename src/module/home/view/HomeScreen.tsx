import { Fragment } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutes } from '../../main/constants/routes';
import { useAccountBalance } from '../../account/hooks/query/useAccountBalance';
import SkeletonLoader from '../../../component/SkeletonLoader';
import {
  HeadingText,
  TitleText,
  BodyText,
  BoldText,
  CaptionText,
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

const RECENT = [
  { id: '1', name: 'Alice Johnson', initials: 'AJ', color: '#FF6B6B', amount: '-$120.00', date: 'Today' },
  { id: '2', name: 'Bob Smith', initials: 'BS', color: '#4ECDC4', amount: '+$50.00', date: 'Yesterday' },
  { id: '3', name: 'Carol White', initials: 'CW', color: '#45B7D1', amount: '-$230.00', date: 'Jun 2' },
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
  const formattedBalance =
    availableBalance
      ? `RM ${availableBalance.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={isBalanceRefetching}
          onRefresh={refetchBalance}
          tintColor="#007AFF"
        />
      }>
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
        {RECENT.map((item, index) => {
          const isSent = item.amount.startsWith('-');
          return (
            <Fragment key={item.id}>
              <View style={styles.recentItem}>
                <View style={[styles.recentAvatar, { backgroundColor: item.color }]}>
                  <BoldText weight="700" color={TextColors.inverse}>
                    {item.initials}
                  </BoldText>
                </View>
                <View style={styles.recentInfo}>
                  <BodyText weight="500" style={styles.recentName}>
                    {item.name}
                  </BodyText>
                  <CaptionText>{item.date}</CaptionText>
                </View>
                <BoldText style={isSent ? styles.sent : styles.received}>
                  {item.amount}
                </BoldText>
              </View>
              {index < RECENT.length - 1 && <View style={styles.divider} />}
            </Fragment>
          );
        })}
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
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  recentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    marginBottom: 2,
  },
  sent: {
    color: '#FF3B30',
  },
  received: {
    color: '#34C759',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E5EA',
    marginLeft: 70,
  },
});
