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
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/app/_hooks';
import { useMutation } from '@tanstack/react-query';
import authService from '@/app/_services/authService';
import { ResetPasswordModal } from './_components/ResetPasswordModal';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function ForgotPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isOpenResetPassword, setOpenResetPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: authService.getOtpForgotPassword,
    onSuccess: () => {
      setOpenResetPassword(true);
    },
  });

  const { profile } = useAuth();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  useEffect(() => {
    if (profile) {
      router.push('/home');
    }
  }, [profile]);

  return (
    <>
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
                Forgot password
              </Typography>

              <Grid container direction='column'>
                <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='emailInput'>
                  <Typography fontWeight='600' variant='body1'>
                    Type Your email
                  </Typography>
                </InputLabel>
                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id='emailInput'
                      style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                      required
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  )}
                />
              </Grid>
              <Fab
                style={{
                  background: 'var( --main-font-color)',
                  color: 'white',
                }}
                variant='extended'
                sx={{ width: '100%' }}
                type='submit'
                disabled={!isValid}
              >
                {isPending ? <CircularProgress size={20} /> : <Typography variant='body1'>Get OTP</Typography>}
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
      <ResetPasswordModal isOpen={isOpenResetPassword} onClose={() => setOpenResetPassword(false)} />
    </>
  );
}
