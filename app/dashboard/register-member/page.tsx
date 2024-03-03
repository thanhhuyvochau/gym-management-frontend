'use client';

import { memberService } from '@/app/_services';
import { CreateMemberPayload } from '@/app/_services/member/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  gender: yup.string().required('Gender is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  birthday: yup.date().required('Birthday is required'),
  age: yup.number().required('Age is required'),
  image: yup.mixed(),
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
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: genderSelect[0].value,
    },
  });

  const queryClient = useQueryClient();

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

  return (
    <>
      <Box className='mt-6' component={'form'} onSubmit={handleSubmit(onSubmitHandler)} width={'100%'}>
        <Typography color={'#1A1363'} variant='h3' my={2} fontWeight={600}>
          Registration
        </Typography>
        <Paper sx={{ borderRadius: 4, p: 4 }} elevation={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder='Name of Participant' {...register('fullName')} />
              {errors.fullName && (
                <Typography variant='caption' color='red'>
                  {errors.fullName.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder='Phone' {...register('phoneNumber')} />
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
                onChange={(value) => value && setValue('birthday', new Date(value))}
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
                  <Select {...field} fullWidth label='Gender' defaultValue={genderSelect[0].value}>
                    {genderSelect.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.gender && (
                <Typography variant='caption' color='red'>
                  {errors.gender.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder='' {...register('image')} type='file' />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder='Age' type='number' {...register('age')} />
              {errors.age && (
                <Typography variant='caption' color='red'>
                  {errors.age.message}
                </Typography>
              )}
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
