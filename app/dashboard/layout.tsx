'use client';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import DashBoardTopBar from '../../components/TopBarComponent/top-bar';
import SideBarComponent from '@/components/SideBarComponent/side-bar';
import { Stack, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { useAuth } from '../_hooks';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isFetched, profile } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Stack gap={2}>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} className='pt-4 pb-4'>
        <Box sx={{ borderRadius: 1 }} component={'div'}>
          <AccountCircleIcon sx={{ width: '100px', height: '100px', color: 'white' }} />
        </Box>
        <Stack direction={'column'} alignItems={'center'}>
          <Typography variant='body1' color={'white'}>
            {profile?.fullName}
          </Typography>
          <Typography variant='caption' color={'white'}>
            {profile?.email}
          </Typography>
        </Stack>
      </Stack>

      <SideBarComponent />
    </Stack>
  );

  useEffect(() => {
    if (isFetched && !profile) {
      router.push('/login');
    }
  }, [profile]);

  return (
    <Box height={'100%'} sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: drawerWidth,
          backgroundColor: 'var(--primary)',
          height: '100vh',
          pl: 2,
          position: 'fixed',
          overflow: 'hidden',
        }}
        display={{ xs: 'none', lg: 'block' }}
      >
        <Box
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: 'var(--primary)',
              maxWidth: drawerWidth,
              color: 'white',
            },
          }}
        >
          {drawer}
        </Box>
      </Box>
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            color: 'white',
            backgroundColor: 'var(--primary)',
            pl: 2,
          },
        }}
      >
        {drawer}
      </Drawer>
      <DashBoardTopBar drawerWidth={drawerWidth + 16} onClickMobileIcon={handleDrawerToggle} />
      <Box flexGrow={1} p={3} ml={{ xs: 0, lg: `${drawerWidth + 16}px` }}>
        <Toolbar />
        <Box component={'div'}>{children}</Box>
      </Box>
    </Box>
  );
}
