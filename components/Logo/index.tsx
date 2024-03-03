import Link from 'next/link';
import { Avatar, Box, Grid, Typography } from '@mui/material';

export function Logo() {
  return (
    <Box component={Link} display='flex' href={'/home'} sx={{ textDecoration: 'none' }}>
      <Avatar
        sx={{
          display: 'flex',
          width: '80px',
          height: '80px',
          objectFit: 'contain',
        }}
        alt='Remy Sharp'
        src='/images/nav-logo.svg'
      />
      <Grid width='fit-content' container direction='column'>
        <Typography
          variant='h6'
          noWrap
          component='a'
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
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
            display: { xs: 'none', md: 'flex' },
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
    </Box>
  );
}
