import { useMutation } from '@tanstack/react-query';
import { checkAppUser } from '../../api';

export function useCheckAppUser() {
  return useMutation({
    mutationFn: checkAppUser,
  });
}
