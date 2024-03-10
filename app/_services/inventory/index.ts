import api from '@/app/_ultils/api';
import { CreateInventoryPayload, InventoryResponse } from './types';

export const inventoryService = {
  getInventories: async () => {
    const { data } = await api.get('api/equipments');

    return data.data as InventoryResponse;
  },
  create: async (payload: CreateInventoryPayload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, (payload as any)[key]);
    });

    await api.post('api/equipments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  update: async ({ id, payload }: { id: number; payload: CreateInventoryPayload }) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, (payload as any)[key]);
    });

    const { data } = await api.put(`api/equipments/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },
  delete: async (id: number) => {
    const { data } = await api.delete(`api/equipments/${id}`);

    return data;
  },
};
