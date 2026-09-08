"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import NewsletterStrip from "@/components/NewsletterStrip";
import Footer from "@/components/Footer";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <TopBanner />
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <NewsletterStrip />
      <Footer />
    </>
  );
}
