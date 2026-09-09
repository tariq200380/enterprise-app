import React from "react";
import Link from "next/link";
import { PortfolioShowcaseSettings } from "../admin/settings/types";

interface PortfolioShowcaseSectionProps {
  showcase: PortfolioShowcaseSettings;
}

export default function PortfolioShowcaseSection({
  showcase,
}: PortfolioShowcaseSectionProps) {
  return (
    <section className="w-full py-10 sm:py-14 bg-[#F4F6FA] border-b border-[#E5E7EB] text-[#111827]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Engineering Picture & Badges */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-[#E5E7EB] h-[320px] sm:h-[460px] group">
            <img
              src={
                showcase.showcasePictureUrl ||
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
              }
              alt="Creed Tech Senior Engineering Team"
              width={600}
              height={460}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#0052FF] text-white text-[11px] font-bold uppercase tracking-wider rounded-sm shadow">
                {showcase.badgeLabel || "ENGINEERING CULTURE"}
              </span>
            </div>

            {/* Floating Metric Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E5E7EB] shadow text-left flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-gray-950 block">
                  {showcase.overlayMetricTitle || "100% Principal Engineer Led"}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Zero junior outsourcing. Full accountability.
                </span>
              </div>
              <span className="px-2.5 py-1 bg-[#DCFCE7] text-[#166534] text-[10px] font-bold rounded-sm shrink-0">
                Verified SLA
              </span>
            </div>
          </div>

          {/* Right: Engineering Standards & Execution Pillars */}
          <div className="lg:col-span-7 text-left flex flex-col gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 text-[#0052FF] text-[11px] font-bold uppercase tracking-wider mb-3 rounded-sm">
                <span className="w-1.5 h-1.5 bg-[#0052FF] inline-block" />
                HOW WE GUARANTEE SUCCESS
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-950 tracking-tight leading-tight mb-3">
                {showcase.headline || "Built on Rigorous Enterprise Standards"}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {showcase.description ||
                  "Every case study in our portfolio is the direct outcome of disciplined architectural principles, continuous automated verification, and zero-compromise security controls."}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">⚡</span>
                  <h4 className="text-[13px] font-bold text-gray-950">Contractual 99.99% SLA</h4>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed">
                  Every milestone backed by contractual latency and uptime guarantees.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">🛡️</span>
                  <h4 className="text-[13px] font-bold text-gray-950">Cryptographic Zero-Trust</h4>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed">
                  Automated mTLS encryption, isolated VPC boundaries, and immutable audit logs.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">👨‍💻</span>
                  <h4 className="text-[13px] font-bold text-gray-950">Dedicated Senior Pods</h4>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed">
                  Direct collaboration with senior principal architects with daily Git commits.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">🚀</span>
                  <h4 className="text-[13px] font-bold text-gray-950">Zero-Downtime Releases</h4>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-relaxed">
                  Automated CI/CD staging with instant multi-region failover and 100% test coverage.
                </p>
              </div>
            </div>

            {/* Quote & CTA Link */}
            <div className="pt-3 flex items-center justify-between flex-wrap gap-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 italic">
                &ldquo;Quality is not an afterthought; it is contractually engineered into our foundations.&rdquo;
              </p>
              <Link
                href="/contact"
                className="text-xs font-bold text-[#0052FF] hover:underline inline-flex items-center gap-1"
              >
                <span>Request Technical Scoping &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
