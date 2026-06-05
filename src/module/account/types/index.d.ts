declare namespace Account {
  interface Balance {
    available: number;
  }

  declare namespace Api {
    interface FetchBalanceResponse {
      balance: Balance;
    }
  }
}
