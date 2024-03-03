import { UpdatePasswordPayload, UpdateUserPayload } from './types';

import api from '@/app/_ultils/api';

export const userService = {
  updateProfile: async (data: UpdateUserPayload) => {
    await api.put('accounts/profile', data);
  },
  updatePassword: async (data: UpdatePasswordPayload) => {
    await api.put('accounts/password', data);
  },
};
