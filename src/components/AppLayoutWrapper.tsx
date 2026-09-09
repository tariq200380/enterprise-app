"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TopBanner, { AnnouncementSettings } from "@/components/TopBanner";
import Navbar, { HeaderSettings } from "@/components/Navbar";
import NewsletterStrip from "@/components/NewsletterStrip";
import Footer, { GeneralSiteInfo } from "@/components/Footer";

export default function AppLayoutWrapper({
  children,
  socialLinks,
  copyrightText,
  announcementSettings,
  generalInfo,
  headerSettings,
}: {
  children: React.ReactNode;
  socialLinks?: Array<{ id: string; platform: string; url: string }>;
  copyrightText?: string;
  announcementSettings?: AnnouncementSettings;
  generalInfo?: GeneralSiteInfo;
  headerSettings?: HeaderSettings;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <TopBanner initialSettings={announcementSettings} />
        <Navbar headerSettings={headerSettings} />
      </div>
      <main className="flex-1">{children}</main>
      <NewsletterStrip />
      <Footer
        initialSocialLinks={socialLinks}
        initialCopyrightText={copyrightText}
        initialGeneralInfo={generalInfo}
      />
    </>
  );
}
