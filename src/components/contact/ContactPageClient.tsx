"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ContactSettingsData } from "@/components/admin/settings/types";
import ContactHeroSection from "./ContactHeroSection";
import ContactScopingForm from "./ContactScopingForm";
import ContactDirectChannels from "./ContactDirectChannels";
import ContactOnboardingSection from "./ContactOnboardingSection";
import ContactFaqSection from "./ContactFaqSection";
import ContactRfpSection from "./ContactRfpSection";

// Lazy-load interactive modals to reduce initial JavaScript bundle size
const ContactScheduleModal = dynamic(
  () => import("./ContactScheduleModal"),
  { ssr: false }
);

const ContactScopingModal = dynamic(
  () => import("./ContactScopingModal"),
  { ssr: false }
);

interface ContactPageClientProps {
  settings?: ContactSettingsData;
}

export default function ContactPageClient({ settings }: ContactPageClientProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isScopingModalOpen, setIsScopingModalOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] font-sans antialiased text-left">
      {/* 1. Hero Section: High-Tech Dark with Ambient Orange Glow & Stats */}
      <ContactHeroSection settings={settings} />

      {/* 2. Main 2-Column Technical Scoping & Direct Contact Hub */}
      <section id="scoping-form" className="w-full py-10 sm:py-12 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Columns: Scoping Form */}
            <ContactScopingForm />

            {/* Right 5 Columns: Direct Discovery Call Card & Verified Channels */}
            <ContactDirectChannels
              settings={settings}
              onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* 3. Transparent 4-Step Onboarding Protocol */}
      <ContactOnboardingSection settings={settings} />

      {/* 4. Enterprise Technical FAQ */}
      <ContactFaqSection />

      {/* 5. Bottom Technical RFP Call to Action Banner */}
      <ContactRfpSection
        settings={settings}
        onOpenScopingModal={() => setIsScopingModalOpen(true)}
      />

      {/* Lazy-Loaded Modals (Mounted on-demand only when opened) */}
      {isScheduleModalOpen && (
        <ContactScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
        />
      )}

      {isScopingModalOpen && (
        <ContactScopingModal
          isOpen={isScopingModalOpen}
          onClose={() => setIsScopingModalOpen(false)}
        />
      )}
    </div>
  );
}
