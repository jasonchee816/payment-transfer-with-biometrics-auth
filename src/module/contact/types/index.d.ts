declare namespace Contact {
  interface DuitNowResult {
    id: string;
    name: string;
    phoneNumber: string;
    bank: string;
    accountType: 'personal' | 'business';
  };
}

