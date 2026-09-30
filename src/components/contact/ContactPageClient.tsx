"use client";

import { useState, type ReactNode } from "react";
import { ContactSettingsData } from "@/components/admin/settings/types";
import ContactScopingForm from "./ContactScopingForm";
import ContactDirectChannels from "./ContactDirectChannels";
import ContactRfpSection from "./ContactRfpSection";
import ContactScheduleModal from "./ContactScheduleModal";
import ContactScopingModal from "./ContactScopingModal";

interface ContactPageClientProps {
  settings?: ContactSettingsData;
  children?: ReactNode;
}

export default function ContactPageClient({ settings, children }: ContactPageClientProps) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isScopingModalOpen, setIsScopingModalOpen] = useState(false);

  return (
    <>
      {/* 2. Main 2-Column Technical Scoping & Direct Contact Hub */}
      <section id="scoping-form" className="w-full py-10 sm:py-12 border-b border-[#E2E8F0] scroll-mt-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
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

      {/* 3 & 4. Transparent Onboarding Protocol & Technical FAQ (Rendered as RSC children) */}
      {children}

      {/* 5. Bottom Technical RFP Call to Action Banner */}
      <ContactRfpSection
        settings={settings}
        onOpenScopingModal={() => setIsScopingModalOpen(true)}
      />

      {/* Interactive Modals (Conditionally Mounted) */}
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
    </>
  );
}
