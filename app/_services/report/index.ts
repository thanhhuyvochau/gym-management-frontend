import api from '@/app/_ultils/api';
import { Report } from './types';

export const reportServices = {
  getReports: async ({ fromDate, toDate }: { fromDate: Date; toDate: Date }) => {
    const { data } = await api.get('reports', { baseURL: 'http://localhost:8083', params: { fromDate, toDate } });

    return data.data as Report[];
  },
};
