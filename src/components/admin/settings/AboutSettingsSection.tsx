"use client";

import React from "react";
import { WebsiteSettingsData, AboutSettingsData } from "./types";
import AboutEngineeringHubsCard from "./about/AboutEngineeringHubsCard";
import AboutLeadershipCard from "./about/AboutLeadershipCard";
import AboutReviewLinksCard from "./about/AboutReviewLinksCard";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

const SECTIONS = [
  { key: "all", label: "Show All Sections" },
  { key: "reviews", label: "Trust & Review Links", icon: "🔗" },
  { key: "hubs", label: "Global Engineering Centers", icon: "🌐" },
  { key: "leadership", label: "Executive Leadership", icon: "👥" },
] as const;

export default function AboutSettingsSection({ settings, onChange }: Props) {
  const [activeSection, setActiveSection] = React.useState<"all" | "reviews" | "hubs" | "leadership">("all");
  const aboutData: AboutSettingsData = settings.aboutSettings || ({} as AboutSettingsData);

  const handleFieldChange = (field: keyof AboutSettingsData, value: any) => {
    const updated: AboutSettingsData = {
      ...aboutData,
      [field]: value,
    };
    onChange("aboutSettings", updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Section Header */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">🏢</span>
          <h2 className="text-sm font-bold text-[#0F172A]">
            About Page &amp; Engineering Philosophy
          </h2>
        </div>
        <p className="text-xs text-[#64748B] mb-3">
          Manage trust badges, review platform links, global engineering centers, and executive leadership profiles for the public /about page.
        </p>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100">
          {SECTIONS.map((sec) => (
            <button
              key={sec.key}
              type="button"
              onClick={() => setActiveSection(sec.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeSection === sec.key
                  ? "bg-[#0052FF] text-white shadow-xs"
                  : "bg-gray-100 text-[#475569] hover:bg-gray-200"
              }`}
            >
              {"icon" in sec && <span>{sec.icon}</span>}
              <span>
                {sec.label}
                {sec.key === "leadership" && ` (${aboutData.leadership?.length || 0})`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Reviewed & Recommended On (5 Platform Links) */}
      {(activeSection === "all" || activeSection === "reviews") && (
        <AboutReviewLinksCard data={aboutData} onChangeField={handleFieldChange} />
      )}

      {/* 2. Global Engineering Centers & Hubs */}
      {(activeSection === "all" || activeSection === "hubs") && (
        <AboutEngineeringHubsCard data={aboutData} onChangeField={handleFieldChange} />
      )}

      {/* 3. Executive Leadership & Custodians */}
      {(activeSection === "all" || activeSection === "leadership") && (
        <AboutLeadershipCard data={aboutData} onChangeField={handleFieldChange} />
      )}
    </div>
  );
}
