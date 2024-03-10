import { UpdatePasswordPayload, UpdateUserPayload } from './types';

import api from '@/app/_ultils/api';

export const userService = {
  updateProfile: async (data: UpdateUserPayload) => {
    const formData = new FormData();

    // Append each field from data to the formData object
    Object.keys(data).forEach((key) => {
      formData.append(key, (data as any)[key]);
    });

    await api.put('accounts/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updatePassword: async (data: UpdatePasswordPayload) => {
    await api.put('accounts/password', data);
  },
};
