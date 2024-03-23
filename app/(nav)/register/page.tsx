'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import classes from './Register.module.css'; // Assuming this is your custom styling
import { useMutation } from '@tanstack/react-query';
import authService from '@/app/_services/authService';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email must be valid and contain "@" (e.g., user@example.com)')
      .required('Email is required'),
    password: yup
      .string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,
        'Password must be 8-20 characters long, with at least one digit, one uppercase and one lowercase letter, one special character, and no whitespace',
      )
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    rePassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required('Confirmation of the password is required'),
    terms: yup.bool().oneOf([true], 'You must accept the terms and conditions').required(),
  })
  .required();

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Registration successfully!');
      router.push('/login');
    },
    onError: (error: AxiosError<{ error_message: string }>) => {
      error.response && toast.error(error.response?.data.error_message || 'Registration failed');
    },
  });

  const onSubmit = (data: any) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <Box>
      <Grid className={classes.fullHeightContainer} container>
        <Grid
          direction='row'
          justifyContent='center'
          alignItems='center'
          className={classes.fullHeightGridItem}
          container
          item
          xs={12}
          sm={6}
        >
          <Box
            width='65%'
            maxWidth='25rem'
            height='100%'
            mt={4}
            minWidth={{ xs: '100%', sm: '25rem' }}
            component='form'
            autoComplete='true'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack justifyContent='center' alignItems='start' spacing={2}>
              <Typography style={{ color: ' var( --main-font-color)' }} variant='h3' fontWeight={700}>
                Sign Up
              </Typography>

              <Grid container direction='column'>
                <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='emailInput'>
                  <Typography fontWeight='600' variant='h5'>
                    Email
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                  {...register('email')}
                />
                {errors.email && (
                  <Typography color='error' variant='body2'>
                    {errors.email.message}
                  </Typography>
                )}
              </Grid>
              <Grid container direction='column'>
                <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='passwordInput'>
                  <Typography fontWeight='600' variant='h5'>
                    Create Password
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                  {...register('password')}
                  type='password'
                />
                {errors.password && (
                  <Typography color='error' variant='body2'>
                    {errors.password.message}
                  </Typography>
                )}
              </Grid>

              <Grid container direction='column'>
                <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='passwordInput'>
                  <Typography fontWeight='600' variant='h5'>
                    Confirm Password
                  </Typography>
                </InputLabel>
                <TextField
                  {...register('rePassword', {
                    validate: (value) => value === watch('password') || 'Passwords do not match',
                  })}
                  className={classes.inputField}
                  style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                  type='password'
                />
                {errors.rePassword && (
                  <Typography color='error' variant='body2'>
                    {errors.rePassword.message}
                  </Typography>
                )}
              </Grid>

              <Grid justifyContent='space-between' direction='row' container item xs={12}>
                <FormControlLabel
                  style={{ color: 'var(--main-font-color)' }}
                  control={<Checkbox {...register('terms')} />}
                  label='Accept all the Terms and Conditions'
                />
                {errors.terms && (
                  <Typography color='error' variant='body2'>
                    {errors.terms.message}
                  </Typography>
                )}
              </Grid>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ background: 'var( --main-font-color)', color: 'white', borderRadius: 8 }}
              >
                <Typography variant='body1'>Register</Typography>
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid container direction='row' justifyContent='center' item xs={6} style={{ maxHeight: '100%' }}>
          <Box
            component='img'
            src='./images/main-logo.png'
            style={{
              maxWidth: '100%',
              maxHeight: '80%',
              objectFit: 'scale-down',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
