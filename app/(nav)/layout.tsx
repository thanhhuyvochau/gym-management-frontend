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
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useAuth } from '../_hooks';
import { Logo } from '@/components';

interface NavItem {
  name: string;
  navLink: () => any;
  onClick?: () => void;
}

function HomeReponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const { profile, logout } = useAuth();

  const pages: NavItem[] = [
    {
      name: 'About',
      navLink: () => '#',
      onClick: () => {
        scrollToElement('about');
      },
    },
    { name: 'Why Join Us?', navLink: () => '/why-join-us' },
    {
      name: 'Plan',
      navLink: () => '#',
      onClick: () => {
        scrollToElement('plan');
      },
    },
    ...(profile
      ? [
          { name: 'Dashboard', navLink: () => '/dashboard' },
          {
            name: 'Logout',
            navLink: () => '#',
            onClick: () => {
              logout();
            },
          },
        ]
      : [{ name: 'Login', navLink: () => '/login' }]),
  ];

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
                <Link
                  key={page.name}
                  href={page.navLink()}
                  onClick={page.onClick}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
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
            {pages.map((page) => (
              <Button key={page.name}>
                <Link
                  href={page.navLink()}
                  style={{
                    color: 'var(--main-font-color)',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                  onClick={page.onClick}
                  key={page.name}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
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
        <HomeReponsiveAppBar />
        <Box style={{}} component={'div'}>
          {children}
        </Box>
      </Box>
    </>
  );
}
