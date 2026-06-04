declare namespace Main {
  type RootStackParamList = {
    Home: undefined;
    TransactionHistory: undefined;
    TransactionHistoryDetail: {
      id: string;
      name: string;
      date: string;
      amount: string;
      type: 'sent' | 'received';
    };
    Transfer: undefined;
  };

  type TransferStackParamList = {
    ContactList: undefined;
    TransferForm: {
      recipientId: string;
      recipientName: string;
    };
    PinCode: {
      transactionId: string;
      recipientName: string;
      amount: string;
    };
    TransferSuccess: {
      transactionId: string;
      recipientName: string;
      amount: string;
    };
  };
}
