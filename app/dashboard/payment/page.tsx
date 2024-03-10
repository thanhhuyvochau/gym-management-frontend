'use client';

import { memberService, planService } from '@/app/_services';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Button, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers';

const schema = yup.object().shape({
  actualPrice: yup.number().required('Price is required'),
  gymPlanId: yup.number().required('Plan is required'),
  memberId: yup.number().required('Member is required'),
  fromDate: yup.date().required('From Date is required'),
});

export default function PaymentPages() {
  const {
    register,
    control,
    setValue,
    reset,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const { data: plans } = useQuery({ queryKey: ['plans'], queryFn: () => planService.getPlans() });
  const [searchText, setSearchText] = useState<string>();

  const { data: members, refetch } = useQuery({
    queryKey: ['search-members'],
    queryFn: () => memberService.getMembers({ q: searchText }),
  });

  const debouncedSearch = debounce((text: string) => setSearchText(text), 300);

  const { mutate: mutateCharge } = useMutation({
    mutationFn: memberService.charge,
    onSuccess: () => {
      toast.success('Charge fee member successfully!');
      reset();
      queryClient.invalidateQueries({
        queryKey: ['members'],
      });
    },
    onError: () => {
      toast.error('Charge fee for member Error!');
    },
  });

  const onSubmitHandler = (payload: any) => {
    const { memberId, ...rest } = payload;
    mutateCharge({ id: memberId, payload: rest });
  };

  useEffect(() => {
    if (watch('gymPlanId')) {
      const plan = plans?.find((item) => item.id === getValues('gymPlanId'));
      if (plan) {
        setValue('actualPrice', plan.price);
      }
    }
  }, [watch('gymPlanId')]);

  const dataAutoComplete = members?.items.map((item) => ({ label: item.fullName, id: item.id })) || [];

  useEffect(() => {
    if (searchText) {
      refetch();
    }
  }, [searchText]);

  return (
    <>
      <Box mt={6} component={'form'} onSubmit={handleSubmit(onSubmitHandler)} width={'100%'}>
        <Typography color={'#1A1363'} variant='h3' my={2} fontWeight={600}>
          Add Payment
        </Typography>
        <Paper sx={{ borderRadius: 4, p: 4 }} elevation={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={dataAutoComplete}
                fullWidth
                onChange={(_, value) => value && setValue('memberId', value.id)}
                renderInput={(params) => (
                  <TextField {...params} label='Member' onChange={(e) => debouncedSearch(e.target.value)} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label='From Date'
                sx={{ borderRadius: 8, width: '100%' }}
                onChange={(value: Date | null) => value && setValue('fromDate', new Date(value))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              {errors.fromDate && (
                <Typography variant='caption' color='red'>
                  {errors.fromDate.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              {plans && (
                <Controller
                  name='gymPlanId'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label='Select Plan'
                      fullWidth
                      error={!!errors.gymPlanId}
                      helperText={errors.gymPlanId?.message}
                    >
                      {plans.map((plan) => (
                        <MenuItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder='Price'
                {...register('actualPrice')}
                defaultValue={watch('actualPrice')}
                type='number'
                error={!!errors.actualPrice}
                helperText={errors.actualPrice?.message}
              />
            </Grid>
          </Grid>
          <Stack spacing={3} direction={'row'} justifyContent={'end'} mt={4}>
            <Button
              style={{
                background: '#1A1363',
                color: 'white',
                fontWeight: '600',
                padding: '0.25rem 1rem',
                minWidth: '100px',
                borderRadius: '12',
              }}
              type='submit'
            >
              Save
            </Button>
            <Button
              variant='text'
              onClick={() => reset()}
              sx={{
                color: '#1A1363',
                fontWeight: '600',
                padding: '0.25rem 1rem',
                minWidth: '100px',
                borderRadius: '12',
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
