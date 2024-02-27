'use client';
import './globals.css';

import { ToastContainer } from 'react-toastify';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
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
        <ToastContainer position='bottom-right' autoClose={2000} closeOnClick hideProgressBar />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>{prop.children}</ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
