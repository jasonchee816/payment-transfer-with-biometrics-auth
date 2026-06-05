declare namespace Main {
  type RootStackParamList = {
    Home: undefined;
    TransactionHistory: undefined;
    Transfer: undefined;
  };

  type TransactionHistoryStackParamList = {
    'TransactionHistory/TransactionHistoryList': undefined;
    'TransactionHistory/TransactionHistoryDetail': {
      id: string;
      name: string;
      date: string;
      amount: string;
      type: 'sent' | 'received';
    };
  };

  type TransferStackParamList = {
    'Transfer/ContactList': undefined;
    'Transfer/TransferForm': {
      recipientId: string;
      recipientName: string;
    };
    'Transfer/PinCode': {
      recipientName: string;
      amount: string;
    };
    'Transfer/TransferSuccess': {
      transactionId: string;
      recipientName: string;
      amount: string;
    };
  };
}
