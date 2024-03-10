'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plan } from '@/app/_services/plan/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { planService } from '@/app/_services/plan';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  timeAmount: yup.number().required('Time Amount is required').positive('Time Amount must be a positive number'),
  timeUnit: yup.string().required('Time Unit is required'),
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  activate: yup.boolean().required(''),
});

interface IEditGymPlanFormProps {
  onCancel: () => void;
}

const CreateGymPlanForm = ({ onCancel }: IEditGymPlanFormProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      activate: false,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: planService.create,
    onSuccess: () => {
      toast.success('Create plan successfully!');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      onCancel();
      reset();
    },
  });

  const handleSave = (data: any) => {
    mutate(data);
  };

  return (
    <Dialog onClose={onCancel} open>
      <DialogContent
        style={{
          padding: '20px',
          minWidth: '400px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant='h4' align='center' style={{ color: '#1a1363', marginBottom: '20px' }}>
          Create New Gym Plan
        </Typography>
        <form onSubmit={handleSubmit(handleSave)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Name'
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Description'
                    multiline
                    rows={3}
                    fullWidth
                    variant='outlined'
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='timeAmount'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Time Amount'
                    type='number'
                    fullWidth
                    error={!!errors.timeAmount}
                    helperText={errors.timeAmount?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='timeUnit'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label='Time Unit'
                    fullWidth
                    error={!!errors.timeUnit}
                    helperText={errors.timeUnit?.message}
                  >
                    {['MONTH', 'YEAR'].map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='price'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Price'
                    fullWidth
                    InputProps={{ startAdornment: <InputAdornment position='start'>VND</InputAdornment> }}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='activate'
                control={control}
                render={({ field }) => (
                  <FormControlLabel control={<Switch {...field} color='primary' />} label='Activation Status' />
                )}
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              style={{ borderRadius: '8px', color: 'var(--primary)', backgroundColor: '#DEBA3B', fontWeight: 600 }}
              autoFocus
              type='submit'
            >
              Save Change
            </Button>
            <Button variant='outlined' color='primary' onClick={onCancel} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGymPlanForm;
