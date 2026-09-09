"use client";

import React from "react";
import { WebsiteSettingsData, AboutSettingsData } from "./types";
import AboutEngineeringHubsCard from "./about/AboutEngineeringHubsCard";
import AboutLeadershipCard from "./about/AboutLeadershipCard";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function AboutSettingsSection({ settings, onChange }: Props) {
  const aboutData: AboutSettingsData = settings.aboutSettings;

  const handleFieldChange = (field: keyof AboutSettingsData, value: any) => {
    const updated: AboutSettingsData = {
      ...aboutData,
      [field]: value,
    };
    onChange("aboutSettings", updated);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Section Header */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">🏢</span>
          <h2 className="text-sm font-bold text-[#0F172A]">
            About Page &amp; Engineering Philosophy
          </h2>
        </div>
        <p className="text-xs text-[#64748B]">
          Manage global engineering centers, continuous coverage hubs, and executive leadership profiles for the public /about page.
        </p>
      </div>

      {/* 1. Global Engineering Centers & Hubs */}
      <AboutEngineeringHubsCard data={aboutData} onChangeField={handleFieldChange} />

      {/* 2. Executive Leadership & Custodians */}
      <AboutLeadershipCard data={aboutData} onChangeField={handleFieldChange} />
    </div>
  );
}
