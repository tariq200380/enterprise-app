import type { Metadata } from "next";
import Link from "next/link";
import { query } from "@/lib/db";
import { DEFAULT_WEBSITE_SETTINGS } from "@/components/admin/settings/types";
import ProjectDeliveryProcess from "@/components/services/ProjectDeliveryProcess";
import ServicesInteractiveExplorer from "@/components/services/ServicesInteractiveExplorer";
import SolutionAreas from "@/components/services/SolutionAreas";
import DeliveryCommitment from "@/components/services/DeliveryCommitment";
import IndustriesWeSupport from "@/components/services/IndustriesWeSupport";
import ServicesVisionCta from "@/components/services/ServicesVisionCta";

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
      {/* Services Hero Banner */}
      <section className="relative w-full overflow-hidden bg-[#F8F5F0] bg-[url('/images/services-hero-bg.webp')] bg-cover bg-no-repeat bg-[right_center] py-14 sm:py-16 lg:py-20 border-b border-[#E8E2D9]">
        {/* Soft white gradient overlay on the left to guarantee optimal text contrast */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.93)_45%,rgba(255,255,255,0.8)_75%,rgba(255,255,255,0.5)_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-[38rem] text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#CBD5E1] text-[#0F172A] text-[11.5px] font-extrabold uppercase tracking-[0.08em] mb-3 rounded shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#FF6B00] inline-block shrink-0"></span>
              <span>ENTERPRISE CAPABILITIES &amp; SOLUTIONS</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.03em] text-[#0F172A] leading-[1.2] mb-3">
              Architecting Enterprise <br />
              <span className="text-[#0052FF]">IT &amp; Cloud Solutions</span>
            </h1>

            {/* Paragraph 1 */}
            <p className="text-[15px] sm:text-[15.5px] font-semibold text-[#0F172A] leading-relaxed mb-1.5">
              End-to-end cloud infrastructure, bespoke software engineering, AI automation, and cybersecurity.
            </p>

            {/* Paragraph 2 */}
            <p className="text-[14.5px] sm:text-[15px] font-medium text-[#1E293B] leading-relaxed mb-5">
              Engineered for unprecedented enterprise scale, high availability, and cryptographic data protection.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 max-w-sm sm:max-w-md">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0052FF] hover:bg-[#0043D6] text-white font-bold text-xs sm:text-sm h-10 sm:h-11 px-3 sm:px-5 rounded-md shadow-sm transition-all duration-200 text-center whitespace-nowrap"
              >
                Start Your Project
              </Link>
              <Link
                href="#delivery-process"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 border-2 border-[#0052FF] text-[#0052FF] hover:text-[#0043D6] font-bold text-xs sm:text-sm h-10 sm:h-11 px-3 sm:px-5 rounded-md shadow-sm transition-all duration-200 text-center whitespace-nowrap"
              >
                Explore Services &darr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Project Delivery Process */}
      <ProjectDeliveryProcess />

      {/* 3. Services Interactive Selector & Detail Section */}
      <ServicesInteractiveExplorer data={explorer} />

      {/* 4. Solution Areas */}
      <SolutionAreas />

      {/* 5. Our Delivery Commitment */}
      <DeliveryCommitment />

      {/* 6. Industries We Support */}
      <IndustriesWeSupport />

      {/* 7. Final CTA: Vision to Life */}
      <ServicesVisionCta />
    </>
  );
}
