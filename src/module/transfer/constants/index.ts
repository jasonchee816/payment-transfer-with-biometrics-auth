import { SUBMIT_TRANSFER } from '../src/api';

export const TransferRoutes = {
  ContactList: 'Transfer/ContactList',
  TransferForm: 'Transfer/TransferForm',
  PinCode: 'Transfer/PinCode',
  TransferSuccess: 'Transfer/TransferSuccess',
} as const;

const TRANSFER_BASE_KEY = 'Transfer';

// TODO: Include userId as part of each key (e.g. [TRANSFER_BASE_KEY, userId, SUBMIT_TRANSFER])
// to prevent cached data from leaking across different authenticated users.
export const TransferQueryKeys = {
  submitTransfer: [TRANSFER_BASE_KEY, SUBMIT_TRANSFER],
} as const;
