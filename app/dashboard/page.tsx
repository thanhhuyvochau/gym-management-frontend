'use client';

import { Avatar, Box, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../_hooks';
import Image from 'next/image';
import { Stack } from '@mui/system';

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { planService, statisticService } from '../_services';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';
import { ChartData } from 'chart.js';

const Dashboard = () => {
  const { profile } = useAuth();

  const curDate = new Date();
  const initFromDate = new Date();
  initFromDate.setMonth(initFromDate.getMonth() - 1);

  const [fromDate, setFromDate] = useState(initFromDate);
  const [toDate, setToDate] = useState(curDate);

  const { data: statistics, refetch } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => statisticService.getStatistic({ fromDate, toDate }),
  });

  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => planService.getPlans(),
  });

  const dataLine: ChartData<'line'> = {
    labels: statistics?.map((item) => format(item.date, 'dd-MM-yy')) || [],
    datasets: [
      {
        label: 'Revenue',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: statistics?.map((item) => item.revenue) || [],
      },
    ],
  };

  const dataDougnut = {
    labels: plans?.map((plan) => plan.name),
    datasets: [
      {
        data: plans?.map((plan) => plan.numberOfRegister),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  useEffect(() => {
    if (fromDate && toDate) {
      refetch();
    }
  }, [fromDate, toDate]);

  return (
    profile && (
      <Box className='children-box' component={'div'} height={'100%'} my={3}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ p: 4, borderRadius: 2 }}>
              <Box display='flex' gap={4} alignItems='center'>
                <Stack gap={2}>
                  <Box display='flex' gap={2}>
                    <Typography variant='h3' fontWeight={400}>
                      Welcome to Stamina Fitness
                    </Typography>
                    <Typography variant='h3' fontWeight={600} sx={{ color: 'var(--primary)' }}>
                      {profile?.fullName}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color={'gray'}>
                    Welcome to Stamina Fitness Gym Management! Your path to strength starts here. With top-notch
                    facilities and expert guidance, we&apos;re committed to helping you reach your fitness goals. Join
                    us and unleash your potential today!
                  </Typography>
                </Stack>
                {profile.imageProfile && (
                  <Avatar sx={{ width: 150, height: 150 }}>
                    <Image
                      src={profile.imageProfile}
                      alt={profile.fullName}
                      width={0}
                      height={0}
                      sizes='100vw'
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Avatar>
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ p: 4, borderRadius: 2 }}>
              <Stack gap={2}>
                <Grid container spacing={4}>
                  <Grid item xs={6} md={4}>
                    <DatePicker
                      label='From date'
                      sx={{ borderRadius: 8, width: '100%' }}
                      defaultValue={fromDate}
                      maxDate={toDate}
                      onChange={(value: Date | null) => value && setFromDate(value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <DatePicker
                      label='To date'
                      sx={{ borderRadius: 8, width: '100%' }}
                      defaultValue={toDate}
                      maxDate={curDate}
                      onChange={(value: Date | null) => value && setToDate(value)}
                    />
                  </Grid>
                </Grid>
                {/* <Bar data={data} /> */}
                <Line data={dataLine} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ p: 4, borderRadius: 2 }}>
              <Doughnut data={dataDougnut} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default Dashboard;
