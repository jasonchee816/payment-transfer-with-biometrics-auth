import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<Main.RootStackParamList, 'Home'>;

type QuickAction = {
  label: string;
  icon: string;
  screen: keyof Main.RootStackParamList;
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Send', icon: '↑', screen: 'Transfer' },
  { label: 'Contacts', icon: '👥', screen: 'ContactList' },
  { label: 'History', icon: '📋', screen: 'TransactionHistory' },
];

const RECENT = [
  { id: '1', name: 'Alice Johnson', initials: 'AJ', color: '#FF6B6B', amount: '-$120.00', date: 'Today' },
  { id: '2', name: 'Bob Smith', initials: 'BS', color: '#4ECDC4', amount: '+$50.00', date: 'Yesterday' },
  { id: '3', name: 'Carol White', initials: 'CW', color: '#45B7D1', amount: '-$230.00', date: 'Jun 2' },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>$4,280.50</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Transfer')}>
            <Text style={styles.primaryButtonText}>Send Money</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsRow}>
        {QUICK_ACTIONS.map(action => (
          <TouchableOpacity
            key={action.label}
            style={styles.quickAction}
            onPress={() => navigation.navigate(action.screen as any)}>
            <View style={styles.quickActionIcon}>
              <Text style={styles.quickActionIconText}>{action.icon}</Text>
            </View>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transfers</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentList}>
        {RECENT.map((item, index) => {
          const isSent = item.amount.startsWith('-');
          return (
            <React.Fragment key={item.id}>
              <View style={styles.recentItem}>
                <View style={[styles.recentAvatar, { backgroundColor: item.color }]}>
                  <Text style={styles.recentAvatarText}>{item.initials}</Text>
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentName}>{item.name}</Text>
                  <Text style={styles.recentDate}>{item.date}</Text>
                </View>
                <Text style={[styles.recentAmount, isSent ? styles.sent : styles.received]}>
                  {item.amount}
                </Text>
              </View>
              {index < RECENT.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
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
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 6,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: -1,
  },
  balanceActions: {
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
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
  quickActionIconText: {
    fontSize: 20,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3C3C43',
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
  recentAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 13,
    color: '#8E8E93',
  },
  recentAmount: {
    fontSize: 15,
    fontWeight: '600',
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
