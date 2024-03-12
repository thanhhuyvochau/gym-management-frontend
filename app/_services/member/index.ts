import api from '@/app/_ultils/api';
import { ChargeMemberPayload, CreateMemberPayload, GetMembersQuery, GetMembersResponse } from './types';

export const memberService = {
  create: async (payload: CreateMemberPayload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, (payload as any)[key]);
    });

    await api.post('api/members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getMembers: async (query: GetMembersQuery) => {
    const { data } = await api.get('api/members', { params: query });

    return data.data as GetMembersResponse;
  },
  update: async ({ id, payload }: { id: number; payload: CreateMemberPayload }) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, (payload as any)[key]);
    });

    await api.put(`api/members/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  charge: async ({ id, payload }: { id: number; payload: ChargeMemberPayload }) => {
    return api.put(`api/members/${id}/plan`, payload);
  },
  delete: async (id: number) => {
    const { data } = await api.delete(`api/members/${id}`);
  },
  processImage: async (payload: FormData) => {
    const { data } = await api.post(`api/members/process-face`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  },
};
