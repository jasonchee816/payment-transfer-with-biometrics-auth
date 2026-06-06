import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTransfer } from '../../src/api';
import { TransferQueryKeys } from '../../constants';
import { AccountQueryKeys } from '../../../account/constants';
import { TransactionHistoryQueryKeys } from '../../../transactionHistory/constants';
import { recordRecentTransfer } from '../../../contact/storage/recentTransferStorage';
import type { TransferRequest } from '../../types';

export function useSubmitTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TransferQueryKeys.submitTransfer,
    mutationFn: submitTransfer,
    onSuccess: (_data, variables: TransferRequest) => {
      recordRecentTransfer({
        userId: variables.recipientId,
        displayName: variables.recipientName,
        phoneNumber: variables.recipientPhone ?? '',
      });
      queryClient.invalidateQueries({ queryKey: AccountQueryKeys.balance });
      queryClient.invalidateQueries({ queryKey: TransactionHistoryQueryKeys.transactions });
    },
  });
}
