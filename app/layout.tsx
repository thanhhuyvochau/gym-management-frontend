'use client';
import './globals.css';

import { ToastContainer } from 'react-toastify';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3/AdapterDateFnsV3';

import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const theme = createTheme({
  palette: {
    primary: {
      light: '#695fa7',
      main: '#1a1363',
      dark: '#000d34',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2rem', // Default font size for h1
      '@media (min-width:600px)': {
        fontSize: '2.5rem', // Responsive font size for h1 on screens larger than 600px
      },
      '@media (min-width:960px)': {
        fontSize: '3rem', // Responsive font size for h1 on screens larger than 960px
      },
      '@media (min-width:1280px)': {
        fontSize: '3.5rem', // Responsive font size for h1 on screens larger than 1280px
      },
      '@media (min-width:1920px)': {
        fontSize: '4rem', // Responsive font size for h1 on screens larger than 1920px
      },
    },
    h2: {
      fontSize: '1.8rem', // Default font size for h2
      '@media (min-width:600px)': {
        fontSize: '2.2rem', // Responsive font size for h2 on screens larger than 600px
      },
      '@media (min-width:960px)': {
        fontSize: '2.5rem', // Responsive font size for h2 on screens larger than 960px
      },
      '@media (min-width:1280px)': {
        fontSize: '3rem', // Responsive font size for h2 on screens larger than 1280px
      },
      '@media (min-width:1920px)': {
        fontSize: '3.5rem', // Responsive font size for h2 on screens larger than 1920px
      },
    },
    h3: {
      fontSize: '1.6rem', // Kích thước mặc định cho h3
      '@media (min-width:600px)': {
        fontSize: '2rem', // Kích thước phản hồi cho h3 trên màn hình lớn hơn 600px
      },
      '@media (min-width:960px)': {
        fontSize: '2.2rem', // Kích thước phản hồi cho h3 trên màn hình lớn hơn 960px
      },
      '@media (min-width:1280px)': {
        fontSize: '2.5rem', // Kích thước phản hồi cho h3 trên màn hình lớn hơn 1280px
      },
      '@media (min-width:1920px)': {
        fontSize: '3rem', // Kích thước phản hồi cho h3 trên màn hình lớn hơn 1920px
      },
    },
    h4: {
      fontSize: '1.4rem', // Kích thước mặc định cho h4
      '@media (min-width:600px)': {
        fontSize: '1.8rem', // Kích thước phản hồi cho h4 trên màn hình lớn hơn 600px
      },
      '@media (min-width:960px)': {
        fontSize: '2rem', // Kích thước phản hồi cho h4 trên màn hình lớn hơn 960px
      },
      '@media (min-width:1280px)': {
        fontSize: '2.2rem', // Kích thước phản hồi cho h4 trên màn hình lớn hơn 1280px
      },
      '@media (min-width:1920px)': {
        fontSize: '2.5rem', // Kích thước phản hồi cho h4 trên màn hình lớn hơn 1920px
      },
    },
    h5: {
      fontSize: '1.2rem', // Kích thước mặc định cho h5
      '@media (min-width:600px)': {
        fontSize: '1.6rem', // Kích thước phản hồi cho h5 trên màn hình lớn hơn 600px
      },
      '@media (min-width:960px)': {
        fontSize: '1.8rem', // Kích thước phản hồi cho h5 trên màn hình lớn hơn 960px
      },
      '@media (min-width:1280px)': {
        fontSize: '2rem', // Kích thước phản hồi cho h5 trên màn hình lớn hơn 1280px
      },
      '@media (min-width:1920px)': {
        fontSize: '2.2rem', // Kích thước phản hồi cho h5 trên màn hình lớn hơn 1920px
      },
    },
  },
});

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function RootLayout(prop: Props) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        />
      </head>
      <body style={{ overflow: 'hidden' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ToastContainer position='bottom-right' autoClose={3000} closeOnClick hideProgressBar />
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>{prop.children}</ThemeProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
