'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Grid from '@mui/material/Grid/Grid';
import { useAuth } from '../_hooks';
import { Logo } from '@/components';

interface NavItem {
  name: string;
  navLink: () => any;
}

// const pages = ["About", "Why Join Us?", "Plan", "Login", "Logout"];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export function HomeReponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { profile, logout } = useAuth();

  const pages: NavItem[] = [
    { name: 'About', navLink: () => '/about' },
    { name: 'Why Join Us?', navLink: () => '/why-join-us' },
    { name: 'Plan', navLink: () => '/plan' },
    { name: 'Login', navLink: () => '/login' },
    {
      name: 'Dashboard',
      navLink: () => '/dashboard',
    },
    {
      name: 'Logout',
      navLink: () => '/logout',
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    // signIn("credential");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar color='default' position='sticky'>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} href={page.navLink()}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Logo />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Button>
              <Link
                href={'/about'}
                style={{
                  color: 'var(--main-font-color)',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                About
              </Link>
            </Button>
            <Button>
              <Link
                href={'/why-join-us'}
                style={{
                  color: 'var(--main-font-color)',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                Why Join Us?
              </Link>
            </Button>
            <Button>
              <Link
                href={'/plan'}
                style={{
                  color: 'var(--main-font-color)',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                Plan
              </Link>
            </Button>
            {!profile && (
              <Button>
                <Link
                  href={'/login'}
                  style={{
                    color: 'var(--main-font-color)',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  Login
                </Link>
              </Button>
            )}
            {Boolean(profile) && (
              <Button>
                <Link
                  href={'/dashboard'}
                  style={{
                    color: 'var(--main-font-color)',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  Dashboard
                </Link>
              </Button>
            )}
            {Boolean(profile) && (
              <Button
                onClick={logout}
                style={{
                  color: 'var(--main-font-color)',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box component={'div'}>
        <HomeReponsiveAppBar></HomeReponsiveAppBar>
        <Box style={{}} component={'div'}>
          {children}
        </Box>
      </Box>
    </>
  );
}
