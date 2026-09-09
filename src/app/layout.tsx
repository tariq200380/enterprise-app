import type { Metadata } from "next";
import "./globals.css";
import AppLayoutWrapper from "@/components/AppLayoutWrapper";
import { query } from "@/lib/db";

export const metadata: Metadata = {
  metadataBase: new URL("https://creed-tech.com"),
  title: {
    default: "CREED TECH | Enterprise IT Intelligence & Custom Software Engineering",
    template: "%s | CREED TECH",
  },
  description:
    "Enterprise IT solutions, custom software engineering, AI workflow orchestration, cloud modernization, and real-time intelligence for high-growth enterprises.",
  keywords: [
    "Enterprise IT Solutions",
    "Custom Software Engineering",
    "Cloud Infrastructure Modernization",
    "AI Workflow Automation",
    "Cybersecurity Architecture",
    "Database Management",
    "Dedicated Engineering Pods",
    "Creed Tech",
  ],
  authors: [{ name: "Creed Tech Engineering Team", url: "https://creed-tech.com" }],
  creator: "Creed Tech",
  publisher: "Creed Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CREED TECH | Enterprise IT Intelligence & Custom Software Engineering",
    description:
      "Enterprise IT solutions, custom software engineering, AI workflow orchestration, and resilient cloud infrastructure.",
    url: "https://creed-tech.com",
    siteName: "Creed Tech",
    images: [
      {
        url: "/images/hero-services-web-q90.webp",
        width: 1200,
        height: 630,
        alt: "Creed Tech Enterprise Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CREED TECH | Enterprise IT Intelligence & Custom Software Engineering",
    description:
      "Enterprise IT solutions, custom software engineering, and AI automation for global enterprises.",
    images: ["/images/hero-services-web-q90.webp"],
    creator: "@creedtech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://creed-tech.com/#organization",
      name: "Creed Tech",
      url: "https://creed-tech.com",
      logo: {
        "@type": "ImageObject",
        url: "https://creed-tech.com/images/logo.webp",
      },
      sameAs: [
        "https://clutch.co/profile/creed-tech",
        "https://www.trustpilot.com/review/creed-tech.com",
        "https://facebook.com/creedtechnology",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+923098307115",
        contactType: "customer service",
        email: "info@creed-tech.com",
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://creed-tech.com/#website",
      url: "https://creed-tech.com",
      name: "Creed Tech",
      publisher: {
        "@id": "https://creed-tech.com/#organization",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://creed-tech.com/#service",
      name: "Creed Tech Enterprise Engineering",
      url: "https://creed-tech.com/services",
      provider: {
        "@id": "https://creed-tech.com/#organization",
      },
      areaServed: "Worldwide",
      description:
        "Enterprise software engineering, cloud architecture, and mission-critical system delivery.",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let socialLinks = undefined;
  let copyrightText = undefined;
  let announcementSettings = undefined;
  let generalInfo = undefined;
  let headerSettings = undefined;
  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0) {
      const val = res.rows[0].value;
      if (Array.isArray(val?.socialLinks)) {
        socialLinks = val.socialLinks;
      }
      if (typeof val?.copyrightText === "string") {
        copyrightText = val.copyrightText;
      }
      announcementSettings = {
        showAnnouncement: val?.showAnnouncement !== undefined ? Boolean(val.showAnnouncement) : undefined,
        announcementBadge: typeof val?.announcementBadge === "string" ? val.announcementBadge : undefined,
        announcementText: typeof val?.announcementText === "string" ? val.announcementText : undefined,
        announcementLinkText: typeof val?.announcementLinkText === "string" ? val.announcementLinkText : undefined,
        announcementLinkUrl: typeof val?.announcementLinkUrl === "string" ? val.announcementLinkUrl : undefined,
        announcements: Array.isArray(val?.announcements) ? val.announcements : undefined,
      };
      generalInfo = {
        siteName: typeof val?.siteName === "string" ? val.siteName : undefined,
        siteTagline: typeof val?.siteTagline === "string" ? val.siteTagline : undefined,
        contactEmail: typeof val?.contactEmail === "string" ? val.contactEmail : undefined,
        contactPhone: typeof val?.contactPhone === "string" ? val.contactPhone : undefined,
        officeAddress: typeof val?.officeAddress === "string" ? val.officeAddress : undefined,
      };
      headerSettings = {
        logoUrl: typeof val?.headerLogoUrl === "string" && val.headerLogoUrl ? val.headerLogoUrl : "/images/logo.webp",
        logoWidth: typeof val?.headerLogoWidth === "number" ? val.headerLogoWidth : 130,
        logoHeight: typeof val?.headerLogoHeight === "number" ? val.headerLogoHeight : 36,
        navLinks: Array.isArray(val?.headerNavLinks) && val.headerNavLinks.length > 0 ? val.headerNavLinks : undefined,
        ctaText: typeof val?.headerCtaText === "string" ? val.headerCtaText : "Get Started",
        ctaUrl: typeof val?.headerCtaUrl === "string" ? val.headerCtaUrl : "/contact",
        showCta: val?.headerShowCta !== undefined ? Boolean(val.headerShowCta) : true,
      };
    }
  } catch {
    // Fallback to default
  }

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <AppLayoutWrapper
          socialLinks={socialLinks}
          copyrightText={copyrightText}
          announcementSettings={announcementSettings}
          generalInfo={generalInfo}
          headerSettings={headerSettings}
        >
          {children}
        </AppLayoutWrapper>
      </body>
    </html>
  );
}
