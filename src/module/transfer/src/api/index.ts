import type { TransferRequest, TransferResponse } from '../../types';

const SIMULATED_DELAY_MS = 1500;

export function submitTransfer(request: TransferRequest): Promise<TransferResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (request.simulateFailure) {
        reject(new Error('Transfer failed. Please try again.'));
        return;
      }

      resolve({
        transactionId: `TXN-${Date.now()}`,
        status: 'success',
        timestamp: new Date().toISOString(),
      });
    }, SIMULATED_DELAY_MS);
  });
}
