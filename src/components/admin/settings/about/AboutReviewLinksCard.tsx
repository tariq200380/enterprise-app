"use client";

import React from "react";
import { AboutSettingsData, ReviewLinksData } from "../types";

interface Props {
  data: AboutSettingsData;
  onChangeField: <K extends keyof AboutSettingsData>(
    field: K,
    value: AboutSettingsData[K]
  ) => void;
}

const DEFAULT_REVIEW_LINKS: ReviewLinksData = {
  theManifestUrl: "https://themanifest.com",
  shopifyUrl: "https://www.shopify.com/partners",
  trustpilotUrl: "https://www.trustpilot.com",
  clutchUrl: "https://clutch.co",
  googleReviewsUrl: "https://www.google.com",
};

interface PlatformConfig {
  key: keyof ReviewLinksData;
  label: string;
  badge: string;
  icon: string;
  placeholder: string;
  description: string;
}

const PLATFORMS: PlatformConfig[] = [
  {
    key: "theManifestUrl",
    label: "The Manifest",
    badge: "B2B RESEARCH",
    icon: "📄",
    placeholder: "https://themanifest.com/company/...",
    description: "Company profile or award listing on The Manifest directory.",
  },
  {
    key: "shopifyUrl",
    label: "Shopify Partners",
    badge: "ECOSYSTEM",
    icon: "🛍️",
    placeholder: "https://www.shopify.com/partners/directory/partner/...",
    description: "Official verified Shopify Plus / Enterprise Partner profile URL.",
  },
  {
    key: "trustpilotUrl",
    label: "Trustpilot",
    badge: "CUSTOMER TRUST",
    icon: "⭐",
    placeholder: "https://www.trustpilot.com/review/...",
    description: "Verified client feedback and customer rating page on Trustpilot.",
  },
  {
    key: "clutchUrl",
    label: "Clutch",
    badge: "GLOBAL DIRECTORY",
    icon: "🏆",
    placeholder: "https://clutch.co/profile/...",
    description: "Verified B2B client reviews, rating scorecard, and Clutch matrix.",
  },
  {
    key: "googleReviewsUrl",
    label: "Google Reviews",
    badge: "SEARCH & MAPS",
    icon: "🔍",
    placeholder: "https://www.google.com/maps/place/...",
    description: "Google Business Profile or direct Google review write-up URL.",
  },
];

export default function AboutReviewLinksCard({ data, onChangeField }: Props) {
  const currentLinks: ReviewLinksData = {
    ...DEFAULT_REVIEW_LINKS,
    ...(data.reviewLinks || {}),
  };

  const handleUrlChange = (key: keyof ReviewLinksData, value: string) => {
    const updated: ReviewLinksData = {
      ...currentLinks,
      [key]: value,
    };
    onChangeField("reviewLinks", updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
              🔗
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">
              Reviewed &amp; Recommended On (5 Platform Links)
            </h3>
          </div>
          <p className="text-xs text-[#64748B]">
            Configure the destination URLs for the 5 trust badges displayed in the About page Hero section
            (The Manifest, Shopify Partners, Trustpilot, Clutch, Google Reviews).
          </p>
        </div>
      </div>

      {/* 5 Platform Rows */}
      <div className="flex flex-col gap-3.5">
        {PLATFORMS.map((platform, idx) => {
          const value = currentLinks[platform.key] || "";
          const isValidUrl =
            value.startsWith("http://") || value.startsWith("https://");

          return (
            <div
              key={platform.key}
              className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#0052FF] text-white text-[10px] font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                    <span>{platform.icon}</span>
                    <span>{platform.label}</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#3B82F6] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {platform.badge}
                  </span>
                </div>

                {isValidUrl && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0052FF] hover:text-[#0042D0] hover:underline cursor-pointer"
                  >
                    <span>Test Link</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-8">
                  <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                    Destination Website / Profile URL
                  </label>
                  <input
                    type="url"
                    value={value}
                    onChange={(e) => handleUrlChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] bg-white font-mono"
                  />
                </div>
                <div className="sm:col-span-4">
                  <span className="text-[11px] text-slate-500 leading-tight block">
                    {platform.description}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
