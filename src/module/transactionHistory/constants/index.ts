import { TransactionHistoryApiRoutes } from '../src/api';

export const TransactionHistoryRoutes = {
  TransactionHistoryList: 'TransactionHistory/TransactionHistoryList',
  TransactionHistoryDetail: 'TransactionHistory/TransactionHistoryDetail',
} as const;

const TRANSACTION_HISTORY_BASE_KEY = 'TransactionHistory';

// TODO: Include userId as part of each key (e.g. [TRANSACTION_HISTORY_BASE_KEY, userId, TransactionHistoryApiRoutes.fetchTransactions])
// to prevent cached data from leaking across different authenticated users.
export const TransactionHistoryQueryKeys = {
  transactions: [TRANSACTION_HISTORY_BASE_KEY, TransactionHistoryApiRoutes.fetchTransactions],
} as const;
