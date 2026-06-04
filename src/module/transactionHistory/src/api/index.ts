import type { FetchTransactionsResponse } from '../../types';

const SIMULATED_DELAY_MS = 1000;

const MOCK_DATA: FetchTransactionsResponse = {
  totalSent: '$845.00',
  transactions: [
    { id: '1', name: 'Alice Johnson', date: 'Jun 4, 2026', amount: '$120.00', type: 'sent' },
    { id: '2', name: 'Bob Smith', date: 'Jun 3, 2026', amount: '$50.00', type: 'received' },
    { id: '3', name: 'Carol White', date: 'Jun 2, 2026', amount: '$230.00', type: 'sent' },
    { id: '4', name: 'David Lee', date: 'Jun 1, 2026', amount: '$75.50', type: 'received' },
    { id: '5', name: 'Emma Davis', date: 'May 31, 2026', amount: '$400.00', type: 'sent' },
    { id: '6', name: 'Frank Miller', date: 'May 30, 2026', amount: '$18.99', type: 'received' },
    { id: '7', name: 'Grace Wilson', date: 'May 29, 2026', amount: '$95.00', type: 'sent' },
  ],
};

export function fetchTransactions(): Promise<FetchTransactionsResponse> {
  return new Promise(resolve => {
    setTimeout(() => resolve(MOCK_DATA), SIMULATED_DELAY_MS);
  });
}
