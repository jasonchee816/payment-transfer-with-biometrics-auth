export const RootRoutes = {
  Home: 'Home',
  TransactionHistory: 'TransactionHistory',
  Transfer: 'Transfer',
} as const;

export const defaultStackScreenOptions = {
  headerStyle: { backgroundColor: '#F2F2F7' },
  headerTitleStyle: { fontWeight: '600' as const, fontSize: 17 },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: '#F2F2F7' },
};
