export type TransferRequest = {
  recipientId: string;
  recipientName: string;
  recipientPhone?: string;
  amount: number;
  note?: string;
  simulateFailure?: boolean;
};

export type TransferResponse = {
  transactionId: string;
  status: 'success' | 'failed';
  timestamp: string;
};
