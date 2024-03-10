'use client';

import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { TUser } from '@/app/_services/auth/types';
import { UploadAvatarModal } from '../UploadAvatarModal';
import { useAuth } from '@/app/_hooks';

const UserCardComponent = () => {
  let avatarSize = { width: '100px', height: '100px' };
  let minWidth = '300px';
  let avtEle = <AccountCircleIcon style={{ ...avatarSize }}></AccountCircleIcon>;

  const { profile } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    profile && (
      <>
        <Stack gap={'2rem'} justifyContent={'center'} minWidth={minWidth} height={'100%'} direction={'column'}>
          <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
            {profile.imageProfile ? (
              <Avatar sx={{ width: 120, height: 120 }}>
                <Image
                  src={profile.imageProfile}
                  alt={profile.fullName}
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: '100%' }}
                />
              </Avatar>
            ) : (
              <Box sx={{ borderRadius: 1 }} component={'div'}>
                {avtEle}
              </Box>
            )}
            <Button
              variant='text'
              startIcon={<BorderColorOutlinedIcon style={{ width: '1.2rem', height: '1.2rem' }} />}
              onClick={() => setOpen(true)}
            >
              Update Avatar
            </Button>
          </Stack>
          <Stack className='mt-6' alignItems={'center'} direction={'column'}>
            <Grid className='mb-3' container>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'} textAlign={'left'} variant='subtitle2'>
                  Name
                </Typography>
              </Grid>
              <Grid alignSelf={'flex-end'} item xs={8}>
                <Typography textAlign={'right'} variant='subtitle2'>
                  {profile.fullName}
                </Typography>
              </Grid>
            </Grid>
            <Grid className='mb-3' container>
              <Grid item xs={4}>
                <Typography fontWeight={'bold'} textAlign={'left'} variant='subtitle2'>
                  Contact no
                </Typography>
              </Grid>
              <Grid alignSelf={'flex-end'} item xs={8}>
                <Typography textAlign={'right'} variant='subtitle2'>
                  {profile.phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid justifyContent={'space-between'} className='mb-3' container>
              <Grid item>
                <Typography fontWeight={'bold'} textAlign={'left'} variant='subtitle2'>
                  Email
                </Typography>
              </Grid>
              <Grid item>
                <Typography textAlign={'right'} variant='subtitle2'>
                  {profile.email}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <UploadAvatarModal open={open} onClose={() => setOpen(false)} />
      </>
    )
  );
};

export default UserCardComponent;
