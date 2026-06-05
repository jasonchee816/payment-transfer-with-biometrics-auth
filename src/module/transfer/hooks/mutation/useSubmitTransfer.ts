import { useMutation } from '@tanstack/react-query';
import { submitTransfer } from '../../src/api';
import { TransferQueryKeys } from '../../constants';

export function useSubmitTransfer() {
  return useMutation({
    mutationKey: TransferQueryKeys.submitTransfer,
    mutationFn: submitTransfer,
  });
}
