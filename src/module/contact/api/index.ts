export const ContactApiRoutes = {
  searchDuitNow: 'searchDuitNow',
} as const;

const MOCK_DUITNOW_DIRECTORY: Record<string, Contact.DuitNowResult> = {
  '0123456789': {
    id: 'dn-0123456789',
    name: 'Ahmad Bin Razak',
    phoneNumber: '0123456789',
    bank: 'Maybank',
    accountType: 'personal',
  },
  '0198765432': {
    id: 'dn-0198765432',
    name: 'Siti Nur Aisyah',
    phoneNumber: '0198765432',
    bank: 'CIMB Bank',
    accountType: 'personal',
  },
  '0111234567': {
    id: 'dn-0111234567',
    name: 'Tech Solutions Sdn Bhd',
    phoneNumber: '0111234567',
    bank: 'Public Bank',
    accountType: 'business',
  },
};

export async function searchDuitNow(
  phoneNumber: string,
): Promise<Contact.DuitNowResult> {
  await new Promise<void>(resolve => setTimeout(resolve, 1200));

  const normalised = phoneNumber.replace(/\D/g, '');

  const result = MOCK_DUITNOW_DIRECTORY[normalised];
  if (!result) {
    throw new Error('No DuitNow recipient found for this number.');
  }

  return result;
}
