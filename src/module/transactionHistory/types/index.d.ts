declare namespace TransactionHistory {
  interface Transaction {
    id: string;
    name: string;
    date: string;
    amount: string;
    type: 'sent' | 'received';
  }

  declare namespace Api {
    interface FetchTransactionsParams {
      page: number;
      limit: number;
    }

    interface FetchTransactionsResponse {
      transactions: Transaction[];
      totalSent: string;
      page: number;
      hasNextPage: boolean;
      total: number;
    }
  }
}
