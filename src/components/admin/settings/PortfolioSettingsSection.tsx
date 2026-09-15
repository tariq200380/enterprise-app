"use client";

import React from "react";
import { WebsiteSettingsData, PortfolioShowcaseSettings } from "./types";
import PortfolioShowcaseCard from "./portfolio/PortfolioShowcaseCard";

interface PortfolioSettingsSectionProps {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
  onNavigateTab?: (tab: string) => void;
}

export default function PortfolioSettingsSection({
  settings,
  onChange,
  onNavigateTab,
}: PortfolioSettingsSectionProps) {
  const showcase = settings.portfolioShowcase;

  // Update showcase field
  const handleShowcaseChange = (field: keyof PortfolioShowcaseSettings, value: string) => {
    onChange("portfolioShowcase", {
      ...showcase,
      [field]: value,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Banner */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">💼</span>
          <h2 className="text-sm font-bold text-[#0F172A]">
            Portfolio Standards &amp; Showcase Section Settings
          </h2>
        </div>
        <p className="text-xs text-[#64748B]">
          Configure the top engineering showcase standards, headline, badge, and description displayed on the public{" "}
          <span className="font-mono text-[#0F172A] font-semibold">/portfolio</span> page.
        </p>
      </div>

      {/* 1. Engineering Standards Showcase Card */}
      <PortfolioShowcaseCard showcase={showcase} onChange={handleShowcaseChange} />

      {/* 2. Direct Link / Info to Portfolio Projects CMS */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0052FF] text-white flex items-center justify-center shrink-0 text-base shadow-sm">
            📁
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A]">
              Manage Case Studies &amp; Individual Projects
            </h4>
            <p className="text-xs text-[#475569] mt-0.5 max-w-xl leading-relaxed">
              All portfolio projects, tech stacks, live links, and client case studies are managed in the dedicated{" "}
              <strong>Portfolio Projects</strong> CMS tab in the sidebar to prevent duplicate entries.
            </p>
          </div>
        </div>

        {onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab("portfolio")}
            className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>Open Portfolio Projects CMS</span>
            <span>&rarr;</span>
          </button>
        )}
      </div>
    </div>
  );
}
