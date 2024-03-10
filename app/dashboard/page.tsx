'use client';

import { Avatar, Box, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useAuth } from '../_hooks';
import Image from 'next/image';
import { Stack } from '@mui/system';

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import { planService, statisticService } from '../_services';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

const sampleData = [
  { date: '2024-01-01', revenue: 100 },
  { date: '2024-01-02', revenue: 120 },
  { date: '2024-01-03', revenue: 90 },
  { date: '2024-01-04', revenue: 150 },
  { date: '2024-01-05', revenue: 110 },
  { date: '2024-01-06', revenue: 130 },
  { date: '2024-01-07', revenue: 140 },
  { date: '2024-01-08', revenue: 160 },
  { date: '2024-01-09', revenue: 180 },
  { date: '2024-01-10', revenue: 200 },
  // Add more data for January...
  { date: '2024-02-01', revenue: 220 },
  { date: '2024-02-02', revenue: 240 },
  { date: '2024-02-03', revenue: 260 },
  { date: '2024-02-04', revenue: 280 },
  { date: '2024-02-05', revenue: 300 },
  // Add more data for February...
  { date: '2024-03-01', revenue: 320 },
  { date: '2024-03-02', revenue: 340 },
  { date: '2024-03-03', revenue: 360 },
  // Add more data for March...
  // Continue adding data for other months...
];

const Dashboard = () => {
  const { profile } = useAuth();

  const curDate = new Date();
  const initFromDate = new Date();
  initFromDate.setMonth(initFromDate.getMonth() - 1);

  const [fromDate, setFromDate] = useState(initFromDate);
  const [toDate, setToDate] = useState(curDate);

  const { data: statistics } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => statisticService.getStatistic({ fromDate, toDate }),
  });

  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: () => planService.getPlans(),
  });

  const data = {
    labels: sampleData?.map((item) => format(item.date, 'dd-MM-yy')),
    datasets: [
      {
        label: 'My Dataset',
        backgroundColor: 'rgba(75,192,192,1)',
        // borderColor: 'rgba(0,0,0,1)',
        // borderWidth: 2,
        data: sampleData?.map((item) => item.revenue),
      },
    ],
  };

  const dataLine = {
    labels: sampleData?.map((item) => format(item.date, 'dd-MM-yy')),
    datasets: [
      {
        label: 'Revenue',
        fill: false,
        lineTension: 0.1,
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
        data: sampleData?.map((item) => item.revenue),
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
                    facilities and expert guidance, we're committed to helping you reach your fitness goals. Join us and
                    unleash your potential today!
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
                      onChange={(value: Date | null) => value && setFromDate(value)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <DatePicker
                      label='To date'
                      sx={{ borderRadius: 8, width: '100%' }}
                      defaultValue={toDate}
                      maxDate={curDate}
                      onChange={(value: Date | null) => value && setToDate(value)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                </Grid>
                {/* <Bar data={data} /> */}
                <Line data={data} />
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
