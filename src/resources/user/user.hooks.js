import { useQuery } from 'react-query';

import * as api from './user.api';

export function useCurrentUser() {
  return useQuery(['currentUser'], api.getCurrent);
}
