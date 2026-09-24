import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Setup2FALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
