"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session: any
}
const Provider = ({ children: children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
