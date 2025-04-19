"use client"; // This makes the component a Client Component

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}