"use client";

import React from "react";
import { WebsiteSettingsData } from "./types";
import HeaderLogoCard from "./header-footer/HeaderLogoCard";
import HeaderNavigationCard from "./header-footer/HeaderNavigationCard";
import HeaderCtaCard from "./header-footer/HeaderCtaCard";
import FooterBrandCard from "./header-footer/FooterBrandCard";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

export default function HeaderFooterSection({ settings, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Logo & Live Dimensions Preview */}
      <HeaderLogoCard settings={settings} onChange={onChange} />

      {/* 2. Dynamic Navigation Menu Builder */}
      <HeaderNavigationCard settings={settings} onChange={onChange} />

      {/* 3. Header CTA Button */}
      <HeaderCtaCard settings={settings} onChange={onChange} />

      {/* 4. Footer Brand Description */}
      <FooterBrandCard settings={settings} onChange={onChange} />
    </div>
  );
}

export { HeaderFooterSection };
