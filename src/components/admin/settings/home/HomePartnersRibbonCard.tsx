"use client";

import React from "react";
import { PartnerLogoItem, WebsiteSettingsData } from "../types";
import HomePartnerItemRow from "./HomePartnerItemRow";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HomePartnersRibbonCard({ settings, onChange }: Props) {
  const logos = settings.partnerLogos || [];

  const handleLogoChange = (index: number, field: keyof PartnerLogoItem, value: string) => {
    const updated = [...logos];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("partnerLogos", updated);
  };

  const handleAddLogo = () => {
    const newLogo: PartnerLogoItem = {
      id: `partner-${Date.now()}`,
      name: "",
      logoUrl: "",
      websiteUrl: "https://",
    };
    onChange("partnerLogos", [...logos, newLogo]);
  };

  const handleDeleteLogo = (index: number) => {
    const updated = logos.filter((_, i) => i !== index);
    onChange("partnerLogos", updated);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center font-bold text-base">
              🔄
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">
              Partner &amp; Client Logos (Marquee Scroll Bar)
            </h3>
          </div>
          <p className="text-xs text-[#64748B]">
            Manage the continuous infinite scroll bar shown on the homepage. Upload logo files directly from your computer or provide URLs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddLogo}
          className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add Partner Logo</span>
        </button>
      </div>

      {/* Dynamic List */}
      <div className="flex flex-col gap-4">
        {logos.map((partner, idx) => (
          <HomePartnerItemRow
            key={partner.id || `partner-${idx}`}
            partner={partner}
            index={idx}
            onChange={(field, val) => handleLogoChange(idx, field, val)}
            onDelete={() => handleDeleteLogo(idx)}
          />
        ))}
      </div>
    </div>
  );
}
