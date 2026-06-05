export const AccountApiRoutes = {
  fetchBalance: 'fetchBalance',
} as const;

const SIMULATED_DELAY_MS = 600;
const MOCK_AVAILABLE_BALANCE = 2450.0;

export function fetchBalance(): Promise<Account.Api.FetchBalanceResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        balance: {
          available: MOCK_AVAILABLE_BALANCE,
        },
      });
    }, SIMULATED_DELAY_MS);
  });
}
