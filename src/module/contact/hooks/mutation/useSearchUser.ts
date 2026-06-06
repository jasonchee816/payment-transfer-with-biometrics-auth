import { useMutation } from '@tanstack/react-query';
import { searchUsers } from '../../api';

export function useSearchUser() {
  return useMutation({
    mutationFn: searchUsers,
  });
}
