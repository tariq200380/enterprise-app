"use client";

import React, { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import { PageSeoData, FALLBACK_SEO } from "@/lib/seo-types";

interface Props {
  showToast?: (msg: string, type?: any) => void;
}

const PAGE_LIST = [
  // 1. Core Pages
  { id: "global", label: "Global & Webmaster", icon: "🌐", route: "Default fallback for all pages" },
  { id: "home", label: "Home", icon: "🏠", route: "https://creed-tech.com/" },
  { id: "services", label: "Services", icon: "⚡", route: "https://creed-tech.com/services" },
  { id: "portfolio", label: "Portfolio", icon: "💼", route: "https://creed-tech.com/portfolio" },
  { id: "about", label: "About Us", icon: "🏢", route: "https://creed-tech.com/about" },
  { id: "contact", label: "Contact", icon: "✉️", route: "https://creed-tech.com/contact" },
  { id: "careers", label: "Careers", icon: "👥", route: "https://creed-tech.com/careers" },

  // 2. Knowledge & Articles
  { id: "knowledge_center", label: "Knowledge Center", icon: "📚", route: "https://creed-tech.com/knowledge-center" },
  { id: "articles", label: "Knowledge Articles & News", icon: "📰", route: "https://creed-tech.com/knowledge-center#articles" },

  // 3. Security & Legal Standards (7 Pages)
  { id: "security", label: "Security Center", icon: "🛡️", route: "https://creed-tech.com/security" },
  { id: "security_soc_2", label: "SOC 2 Type II", icon: "🔒", route: "https://creed-tech.com/security-soc-2" },
  { id: "security_iso_27001", label: "ISO 27001 ISMS", icon: "📜", route: "https://creed-tech.com/security-iso-27001" },
  { id: "security_pci_dss", label: "PCI DSS v4.0", icon: "💳", route: "https://creed-tech.com/security-pci-dss" },
  { id: "security_gdpr", label: "GDPR Sovereign", icon: "🇪🇺", route: "https://creed-tech.com/security-gdpr" },
  { id: "privacy_policy", label: "Privacy Policy", icon: "📋", route: "https://creed-tech.com/privacy-policy" },
  { id: "terms", label: "Terms & Conditions", icon: "⚖️", route: "https://creed-tech.com/terms" },
];

export default function SeoSettingsSection({ showToast }: Props) {
  const adminFetch = useAdminFetch();
  const [activePage, setActivePage] = useState<string>("global");
  const [allSeo, setAllSeo] = useState<Record<string, PageSeoData>>(FALLBACK_SEO);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // Fetch all SEO records on mount
  useEffect(() => {
    adminFetch("/api/admin/seo")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.seo) {
          setAllSeo((prev) => ({ ...prev, ...data.seo }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [adminFetch]);

  const currentData: PageSeoData = allSeo[activePage] || FALLBACK_SEO[activePage] || {
    page_key: activePage,
    title: "",
    description: "",
    keywords: "",
    og_image: "",
    canonical_url: "",
    no_index: false,
    no_follow: false,
    meta_tags: {},
  };

  const updateCurrentField = <K extends keyof PageSeoData>(field: K, value: PageSeoData[K]) => {
    setAllSeo((prev) => ({
      ...prev,
      [activePage]: {
        ...currentData,
        [field]: value,
      },
    }));
  };

  const updateMetaTagField = (key: string, value: string) => {
    setAllSeo((prev) => ({
      ...prev,
      [activePage]: {
        ...currentData,
        meta_tags: {
          ...(currentData.meta_tags || {}),
          [key]: value,
        },
      },
    }));
  };

  const handleSaveCurrentPage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await adminFetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentData),
      });

      const data = await res.json();
      if (data.success) {
        if (showToast) {
          showToast(`✓ SEO settings saved for ${PAGE_LIST.find((p) => p.id === activePage)?.label || activePage}!`);
        }
      } else {
        throw new Error(data.error || "Failed to save SEO settings");
      }
    } catch (err: any) {
      if (showToast) showToast(err.message || "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const titleLength = (currentData.title || "").length;
  const descLength = (currentData.description || "").length;

  const selectedMeta = PAGE_LIST.find((p) => p.id === activePage);

  if (loading) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center text-slate-500 shadow-xs">
        <div className="inline-block w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin mb-3" />
        <div className="text-xs font-semibold">Loading SEO settings...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <h3 className="text-base font-bold text-[#0F172A] m-0 font-outfit">
              SEO &amp; Search Engine Optimization Manager
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage search engine meta tags, Google SERP previews, social share cards (OpenGraph), and webmaster verification without touching code.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveCurrentPage}
          disabled={saving}
          className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-[0_2px_8px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,0,0.35)] flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
        >
          <span>💾</span>
          <span>{saving ? "Saving..." : `Save ${selectedMeta?.label} SEO`}</span>
        </button>
      </div>

      {/* 2. Page Navigation Selector Tabs */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-1.5 flex flex-wrap gap-1.5">
        {PAGE_LIST.map((page) => {
          const isActive = activePage === page.id;
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => setActivePage(page.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#FF6B00] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:text-[#0F172A] border border-[#E2E8F0] hover:border-orange-200"
              }`}
            >
              <span>{page.icon}</span>
              <span>{page.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Editor Form Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Fields */}
        <div className="md:col-span-7 flex flex-col gap-5">
          {/* Card: Primary Meta Tags */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col gap-4">
            <div className="pb-3 border-b border-[#F1F5F9] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 m-0">
                  Page Meta Tags: {selectedMeta?.label}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                  {selectedMeta?.route}
                </span>
              </div>
            </div>

            {/* Page Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Page Title (Meta Title) <span className="text-[#FF6B00]">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    titleLength > 60 ? "text-amber-600" : titleLength > 0 ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {titleLength} / 60 chars {titleLength > 60 ? "(may truncate on Google)" : ""}
                </span>
              </div>
              <input
                type="text"
                required
                value={currentData.title}
                onChange={(e) => updateCurrentField("title", e.target.value)}
                placeholder="e.g. Enterprise Services & Engineering Solutions | Creed Tech"
                className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all font-medium"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Meta Description <span className="text-[#FF6B00]">*</span>
                </label>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    descLength > 160 ? "text-amber-600" : descLength > 0 ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {descLength} / 160 chars {descLength > 160 ? "(may truncate on Google)" : ""}
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={currentData.description}
                onChange={(e) => updateCurrentField("description", e.target.value)}
                placeholder="Write a compelling 150-160 character description of this page to maximize Google search clicks..."
                className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all leading-relaxed"
              />
            </div>

            {/* Focus Keywords */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Focus Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={currentData.keywords}
                onChange={(e) => updateCurrentField("keywords", e.target.value)}
                placeholder="e.g. Cloud Modernization, Custom Software Engineering, AI Workflow Automation"
                className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
            </div>
          </div>

          {/* Card: Social Media Share Banner (OpenGraph) */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 m-0 pb-3 border-b border-[#F1F5F9]">
              Social Media Card (OpenGraph / Twitter Preview Image)
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Share Banner Image URL (Recommended: 1200 x 630px)
              </label>
              <input
                type="text"
                value={currentData.og_image}
                onChange={(e) => updateCurrentField("og_image", e.target.value)}
                placeholder="e.g. /images/hero-services-web-q90.webp or full HTTPS URL"
                className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                This image displays when this page link is shared on WhatsApp, LinkedIn, X (Twitter), or Facebook.
              </span>
            </div>

            {currentData.og_image && (
              <div className="relative aspect-[1200/630] max-h-40 rounded-lg overflow-hidden border border-[#E2E8F0] bg-slate-100 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentData.og_image}
                  alt="OpenGraph Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Card: Indexing & Directives */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 m-0 pb-3 border-b border-[#F1F5F9]">
              Search Engine Crawl Directives
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!currentData.no_index}
                  onChange={(e) => updateCurrentField("no_index", !e.target.checked)}
                  className="rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                />
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">Index in Google (index)</span>
                  <span className="text-[10px] text-slate-500">Allow search engines to show this page in search results.</span>
                </div>
              </label>

              <label className="flex items-center gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!currentData.no_follow}
                  onChange={(e) => updateCurrentField("no_follow", !e.target.checked)}
                  className="rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                />
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">Follow Links (follow)</span>
                  <span className="text-[10px] text-slate-500">Allow search engine bots to crawl hyperlinks on this page.</span>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Canonical URL Override (Optional)
              </label>
              <input
                type="text"
                value={currentData.canonical_url}
                onChange={(e) => updateCurrentField("canonical_url", e.target.value)}
                placeholder="e.g. https://creed-tech.com/services"
                className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
            </div>
          </div>

          {/* Card: Webmaster Verification (Global Only) */}
          {activePage === "global" && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 m-0 pb-3 border-b border-[#F1F5F9]">
                Webmaster &amp; Analytics Verification Codes
              </h4>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Search Console Verification Code (HTML Tag Content)
                </label>
                <input
                  type="text"
                  value={currentData.meta_tags?.googleVerification || ""}
                  onChange={(e) => updateMetaTagField("googleVerification", e.target.value)}
                  placeholder="e.g. your-google-site-verification-hash"
                  className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bing Webmaster Verification Code
                </label>
                <input
                  type="text"
                  value={currentData.meta_tags?.bingVerification || ""}
                  onChange={(e) => updateMetaTagField("bingVerification", e.target.value)}
                  placeholder="e.g. your-bing-site-verification-hash"
                  className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  value={currentData.meta_tags?.gaMeasurementId || ""}
                  onChange={(e) => updateMetaTagField("gaMeasurementId", e.target.value)}
                  placeholder="e.g. G-XXXXXXXXXX"
                  className="w-full px-3.5 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                />
              </div>
            </div>
          )}

          {/* Bottom Save Button */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={handleSaveCurrentPage}
              disabled={saving}
              className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-[0_2px_8px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,0,0.35)] flex items-center gap-2 disabled:opacity-50"
            >
              <span>💾</span>
              <span>{saving ? "Saving..." : `Save ${selectedMeta?.label} SEO`}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Google SERP & Social Preview Deck */}
        <div className="md:col-span-5 flex flex-col gap-5 sticky top-6">
          {/* Live Google SERP Card Preview */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🔎</span>
                <span className="text-xs font-bold text-[#0F172A]">Live Google Search Snippet Preview</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Desktop / Mobile
              </span>
            </div>

            {/* Google SERP Simulated Box */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col gap-1 text-left font-sans">
              <div className="flex items-center gap-2 text-xs text-[#202124]">
                <div className="w-5 h-5 rounded-full bg-[#FF6B00] text-white flex items-center justify-center text-[10px] font-black">
                  C
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-medium text-[#202124]">Creed Tech</span>
                  <span className="text-[10px] text-[#4d5156] font-mono truncate max-w-[260px]">
                    {currentData.canonical_url || selectedMeta?.route || "https://creed-tech.com"}
                  </span>
                </div>
              </div>

              <div className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug mt-1 font-sans">
                {currentData.title || "Untitled Page | CREED TECH"}
              </div>

              <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3 mt-0.5 m-0 font-normal">
                {currentData.description || "No meta description configured for this page. Google will automatically generate a snippet from on-page content."}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
              💡 <strong>Pro SEO Tip:</strong> Keep your Title between <strong>50–60 characters</strong> and your Description between <strong>140–160 characters</strong> for maximum organic click-through rate (CTR).
            </div>
          </div>

          {/* Social Share Preview (WhatsApp / LinkedIn) */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-1.5 pb-2 border-b border-[#F1F5F9]">
              <span className="text-base">📱</span>
              <span className="text-xs font-bold text-[#0F172A]">Social Card Preview (LinkedIn / WhatsApp)</span>
            </div>

            <div className="rounded-lg overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="aspect-[1200/630] bg-slate-200 relative overflow-hidden flex items-center justify-center">
                {currentData.og_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentData.og_image}
                    alt="Social Card"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-slate-400 font-mono">No Image Configured</span>
                )}
              </div>
              <div className="p-3 bg-white">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block mb-0.5">
                  creed-tech.com
                </span>
                <div className="text-xs font-bold text-[#0F172A] line-clamp-1">
                  {currentData.title || "Page Title"}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                  {currentData.description || "Page Description"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
