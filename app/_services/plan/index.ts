import api from '@/app/_ultils/api';
import { CreateGymPlanPayload, Plan } from './types';

export const planService = {
  getPlans: async () => {
    const { data } = await api.get('gym-plans');

    return data.data as Plan[];
  },
  updatePlans: async ({ id, payload }: { id: number; payload: Omit<Plan, 'id'> }) => {
    const { data } = await api.put(`gym-plans/${id}`, payload);

    return data.data as Plan;
  },
  create: async (payload: CreateGymPlanPayload) => {
    const { data } = await api.post(`gym-plans`, payload);

    return data.data as Plan;
  },
  deletePlan: async (id: number) => {
    await api.delete(`gym-plans/${id}`);
  },
};
