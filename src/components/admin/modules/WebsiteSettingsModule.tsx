"use client";

import React, { useState, useEffect } from "react";
import { WebsiteSettingsData, DEFAULT_WEBSITE_SETTINGS } from "../settings/types";
import GlobalSettingsSection from "../settings/GlobalSettingsSection";
import {
  HeaderFooterSection,
} from "../settings/PageContentSections";
import HomeSettingsSection from "../settings/HomeSettingsSection";
import AboutSettingsSection from "../settings/AboutSettingsSection";
import ContactSettingsSection from "../settings/ContactSettingsSection";
import PortfolioSettingsSection from "../settings/PortfolioSettingsSection";

interface WebsiteSettingsModuleProps {
  showToast?: (msg: string, type: "success" | "error") => void;
}

type SubTabType = "global" | "home" | "about" | "contact" | "portfolio" | "header_footer";

export default function WebsiteSettingsModule({ showToast }: WebsiteSettingsModuleProps) {
  const [subTab, setSubTab] = useState<SubTabType>("global");
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<WebsiteSettingsData>(DEFAULT_WEBSITE_SETTINGS);

  // Load from API
  const loadSettings = () => {
    fetch("/api/admin/website-settings")
      .then((res) => res.json())
      .then((data) => {
        const s = data.settings || data;
        if (s && !s.error) {
          setSettings((prev) => ({
            ...prev,
            siteName: s.siteName || s.site_name || prev.siteName,
            siteTagline: s.siteTagline || s.site_tagline || prev.siteTagline,
            contactEmail: s.contactEmail || s.contact_email || prev.contactEmail,
            contactPhone: s.contactPhone || s.contact_phone || prev.contactPhone,
            officeAddress: s.officeAddress || s.office_address || prev.officeAddress,
            showAnnouncement:
              s.showAnnouncement !== undefined
                ? Boolean(s.showAnnouncement)
                : s.show_announcement !== undefined
                ? Boolean(s.show_announcement)
                : prev.showAnnouncement,
            announcements:
              Array.isArray(s.announcements) && s.announcements.length > 0
                ? s.announcements
                : s.announcementText || s.announcement_text
                ? [
                    {
                      id: "1",
                      badge: s.announcementBadge || s.announcement_badge || "LIVE",
                      text: s.announcementText || s.announcement_text || "",
                      linkText: s.announcementLinkText || s.announcement_link_text || "Explore Services",
                      linkUrl: s.announcementLinkUrl || s.announcement_link_url || "/services",
                    },
                  ]
                : prev.announcements,
            copyrightText: s.copyrightText || s.copyright_text || prev.copyrightText,
            socialLinks:
              Array.isArray(s.socialLinks) && s.socialLinks.length > 0
                ? s.socialLinks
                : prev.socialLinks,
            heroHeadline: s.heroHeadline || s.hero_headline || prev.heroHeadline,
            heroSubheadline: s.heroSubheadline || s.hero_subheadline || prev.heroSubheadline,
            heroCta1Text: s.heroCta1Text || s.hero_cta1_text || prev.heroCta1Text,
            heroCta1Url: s.heroCta1Url || s.hero_cta1_url || prev.heroCta1Url,
            heroCta2Text: s.heroCta2Text || s.hero_cta2_text || prev.heroCta2Text,
            heroCta2Url: s.heroCta2Url || s.hero_cta2_url || prev.heroCta2Url,
            partnerLogos:
              Array.isArray(s.partnerLogos) && s.partnerLogos.length > 0
                ? s.partnerLogos
                : Array.isArray(s.partner_logos) && s.partner_logos.length > 0
                ? s.partner_logos
                : prev.partnerLogos,
            servicesHeadline: s.servicesHeadline || s.services_headline || prev.servicesHeadline,
            servicesDescription: s.servicesDescription || s.services_description || prev.servicesDescription,
            homeServices:
              Array.isArray(s.homeServices) && s.homeServices.length > 0
                ? s.homeServices
                : Array.isArray(s.home_services) && s.home_services.length > 0
                ? s.home_services
                : prev.homeServices,
            aboutMission: s.aboutMission || s.about_mission || prev.aboutMission,
            aboutVision: s.aboutVision || s.about_vision || prev.aboutVision,
            statEngineers: s.statEngineers || s.stat_engineers || prev.statEngineers,
            statHubs: s.statHubs || s.stat_hubs || prev.statHubs,
            statUptime: s.statUptime || s.stat_uptime || prev.statUptime,
            statSystems: s.statSystems || s.stat_systems || prev.statSystems,
            contactHeroBadge: s.contactHeroBadge || s.contact_hero_badge || prev.contactHeroBadge,
            contactHeroTitle: s.contactHeroTitle || s.contact_hero_title || prev.contactHeroTitle,
            contactHeroDesc: s.contactHeroDesc || s.contact_hero_desc || prev.contactHeroDesc,
            headerLogoUrl: s.headerLogoUrl || s.header_logo_url || prev.headerLogoUrl,
            headerCtaText: s.headerCtaText || s.header_cta_text || prev.headerCtaText,
            headerCtaUrl: s.headerCtaUrl || s.header_cta_url || prev.headerCtaUrl,
            footerP1: s.footerP1 || s.footer_p1 || prev.footerP1,
            portfolioShowcase: s.portfolioShowcase || s.portfolio_showcase || prev.portfolioShowcase,
            portfolioProjects:
              Array.isArray(s.portfolioProjects) && s.portfolioProjects.length > 0
                ? s.portfolioProjects
                : Array.isArray(s.portfolio_projects) && s.portfolio_projects.length > 0
                ? s.portfolio_projects
                : prev.portfolioProjects,
            contactSettings: s.contactSettings || s.contact_settings || {
              ...prev.contactSettings,
              heroBadge: s.contactHeroBadge || s.contact_hero_badge || prev.contactSettings.heroBadge,
              heroHeadline: s.contactHeroTitle || s.contact_hero_title || prev.contactSettings.heroHeadline,
              heroDescription: s.contactHeroDesc || s.contact_hero_desc || prev.contactSettings.heroDescription,
              officialInquiriesEmail: s.contactEmail || s.contact_email || prev.contactSettings.officialInquiriesEmail,
              telemetryPhone: s.contactPhone || s.contact_phone || prev.contactSettings.telemetryPhone,
            },
            aboutSettings: s.aboutSettings || s.about_settings ? {
              hubsBadgeTag: (s.aboutSettings || s.about_settings).hubsBadgeTag ?? prev.aboutSettings.hubsBadgeTag,
              hubsHeadline: (s.aboutSettings || s.about_settings).hubsHeadline ?? prev.aboutSettings.hubsHeadline,
              hubsDescription: (s.aboutSettings || s.about_settings).hubsDescription ?? prev.aboutSettings.hubsDescription,
              hubs: Array.isArray((s.aboutSettings || s.about_settings).hubs) && (s.aboutSettings || s.about_settings).hubs.length > 0
                ? (s.aboutSettings || s.about_settings).hubs
                : prev.aboutSettings.hubs,
              leadershipBadgeTag: (s.aboutSettings || s.about_settings).leadershipBadgeTag ?? prev.aboutSettings.leadershipBadgeTag,
              leadershipHeadline: (s.aboutSettings || s.about_settings).leadershipHeadline ?? prev.aboutSettings.leadershipHeadline,
              leadershipDescription: (s.aboutSettings || s.about_settings).leadershipDescription ?? prev.aboutSettings.leadershipDescription,
              leadership: Array.isArray((s.aboutSettings || s.about_settings).leadership) && (s.aboutSettings || s.about_settings).leadership.length > 0
                ? (s.aboutSettings || s.about_settings).leadership
                : prev.aboutSettings.leadership,
            } : prev.aboutSettings,
          }));
        }
      })
      .catch((err) => console.error("Settings load error:", err));
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Generic updater
  const updateSetting = <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Save to PostgreSQL
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...settings,
        announcementBadge: settings.announcements[0]?.badge || "LIVE",
        announcementText: settings.announcements[0]?.text || "",
        announcementLinkText: settings.announcements[0]?.linkText || "",
        announcementLinkUrl: settings.announcements[0]?.linkUrl || "",
        socialFacebook: settings.socialLinks.find((l) => l.platform.toLowerCase().includes("facebook"))?.url || "",
        socialInstagram: settings.socialLinks.find((l) => l.platform.toLowerCase().includes("instagram"))?.url || "",
        socialLinkedin: settings.socialLinks.find((l) => l.platform.toLowerCase().includes("linkedin"))?.url || "",
        socialPinterest: settings.socialLinks.find((l) => l.platform.toLowerCase().includes("pinterest"))?.url || "",
        socialTwitter: settings.socialLinks.find((l) => l.platform.toLowerCase().includes("twitter") || l.platform.toLowerCase() === "x" || l.platform.toLowerCase().includes("x (twitter)"))?.url || "",
        socialGithub: settings.socialLinks.find((l) => l.platform.toLowerCase().includes("github"))?.url || "",
      };

      const res = await fetch("/api/admin/website-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        if (showToast) showToast("Website settings saved successfully!", "success");
        else alert("Website settings saved successfully!");
      } else {
        if (showToast) showToast("Failed to save website settings", "error");
      }
    } catch {
      if (showToast) showToast("Error saving website settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    loadSettings();
    if (showToast) showToast("Settings reset to saved values", "success");
  };

  return (
    <div>
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 rounded-full mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
            <span className="text-[10px] font-bold text-[#1E40AF] uppercase tracking-wider">
              FRONTEND CONFIGURATION ENGINE
            </span>
          </div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Website &amp; Frontend Settings</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Control public website content, announcement bars, branding, contact coordinates, and footer details.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadSettings}
            className="px-4 py-2 bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#334155] text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>🔄</span> <span>Reload</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>💾</span> <span>{saving ? "Saving..." : "Save All Settings"}</span>
          </button>
        </div>
      </div>

      {/* Subtabs Bar */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#CBD5E1] pb-3 overflow-x-auto select-none">
        <button
          type="button"
          onClick={() => setSubTab("global")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "global"
              ? "bg-[#0052FF] text-white shadow-sm"
              : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🌐</span> <span>Global Settings</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("home")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "home"
              ? "bg-[#0052FF] text-white shadow-sm"
              : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🏠</span> <span>Home Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("about")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "about"
              ? "bg-[#0052FF] text-white shadow-sm"
              : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🏢</span> <span>About Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("contact")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "contact"
              ? "bg-[#0052FF] text-white shadow-sm"
              : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>📞</span> <span>Contact Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("portfolio")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "portfolio"
              ? "bg-[#0052FF] text-white shadow-sm"
              : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>💼</span> <span>Portfolio Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("header_footer")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "header_footer"
              ? "bg-[#0052FF] text-white shadow-sm"
              : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🎨</span> <span>Header &amp; Footer</span>
        </button>
      </div>

      {/* Clean Modular Form Content */}
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {subTab === "global" && (
          <GlobalSettingsSection settings={settings} onChange={updateSetting} />
        )}
        {subTab === "home" && (
          <HomeSettingsSection settings={settings} onChange={updateSetting} />
        )}
        {subTab === "about" && (
          <AboutSettingsSection settings={settings} onChange={updateSetting} />
        )}
        {subTab === "contact" && (
          <ContactSettingsSection settings={settings} onChange={updateSetting} />
        )}
        {subTab === "portfolio" && (
          <PortfolioSettingsSection settings={settings} onChange={updateSetting} />
        )}
        {subTab === "header_footer" && (
          <HeaderFooterSection settings={settings} onChange={updateSetting} />
        )}

        {/* Bottom Save / Reset Action Bar */}
        <div className="flex items-center justify-between border-t border-[#CBD5E1] pt-6">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#334155] text-xs font-bold rounded cursor-pointer"
          >
            Reset to Saved
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-7 py-2.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <span>💾</span> <span>{saving ? "Saving..." : "Save All Website Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
