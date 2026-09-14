import React from "react";
import Link from "next/link";

export default function PortfolioModernDesign() {
  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] font-sans">
      {/* ========================================================================= */}
      {/* SECTION 1: BUILT ON RIGOROUS ENTERPRISE STANDARDS                         */}
      {/* ========================================================================= */}
      <section className="w-full py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Card: Engineering Culture with Ambient Orange Glow */}
            <div className="col-span-12 lg:col-span-5 relative bg-[#0B1120] rounded-2xl border border-white/10 p-7 sm:p-9 flex flex-col justify-between overflow-hidden min-h-[380px] shadow-lg">
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
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full text-white/90 text-xs font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></span>
                  Engineering culture
                </span>
              </div>

              {/* Center Decorative High-Tech Architecture Monitor */}
              <div className="relative z-10 my-auto py-8">
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
                <h4 className="text-white font-bold text-sm sm:text-[15px] mb-1">
                  100% principal engineers led
                </h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  Direct senior architectural leadership on every build with zero
                  delegation layers or offshore intermediary staffing.
                </p>
              </div>
            </div>

            {/* Right Column: Built on rigorous enterprise standards */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              {/* Category Eyebrow */}
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#EA580C] font-mono mb-2 block">
                HOW WE GUARANTEE EXECUTION
              </span>

              {/* Section Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-[#0F172A] tracking-tight leading-[1.2] mb-3">
                Built on rigorous enterprise standards
              </h2>

              {/* Lead Paragraph */}
              <p className="text-slate-600 text-sm sm:text-[14.5px] leading-relaxed mb-7">
                Every case study in our portfolio is the direct outcome of disciplined
                architectural principles, continuous automated verification, and
                zero-compromise security controls.
              </p>

              {/* 2x2 Grid of Standard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Standard 01 */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                  <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                    01
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A] mb-1">
                    Contractual 99.99% SLA
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Every release backed by contractual delivery and uptime
                    guarantees with measurable commercial accountability.
                  </p>
                </div>

                {/* Standard 02 */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                  <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                    02
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A] mb-1">
                    Cryptographic zero trust
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Automated mTLS everywhere, isolated VPC boundaries, hardware-rooted
                    KMS, and immutable audit logs.
                  </p>
                </div>

                {/* Standard 03 */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                  <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                    03
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A] mb-1">
                    Dedicated senior pods
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Direct collaboration with senior principal architects daily on
                    context with zero offshore delegation layers.
                  </p>
                </div>

                {/* Standard 04 */}
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-orange-400/50 hover:shadow-sm transition-all">
                  <span className="inline-block font-mono text-xs font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/70 px-2.5 py-0.5 rounded mb-2.5">
                    04
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A] mb-1">
                    Zero-downtime releases
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] hover:text-orange-700 uppercase tracking-wider font-mono transition-colors"
                >
                  <span>Request technical scoping</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CASE STUDY 1 (Left Visual, Right Content)                      */}
      {/* ========================================================================= */}
      <section className="w-full py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Visual Preview Card with Ambient Orange Glow */}
            <div className="col-span-12 lg:col-span-6 relative bg-[#0B1120] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] shadow-lg">
              {/* Soft Orange Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_45%,rgba(249,115,22,0.24)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.035]"
              />

              {/* Top Badge */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-white/90 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
                  Fintech &amp; Banking
                </span>
              </div>

              {/* Center Abstract Graphic */}
              <div className="relative z-10 my-auto py-8">
                <div className="border border-white/10 rounded-xl bg-black/40 p-4 font-mono text-xs text-white/50 space-y-1.5 backdrop-blur-xs">
                  <div className="text-orange-400 font-bold flex justify-between">
                    <span>APEX_CLEARING_ENGINE // TX_STREAM</span>
                    <span className="text-emerald-400 text-[10px]">● SYNCHRONIZED</span>
                  </div>
                  <div>&gt; pipeline: multi_region_raft_consensus</div>
                  <div>
                    &gt; current_throughput:{" "}
                    <span className="text-white font-bold">150,000 TPS</span> [MAX]
                  </div>
                  <div>
                    &gt; settlement_latency_p99:{" "}
                    <span className="text-emerald-300 font-bold">8.4ms</span>
                  </div>
                  <div className="text-white/35 text-[11px]">
                    &gt; transactional_drift: 0.000000% (atomic integrity verified)
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">
                  Apex Global Settlement Net • United Kingdom
                </span>
                <span className="text-orange-400 font-semibold text-[11px]">
                  VERIFIED BUILD
                </span>
              </div>
            </div>

            {/* Right Column: Case Study Details */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C] font-mono mb-2 block">
                Fintech &amp; Banking core
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-[1.8rem] font-extrabold text-[#0F172A] tracking-tight leading-[1.25] mb-3">
                Next-gen multi-region high frequency payment processing engine
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Engineered ultra-low latency transaction clearing engine capable of
                processing 150,000 TPS with sub-12ms latency and zero transactional
                drift rate across distributed European and North American zones.
              </p>

              {/* Metric Boxes (3 In A Row) */}
              <div className="grid grid-cols-3 gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4 mb-5 shadow-2xs">
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    150k TPS
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Throughput ceiling
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    &lt;12ms
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Baseline latency
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    99.999%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Uptime SLA
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Go
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Kubernetes
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  CockroachDB
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Kafka
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  AWS CloudTrail
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Redis
                </span>
              </div>

              {/* Button */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#EA580C] text-white text-xs font-bold px-5 py-3 rounded-lg shadow-sm transition-colors duration-200"
                >
                  <span>Explore case study</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CASE STUDY 2 (Left Content, Right Visual)                      */}
      {/* ========================================================================= */}
      <section className="w-full py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Case Study Details */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C] font-mono mb-2 block">
                Enterprise AI &amp; Orchestration
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-[1.8rem] font-extrabold text-[#0F172A] tracking-tight leading-[1.25] mb-3">
                Enterprise neural copilot &amp; multi-agent document intelligence
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Autonomous multi-agent orchestration and dense vector search to automate
                compliance extraction across 20M+ medical unstructured diagnostic
                records with zero private hallucination leakage.
              </p>

              {/* Metric Boxes (3 In A Row) */}
              <div className="grid grid-cols-3 gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4 mb-5 shadow-2xs">
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    86%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Staff time saved
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    99.4%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Extraction accuracy
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    100%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    HIPAA compliant
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Python
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  PyTorch
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Ray Serve
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  LangChain
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  FastAPI
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Docker
                </span>
              </div>

              {/* Button */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#EA580C] text-white text-xs font-bold px-5 py-3 rounded-lg shadow-sm transition-colors duration-200"
                >
                  <span>Explore case study</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Preview Card with Ambient Orange Glow */}
            <div className="col-span-12 lg:col-span-6 relative bg-[#0B1120] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] shadow-lg order-1 lg:order-2">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_45%,rgba(249,115,22,0.24)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.035]"
              />

              {/* Top Badge */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-white/90 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
                  AI &amp; Machine Learning
                </span>
              </div>

              {/* Center Abstract Graphic */}
              <div className="relative z-10 my-auto py-8">
                <div className="border border-white/10 rounded-xl bg-black/40 p-4 font-mono text-xs text-white/50 space-y-1.5 backdrop-blur-xs">
                  <div className="text-orange-400 font-bold flex justify-between">
                    <span>NEURAL_DISPATCHER // RAG_CORPUS</span>
                    <span className="text-emerald-400 text-[10px]">● INFERENCE ACTIVE</span>
                  </div>
                  <div>&gt; embedding_dimension: 3072 (dense float16)</div>
                  <div>
                    &gt; records_indexed:{" "}
                    <span className="text-white font-bold">20,400,000 docs</span>
                  </div>
                  <div>
                    &gt; retrieval_p99:{" "}
                    <span className="text-emerald-300 font-bold">14.2ms</span>
                  </div>
                  <div className="text-white/35 text-[11px]">
                    &gt; pii_masking: automated redaction verified
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">
                  Cognitive Health Analytics • United States
                </span>
                <span className="text-orange-400 font-semibold text-[11px]">
                  VERIFIED BUILD
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CASE STUDY 3 (Left Visual, Right Content)                      */}
      {/* ========================================================================= */}
      <section className="w-full py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Visual Preview Card with Ambient Orange Glow */}
            <div className="col-span-12 lg:col-span-6 relative bg-[#0B1120] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] shadow-lg">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_45%,rgba(249,115,22,0.24)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.035]"
              />

              {/* Top Badge */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-white/90 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
                  Cloud Infrastructure &amp; DevOps
                </span>
              </div>

              {/* Center Abstract Graphic */}
              <div className="relative z-10 my-auto py-8">
                <div className="border border-white/10 rounded-xl bg-black/40 p-4 font-mono text-xs text-white/50 space-y-1.5 backdrop-blur-xs">
                  <div className="text-orange-400 font-bold flex justify-between">
                    <span>GITOPS_MESH // MULTI_CLOUD</span>
                    <span className="text-emerald-400 text-[10px]">● SYNCHRONIZED</span>
                  </div>
                  <div>&gt; active_clusters: 18 nodes across 4 regions</div>
                  <div>
                    &gt; telemetry_throughput:{" "}
                    <span className="text-white font-bold">18,000,000 / day</span>
                  </div>
                  <div>
                    &gt; failover_recovery_rto:{" "}
                    <span className="text-emerald-300 font-bold">&lt;1.8s</span>
                  </div>
                  <div className="text-white/35 text-[11px]">
                    &gt; infra_savings: -62% annualized cloud spend
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">
                  Nexen Global Logistics • Germany
                </span>
                <span className="text-orange-400 font-semibold text-[11px]">
                  VERIFIED BUILD
                </span>
              </div>
            </div>

            {/* Right Column: Case Study Details */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C] font-mono mb-2 block">
                Cloud Infrastructure &amp; DevOps
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-[1.8rem] font-extrabold text-[#0F172A] tracking-tight leading-[1.25] mb-3">
                Zero-trust multi-cloud Kubernetes infrastructure &amp; GitOps mesh
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Architected an enterprise container pipeline and automated GitOps mesh
                processing real-time telemetry from 50,000+ freight systems across
                Europe with multi-cloud automated failover.
              </p>

              {/* Metric Boxes (3 In A Row) */}
              <div className="grid grid-cols-3 gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4 mb-5 shadow-2xs">
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    18m daily
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Events processed
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    -62%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Cloud infra costs
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    &lt;2 mins
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Deploy cycle
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Terraform
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Kubernetes
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Istio
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  ArgoCD
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Grafana
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Prometheus
                </span>
              </div>

              {/* Button */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#EA580C] text-white text-xs font-bold px-5 py-3 rounded-lg shadow-sm transition-colors duration-200"
                >
                  <span>Explore case study</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CASE STUDY 4 (Left Content, Right Visual)                      */}
      {/* ========================================================================= */}
      <section className="w-full py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Case Study Details */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#EA580C] font-mono mb-2 block">
                Cybersecurity &amp; Governance
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-[1.8rem] font-extrabold text-[#0F172A] tracking-tight leading-[1.25] mb-3">
                Automated SOC 2 compliance logging &amp; cryptographic shield
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Continuous security telemetry and automated cryptographic vulnerability
                mitigation, heading direct ISO 27001 and SOC 2 Type II controls with
                real-time threat detection.
              </p>

              {/* Metric Boxes (3 In A Row) */}
              <div className="grid grid-cols-3 gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4 mb-5 shadow-2xs">
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    100% pass
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Continuous audit
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    &lt;10 sec
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Threat detection
                  </div>
                </div>
                <div className="border-l border-[#E2E8F0] pl-3">
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    500+
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Automated tests
                  </div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  HashiCorp Vault
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  eBPF
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Wazuh
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  Go
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  AWS
                </span>
                <span className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs">
                  PostgreSQL
                </span>
              </div>

              {/* Button */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#EA580C] text-white text-xs font-bold px-5 py-3 rounded-lg shadow-sm transition-colors duration-200"
                >
                  <span>Explore case study</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Preview Card with Ambient Orange Glow */}
            <div className="col-span-12 lg:col-span-6 relative bg-[#0B1120] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] shadow-lg order-1 lg:order-2">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_45%,rgba(249,115,22,0.24)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.035]"
              />

              {/* Top Badge */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-white/90 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
                  Cybersecurity
                </span>
              </div>

              {/* Center Abstract Graphic */}
              <div className="relative z-10 my-auto py-8">
                <div className="border border-white/10 rounded-xl bg-black/40 p-4 font-mono text-xs text-white/50 space-y-1.5 backdrop-blur-xs">
                  <div className="text-orange-400 font-bold flex justify-between">
                    <span>SECURITY_AUDIT // CONTINUOUS</span>
                    <span className="text-emerald-400 text-[10px]">● ZERO VULNERABILITIES</span>
                  </div>
                  <div>&gt; encryption: AES-256-GCM + hardware KMS</div>
                  <div>
                    &gt; compliance_status:{" "}
                    <span className="text-white font-bold">SOC 2 TYPE II PASS</span>
                  </div>
                  <div>
                    &gt; intrusion_alert_latency:{" "}
                    <span className="text-emerald-300 font-bold">&lt;4.2s</span>
                  </div>
                  <div className="text-white/35 text-[11px]">
                    &gt; access_controls: biometric mTLS + short-lived JWTs
                  </div>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">
                  Sentinel Knox Trust • Switzerland
                </span>
                <span className="text-orange-400 font-semibold text-[11px]">
                  VERIFIED BUILD
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
