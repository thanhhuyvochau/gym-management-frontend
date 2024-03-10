'use client';
import {
  Box,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import classes from './Login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_hooks';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: localStorage.getItem('email') || '',
      password: localStorage.getItem('password') || '',
    },
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { profile, login, isLoginError } = useAuth();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
      localStorage.setItem('email', storedEmail);
      localStorage.setItem('password', storedPassword);
      setRememberMe(true);
    }
  }, []);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    login(data);
    if (rememberMe) {
      localStorage.setItem('email', data.email);
      localStorage.setItem('password', data.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (profile) {
      router.push('/home');
    }
  }, [profile]);

  return (
    <Grid height='100%' container my={4}>
      <Grid direction='row' justifyContent='center' alignItems='center' height='100%' container item xs={12} lg={6}>
        <Box
          width='65%'
          maxWidth='25rem'
          height='100%'
          minWidth={{ xs: '100%', sm: '25rem' }}
          component='form'
          autoComplete='true'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack justifyContent='left' alignItems='start' spacing={4}>
            <Typography
              style={{ color: 'var( --main-font-color)' }}
              variant='h2'
              textAlign={{ xs: 'center', lg: 'left' }}
              width='100%'
              fontWeight='bold'
            >
              Sign In
            </Typography>

            <Grid container direction='column'>
              <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='emailInput'>
                <Typography fontWeight='600' variant='h5'>
                  Email
                </Typography>
              </InputLabel>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.inputField}
                    id='emailInput'
                    style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                    required
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid container direction='column'>
              <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='passwordInput'>
                <Typography fontWeight='600' variant='h5'>
                  Password
                </Typography>
              </InputLabel>
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='password'
                    className={classes.inputField}
                    style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                    required
                    id='passwordInput'
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid justifyContent='space-between' direction='row' container item xs={12}>
              <FormControlLabel
                style={{ color: 'var(--main-font-color)' }}
                control={<Checkbox checked={rememberMe} onClick={() => setRememberMe((prev) => !prev)} />}
                label='Remember me'
              />
              <Link style={{ color: 'var(--main-font-color)', margin: 'auto 0' }} href='/forgot-password'>
                Forgot Password?
              </Link>
            </Grid>
            <Fab
              style={{
                background: 'var( --main-font-color)',
                color: 'white',
              }}
              variant='extended'
              sx={{ width: '100%' }}
              type='submit'
            >
              {isLoading ? <CircularProgress size={20} /> : <Typography variant='body1'>Login</Typography>}
            </Fab>
          </Stack>
        </Box>
      </Grid>
      <Grid direction='row' justifyContent='center' item xs={12} lg={6} style={{ maxHeight: '100%' }}>
        <Box width={'100%'} display='flex' justifyContent='center'>
          <Box
            component='img'
            src='./images/main-logo.png'
            style={{
              maxWidth: '50%',
              maxHeight: '80%',
              objectFit: 'scale-down',
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
