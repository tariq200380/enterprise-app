"use client";

import React from "react";
import { AboutSettingsData, ReviewLinksData, ReviewPlatformItem } from "../types";

interface Props {
  data: AboutSettingsData;
  onChangeField: <K extends keyof AboutSettingsData>(
    field: K,
    value: AboutSettingsData[K]
  ) => void;
}

const DEFAULT_PLATFORMS: ReviewPlatformItem[] = [
  {
    id: "the-manifest",
    name: "The Manifest",
    url: "https://themanifest.com",
    enabled: true,
  },
  {
    id: "shopify-partners",
    name: "Shopify Partners",
    url: "https://www.shopify.com/partners",
    enabled: true,
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    url: "https://www.trustpilot.com",
    enabled: true,
  },
  {
    id: "clutch",
    name: "Clutch",
    url: "https://clutch.co",
    enabled: true,
  },
  {
    id: "google-reviews",
    name: "Google Reviews",
    url: "https://www.google.com",
    enabled: true,
  },
];

export default function AboutReviewLinksCard({ data, onChangeField }: Props) {
  const currentReviewLinks: ReviewLinksData = data.reviewLinks || {};
  const sectionTitle = currentReviewLinks.sectionTitle ?? "Reviewed & Recommended On";

  // Derive platforms list: use configured platforms array if present, or initialize from default values
  const platforms: ReviewPlatformItem[] =
    Array.isArray(currentReviewLinks.platforms) && currentReviewLinks.platforms.length > 0
      ? currentReviewLinks.platforms
      : DEFAULT_PLATFORMS.map((p) => {
          const legacyUrl =
            p.id === "the-manifest" ? currentReviewLinks.theManifestUrl :
            p.id === "shopify-partners" ? currentReviewLinks.shopifyUrl :
            p.id === "trustpilot" ? currentReviewLinks.trustpilotUrl :
            p.id === "clutch" ? currentReviewLinks.clutchUrl :
            p.id === "google-reviews" ? currentReviewLinks.googleReviewsUrl : undefined;
          return legacyUrl ? { ...p, url: legacyUrl } : p;
        });

  const updateReviewLinks = (updatedPlatforms: ReviewPlatformItem[], newTitle?: string) => {
    const findUrl = (keyword: string, fallback: string) => {
      const match = updatedPlatforms.find(
        (p) => p.name.toLowerCase().includes(keyword) || p.id.toLowerCase().includes(keyword)
      );
      return match ? match.url : fallback;
    };

    onChangeField("reviewLinks", {
      ...currentReviewLinks,
      sectionTitle: newTitle !== undefined ? newTitle : sectionTitle,
      platforms: updatedPlatforms,
      theManifestUrl: findUrl("manifest", currentReviewLinks.theManifestUrl || "https://themanifest.com"),
      shopifyUrl: findUrl("shopify", currentReviewLinks.shopifyUrl || "https://www.shopify.com/partners"),
      trustpilotUrl: findUrl("trustpilot", currentReviewLinks.trustpilotUrl || "https://www.trustpilot.com"),
      clutchUrl: findUrl("clutch", currentReviewLinks.clutchUrl || "https://clutch.co"),
      googleReviewsUrl: findUrl("google", currentReviewLinks.googleReviewsUrl || "https://www.google.com"),
    });
  };

  const handlePlatformChange = (
    index: number,
    field: keyof ReviewPlatformItem,
    value: string | boolean
  ) => {
    const updated = [...platforms];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateReviewLinks(updated);
  };

  const handleAddPlatform = () => {
    const newPlatform: ReviewPlatformItem = {
      id: `platform-${Date.now()}`,
      name: "",
      url: "https://",
      enabled: true,
    };
    updateReviewLinks([...platforms, newPlatform]);
  };

  const handleDeletePlatform = (index: number) => {
    const updated = platforms.filter((_, i) => i !== index);
    updateReviewLinks(updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
              ⭐
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">
              Trust Badges &amp; Review Platforms (Trustpilot, Google Reviews, etc.)
            </h3>
          </div>
          <p className="text-xs text-[#64748B]">
            Configure trust badges, ratings, and profile links shown in the About Hero and throughout the site.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddPlatform}
          className="px-3.5 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add Platform</span>
        </button>
      </div>

      {/* Section Title Input */}
      <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-4">
        <label className="block text-xs font-semibold text-[#334155] mb-1">
          Review Ribbon Title / Label
        </label>
        <input
          type="text"
          value={sectionTitle}
          onChange={(e) => updateReviewLinks(platforms, e.target.value)}
          placeholder="Reviewed & Recommended On"
          className="w-full max-w-md px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-semibold"
        />
        <span className="text-[11px] text-slate-500 mt-1 block">
          This title appears above or next to the trust platform links in the hero section ribbon.
        </span>
      </div>

      {/* Platforms List */}
      <div className="flex flex-col gap-3.5">
        <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
          ACTIVE REVIEW PLATFORMS &amp; DESTINATION LINKS ({platforms.length})
        </div>

        {platforms.map((platform, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          const isValidUrl =
            platform.url &&
            (platform.url.startsWith("http://") || platform.url.startsWith("https://"));

          return (
            <div
              key={platform.id || `platform-${idx}`}
              className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#0052FF] text-white text-[10px] font-bold flex items-center justify-center">
                    {num}
                  </span>
                  <span className="text-xs font-bold text-[#0F172A]">
                    {platform.name || `New Review Platform`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-1.5 text-xs text-[#334155] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={platform.enabled !== false}
                      onChange={(e) => handlePlatformChange(idx, "enabled", e.target.checked)}
                      className="rounded border-gray-300 text-[#0052FF] focus:ring-0 cursor-pointer"
                    />
                    <span className="text-[11px] font-medium">
                      {platform.enabled !== false ? "Visible" : "Hidden"}
                    </span>
                  </label>

                  {isValidUrl && (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0052FF] hover:underline"
                    >
                      <span>Test Link</span>
                      <span>↗</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeletePlatform(idx)}
                    className="px-2.5 py-1 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[11px] font-bold rounded cursor-pointer transition-colors"
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Platform Name */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                    Platform Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={platform.name}
                    onChange={(e) => handlePlatformChange(idx, "name", e.target.value)}
                    placeholder="e.g. Trustpilot or Google Reviews"
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-medium"
                  />
                </div>

                {/* Destination URL */}
                <div className="sm:col-span-8">
                  <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                    Destination Website / Profile URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={platform.url}
                    onChange={(e) => handlePlatformChange(idx, "url", e.target.value)}
                    placeholder="https://www.trustpilot.com/review/..."
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
