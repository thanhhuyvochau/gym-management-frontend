'use client';

import { memberService, planService } from '@/app/_services';
import { CreateMemberPayload } from '@/app/_services/member/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  gender: yup.string().required('Gender is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  birthday: yup.date().required('Birthday is required'),
  image: yup.mixed(),
  price: yup.number().required('Price is required'),
  plan: yup.number().required('Plan is required'),
});

const genderSelect = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
];

const RegisterMember = () => {
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

  const { mutate: mutateCreate } = useMutation({
    mutationFn: (payload: CreateMemberPayload) => memberService.create(payload),
    onSuccess: () => {
      toast.success('Create member successfully!');
      reset();

      queryClient.invalidateQueries({
        queryKey: ['members'],
      });
    },
    onError: () => {
      toast.error('Create member Error!');
    },
  });

  const onSubmitHandler = (data: any) => {
    mutateCreate(data);
  };

  useEffect(() => {
    if (watch('plan')) {
      const plan = plans?.find((item) => item.id === getValues('plan'));
      if (plan) {
        setValue('price', plan.price);
      }
    }
  }, [watch('plan')]);

  return (
    <>
      <Box mt={6} component={'form'} onSubmit={handleSubmit(onSubmitHandler)} width={'100%'}>
        <Typography color={'#1A1363'} variant='h3' my={2} fontWeight={600}>
          Registration
        </Typography>
        <Paper sx={{ borderRadius: 4, p: 4 }} elevation={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label='Name of Participant' {...register('fullName')} />
              {errors.fullName && (
                <Typography variant='caption' color='red'>
                  {errors.fullName.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label='Phone' {...register('phoneNumber')} />
              {errors.phoneNumber && (
                <Typography variant='caption' color='red'>
                  {errors.phoneNumber.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label='Birthday'
                sx={{ borderRadius: 8, width: '100%' }}
                onChange={(value: Date | null) => value && setValue('birthday', new Date(value))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              {errors.birthday && (
                <Typography variant='caption' color='red'>
                  {errors.birthday.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label='Gender'
                    fullWidth
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                  >
                    {genderSelect.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              {errors.gender && (
                <Typography variant='caption' color='red'>
                  {errors.gender.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} md={3}>
              {plans && (
                <Controller
                  name='plan'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label='Select Plan'
                      fullWidth
                      error={!!errors.plan}
                      helperText={errors.plan?.message}
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
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                placeholder='Price'
                {...register('price')}
                defaultValue={watch('price')}
                type='number'
                error={!!errors.price}
                helperText={errors.price?.message}
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
              Avail Membership
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default RegisterMember;
