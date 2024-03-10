import api from '@/app/_ultils/api';
import { ChargeMemberPayload, CreateMemberPayload, GetMembersQuery, GetMembersResponse } from './types';

export const memberService = {
  create: async (payload: CreateMemberPayload) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      formData.append(key, (data as any)[key]);
    });

    const { data } = await api.post('members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getMembers: async (query: GetMembersQuery) => {
    const { data } = await api.get('members', { params: query });

    return data.data as GetMembersResponse;
  },
  update: async ({ id, payload }: { id: number; payload: CreateMemberPayload }) => {
    const { data } = await api.put(`members/${id}`, payload);
  },
  charge: async ({ id, payload }: { id: number; payload: ChargeMemberPayload }) => {
    return api.put(`/members/${id}/plan`, payload);
  },
  delete: async (id: number) => {
    const { data } = await api.delete(`members/${id}`);
  },
};
