"use client";
import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Provider from "./Provider";
import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
  },
});

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient()


export default function RootLayout(prop: Props) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body style={{ overflow: "hidden" }}>
<<<<<<< Updated upstream
        <ThemeProvider theme={theme}>{prop.children}</ThemeProvider>
=======
      <QueryClientProvider client={queryClient}>
        <SessionProvider refetchOnWindowFocus={true}>
          <ThemeProvider theme={theme}>{prop.children}</ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
>>>>>>> Stashed changes
      </body>
    </html>
  );
}
