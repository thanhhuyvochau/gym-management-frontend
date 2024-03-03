'use client';

import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Paper } from '@mui/material';
import { UserProfileResponse } from '@/app/_models/UserProfileResponse';
import SettingsCard from '@/components/SettingCardComponent/SettingsCard';
import UserCardComponent from '@/components/UserProfileComponent/user-card';
import { useAuth } from '@/app/_hooks';

export default function ProfilePage() {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box width='100%' height='100%'>
        <CircularProgress />
      </Box>
    );
  }

  return (
    profile && (
      <Grid container minHeight={'500px'} className='pt-10' spacing={4} my={0}>
        <Grid item xs={12} lg={5} xl={5} height='100%'>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Box display='flex' justifyContent='center' height='100%'>
              <UserCardComponent data={profile} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={7} xl={7}>
          <Paper elevation={3}>
            <SettingsCard info={profile} />
          </Paper>
        </Grid>
      </Grid>
    )
  );
}
