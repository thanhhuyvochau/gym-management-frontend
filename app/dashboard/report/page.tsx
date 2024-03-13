'use client';
import React, { useEffect, useState } from 'react';
import { MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import { Box, Button, Card, CardContent, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { AccountResponse } from '@/app/_models/AccountResponse';
import { Add, DeleteOutline, PlusOneRounded } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { MemberResponse } from '@/app/_models/MemberResponse';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import MemberCard from '@/components/MemberCardComponent/MemberCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { memberService } from '@/app/_services';
import { ConfirmDeletePopup } from '@/components';
import { DatePicker } from '@mui/x-date-pickers';
import { reportServices } from '@/app/_services/report';
import { Report } from '@/app/_services/report/types';
import { format } from 'date-fns';
const MUIDataTable = dynamic(() => import('mui-datatables'), {
  ssr: false,
});

export default function ReportPage() {
  const { data } = useQuery({
    queryKey: ['members'],
    queryFn: () => memberService.getMembers({ page: 0, size: 1, sort: ['id'], q: 'string' }),
  });

  const curDate = new Date();
  const initFromDate = new Date();
  initFromDate.setMonth(initFromDate.getMonth() - 1);

  const [fromDate, setFromDate] = useState(initFromDate);
  const [toDate, setToDate] = useState(curDate);

  const { data: reports, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportServices.getReports({ fromDate, toDate }),
  });

  const columns: MUIDataTableColumn[] = [
    { label: 'Name', name: 'memberName' },
    { label: 'Plan Type', name: 'planName' },
    {
      label: 'Amount',
      name: 'amount',
      options: {
        customBodyRender(value) {
          return `${Number(value).toLocaleString('vi')} VND`;
        },
      },
    },
    {
      label: 'Gender',
      name: 'gender',
      options: {
        customBodyRender(value) {
          return value.name;
        },
      },
    },
    {
      label: 'Paid Date',
      name: 'paidDate',
      options: {
        customBodyRender(value) {
          return format(new Date(value), 'MM-dd-yyyy');
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    tableBodyMaxHeight: '100',
    print: false,
    download: false,
    responsive: 'standard',
    selectableRowsHeader: false,
    customToolbarSelect() {
      return <></>;
    },
  };

  const totalAmount = reports?.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);

  useEffect(() => {
    refetch();
  }, [fromDate, toDate]);

  return (
    <Box className='children-box' component={'div'} height={'100%'} mt={4}>
      <Typography variant='h3' py={2} color={'var(--primary)'} fontWeight={700}>
        Sales Report
      </Typography>

      <Card sx={{ my: 4, p: 4, bgcolor: 'white' }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={4}>
            <DatePicker
              label='From date'
              sx={{ borderRadius: 8, width: '100%' }}
              defaultValue={fromDate}
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
          <Grid item xs={12} md={4}>
            <Box display='flex' alignItems='center' gap={2} height='100%'>
              <Typography variant='body1' fontWeight={600}>
                Total
              </Typography>
              <Chip label={`${totalAmount?.toLocaleString('vi')} VND`} color='primary' />
            </Box>
          </Grid>
        </Grid>
      </Card>
      {reports && <MUIDataTable title='Gym Owner Management' data={reports} columns={columns} options={options} />}
    </Box>
  );
}
