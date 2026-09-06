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

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnersRibbon />
      <WhatWeProvide />
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

