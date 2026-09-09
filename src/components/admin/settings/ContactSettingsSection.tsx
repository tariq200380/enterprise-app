"use client";

import React from "react";
import { WebsiteSettingsData, ContactSettingsData } from "./types";
import ContactHeroMetricsCard from "./contact/ContactHeroMetricsCard";
import ContactDiscoveryChannelsCard from "./contact/ContactDiscoveryChannelsCard";
import ContactGlobalHubsCard from "./contact/ContactGlobalHubsCard";
import ContactOnboardingStepsCard from "./contact/ContactOnboardingStepsCard";
import ContactFaqsCard from "./contact/ContactFaqsCard";
import ContactRfpBannerCard from "./contact/ContactRfpBannerCard";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function ContactSettingsSection({ settings, onChange }: Props) {
  const contactData: ContactSettingsData = settings.contactSettings;

  const handleFieldChange = (field: keyof ContactSettingsData, value: any) => {
    const updated = {
      ...contactData,
      [field]: value,
    };
    onChange("contactSettings", updated);

    // Keep legacy fields synchronized for backwards compatibility
    if (field === "heroBadge") onChange("contactHeroBadge", value);
    if (field === "heroHeadline") onChange("contactHeroTitle", value);
    if (field === "heroDescription") onChange("contactHeroDesc", value);
    if (field === "officialInquiriesEmail") onChange("contactEmail", value);
    if (field === "telemetryPhone") onChange("contactPhone", value);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Section Header */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">📞</span>
          <h2 className="text-sm font-bold text-[#0F172A]">
            Contact Page &amp; Scoping Channels
          </h2>
        </div>
        <p className="text-xs text-[#64748B]">
          Manage hero headers, SLA metric badges, direct phone/WhatsApp lines, onboarding stages, and FAQ accordion questions.
        </p>
      </div>

      {/* 1. Hero & Metrics */}
      <ContactHeroMetricsCard data={contactData} onChange={handleFieldChange} />

      {/* 2. Direct Communications & Discovery */}
      <ContactDiscoveryChannelsCard data={contactData} onChange={handleFieldChange} />

      {/* 3. Global Engineering Hubs */}
      <ContactGlobalHubsCard data={contactData} onChangeField={handleFieldChange} />

      {/* 4. Onboarding Steps */}
      <ContactOnboardingStepsCard data={contactData} onChangeField={handleFieldChange} />

      {/* 4. Frequently Asked Questions */}
      <ContactFaqsCard data={contactData} onChangeField={handleFieldChange} />

      {/* 5. Bottom RFP Banner */}
      <ContactRfpBannerCard data={contactData} onChange={handleFieldChange} />
    </div>
  );
}
