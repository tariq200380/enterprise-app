import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Public, read-only website settings endpoint
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");

    let val =
      res.rows.length > 0 && res.rows[0].value
        ? typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value
        : {};

    // Filter to only public, non-sensitive site settings
    const publicSettings = {
      siteName: val?.siteName || "Creed Tech",
      siteTagline: val?.siteTagline || "",
      contactEmail: val?.contactEmail || "info@creed-tech.com",
      contactPhone: val?.contactPhone || "+92 309 8307115",
      officeAddress: val?.officeAddress || "Office # 02, Main Shopping Center Sheikhupura.",
      copyrightText: val?.copyrightText || "© 2026 Creed Tech. All rights reserved.",
      socialLinks: Array.isArray(val?.socialLinks) ? val.socialLinks : [],
      showAnnouncement: val?.showAnnouncement !== undefined ? Boolean(val.showAnnouncement) : true,
      announcements: Array.isArray(val?.announcements) ? val.announcements : [],
      announcementBadge: val?.announcementBadge || "LIVE",
      announcementText: val?.announcementText || "",
      announcementLinkText: val?.announcementLinkText || "",
      announcementLinkUrl: val?.announcementLinkUrl || "",
      headerLogoUrl: val?.headerLogoUrl || "/images/logo.webp",
      headerLogoWidth: val?.headerLogoWidth || 130,
      headerLogoHeight: val?.headerLogoHeight || 36,
      headerNavLinks: Array.isArray(val?.headerNavLinks) ? val.headerNavLinks : [],
      headerCtaText: val?.headerCtaText || "Get Started",
      headerCtaUrl: val?.headerCtaUrl || "/contact",
      headerShowCta: val?.headerShowCta !== undefined ? Boolean(val.headerShowCta) : true,
    };

    return NextResponse.json(
      { success: true, settings: publicSettings },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch public website settings",
      },
      { status: 500 }
    );
  }
}
