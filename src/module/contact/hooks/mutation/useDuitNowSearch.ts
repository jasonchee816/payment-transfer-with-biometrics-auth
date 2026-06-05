import { useMutation } from '@tanstack/react-query';
import { searchDuitNow } from '../../api';
import { ContactQueryKeys } from '../../constants';

export function useDuitNowSearch() {
  return useMutation({
    mutationKey: ContactQueryKeys.duitNowSearch,
    mutationFn: searchDuitNow,
  });
}
