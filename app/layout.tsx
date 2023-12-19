"use client";
import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
  },
});

// export const metadata: Metadata = {
//   title: "Gym Management System",
//   description: "Platform to Simplify you Life",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
