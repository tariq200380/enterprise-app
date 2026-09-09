import type { Metadata } from "next";
import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS, ContactSettingsData } from "@/components/admin/settings/types";
import ContactHero from "@/components/contact/ContactHero";
import ContactDesign from "@/components/contact/ContactDesign";
import DirectCallCard from "@/components/contact/DirectCallCard";
import ContactDirectChannels from "@/components/contact/ContactDirectChannels";
import ContactGlobalHubsSection from "@/components/contact/ContactGlobalHubsSection";
import ContactOnboardingSection from "@/components/contact/ContactOnboardingSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactRfpSection from "@/components/contact/ContactRfpSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Solutions Architecture & Engineering | Creed Tech",
  description:
    "Schedule a technical consultation with Creed Tech's principal solutions architects. Direct engineering scoping and zero-obligation NDA protection.",
};

async function getContactData(): Promise<ContactSettingsData> {
  let contact = DEFAULT_WEBSITE_SETTINGS.contactSettings;

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      if (val.contactSettings) {
        contact = {
          ...contact,
          ...val.contactSettings,
          onboardingSteps:
            Array.isArray(val.contactSettings.onboardingSteps) && val.contactSettings.onboardingSteps.length > 0
              ? val.contactSettings.onboardingSteps
              : contact.onboardingSteps,
          faqs:
            Array.isArray(val.contactSettings.faqs) && val.contactSettings.faqs.length > 0
              ? val.contactSettings.faqs
              : contact.faqs,
          globalHubs:
            Array.isArray(val.contactSettings.globalHubs) && val.contactSettings.globalHubs.length > 0
              ? val.contactSettings.globalHubs
              : contact.globalHubs,
        };
      } else {
        // Backwards compatibility with top-level fields
        if (val.contactHeroBadge) contact.heroBadge = val.contactHeroBadge;
        if (val.contactHeroTitle) contact.heroHeadline = val.contactHeroTitle;
        if (val.contactHeroDesc) contact.heroDescription = val.contactHeroDesc;
        if (val.contactEmail) contact.officialInquiriesEmail = val.contactEmail;
        if (val.contactPhone) contact.telemetryPhone = val.contactPhone;
      }
    }
  } catch (err) {
    console.error("Failed to load contact settings:", err);
  }

  return contact;
}

export default async function ContactPage() {
  const contact = await getContactData();

  return (
    <div className="w-full bg-white text-[#111827] font-sans text-left overflow-x-hidden">
      {/* 1. Hero & Metrics */}
      <ContactHero data={contact} />

      {/* 2. Main 2-Column Technical Scoping & Direct Contact Hub */}
      <section className="w-full py-16 sm:py-24 bg-[#FAFAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Technical Scoping Form */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-sm text-left">
              <div className="border-b border-[#F3F4F6] pb-5 mb-6">
                <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">
                  PROJECT SPECIFICATION FORM
                </span>
                <h2 className="text-2xl font-bold text-[#030712] tracking-tight">
                  Scope Your Project
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-normal">
                  Fill out the parameters below to receive an architectural estimate and discovery invite.
                </p>
              </div>

              <ContactDesign />
            </div>

            {/* Right Column: Direct Contacts & Global Hubs */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <DirectCallCard
                badge={contact.discoveryBadge}
                title={contact.discoveryTitle}
                description={contact.discoveryDescription}
              />
              <ContactDirectChannels data={contact} />
              <ContactGlobalHubsSection data={contact} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Transparent Onboarding Process */}
      <ContactOnboardingSection data={contact} />

      {/* 4. Frequently Asked Questions Accordion */}
      <ContactFaqSection faqs={contact.faqs} />

      {/* 5. Bottom RFP Call to Action Banner */}
      <ContactRfpSection data={contact} />
    </div>
  );
}
