import ALL_TRANSACTIONS from '../data/transactions.json';

export const TransactionHistoryApiRoutes = {
  fetchTransactions: 'fetchTransactions',
} as const;

const PAGE_SIZE_DEFAULT = 20;
const SIMULATED_DELAY_MS = 800;

const TOTAL_SENT = ALL_TRANSACTIONS.filter(t => t.type === 'sent')
  .reduce((sum, t) => sum + parseFloat(t.amount.replace('$', '')), 0)
  .toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export function fetchTransactions({
  page,
  limit = PAGE_SIZE_DEFAULT,
}: TransactionHistory.Api.FetchTransactionsParams): Promise<TransactionHistory.Api.FetchTransactionsResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      resolve({
        transactions: ALL_TRANSACTIONS.slice(start, end) as TransactionHistory.Transaction[],
        totalSent: TOTAL_SENT,
        page,
        hasNextPage: end < ALL_TRANSACTIONS.length,
        total: ALL_TRANSACTIONS.length,
      });
    }, SIMULATED_DELAY_MS);
  });
}
