import React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Setup Two-Factor Authentication | Creed Tech",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function Setup2FALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
