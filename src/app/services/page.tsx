import type { Metadata } from "next";
import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS } from "@/components/admin/settings/types";
import ServicesHero from "@/components/services/serviceshero";
import ServicesProject from "@/components/services/servicesproject";
import ServicesDigital from "@/components/services/servicesdigital";
import ServicesSolution from "@/components/services/servicessolution";
import ServicesDelivery from "@/components/services/servicesdelivery";
import ServicesIndustries from "@/components/services/servicesindustries";
import ServicesVision from "@/components/services/servicesvision";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enterprise Services & Engineering Solutions | Creed Tech",
  description:
    "End-to-end cloud infrastructure, bespoke software engineering, AI automation, and cybersecurity engineered for unprecedented enterprise scale.",
};

async function getServicesData() {
  let explorer = DEFAULT_WEBSITE_SETTINGS.servicesExplorer;

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;

      if (val.servicesExplorer) {
        explorer = {
          sectionHeadline: val.servicesExplorer.sectionHeadline || explorer.sectionHeadline,
          sectionDescription: val.servicesExplorer.sectionDescription || explorer.sectionDescription,
          services:
            Array.isArray(val.servicesExplorer.services) && val.servicesExplorer.services.length > 0
              ? val.servicesExplorer.services
              : explorer.services,
        };
      }
    }
  } catch (err) {
    console.error("Failed to load services settings:", err);
  }

  return { explorer };
}

export default async function ServicesPage() {
  const { explorer } = await getServicesData();

  return (
    <>
      <ServicesHero />
      <ServicesProject />
      <ServicesDigital data={explorer} />
      <ServicesSolution />
      <ServicesDelivery />
      <ServicesIndustries />
      <ServicesVision />
    </>
  );
}
