export const ContactApiRoutes = {
  checkAppUser: 'checkAppUser',
  searchUsers: 'searchUsers',
  getUserInfoViaUserId: 'getUserInfoViaUserId',
} as const;

const MOCK_APP_USERS: Contact.AppUser[] = [
  { userId: 'usr-001', displayName: 'Alice Johnson',   phoneNumber: '0112340001' },
  { userId: 'usr-002', displayName: 'Bob Smith',       phoneNumber: '0112340002' },
  { userId: 'usr-003', displayName: 'Carol White',     phoneNumber: '0112340003' },
  { userId: 'usr-004', displayName: 'David Lee',       phoneNumber: '0112340004' },
  { userId: 'usr-005', displayName: 'Emma Davis',      phoneNumber: '0112340005' },
  { userId: 'usr-006', displayName: 'Frank Miller',    phoneNumber: '0112340006' },
  { userId: 'usr-007', displayName: 'Grace Wilson',    phoneNumber: '0112340007' },
  { userId: 'usr-008', displayName: 'Henry Brown',     phoneNumber: '0112340008' },
  { userId: 'usr-009', displayName: 'Iris Chen',       phoneNumber: '0112340009' },
  { userId: 'usr-010', displayName: 'Jack Taylor',     phoneNumber: '0112340010' },
  { userId: 'usr-011', displayName: 'Karen Martinez',  phoneNumber: '0112340011' },
  { userId: 'usr-012', displayName: 'Liam Wong',       phoneNumber: '0112340012' },
  { userId: 'usr-013', displayName: 'Mia Thompson',    phoneNumber: '0112340013' },
  { userId: 'usr-014', displayName: 'Noah Garcia',     phoneNumber: '0112340014' },
  { userId: 'usr-015', displayName: 'Olivia Park',     phoneNumber: '0112340015' },
  { userId: 'usr-016', displayName: 'Peter Wilson',    phoneNumber: '0112340016' },
  { userId: 'usr-017', displayName: 'Rachel Torres',   phoneNumber: '0112340017' },
  { userId: 'usr-018', displayName: 'Samuel Harris',   phoneNumber: '0112340018' },
  { userId: 'usr-019', displayName: 'Tara Lee',        phoneNumber: '0112340019' },
  { userId: 'usr-020', displayName: 'Uma Patel',       phoneNumber: '0112340020' },
  { userId: 'usr-021', displayName: 'Ahmad Bin Razak', phoneNumber: '0123456789' },
  { userId: 'usr-022', displayName: 'Siti Nur Aisyah', phoneNumber: '0198765432' },
  { userId: 'usr-023', displayName: 'Tech Solutions Sdn Bhd', phoneNumber: '0111234567' },
  { userId: 'usr-024', displayName: 'Hafiz Rahman', phoneNumber: '0167894321' },
];

export async function getUserInfoViaUserId(userId: string): Promise<Contact.AppUser> {
  await new Promise<void>(resolve => setTimeout(resolve, 300));

  const user = MOCK_APP_USERS.find(u => u.userId === userId);
  if (!user) {
    throw new Error(`No user found for ID: ${userId}`);
  }

  return user;
}

export async function checkAppUser(phoneNumber: string): Promise<Contact.AppUser> {
  await new Promise<void>(resolve => setTimeout(resolve, 600));

  const normalised = phoneNumber.replace(/\D/g, '');
  const user = MOCK_APP_USERS.find(u => u.phoneNumber === normalised);

  if (!user) {
    throw new Error('This contact is not a registered app user.');
  }

  return user;
}

export async function searchUsers(phoneNumber: string): Promise<Contact.AppUser> {
  await new Promise<void>(resolve => setTimeout(resolve, 800));

  const normalised = phoneNumber.replace(/\D/g, '');
  const user = MOCK_APP_USERS.find(u => u.phoneNumber === normalised);

  if (!user) {
    throw new Error('No app user found for this number.');
  }

  return user;
}
