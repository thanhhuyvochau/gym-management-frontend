import api from '@/app/_ultils/api';

import { Statistic, StatisticRegister } from './types';

export const statisticService = {
  getStatistic: async ({ fromDate, toDate }: { fromDate: Date; toDate: Date }) => {
    const { data } = await api.get(`statistics/revenues`, {
      params: { fromDate, toDate },
    });

    return data.data as Statistic[];
  },
  getRegisters: async ({ fromDate, toDate }: { fromDate: Date; toDate: Date }) => {
    const { data } = await api.get('statistics/registers', {
      params: { fromDate, toDate },
    });

    return data.data as StatisticRegister[];
  },
};
