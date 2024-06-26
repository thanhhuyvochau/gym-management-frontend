'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/app/_hooks';

const pages = ['Log Out'];
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  onClickMobileIcon: () => void;
  mobileOpen?: boolean;
  drawerWidth: number;
}
function DashBoardTopBar(props: Props) {
  const { logout } = useAuth();

  return (
    <AppBar
      style={{
        backgroundColor: 'var(--while-brow)',
      }}
      color='default'
      sx={{
        width: { xs: '100%', lg: `calc(100% - ${props.drawerWidth}px)` },
        ml: { xs: 0, lg: `${props.drawerWidth}px` },
      }}
    >
      <Box component={'div'}>
        <Toolbar disableGutters>
          <Link href={'/home'}>
            <Avatar
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: '80px',
                height: '80px',
                objectFit: 'contain',
              }}
              alt='Remy Sharp'
              src='/images/nav-logo.svg'
            />
          </Link>

          <Grid width='fit-content' container direction='column'>
            <Typography
              variant='h6'
              noWrap
              component='a'
              sx={{
                mr: 2,
                display: { xs: 'none', lg: 'flex' },
                fontFamily: 'monospace',
                fontWeight: '600',
                letterSpacing: '.3rem',
                color: 'var(--main-font-color)',
                textDecoration: 'none',
              }}
            >
              STAMINA
            </Typography>
            <Typography
              variant='h6'
              noWrap
              component='a'
              sx={{
                mr: 2,
                display: { xs: 'none', lg: 'flex' },
                fontFamily: 'monospace',
                fontWeight: '600',
                letterSpacing: '.3rem',
                color: 'var(--main-font-color)',
                textDecoration: 'none',
              }}
            >
              FITNESS
            </Typography>
          </Grid>

          <Box
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', lg: 'none' },
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={props.onClickMobileIcon}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link href={'/home'}>
            <Avatar
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                mr: 1,
              }}
              alt='Remy Sharp'
              src='/images/nav-logo.svg'
            />
          </Link>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 400,
              color: 'var(--main-font-color)',
              textDecoration: 'none',
            }}
          >
            STAMINA FITNESS
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                style={{
                  color: 'var(--main-font-color)',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
                onClick={logout}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default DashBoardTopBar;
