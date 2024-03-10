import api from '@/app/_ultils/api';
import { Statistic } from './types';
import axios from 'axios';

export const statisticService = {
  getStatistic: async ({ fromDate, toDate }: { fromDate: Date; toDate: Date }) => {
    const { data } = await axios.get('http://127.0.0.1:8083/statistics/revenues', { params: { fromDate, toDate } });

    return data.data as Statistic[];
  },
};
