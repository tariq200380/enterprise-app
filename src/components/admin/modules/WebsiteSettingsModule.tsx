"use client";

import React, { useState } from "react";

interface WebsiteSettingsModuleProps {
  showToast?: (msg: string, type: "success" | "error") => void;
}

export default function WebsiteSettingsModule({ showToast }: WebsiteSettingsModuleProps) {
  const [subTab, setSubTab] = useState<"home" | "about" | "contact" | "portfolio" | "header_footer" | "global">("global");
  const [saving, setSaving] = useState(false);

  // Form states
  const [siteName, setSiteName] = useState("Creed Technologies");
  const [siteTagline, setSiteTagline] = useState("Enterprise AI & Cloud Engineering");
  const [contactEmail, setContactEmail] = useState("contact@creedtech.com");
  const [contactPhone, setContactPhone] = useState("+1 (800) 555-0199");
  const [officeAddress, setOfficeAddress] = useState("100 Innovation Blvd, Tech District, CA");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [announcementBadge, setAnnouncementBadge] = useState("NEW");
  const [announcementText, setAnnouncementText] = useState("Creed Quantum Cloud Engine 4.0 is now live across all nodes.");
  const [announcementLinkText, setAnnouncementLinkText] = useState("Explore Changelog");
  const [announcementLinkUrl, setAnnouncementLinkUrl] = useState("/knowledge");
  const [copyrightText, setCopyrightText] = useState("© 2026 Creed Technologies Inc. All rights reserved.");
  const [socialFacebook, setSocialFacebook] = useState("https://facebook.com/creedtech");
  const [socialInstagram, setSocialInstagram] = useState("https://instagram.com/creedtech");
  const [socialLinkedin, setSocialLinkedin] = useState("https://linkedin.com/company/creedtech");
  const [socialPinterest, setSocialPinterest] = useState("https://pinterest.com/creedtech");
  const [socialTwitter, setSocialTwitter] = useState("https://twitter.com/creedtech");
  const [socialGithub, setSocialGithub] = useState("https://github.com/creedtech");
  const [heroHeadline, setHeroHeadline] = useState("Architecting The Next Era Of Cognitive Systems");
  const [heroSubheadline, setHeroSubheadline] = useState("Enterprise-grade machine intelligence, distributed neural cloud clusters, and mission-critical cybersecurity.");
  const [heroCta1Text, setHeroCta1Text] = useState("Deploy Cluster");
  const [heroCta1Url, setHeroCta1Url] = useState("/contact");
  const [heroCta2Text, setHeroCta2Text] = useState("Knowledge Center");
  const [heroCta2Url, setHeroCta2Url] = useState("/knowledge");
  const [aboutMission, setAboutMission] = useState("To accelerate human potential through resilient, autonomous, and ethically governed intelligence infrastructure.");
  const [aboutVision, setAboutVision] = useState("A globally synchronized cognitive enterprise network operating at microsecond latencies.");
  const [statEngineers, setStatEngineers] = useState("250+");
  const [statHubs, setStatHubs] = useState("18");
  const [statUptime, setStatUptime] = useState("99.999%");
  const [statSystems, setStatSystems] = useState("1,400+");
  const [contactHeroBadge, setContactHeroBadge] = useState("GLOBAL ENGAGEMENT");
  const [contactHeroTitle, setContactHeroTitle] = useState("Initiate High-Impact Collaboration");
  const [contactHeroDesc, setContactHeroDesc] = useState("Connect with our technical architects and mission-critical deployment leads worldwide.");
  const [headerLogoUrl, setHeaderLogoUrl] = useState("");
  const [headerCtaText, setHeaderCtaText] = useState("Schedule Consultation");
  const [headerCtaUrl, setHeaderCtaUrl] = useState("/contact");
  const [footerP1, setFooterP1] = useState("Pioneering high-assurance cognitive cloud infrastructure for Fortune 500 enterprises.");

  const loadSettings = () => {
    fetch("/api/admin/website-settings")
      .then(res => res.json())
      .then(data => {
        const s = data.settings || data;
        if (s) {
          if (s.siteName) setSiteName(s.siteName);
          if (s.siteTagline) setSiteTagline(s.siteTagline);
          if (s.contactEmail) setContactEmail(s.contactEmail);
          if (s.contactPhone) setContactPhone(s.contactPhone);
          if (s.officeAddress) setOfficeAddress(s.officeAddress);
          if (s.showAnnouncement !== undefined) setShowAnnouncement(Boolean(s.showAnnouncement));
          if (s.announcementBadge) setAnnouncementBadge(s.announcementBadge);
          if (s.announcementText) setAnnouncementText(s.announcementText);
          if (s.announcementLinkText) setAnnouncementLinkText(s.announcementLinkText);
          if (s.announcementLinkUrl) setAnnouncementLinkUrl(s.announcementLinkUrl);
          if (s.copyrightText) setCopyrightText(s.copyrightText);
          if (s.socialFacebook) setSocialFacebook(s.socialFacebook);
          if (s.socialInstagram) setSocialInstagram(s.socialInstagram);
          if (s.socialLinkedin) setSocialLinkedin(s.socialLinkedin);
          if (s.socialPinterest) setSocialPinterest(s.socialPinterest);
          if (s.socialTwitter) setSocialTwitter(s.socialTwitter);
          if (s.socialGithub) setSocialGithub(s.socialGithub);
          if (s.heroHeadline) setHeroHeadline(s.heroHeadline);
          if (s.heroSubheadline) setHeroSubheadline(s.heroSubheadline);
          if (s.heroCta1Text) setHeroCta1Text(s.heroCta1Text);
          if (s.heroCta1Url) setHeroCta1Url(s.heroCta1Url);
          if (s.heroCta2Text) setHeroCta2Text(s.heroCta2Text);
          if (s.heroCta2Url) setHeroCta2Url(s.heroCta2Url);
          if (s.aboutMission) setAboutMission(s.aboutMission);
          if (s.aboutVision) setAboutVision(s.aboutVision);
          if (s.statEngineers) setStatEngineers(s.statEngineers);
          if (s.statHubs) setStatHubs(s.statHubs);
          if (s.statUptime) setStatUptime(s.statUptime);
          if (s.statSystems) setStatSystems(s.statSystems);
          if (s.contactHeroBadge) setContactHeroBadge(s.contactHeroBadge);
          if (s.contactHeroTitle) setContactHeroTitle(s.contactHeroTitle);
          if (s.contactHeroDesc) setContactHeroDesc(s.contactHeroDesc);
          if (s.headerLogoUrl) setHeaderLogoUrl(s.headerLogoUrl);
          if (s.headerCtaText) setHeaderCtaText(s.headerCtaText);
          if (s.headerCtaUrl) setHeaderCtaUrl(s.headerCtaUrl);
          if (s.footerP1) setFooterP1(s.footerP1);
          return;
        }
        if (data && !data.error) {
          if (data.site_name) setSiteName(data.site_name);
          if (data.site_tagline) setSiteTagline(data.site_tagline);
          if (data.contact_email) setContactEmail(data.contact_email);
          if (data.contact_phone) setContactPhone(data.contact_phone);
          if (data.office_address) setOfficeAddress(data.office_address);
          if (data.show_announcement !== undefined) setShowAnnouncement(Boolean(data.show_announcement));
          if (data.announcement_badge) setAnnouncementBadge(data.announcement_badge);
          if (data.announcement_text) setAnnouncementText(data.announcement_text);
          if (data.announcement_link_text) setAnnouncementLinkText(data.announcement_link_text);
          if (data.announcement_link_url) setAnnouncementLinkUrl(data.announcement_link_url);
          if (data.copyright_text) setCopyrightText(data.copyright_text);
          if (data.social_facebook) setSocialFacebook(data.social_facebook);
          if (data.social_instagram) setSocialInstagram(data.social_instagram);
          if (data.social_linkedin) setSocialLinkedin(data.social_linkedin);
          if (data.social_pinterest) setSocialPinterest(data.social_pinterest);
          if (data.social_twitter) setSocialTwitter(data.social_twitter);
          if (data.social_github) setSocialGithub(data.social_github);
          if (data.hero_headline) setHeroHeadline(data.hero_headline);
          if (data.hero_subheadline) setHeroSubheadline(data.hero_subheadline);
          if (data.hero_cta1_text) setHeroCta1Text(data.hero_cta1_text);
          if (data.hero_cta1_url) setHeroCta1Url(data.hero_cta1_url);
          if (data.hero_cta2_text) setHeroCta2Text(data.hero_cta2_text);
          if (data.hero_cta2_url) setHeroCta2Url(data.hero_cta2_url);
          if (data.about_mission) setAboutMission(data.about_mission);
          if (data.about_vision) setAboutVision(data.about_vision);
          if (data.stat_engineers) setStatEngineers(data.stat_engineers);
          if (data.stat_hubs) setStatHubs(data.stat_hubs);
          if (data.stat_uptime) setStatUptime(data.stat_uptime);
          if (data.stat_systems) setStatSystems(data.stat_systems);
          if (data.contact_hero_badge) setContactHeroBadge(data.contact_hero_badge);
          if (data.contact_hero_title) setContactHeroTitle(data.contact_hero_title);
          if (data.contact_hero_desc) setContactHeroDesc(data.contact_hero_desc);
          if (data.header_logo_url) setHeaderLogoUrl(data.header_logo_url);
          if (data.header_cta_text) setHeaderCtaText(data.header_cta_text);
          if (data.header_cta_url) setHeaderCtaUrl(data.header_cta_url);
          if (data.footer_p1) setFooterP1(data.footer_p1);
        }
      })
      .catch(err => console.error("Settings load error:", err));
  };

  React.useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        siteName,
        siteTagline,
        contactEmail,
        contactPhone,
        officeAddress,
        showAnnouncement,
        announcementBadge,
        announcementText,
        announcementLinkText,
        announcementLinkUrl,
        copyrightText,
        socialFacebook,
        socialInstagram,
        socialLinkedin,
        socialPinterest,
        socialTwitter,
        socialGithub,
        heroHeadline,
        heroSubheadline,
        heroCta1Text,
        heroCta1Url,
        heroCta2Text,
        heroCta2Url,
        aboutMission,
        aboutVision,
        statEngineers,
        statHubs,
        statUptime,
        statSystems,
        contactHeroBadge,
        contactHeroTitle,
        contactHeroDesc,
        headerLogoUrl,
        headerCtaText,
        headerCtaUrl,
        footerP1,
      };
      const res = await fetch("/api/admin/website-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        if (showToast) showToast("Website settings saved to PostgreSQL 18!", "success");
        else alert("Website settings saved!");
      } else {
        if (showToast) showToast("Failed to save website settings", "error");
      }
    } catch (err) {
      if (showToast) showToast("Error saving website settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    loadSettings();
    if (showToast) showToast("Settings reset to last saved state", "success");
  };


  return (
    <div>
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
            className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>💾</span> <span>Save All Settings</span>
          </button>
        </div>
      </div>

      {/* Subtabs Bar */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#CBD5E1] pb-3 overflow-x-auto select-none">
        <button
          type="button"
          onClick={() => setSubTab("home")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "home" ? "bg-[#0052FF] text-white shadow-sm" : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🏠</span> <span>Home Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("about")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "about" ? "bg-[#0052FF] text-white shadow-sm" : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🏢</span> <span>About Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("contact")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "contact" ? "bg-[#0052FF] text-white shadow-sm" : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>📞</span> <span>Contact Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("portfolio")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "portfolio" ? "bg-[#0052FF] text-white shadow-sm" : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>💼</span> <span>Portfolio Page</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("header_footer")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "header_footer" ? "bg-[#0052FF] text-white shadow-sm" : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🎨</span> <span>Header &amp; Footer</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab("global")}
          className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
            subTab === "global" ? "bg-[#0052FF] text-white shadow-sm" : "bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] hover:bg-[#E2E8F0]"
          }`}
        >
          <span>🌐</span> <span>Global Settings</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {subTab === "global" && (
          <div className="flex flex-col gap-6">
            {/* Card 1: Branding */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2.5 pb-3.5 mb-5 border-b border-[#F1F5F9]">
                <span className="text-xl">🏢</span>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">General Site Information &amp; Branding</h3>
                  <p className="text-xs text-[#64748B]">Core company details and primary identity.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Website / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Company Tagline / Slogan</label>
                  <input
                    type="text"
                    value={siteTagline}
                    onChange={(e) => setSiteTagline(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Support Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Primary Office Address</label>
                  <input
                    type="text"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Top Announcement */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#F1F5F9] flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">📢</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">Top Live Announcement Bar</h3>
                    <p className="text-xs text-[#64748B]">Header banner displayed on all public pages.</p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showAnnouncement}
                    onChange={(e) => setShowAnnouncement(e.target.checked)}
                    className="w-4 h-4 text-[#0052FF] rounded cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#0F172A]">Show Announcement Bar</span>
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr_140px_160px] gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Badge Label</label>
                  <input
                    type="text"
                    value={announcementBadge}
                    onChange={(e) => setAnnouncementBadge(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded-md font-bold outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Message Text *</label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Link Text</label>
                  <input
                    type="text"
                    value={announcementLinkText}
                    onChange={(e) => setAnnouncementLinkText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Link URL</label>
                  <input
                    type="text"
                    value={announcementLinkUrl}
                    onChange={(e) => setAnnouncementLinkUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Footer & Social Links */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2.5 pb-3.5 mb-5 border-b border-[#F1F5F9]">
                <span className="text-xl">🔗</span>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Footer Information &amp; Social Links</h3>
                  <p className="text-xs text-[#64748B]">Official corporate social profiles and copyright notice.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Copyright Notice</label>
                  <input
                    type="text"
                    value={copyrightText}
                    onChange={(e) => setCopyrightText(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Facebook URL</label>
                  <input
                    type="url"
                    value={socialFacebook}
                    onChange={(e) => setSocialFacebook(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    value={socialLinkedin}
                    onChange={(e) => setSocialLinkedin(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">Twitter / X URL</label>
                  <input
                    type="url"
                    value={socialTwitter}
                    onChange={(e) => setSocialTwitter(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">GitHub URL</label>
                  <input
                    type="url"
                    value={socialGithub}
                    onChange={(e) => setSocialGithub(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-[#CBD5E1] rounded-md outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {subTab === "home" && (
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] border-b pb-3">Homepage Hero Content</h3>
            <div>
              <label className="block text-xs font-semibold mb-1">Hero Headline</label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded font-bold outline-none focus:border-[#0052FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Hero Subheadline</label>
              <textarea
                rows={3}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Primary CTA Button</label>
                <input
                  type="text"
                  value={heroCta1Text}
                  onChange={(e) => setHeroCta1Text(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Primary CTA URL</label>
                <input
                  type="text"
                  value={heroCta1Url}
                  onChange={(e) => setHeroCta1Url(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {subTab === "about" && (
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] border-b pb-3">About Page Vision &amp; Statistics</h3>
            <div>
              <label className="block text-xs font-semibold mb-1">Mission Statement</label>
              <textarea
                rows={2}
                value={aboutMission}
                onChange={(e) => setAboutMission(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Vision Statement</label>
              <textarea
                rows={2}
                value={aboutVision}
                onChange={(e) => setAboutVision(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Engineers</label>
                <input
                  type="text"
                  value={statEngineers}
                  onChange={(e) => setStatEngineers(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Global Hubs</label>
                <input
                  type="text"
                  value={statHubs}
                  onChange={(e) => setStatHubs(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Uptime SLA</label>
                <input
                  type="text"
                  value={statUptime}
                  onChange={(e) => setStatUptime(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Systems Deployed</label>
                <input
                  type="text"
                  value={statSystems}
                  onChange={(e) => setStatSystems(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {subTab === "contact" && (
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] border-b pb-3">Contact Page Guarantee &amp; SLAs</h3>
            <div>
              <label className="block text-xs font-semibold mb-1">Hero Badge Text</label>
              <input
                type="text"
                value={contactHeroBadge}
                onChange={(e) => setContactHeroBadge(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Hero Title</label>
              <input
                type="text"
                value={contactHeroTitle}
                onChange={(e) => setContactHeroTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Description &amp; Guarantee</label>
              <textarea
                rows={3}
                value={contactHeroDesc}
                onChange={(e) => setContactHeroDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
              />
            </div>
          </div>
        )}

        {subTab === "portfolio" && (
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] border-b pb-3">Portfolio Showcase Settings</h3>
            <p className="text-xs text-[#64748B]">Configure introductory text and case-study request banners.</p>
            <div>
              <label className="block text-xs font-semibold mb-1">Portfolio Headline</label>
              <input
                type="text"
                defaultValue="Enterprise Software Architecture &amp; High-Throughput Cloud Platforms"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
              />
            </div>
          </div>
        )}

        {subTab === "header_footer" && (
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#0F172A] border-b pb-3">Header Navigation &amp; Footer Text</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Header Logo URL</label>
                <input
                  type="text"
                  value={headerLogoUrl}
                  onChange={(e) => setHeaderLogoUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Header CTA Text</label>
                <input
                  type="text"
                  value={headerCtaText}
                  onChange={(e) => setHeaderCtaText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Footer Paragraph 1</label>
              <input
                type="text"
                value={footerP1}
                onChange={(e) => setFooterP1(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
              />
            </div>
          </div>
        )}

        {/* Bottom Bar Buttons */}
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
            className="px-7 py-2.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow cursor-pointer flex items-center gap-2"
          >
            <span>💾</span> <span>Save All Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
