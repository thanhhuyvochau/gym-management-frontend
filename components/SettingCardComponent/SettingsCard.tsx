// IMPORTS
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Grid, MenuItem, Select, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/app/_hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/app/_services';
import { UpdatePasswordPayload, UpdateUserPayload } from '@/app/_services/user/types';
import { toast } from 'react-toastify';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  gender: yup.string().required('Gender is required'),
  phone: yup.string().required('Phone Number is required'),
  address: yup.string().required('Address is required'),
});

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required('This field is required'),
  newPassword: yup.string().required('This field is required'),
  confirmPassword: yup.string().required('This field is required'),
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

//APP
export default function SettingsCard(props: any) {
  const { profile, refetch } = useAuth();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: profile?.fullName || '',
      address: profile?.address || '',
      phone: profile?.phone || '',
      gender: profile?.gender || '',
    },
  });

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    reset: resetUpdatePassword,
    formState: { isValid: isValidPassword },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const { mutate: mutateUpdateInfo } = useMutation({
    mutationFn: (payload: UpdateUserPayload) => userService.updateProfile(payload),
    onSuccess: () => {
      toast.success('Update successfully!');
      setEditing(false);
      refetch();
    },
    onError: () => {
      toast.error('Update Error!');
    },
  });

  const { mutate: mutateUpdatePassword } = useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => userService.updatePassword(payload),
    onSuccess: () => {
      toast.success('Update successfully!');
      resetUpdatePassword();
    },
    onError: () => {
      toast.error('Update Failed!');
    },
  });

  const [value, setValue] = React.useState(0);

  const [isEditing, setEditing] = useState(false);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const onSubmitHandler = (data: any) => {
    console.log('data', data);
    mutateUpdateInfo(data);
  };

  const onSubmitPasswordHandler = (data: any) => {
    const { confirmPassword, ...rest } = data;
    mutateUpdatePassword(rest);
  };

  return (
    <Card variant='outlined' sx={{ height: '100%', width: '100%' }}>
      <br></br>
      <Tabs value={value} onChange={handleChangeTab} textColor='primary' indicatorColor='primary'>
        <Tab label='Information' {...a11yProps(0)} />
        <Tab label='Password' {...a11yProps(1)} />
      </Tabs>
      <Divider></Divider>

      <TabPanel value={value} index={1}>
        <Box p={4} component='form' onSubmit={handleSubmitPassword(onSubmitPasswordHandler)}>
          <Stack gap={2}>
            <TextField
              fullWidth
              required
              id='outlined-required'
              label='Old password'
              {...registerPassword('oldPassword')}
              type='password'
              defaultValue=''
            />
            <TextField
              fullWidth
              id='outlined-required'
              required
              label='New password'
              {...registerPassword('newPassword')}
              type='password'
            />
            <TextField
              fullWidth
              id='outlined-required'
              required
              label='Confirm password'
              {...registerPassword('confirmPassword')}
              type='password'
            />
          </Stack>

          <Box display='flex' gap={1} justifyContent='end'>
            <Button
              sx={{ p: '1rem 2rem', my: 2, height: '3rem', float: 'right' }}
              component='button'
              size='large'
              variant='contained'
              type='submit'
              disabled={!isValidPassword}
            >
              Save
            </Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <Box p={4} component='form' onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField fullWidth disabled={!isEditing} {...register('fullName')} />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth disabled={!isEditing} label='Gender'>
                    {genderSelect.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth disabled={!isEditing} {...register('phone')} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth disabled={!isEditing} {...register('address')} />
            </Grid>
          </Grid>
          <Box display='flex' gap={1} justifyContent='end' mt={2}>
            {isEditing && (
              <Button
                sx={{ p: '1rem 2rem', my: 2, height: '3rem', float: 'right' }}
                component='button'
                size='large'
                variant='contained'
                // color='secondary'
                type='submit'
                disabled={!isDirty}
              >
                Save
              </Button>
            )}
            <Button
              sx={{ p: '1rem 2rem', my: 2, height: '3rem', float: 'right' }}
              component='button'
              size='large'
              variant={isEditing ? 'outlined' : 'contained'}
              onClick={() => {
                setEditing((prev) => !prev);
                if (isEditing) {
                  reset();
                }
              }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </Box>
        </Box>
      </TabPanel>
    </Card>
  );
}
