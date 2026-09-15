"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { PartnerReviewLinks } from "@/lib/about-data";
import AboutHeroSection from "./AboutHeroSection";
import AboutPhilosophySection from "./AboutPhilosophySection";
import AboutServicesSection from "./AboutServicesSection";
import AboutCreedCodeSection from "./AboutCreedCodeSection";
import AboutGlobalCentersSection from "./AboutGlobalCentersSection";
import AboutLeadershipSection from "./AboutLeadershipSection";
import AboutMetricsSection from "./AboutMetricsSection";
import AboutManifestoSection from "./AboutManifestoSection";

// Lazy-load consultation modal only when opened to reduce initial bundle size
const AboutConversationModal = dynamic(
  () => import("./AboutConversationModal"),
  { ssr: false }
);

interface AboutPageClientProps {
  partnerLinks?: PartnerReviewLinks;
}

export default function AboutPageClient({ partnerLinks }: AboutPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Enterprise Architecture & Systems");

  const handleOpenModal = (topic?: string) => {
    if (topic) {
      setSelectedTopic(topic);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased selection:bg-[#EA580C] selection:text-white">
      {/* 1. Hero: Sovereign Platform Matrix Console */}
      <AboutHeroSection partnerLinks={partnerLinks} onOpenModal={handleOpenModal} />

      {/* 2. Philosophy: Engineering Ethos (6 Minimalist Pillars) */}
      <AboutPhilosophySection />

      {/* 3. Services: What We Do */}
      <AboutServicesSection onOpenModal={handleOpenModal} />

      {/* 4. Creed Code: Four Pillars of Uncompromising Engineering */}
      <AboutCreedCodeSection />

      {/* 5. Global Centers: Three Specialized Engineering Centers */}
      <AboutGlobalCentersSection />

      {/* 6. Leadership: Executive Leadership & Technical Custodians */}
      <AboutLeadershipSection />

      {/* 7. Metrics: Data Driven & Digital Growth */}
      <AboutMetricsSection />

      {/* 8. Manifesto: Sovereign Architectural Imperative & Seal */}
      <AboutManifestoSection />

      {/* 9. Interactive Modal: Start a Conversation (rendered on demand) */}
      {isModalOpen && (
        <AboutConversationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          defaultTopic={selectedTopic}
        />
      )}
    </div>
  );
}

