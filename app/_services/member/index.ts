import api from '@/app/_ultils/api';
import { CreateMemberPayload, GetMembersQuery, GetMembersResponse } from './types';

export const memberService = {
  create: async (payload: CreateMemberPayload) => {
    const { data } = await api.post('members', payload);
  },
  getMembers: async (query: GetMembersQuery) => {
    const { data } = await api.get('members', { params: query });

    return data.data as GetMembersResponse;
  },
  update: async ({ id, payload }: { id: number; payload: CreateMemberPayload }) => {
    const { data } = await api.put(`members/${id}`, payload);
  },
  delete: async (id: number) => {
    const { data } = await api.delete(`members/${id}`);
  },
};
