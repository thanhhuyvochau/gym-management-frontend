"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import PermanentDrawerLeft from "./side-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box component={"div"}>
        <PermanentDrawerLeft children={children}></PermanentDrawerLeft>
      </Box>
    </>
  );
}
