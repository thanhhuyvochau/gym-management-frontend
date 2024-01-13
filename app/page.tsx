"use client";
import { signOut, useSession } from "next-auth/react";
import Home from "./(nav)/home/page";
import Login from "./(nav)/login/page";
import { useEffect } from "react";
import { Typography } from "@mui/material";

export default function Main() {
  return (
    <>
      <Home />
    </>
  );
}
