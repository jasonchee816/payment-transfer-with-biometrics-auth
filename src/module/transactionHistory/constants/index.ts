import { FETCH_TRANSACTIONS } from '../src/api';

export const TransactionHistoryRoutes = {
  TransactionHistoryList: 'TransactionHistory/TransactionHistoryList',
  TransactionHistoryDetail: 'TransactionHistory/TransactionHistoryDetail',
} as const;

const TRANSACTION_HISTORY_BASE_KEY = 'TransactionHistory';

// TODO: Include userId as part of each key (e.g. [TRANSACTION_HISTORY_BASE_KEY, userId, FETCH_TRANSACTIONS])
// to prevent cached data from leaking across different authenticated users.
export const TransactionHistoryQueryKeys = {
  transactions: [TRANSACTION_HISTORY_BASE_KEY, FETCH_TRANSACTIONS],
} as const;
