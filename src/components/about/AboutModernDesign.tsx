"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WebsiteSettingsData } from "@/components/admin/settings/types";

interface AboutModernDesignProps {
  settings?: WebsiteSettingsData;
}

export default function AboutModernDesign({ settings }: AboutModernDesignProps = {}) {
  const [isConversationModalOpen, setIsConversationModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Enterprise Architecture & Systems");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const openConversationModal = (topic?: string) => {
    if (topic) setSelectedTopic(topic);
    setIsConversationModalOpen(true);
    setStatus("idle");
    setErrorMessage("");
  };

  const closeConversationModal = () => {
    setIsConversationModalOpen(false);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleConversationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = (fd.get("fullName") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const company = (fd.get("company") as string)?.trim() || "";
    const phone = (fd.get("phone") as string)?.trim() || "";
    const topic = (fd.get("topic") as string)?.trim() || "General Engineering Consultation";
    const message = (fd.get("message") as string)?.trim();
    const needNda = fd.get("needNda") === "on";

    if (!fullName) {
      setStatus("error");
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!message) {
      setStatus("error");
      setErrorMessage("Please enter your message or project requirements.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fullName,
          email,
          phone,
          company: company || "About Page Inquiry",
          service: `Strategic Consultation (${topic})`,
          project_details: message,
          need_nda: needNda,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          closeConversationModal();
        }, 2500);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Network error. Please try again.");
    }
  };

  const handleScrollToJourney = () => {
    const el = document.getElementById("journey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const reviewLinks = settings?.aboutSettings?.reviewLinks;
  const partnerLogos = settings?.partnerLogos || [];

  const getPartnerUrl = (name: string, fallback: string) => {
    const found = partnerLogos.find((p) =>
      p.name?.toLowerCase().includes(name.toLowerCase())
    );
    return found?.websiteUrl || fallback;
  };

  const theManifestUrl =
    reviewLinks?.theManifestUrl ||
    getPartnerUrl("manifest", "https://themanifest.com");
  const shopifyUrl =
    reviewLinks?.shopifyUrl ||
    getPartnerUrl("shopify", "https://www.shopify.com/partners");
  const trustpilotUrl =
    reviewLinks?.trustpilotUrl ||
    getPartnerUrl("trustpilot", "https://www.trustpilot.com");
  const clutchUrl =
    reviewLinks?.clutchUrl ||
    getPartnerUrl("clutch", "https://clutch.co");
  const googleReviewsUrl =
    reviewLinks?.googleReviewsUrl ||
    getPartnerUrl("google", "https://www.google.com");

  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] font-sans antialiased">
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (SOVEREIGN ARCHITECTURAL STANDARD)                        */}
      {/* ========================================================================= */}
      <section className="bg-[#0B1120] text-white relative overflow-hidden py-12 sm:py-14 px-6 sm:px-10 lg:px-16 border-b border-white/10 text-left">
        {/* Ambient Orange Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,107,0,0.18)_0%,rgba(255,107,0,0.05)_45%,rgba(11,17,32,0)_70%),radial-gradient(circle_at_10%_50%,rgba(255,107,0,0.15)_0%,rgba(255,107,0,0.04)_40%,rgba(11,17,32,0)_65%),radial-gradient(circle_at_90%_50%,rgba(255,107,0,0.15)_0%,rgba(255,107,0,0.04)_40%,rgba(11,17,32,0)_65%)]"
        />
        {/* Subtle 36px Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.035]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Mission & Positioning */}
            <div className="lg:col-span-7">
              <div className="text-[11px] font-semibold uppercase tracking-[3px] text-[#AEB6C2] mb-2.5 font-mono">
                ENGINEERING SOVEREIGNTY &bull; ARCHITECTURAL MASTERY
              </div>
              <div className="w-[60px] h-[2px] bg-[#FF6B00] opacity-80 mb-6" />

              <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold text-white leading-[1.1] mb-2 tracking-tight">
                Architects &amp; Builders of
              </h1>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.2] mb-5 tracking-tight">
                Critical Digital Infrastructure.
              </h2>

              <p className="text-base font-normal text-white/75 leading-[1.7] max-w-[540px] mb-8">
                Founded on the belief that mission-critical enterprise software should be engineered like bridges and power grids — with <strong className="text-white font-semibold">mathematical precision</strong>, <strong className="text-white font-semibold">zero-compromise security</strong>, and <strong className="text-white font-semibold">enduring architectural resilience</strong>.
              </p>

              <div className="flex items-center gap-3.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => openConversationModal("Enterprise Architecture & Systems")}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#EA580C] hover:bg-orange-600 text-white font-bold py-2.5 px-5 min-w-[185px] rounded-lg text-xs tracking-wider uppercase font-mono transition-colors shadow-xs cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <span>&rarr;</span>
                </button>
                <button
                  type="button"
                  onClick={handleScrollToJourney}
                  className="inline-flex items-center justify-center gap-1.5 bg-black hover:bg-[#EA580C] hover:border-[#EA580C] text-white font-bold py-2.5 px-5 min-w-[185px] rounded-lg text-xs tracking-wider uppercase font-mono border border-white/20 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Explore Our Journey</span>
                  <span>&darr;</span>
                </button>
              </div>
            </div>

            {/* Right Column: High-Tech Sovereign Console Card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-left">
                {/* Ambient orange glow inside card */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.18)_0%,transparent_60%)]"
                />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-white/90 text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                    SOVEREIGN PLATFORM MATRIX
                  </span>
                  <span className="text-[11px] font-mono text-white/40">VERIFIED v4.8</span>
                </div>

                {/* Interactive Terminal / Telemetry Console */}
                <div className="relative z-10 space-y-2 font-mono text-xs text-white/60 bg-black/45 border border-white/10 rounded-xl p-4 mb-5 backdrop-blur-xs">
                  <div className="text-white font-bold flex items-center justify-between border-b border-white/10 pb-2">
                    <span>// Creed Engineering Invariants</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block animate-pulse" />
                  </div>
                  <div>&gt; architectural_standard: <strong className="text-white font-bold">ZERO_DELEGATION_LAYER</strong></div>
                  <div>&gt; latency_budget_p99: <strong className="text-white font-bold">&lt;12ms [ENFORCED]</strong></div>
                  <div>&gt; data_sovereignty: <strong className="text-white font-bold">100% Client-Owned Private Repos</strong></div>
                  <div>&gt; compliance_gate: <strong className="text-white font-bold">SOC 2 &bull; ISO 27001 &bull; PCI-DSS</strong></div>
                  <div className="text-[11px] text-white/40 pt-0.5">&gt; audit_trail: cryptographic merkle tree sync OK</div>
                </div>

                {/* 3 Metric Stat Pillars */}
                <div className="relative z-10 grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left">
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white">12+ Yrs</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Core Architecture</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white">99.99%</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">SLA Guarantee</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white">100%</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Principal Leads</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ledger Ribbon */}
          <div className="mt-10 pt-5 border-t border-white/10 flex items-center justify-between gap-6 flex-wrap text-left relative z-10">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Reviewed &amp; Recommended On
            </div>
            <div className="flex gap-6 sm:gap-10 items-center flex-wrap">
              <a
                href={theManifestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/90 hover:text-orange-400 transition-colors cursor-pointer"
              >
                The Manifest
              </a>
              <a
                href={shopifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/90 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Shopify Partners
              </a>
              <a
                href={trustpilotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/90 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Trustpilot
              </a>
              <a
                href={clutchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/90 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Clutch
              </a>
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/90 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Google Reviews
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OUR PHILOSOPHY (CORE VALUES & ARCHITECTURAL ETHOS)                     */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-14 scroll-mt-24" id="journey">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          {/* Simple, Elegant Header */}
          <div className="max-w-3xl mb-8 sm:mb-10 text-left sm:text-center sm:mx-auto">
            <div className="text-[11px] font-mono font-bold uppercase tracking-[2.5px] text-[#EA580C] mb-3">
              ENGINEERING ETHOS &bull; OUR PHILOSOPHY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15] mb-5">
              Discipline over hype. Architecture over shortcuts.
            </h2>
            <p className="text-[#5B6472] text-base sm:text-lg leading-[1.7]">
              We build mission-critical enterprise systems with <strong className="text-[#0F172A] font-semibold">mathematical rigor</strong> — eliminating technical debt while bridging deep computer science with real-world enterprise velocity.
            </p>
          </div>

          {/* 6 Minimalist Core Pillars (No Box Clutter / Pure Typographic Cleanliness) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 sm:gap-x-14 gap-y-10 sm:gap-y-12">
            {/* Pillar 1 */}
            <div className="border-t border-[#E2E8F0] pt-5">
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2">01 / PROGRESS</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Continuous Innovation
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Enduring partnerships built on <strong className="text-[#0F172A] font-semibold">technical transparency</strong>, rapid release cycles, and measurable architectural reliability.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="border-t border-[#E2E8F0] pt-5">
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2">02 / FOCUS</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Laser Discipline
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                We prioritize <strong className="text-[#0F172A] font-semibold">absolute mastery</strong> in our domain, communicating transparently the moment a problem falls outside our core specialization.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="border-t border-[#E2E8F0] pt-5">
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2">03 / ADAPTABILITY</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Modular Architecture
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Client-centric systems without compromise — <strong className="text-[#0F172A] font-semibold">specialized engineering pods</strong> tailored to your team&apos;s exact technical constraints.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="border-t border-[#E2E8F0] pt-5">
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2">04 / PERFORMANCE</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Sub-Second Ergonomics
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Intuitive developer ergonomics, <strong className="text-[#0F172A] font-semibold">sub-second response latencies</strong>, and friction-free user journeys across all digital touchpoints.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="border-t border-[#E2E8F0] pt-5">
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2">05 / ALIGNMENT</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Co-Engineering Alliance
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                We operate as <strong className="text-[#0F172A] font-semibold">long-term technical allies</strong>, scaling alongside you through architecture reviews, compliance, and enterprise growth.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="border-t border-[#E2E8F0] pt-5">
              <span className="text-xs font-mono font-bold text-[#EA580C] block mb-2">06 / R&amp;D</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
                Future-Proof R&amp;D
              </h3>
              <p className="text-sm text-[#5B6472] leading-[1.7]">
                Proactively staying ahead of paradigm shifts — engineering <strong className="text-[#0F172A] font-semibold">autonomous AI pipelines</strong> and robust distributed consensus infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT WE DO (SERVICES AND EXPERTISE)                                    */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-14 border-t border-[#E2E8F0]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
            <div className="text-[13px] text-[#3D6BFF] font-medium mb-3.5">
              Services and expertise
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
              What we do
            </h2>
            <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
              We help businesses turn technology into their biggest competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {/* Service 1: Software development */}
            <div className="border border-[#E2E8F0] p-6 sm:p-7 flex flex-col bg-white">
              <div className="w-11 h-11 rounded-[6px] flex items-center justify-center mb-6 bg-[#3D6BFF]/10">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
                  <path d="M8 6 L2 12 L8 18" stroke="#3D6BFF" strokeWidth="1.8" />
                  <path d="M16 6 L22 12 L16 18" stroke="#3D6BFF" strokeWidth="1.8" />
                </svg>
              </div>
              <h3 className="font-serif font-medium text-[19px] mb-2.5 text-[#0F172A]">
                Software development
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 grow">
                Scalable, high-performance web, cloud, and enterprise software tailored to accelerate
                your business goals.
              </p>
              <button
                type="button"
                onClick={() => openConversationModal("Scalable Web & Mobile Engineering")}
                className="self-start inline-flex items-center justify-center min-w-[185px] text-[13px] font-medium text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[2px] transition-colors cursor-pointer text-center whitespace-nowrap"
              >
                Quick Inquiry
              </button>
            </div>

            {/* Service 2: AI solutions */}
            <div className="border border-[#E2E8F0] p-6 sm:p-7 flex flex-col bg-white">
              <div className="w-11 h-11 rounded-[6px] flex items-center justify-center mb-6 bg-[#FF5A1F]/10">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" stroke="#FF5A1F" strokeWidth="1.8" />
                  <path
                    d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                    stroke="#FF5A1F"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <h3 className="font-serif font-medium text-[19px] mb-2.5 text-[#0F172A]">
                AI solutions
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 grow">
                Smarter decision-making, predictive machine learning, and autonomous AI-driven
                automation built for enterprise workflows.
              </p>
              <Link
                href="/services#what-we-provide"
                className="self-start inline-flex items-center justify-center gap-1.5 min-w-[185px] text-[13px] font-medium text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[2px] transition-colors cursor-pointer text-center whitespace-nowrap"
              >
                <span>View All Services</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Service 3: Digital growth */}
            <div className="border border-[#E2E8F0] p-6 sm:p-7 flex flex-col bg-white">
              <div className="w-11 h-11 rounded-[6px] flex items-center justify-center mb-6 bg-[#0F7A5F]/10">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17 L10 10 L14 14 L21 6" stroke="#0F7A5F" strokeWidth="1.8" />
                  <path d="M15 6h6v6" stroke="#0F7A5F" strokeWidth="1.8" />
                </svg>
              </div>
              <h3 className="font-serif font-medium text-[19px] mb-2.5 text-[#0F172A]">
                Digital growth
              </h3>
              <p className="text-[#5B6472] text-sm leading-[1.65] mb-7 grow">
                Data-driven SEO strategies, conversion rate optimization, and multi-channel brand
                scaling that maximize your digital ROI.
              </p>
              <Link
                href="/contact"
                className="self-start inline-flex items-center justify-center gap-1.5 min-w-[185px] text-[13px] font-medium text-[#F7F6F5] bg-[#0F172A] hover:bg-[#1B3A8C] px-5 py-2.5 rounded-[2px] transition-colors cursor-pointer text-center whitespace-nowrap"
              >
                <span>Contact Our Team</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE CREED CODE (OUR FOUR PILLARS OF UNCOMPROMISING ENGINEERING)         */}
      {/* ========================================================================= */}
      <section className="bg-[#EFECE6] py-12 sm:py-14 border-t border-[#E2E8F0]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
            <div className="text-[13px] text-[#FF5A1F] font-medium mb-3.5">
              The Creed code
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
              Our four pillars of uncompromising engineering
            </h2>
            <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
              The fundamental principles that govern every technical decision, sprint review, and
              architectural deployment at Creed Tech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Pillar 01 */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-[22px] text-[#3D6BFF]">01</span>
                  <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                    Pillar of excellence
                  </span>
                </div>
                <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                  Architectural integrity over shortcuts
                </h3>
                <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                  We build for decades, not for quick demos.
                </div>
                <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                  Software is the central nervous system of modern business. We reject fragile
                  hacks, unnecessary dependencies, and opaque abstractions — every line of code is
                  structured to withstand massive scale.
                </p>
              </div>
              <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
                </svg>
                <span>Clean, deterministic, and self-documenting codebases.</span>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-[22px] text-[#3D6BFF]">02</span>
                  <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                    Pillar of excellence
                  </span>
                </div>
                <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                  Direct architect-to-client pairing
                </h3>
                <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                  No layers of non-technical middlemen.
                </div>
                <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                  When you collaborate with Creed Tech, your product roadmap is shaped directly by
                  senior principal engineers who have built high-scale systems — eliminating
                  translation friction from day one.
                </p>
              </div>
              <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
                </svg>
                <span>100% principal engineer involvement from kickoff to launch.</span>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-[22px] text-[#3D6BFF]">03</span>
                  <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                    Pillar of excellence
                  </span>
                </div>
                <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                  Zero-trust &amp; sovereign privacy
                </h3>
                <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                  Security is non-negotiable; it is our foundation.
                </div>
                <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                  In an era of relentless cyber threats and sensitive AI models, we treat data
                  sovereignty as a fundamental duty — embedding zero-knowledge cryptography and
                  immutable audit trails into every platform.
                </p>
              </div>
              <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
                </svg>
                <span>Cryptographic data protection built into core architecture.</span>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-[22px] text-[#3D6BFF]">04</span>
                  <span className="text-[11.5px] text-[#3D6BFF] border border-[#3D6BFF]/30 bg-[#3D6BFF]/[0.06] px-2.5 py-1 rounded-[3px]">
                    Pillar of excellence
                  </span>
                </div>
                <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-1.5">
                  Empathetic craftsmanship
                </h3>
                <div className="text-[#FF5A1F] text-[13px] font-medium mb-3.5">
                  Engineering with a deep respect for the end user.
                </div>
                <p className="text-[#5B6472] text-sm leading-[1.65] mb-4">
                  Brilliant engineering means nothing if the interface creates friction. We unite
                  deep backend computer science with intuitive, human-centric product design,
                  creating platforms that people love.
                </p>
              </div>
              <div className="text-[13px] text-[#0F172A] pt-4 border-t border-[#E2E8F0] flex gap-2 items-start">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7 L5.5 10.5 L12 3" stroke="#3D6BFF" strokeWidth="1.6" />
                </svg>
                <span>Intuitive micro-interactions powered by resilient backend logic.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. GLOBAL ENGINEERING CENTERS                                             */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-14 border-t border-[#E2E8F0]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
            <div className="text-[13px] text-[#3D6BFF] font-medium mb-3.5">
              Global reach and continuous coverage
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
              Three specialized global engineering centers
            </h2>
            <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
              Operating across multiple time zones to deliver seamless 24/7 technical continuity
              and deep regional domain expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2E8F0] border border-[#E2E8F0] mt-2">
            {/* Center 1: North America */}
            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="text-[12.5px] text-[#5B6472] mb-4">North America</div>
                <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-2.5">
                  Product strategy &amp; architecture
                </h3>
                <p className="text-[#5B6472] text-sm leading-[1.65] mb-5">
                  Senior principal engineers shape roadmaps and system design in direct partnership
                  with founders and product leadership.
                </p>
              </div>
              <div className="text-[13px] text-[#3D6BFF] font-medium pt-3.5 border-t border-[#E2E8F0]">
                Kickoff &amp; architecture review
              </div>
            </div>

            {/* Center 2: Eastern Europe */}
            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="text-[12.5px] text-[#5B6472] mb-4">Eastern Europe</div>
                <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-2.5">
                  Deep systems engineering
                </h3>
                <p className="text-[#5B6472] text-sm leading-[1.65] mb-5">
                  Core platform, infrastructure, and performance-critical engineering handled by
                  specialists in distributed systems.
                </p>
              </div>
              <div className="text-[13px] text-[#3D6BFF] font-medium pt-3.5 border-t border-[#E2E8F0]">
                Build &amp; hardening phase
              </div>
            </div>

            {/* Center 3: South Asia */}
            <div className="bg-white p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="text-[12.5px] text-[#5B6472] mb-4">South Asia</div>
                <h3 className="font-serif font-medium text-xl text-[#0F172A] mb-2.5">
                  24/7 operations &amp; QA
                </h3>
                <p className="text-[#5B6472] text-sm leading-[1.65] mb-5">
                  Continuous monitoring, quality assurance, and incident response so nothing waits
                  for business hours to get fixed.
                </p>
              </div>
              <div className="text-[13px] text-[#3D6BFF] font-medium pt-3.5 border-t border-[#E2E8F0]">
                Always-on coverage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EXECUTIVE LEADERSHIP & TECHNICAL CUSTODIANS                            */}
      {/* ========================================================================= */}
      <section className="bg-[#EFECE6] py-12 sm:py-14 border-t border-[#E2E8F0]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
            <div className="text-[13px] text-[#FF5A1F] font-medium mb-3.5">
              The people behind the code
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
              Executive leadership and technical custodians
            </h2>
            <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
              Meet the founders and principal architects who guide our engineering vision and
              mentor our senior pods across three global centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Leader 1: Alexander Wright */}
            <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
              <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
                <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                  AW
                </span>
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                    Alexander Wright
                  </h3>
                  <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                    Founder &amp; Chief Executive Officer
                  </div>
                  <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                    Founded Creed Tech with the conviction that next-generation enterprise software
                    should be built with mathematical precision, neural scalability, and
                    uncompromising craftsmanship.
                  </p>
                  <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                    &ldquo;We don&apos;t build software to sell and walk away. We build digital
                    infrastructure that companies run their entire future on.&rdquo;
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
                >
                  Connect with Alexander &rarr;
                </Link>
              </div>
            </div>

            {/* Leader 2: Dr. Elena Rostova */}
            <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
              <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
                <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                  ER
                </span>
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                    Dr. Elena Rostova
                  </h3>
                  <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                    Chief Technology Officer
                  </div>
                  <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                    Directs research in private enterprise LLMs and distributed vector streaming.
                    Champion of vendor-neutral, open cloud architecture.
                  </p>
                  <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                    &ldquo;The best engineering is invisible — it performs flawlessly under
                    maximum load without ever taking a bow.&rdquo;
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
                >
                  Connect with Elena &rarr;
                </Link>
              </div>
            </div>

            {/* Leader 3: Marcus Vance */}
            <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
              <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
                <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                  MV
                </span>
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                    Marcus Vance
                  </h3>
                  <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                    Head of Global Security &amp; Governance
                  </div>
                  <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                    Oversees zero-trust architectures, sovereign data privacy, and SOC 2 Type II
                    governance across all client engagements.
                  </p>
                  <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                    &ldquo;In high-stakes systems, trust is not a promise — it&apos;s mathematically
                    verified cryptography.&rdquo;
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
                >
                  Connect with Marcus &rarr;
                </Link>
              </div>
            </div>

            {/* Leader 4: Sarah Jenkins */}
            <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5 sm:gap-6 items-center">
              <div className="aspect-[4/5] w-full max-w-[200px] mx-auto sm:max-w-none sm:w-[180px] self-center bg-gradient-to-br from-[#1B3A8C] to-[#0B1220] flex items-center justify-center relative overflow-hidden">
                <span className="font-serif text-[32px] text-[#C7D2FF] tracking-[0.01em]">
                  SJ
                </span>
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-serif font-medium text-lg text-[#0F172A] mb-1">
                    Sarah Jenkins
                  </h3>
                  <div className="text-[#3D6BFF] text-[13px] font-medium mb-3">
                    VP of Global Client Engineering
                  </div>
                  <p className="text-[#5B6472] text-[13.5px] leading-[1.6] mb-3.5">
                    Directs dedicated senior engineering pods across three global centers,
                    guaranteeing milestone velocity, zero-defect releases, and continuous client
                    alignment.
                  </p>
                  <div className="text-[13px] italic text-[#0F172A] border-l-2 border-[#FF5A1F] pl-3 leading-[1.55] mb-4">
                    &ldquo;Engineering maturity isn&apos;t just about writing code; it&apos;s about
                    delivering business outcomes with absolute predictability.&rdquo;
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="text-[12.5px] font-medium text-[#3D6BFF] hover:underline"
                >
                  Connect with Sarah &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DATA DRIVEN (LEADING YOU TO DIGITAL GROWTH)                            */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-14 text-center border-t border-[#E2E8F0]">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-10">
          <div className="max-w-[640px] mx-auto mb-8 sm:mb-10 text-center">
            <div className="text-[13px] text-[#3D6BFF] font-medium mb-3.5">
              Data driven
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-4xl text-[#0F172A] tracking-[-0.015em] leading-[1.15] mb-4">
              Leading you to digital growth
            </h2>
            <p className="text-[#5B6472] text-[15.5px] leading-[1.7]">
              Our proven expertise and cutting-edge technology have driven measurable success —
              see the numbers that showcase our impact.
            </p>
          </div>

          {/* 4-Item Metric Box */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E2E8F0] border border-[#E2E8F0] max-w-[760px] mx-auto mb-8">
            {/* Stat 1 */}
            <div className="bg-white p-7 sm:p-8">
              <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 L14.6 8.8 L22 9.3 L16.3 13.9 L18.2 21 L12 17 L5.8 21 L7.7 13.9 L2 9.3 L9.4 8.8 Z"
                  stroke="#3D6BFF"
                  strokeWidth="1.4"
                />
              </svg>
              <div className="font-serif text-3xl font-medium text-[#0F172A]">99%</div>
              <div className="text-[12.5px] text-[#5B6472] mt-1">Job success rate</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-7 sm:p-8">
              <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#3D6BFF" strokeWidth="1.4" />
                <path d="M12 7v5l3 3" stroke="#3D6BFF" strokeWidth="1.4" />
              </svg>
              <div className="font-serif text-3xl font-medium text-[#0F172A]">15,000+</div>
              <div className="text-[12.5px] text-[#5B6472] mt-1">Working hours</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-7 sm:p-8">
              <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 21 C4 15 8 13 12 13 C16 13 20 15 20 21"
                  stroke="#3D6BFF"
                  strokeWidth="1.4"
                />
                <circle cx="12" cy="7" r="4" stroke="#3D6BFF" strokeWidth="1.4" />
              </svg>
              <div className="font-serif text-3xl font-medium text-[#0F172A]">300+</div>
              <div className="text-[12.5px] text-[#5B6472] mt-1">Satisfied clients</div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-7 sm:p-8">
              <svg className="mx-auto mb-3 w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="9" r="3.2" stroke="#3D6BFF" strokeWidth="1.4" />
                <circle cx="17" cy="9" r="3.2" stroke="#3D6BFF" strokeWidth="1.4" />
                <path d="M2 21c0-4.5 2.7-7 6-7s6 2.5 6 7M12 21c0-4.5 2.2-7 5-7s5 2.5 5 7" stroke="#3D6BFF" strokeWidth="1.4" />
              </svg>
              <div className="font-serif text-3xl font-medium text-[#0F172A]">80+</div>
              <div className="text-[12.5px] text-[#5B6472] mt-1">Professional team</div>
            </div>
          </div>

          <div className="flex gap-3.5 justify-center flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-w-[220px] text-center bg-[#0F172A] hover:bg-[#1B3A8C] text-[#F7F6F5] px-7 py-3.5 rounded-[2px] text-[14.5px] font-medium border border-[#0F172A] transition-colors"
            >
              Get free consultation
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center min-w-[220px] text-center px-7 py-3.5 rounded-[2px] text-[14.5px] font-medium border border-[#CBD5E1] hover:border-[#0F172A] text-[#0F172A] bg-white transition-colors"
            >
              Hire top talent
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MANIFESTO SECTION (SOVEREIGN ARCHITECTURAL IMPERATIVE)                 */}
      {/* ========================================================================= */}
      <section className="bg-[#0B1120] text-white py-12 sm:py-14 border-t border-white/10 relative overflow-hidden text-left">
        {/* Ambient Orange Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(234,88,12,0.12)_0%,transparent_55%)]"
        />
        {/* Subtle 36px Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.025]"
        />

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Heading & Context */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[2.5px] text-[#AEB6C2]">
                  FOUNDING MANIFESTO
                </span>
              </div>
              <div className="w-12 h-[2px] bg-[#EA580C] opacity-80 mb-5" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                Architectural Imperative
              </h2>
              <p className="text-sm text-white/60 leading-[1.7] max-w-sm">
                The standard that governs every engineering pod, every commit, and every architecture decision we deliver.
              </p>
            </div>

            {/* Right Column: Statement & Seal */}
            <div className="lg:col-span-8">
              <blockquote className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white leading-[1.4] tracking-tight mb-8">
                &ldquo;Software fails quietly until the day it fails loudly. We treat every release the way a structural engineer treats a blueprint — <strong className="text-white font-extrabold">assume it will be trusted with something critical</strong>, because it will be.&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#EA580C]">
                  CT
                </div>
                <div>
                  <cite className="block not-italic text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
                    Founding Principle &bull; Creed Tech
                  </cite>
                  <span className="text-[11px] font-mono text-white/50">
                    Sovereign Enterprise Software Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 10. INTERACTIVE START A CONVERSATION MODAL                                 */}
      {/* ========================================================================= */}
      {isConversationModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeConversationModal();
          }}
        >
          <div className="bg-white text-[#0F172A] rounded-2xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl border border-slate-200 text-left max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeConversationModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-lg cursor-pointer leading-none p-1.5 rounded-md transition-colors"
              title="Close modal"
            >
              ✕
            </button>

            <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider font-mono block mb-1">
              ⚡ DIRECT ARCHITECTURAL CONSULTATION
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-1">
              Start a Conversation
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Connect directly with our engineering leadership to discuss your system architecture, technical constraints, or roadmap.
            </p>

            {status === "success" ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center leading-relaxed">
                ✓ Conversation Request Received! Our senior solutions architect will review your project details and follow up within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleConversationSubmit} noValidate className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      name="fullName"
                      required
                      autoComplete="name"
                      disabled={status === "loading"}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Work Email <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={status === "loading"}
                      placeholder="john@company.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Organization / Company
                    </label>
                    <input
                      name="company"
                      disabled={status === "loading"}
                      placeholder="Company Name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      disabled={status === "loading"}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Primary Topic of Interest
                  </label>
                  <select
                    name="topic"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white cursor-pointer disabled:opacity-50 transition-all"
                  >
                    <option value="Enterprise Architecture & Systems">Enterprise Architecture &amp; Systems</option>
                    <option value="Cloud Modernization & DevOps">Cloud Modernization &amp; DevOps</option>
                    <option value="Scalable Web & Mobile Engineering">Scalable Web &amp; Mobile Engineering</option>
                    <option value="AI Integration & Data Pipelines">AI Integration &amp; Data Pipelines</option>
                    <option value="Security Audit & Resilience">Security Audit &amp; Resilience</option>
                    <option value="General Strategic Inquiry">General Strategic Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Message / Project Context <span className="text-[#EA580C]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    disabled={status === "loading"}
                    placeholder="Describe your current system challenges, goals, or technical timeline..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all disabled:opacity-50 resize-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-0.5">
                  <input
                    type="checkbox"
                    name="needNda"
                    disabled={status === "loading"}
                    className="accent-[#EA580C] rounded cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-600 font-medium">
                    Request mutual Bilateral NDA prior to discussing sensitive architecture
                  </span>
                </label>

                {errorMessage && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={closeConversationModal}
                    disabled={status === "loading"}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#EA580C] hover:bg-orange-600 text-white font-bold py-2.5 px-5 min-w-[170px] rounded-lg text-xs tracking-wider uppercase font-mono transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
