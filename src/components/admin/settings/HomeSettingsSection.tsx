"use client";

import React from "react";
import { WebsiteSettingsData } from "./types";
import HomeHeroCard from "./home/HomeHeroCard";
import HomePartnersRibbonCard from "./home/HomePartnersRibbonCard";
import HomeServicesCard from "./home/HomeServicesCard";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HomeSettingsSection({ settings, onChange }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">🏠</span>
          <h2 className="text-sm font-bold text-[#0F172A]">
            Homepage Content &amp; Showcase Engine
          </h2>
        </div>
        <p className="text-xs text-[#64748B]">
          Configure hero banners, infinite scrolling partner logos (Google, Trustpilot, etc.), and the 8 specialized engineering service domains.
        </p>
      </div>

      {/* 1. Hero Content */}
      <HomeHeroCard settings={settings} onChange={onChange} />

      {/* 2. Partner Logos (Scroll Bar Ribbon) */}
      <HomePartnersRibbonCard settings={settings} onChange={onChange} />

      {/* 3. Services Showcase ("What We Provide") */}
      <HomeServicesCard settings={settings} onChange={onChange} />
    </div>
  );
}
