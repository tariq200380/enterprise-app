import React from "react";
import Link from "next/link";
import { PortfolioShowcaseData } from "@/lib/portfolio-data";

interface PortfolioStandardsSectionProps {
  showcase?: PortfolioShowcaseData;
}

export default function PortfolioStandardsSection({
  showcase,
}: PortfolioStandardsSectionProps) {
  return (
    <section className="w-full py-16 sm:py-20 border-b border-[#E2E8F0] bg-[#F7F6F5] text-[#0F172A]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Card: Engineering Culture with Ambient Orange Glow */}
          <div className="col-span-12 md:col-span-5 relative bg-[#0B1120] rounded-2xl border border-white/10 p-7 sm:p-9 flex flex-col justify-between overflow-hidden min-h-[380px] shadow-lg">
            {/* Ambient Orange Radial Glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_40%,rgba(249,115,22,0.25)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
            />
            {/* Subtle Grid Lines */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.035]"
            />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full text-white/90 text-xs font-semibold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></span>
                {showcase?.badgeLabel || "Engineering culture"}
              </span>
            </div>

            {/* Showcase Image Visual if available */}
            {showcase?.showcasePictureUrl && (
              <div className="relative z-10 w-full h-40 rounded-xl overflow-hidden border border-white/15 mb-4 shadow-md bg-black/50 group">
                <img
                  src={showcase.showcasePictureUrl}
                  alt={showcase?.headline || "Engineering Culture"}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-semibold tracking-wider text-white/90">
                  <span className="text-orange-400 font-semibold">{showcase?.badgeLabel || "ENGINEERING CULTURE"}</span>
                  <span className="text-white/70">ARCHITECTURAL RIGOR</span>
                </div>
              </div>
            )}

            {/* Center Decorative High-Tech Architecture Monitor */}
            <div className="relative z-10 my-auto py-4">
              <div className="space-y-2.5 font-mono text-xs text-white/45 bg-black/35 border border-white/10 rounded-xl p-4 backdrop-blur-xs">
                <div className="text-orange-400 font-semibold flex items-center justify-between">
                  <span>// Enterprise Verification Invariants</span>
                  <span className="text-[10px] text-white/40">v4.8</span>
                </div>
                <div className="text-white/70">
                  &gt; verify_cluster_invariants(strict=true)
                </div>
                <div>
                  &gt; latency_budget_p99:{" "}
                  <span className="text-orange-300 font-bold">&lt;12ms</span>{" "}
                  [ENFORCED]
                </div>
                <div>
                  &gt; cryptographic_attestation:{" "}
                  <span className="text-emerald-400 font-bold">verified</span>{" "}
                  (ed25519)
                </div>
                <div className="text-[11px] text-white/35">
                  &gt; audit_trail: immutable merkle tree sync OK
                </div>
              </div>
            </div>

            {/* Bottom Guarantee */}
            <div className="relative z-10 border-t border-white/10 pt-5">
              <h4 className="font-outfit text-white font-bold text-sm sm:text-[15px] mb-1">
                {showcase?.overlayMetricTitle || "100% principal engineers led"}
              </h4>
              <p className="text-white/60 text-xs leading-relaxed font-normal">
                Direct senior architectural leadership on every build with zero
                delegation layers or offshore intermediary staffing.
              </p>
            </div>
          </div>

          {/* Right Column: Built on rigorous enterprise standards */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center text-left">
            {/* Category Eyebrow */}
            <span className="text-xs font-semibold uppercase tracking-wider text-[#EA580C] mb-2 block">
              {showcase?.badgeLabel || "HOW WE GUARANTEE EXECUTION"}
            </span>

            {/* Section Heading */}
            <h2 className="font-outfit text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-[#0F172A] tracking-tight leading-[1.2] mb-3">
              {showcase?.headline || "Built on rigorous enterprise standards"}
            </h2>

            {/* Lead Paragraph */}
            <p className="text-slate-600 text-sm sm:text-[14.5px] leading-relaxed mb-7 font-normal">
              {showcase?.description ||
                "Every case study in our portfolio is the direct outcome of disciplined architectural principles, continuous automated verification, and zero-compromise security controls."}
            </p>

            {/* 2x2 Grid of Standard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Standard 01 */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                <span className="inline-block font-outfit text-xs font-bold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                  01
                </span>
                <h4 className="font-outfit text-sm font-bold text-[#0F172A] mb-1">
                  Contractual 99.99% SLA
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Every release backed by contractual delivery and uptime
                  guarantees with measurable commercial accountability.
                </p>
              </div>

              {/* Standard 02 */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                <span className="inline-block font-outfit text-xs font-bold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                  02
                </span>
                <h4 className="font-outfit text-sm font-bold text-[#0F172A] mb-1">
                  Cryptographic zero trust
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Automated mTLS everywhere, isolated VPC boundaries, hardware-rooted
                  KMS, and immutable audit logs.
                </p>
              </div>

              {/* Standard 03 */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                <span className="inline-block font-outfit text-xs font-bold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                  03
                </span>
                <h4 className="font-outfit text-sm font-bold text-[#0F172A] mb-1">
                  Dedicated senior pods
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Direct collaboration with senior principal architects daily on
                  context with zero offshore delegation layers.
                </p>
              </div>

              {/* Standard 04 */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                <span className="inline-block font-outfit text-xs font-bold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                  04
                </span>
                <h4 className="font-outfit text-sm font-bold text-[#0F172A] mb-1">
                  Zero-downtime releases
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Automated GitOps shipping with zero-impact multi-region failovers
                  and 100% automated test coverage.
                </p>
              </div>
            </div>

            {/* Quote Line */}
            <div className="border-l-2 border-[#EA580C] pl-4 py-1 mb-4">
              <p className="italic text-xs sm:text-[13px] text-slate-600 font-medium">
                &ldquo;Quality is not an afterthought — it&apos;s a continuously
                engineered code foundation.&rdquo;
              </p>
            </div>

            {/* Action Link */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EA580C] hover:text-orange-700 uppercase tracking-wider transition-colors"
              >
                <span>Request technical scoping</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
