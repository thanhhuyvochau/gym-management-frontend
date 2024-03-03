import api from '@/app/_ultils/api';
import { CreateInventoryPayload, InventoryResponse } from './types';

export const inventoryService = {
  getInventories: async () => {
    const { data } = await api.get('equipments');

    return data.data as InventoryResponse;
  },
  create: async (payload: CreateInventoryPayload) => {
    const { data } = await api.post('equipments', payload);

    return data;
  },

  update: async ({ id, payload }: { id: number; payload: CreateInventoryPayload }) => {
    const { data } = await api.put(`equipments/${id}`, payload);

    return data;
  },
  delete: async (id: number) => {
    const { data } = await api.delete(`equipments/${id}`);

    return data;
  },
};
