declare namespace TransactionHistory {
  interface Transaction {
    id: string;
    name: string;
    date: string;
    amount: string;
    type: 'sent' | 'received';
  };

  interface FetchTransactionsResponse {
    transactions: Transaction[];
    totalSent: string;
  };
}
