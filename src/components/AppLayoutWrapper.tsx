"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import TopBanner, { AnnouncementSettings } from "@/components/TopBanner";
import Navbar, { HeaderSettings } from "@/components/Navbar";
import NewsletterStrip from "@/components/NewsletterStrip";
import Footer, { GeneralSiteInfo } from "@/components/Footer";

const HomeLogic = dynamic(() => import("@/components/home/homelogic"), {
  ssr: false,
});

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

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      window.location.hostname.includes("ngrok")
    ) {
      const origFetch = window.fetch;
      window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
        init = init || {};
        const headers = new Headers(init.headers || {});
        if (!headers.has("ngrok-skip-browser-warning")) {
          headers.set("ngrok-skip-browser-warning", "69420");
        }
        init.headers = headers;
        return origFetch.call(this, input, init);
      };
    }
  }, []);

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
      <HomeLogic />
    </>
  );
}
