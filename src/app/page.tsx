import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS, WebsiteSettingsData } from "@/components/admin/settings/types";
import HeroSection from "@/components/home/HeroSection";
import PartnersRibbon from "@/components/home/PartnersRibbon";
import WhatWeProvide from "@/components/home/WhatWeProvide";
import HowWeDeliver from "@/components/home/HowWeDeliver";
import WhyCreedTech from "@/components/home/WhyCreedTech";
import TrackRecord from "@/components/home/TrackRecord";
import ClientReviews from "@/components/home/ClientReviews";
import TrustSecurity from "@/components/home/TrustSecurity";
import KnowledgeCenter from "@/components/home/KnowledgeCenter";
import CareersSection from "@/components/home/CareersSection";
import ContactCta from "@/components/home/ContactCta";

export const dynamic = "force-dynamic";

async function getHomeData(): Promise<WebsiteSettingsData> {
  let settings = DEFAULT_WEBSITE_SETTINGS;

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      settings = {
        ...settings,
        ...val,
        partnerLogos:
          Array.isArray(val.partnerLogos) && val.partnerLogos.length > 0
            ? val.partnerLogos
            : Array.isArray(val.partner_logos) && val.partner_logos.length > 0
            ? val.partner_logos
            : settings.partnerLogos,
        servicesHeadline: val.servicesHeadline || val.services_headline || settings.servicesHeadline,
        servicesDescription: val.servicesDescription || val.services_description || settings.servicesDescription,
        homeServices:
          Array.isArray(val.homeServices) && val.homeServices.length > 0
            ? val.homeServices
            : Array.isArray(val.home_services) && val.home_services.length > 0
            ? val.home_services
            : settings.homeServices,
      };
    }
  } catch (err) {
    console.error("Failed to load home page settings:", err);
  }

  return settings;
}

export default async function Home() {
  const settings = await getHomeData();

  return (
    <>
      <HeroSection />
      <PartnersRibbon logos={settings.partnerLogos} />
      <WhatWeProvide
        headline={settings.servicesHeadline}
        description={settings.servicesDescription}
        services={settings.homeServices}
      />
      <HowWeDeliver />
      <WhyCreedTech />
      <TrackRecord />
      <ClientReviews />
      <TrustSecurity />
      <KnowledgeCenter />
      <CareersSection />
      <ContactCta />
    </>
  );
}
