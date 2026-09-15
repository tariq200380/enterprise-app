import type { Metadata } from "next";
import { getAboutData, getPartnerReviewLinks } from "@/lib/about-data";
import AboutPageClient from "@/components/about/AboutPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Creed Tech | Engineering Principles & Leadership",
  description:
    "Learn about Creed Tech's engineering principles, distributed architecture hubs, and commitment to sovereign enterprise software.",
};

export default async function AboutPage() {
  const settings = await getAboutData();
  const partnerLinks = getPartnerReviewLinks(settings);

  return <AboutPageClient partnerLinks={partnerLinks} />;
}
