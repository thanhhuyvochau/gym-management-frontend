"use client";
import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Provider from "./Provider";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
  },
});

interface Props {
  children: ReactNode;
}

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
        <SessionProvider refetchOnWindowFocus={false}>
          <ThemeProvider theme={theme}>{prop.children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
