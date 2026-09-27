import Homehero from "@/components/home/homehero";
import Homeprovide from "@/components/home/homeprovide";
import Homedeliver from "@/components/home/homedeliver";
import Homefocus from "@/components/home/homefocus";
import Homedecade from "@/components/home/homedecade";
import Homeclient from "@/components/home/homeclient";
import Homesecurity from "@/components/home/homesecurity";
import Homeknowledge from "@/components/home/homeknowledge";
import Homebulid from "@/components/home/homebulid";
import Homedicuss from "@/components/home/homedicuss";

import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Homepage (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("home");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

export default function Home() {
  return (
    <>
      <Homehero />
      <Homeprovide />
      <Homedeliver />
      <Homefocus />
      <Homedecade />
      <Homeclient />
      <Homesecurity />
      <Homeknowledge />
      <Homebulid />
      <Homedicuss />
    </>
  );
}
