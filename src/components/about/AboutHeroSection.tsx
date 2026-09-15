import React from "react";
import { PartnerReviewLinks } from "@/lib/about-data";

interface AboutHeroSectionProps {
  partnerLinks?: PartnerReviewLinks;
  onOpenModal?: (topic?: string) => void;
}

export default function AboutHeroSection({
  partnerLinks,
  onOpenModal,
}: AboutHeroSectionProps) {
  const handleScrollToJourney = () => {
    const el = document.getElementById("journey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const theManifestUrl = partnerLinks?.theManifestUrl || "https://themanifest.com";
  const shopifyUrl = partnerLinks?.shopifyUrl || "https://www.shopify.com/partners";
  const trustpilotUrl = partnerLinks?.trustpilotUrl || "https://www.trustpilot.com";
  const clutchUrl = partnerLinks?.clutchUrl || "https://clutch.co";
  const googleReviewsUrl = partnerLinks?.googleReviewsUrl || "https://www.google.com";

  return (
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
                onClick={() => onOpenModal?.("Enterprise Architecture & Systems")}
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
  );
}
