'use client';

import authService from '@/app/_services/authService';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface IResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  otpCode: yup.string().required('OTP is required'),
  password: yup.number().required('Password is required'),
});

export function ResetPasswordModal({ isOpen, onClose }: IResetPasswordModalProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });

  const { mutate } = useMutation({
    mutationFn: authService.updateForgotPassword,
    onSuccess: () => {
      router.push('/login');
      toast.success('Update your password successfully!');
      onClose();
      reset();
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby='customized-dialog-title' open={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography variant='body1' textAlign='center' fontWeight={700} color='primary' mb={2}>
            Fill the form to update your password
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth size='medium' sx={{ borderRadius: 8 }} {...register('email')} label='Email' />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size='medium' sx={{ borderRadius: 8 }} {...register('otpCode')} label='OTP' />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.otpCode?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size='medium'
                sx={{ borderRadius: 8 }}
                {...register('password')}
                label='New password'
                type='password'
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.password?.message}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <Box sx={{ px: 4, pb: 4, gap: 2 }} display='flex' justifyContent='end'>
          <Button variant='outlined' onClick={onClose} type='button'>
            Cancel
          </Button>
          <Button variant='contained' type='submit' disabled={!isValid}>
            Submit
          </Button>
        </Box>
      </form>
    </Dialog>
  );
}
