import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise Case Studies & Delivered Systems | Creed Tech",
  description: "Explore real-world software architecture deployments, high-concurrency systems, and digital transformations delivered by Creed Tech.",
};

export default function PortfolioPage() {
  return (
    <div className="w-full bg-[#FAFAFC] text-[#111827] font-sans text-left">
      {/* ========================================================= */}
      {/* 1. FLAGSHIP CASE STUDIES HERO SECTION                     */}
      {/* ========================================================= */}
      <section id="portfolio-hero-section" className="w-full bg-[#0B1120] py-12 lg:py-16 px-6 lg:px-16 relative overflow-hidden">
        {/* Ambient Orange Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,107,0,0.17)_0%,rgba(255,107,0,0.05)_45%,rgba(11,17,32,0)_70%),radial-gradient(circle_at_0%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%),radial-gradient(circle_at_100%_50%,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.05)_40%,rgba(11,17,32,0)_65%)]"
        />
        {/* Subtle 36px Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.035]"
        />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div className="text-[11px] font-semibold uppercase tracking-[3px] text-[#AEB6C2] mb-2.5">
              FLAGSHIP CASE STUDIES &amp; PROVEN ARCHITECTURES
            </div>
            <div className="w-[60px] h-[2px] bg-[#FF6B00] opacity-80 mb-6" />
            <h1 className="text-[34px] sm:text-[46px] font-extrabold text-white leading-[1.1] mb-1 tracking-tight">
              Architectural Mastery.
            </h1>
            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white leading-[1.2] mb-4 tracking-tight">
              Proven Business Impact.
            </h2>
            <p className="text-base font-normal text-white/75 leading-[1.7] max-w-[520px] mb-7">
              In-depth case studies documenting how Creed Tech engineers mission-critical infrastructure, multi-region database replication, private LLMs, and enterprise-grade security platforms — delivering measurable outcomes for global enterprises.
            </p>
            <Link
              href="#portfolio-case-studies"
              className="inline-block bg-[#0052FF] hover:bg-[#0042D0] text-white text-sm font-semibold px-8 py-4 rounded transition-colors"
            >
              View Case Studies
            </Link>
          </div>

          {/* Right Column - 4 Stat Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4">
            {/* Card 1 */}
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
              <svg className="w-6 h-6 text-[#00F0FF]/70 mb-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">End-to-End</p>
              <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">Project Delivery</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
              <svg className="w-6 h-6 text-[#00F0FF]/70 mb-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">Security-First</p>
              <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">Engineering</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
              <svg className="w-6 h-6 text-[#00F0FF]/70 mb-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">Reliable</p>
              <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">Delivery</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-[14px] p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-[#FF6B00]/40 transition-all text-left">
              <svg className="w-6 h-6 text-[#00F0FF]/70 mb-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <p className="text-xl sm:text-[26px] font-bold text-white block leading-[1.1] mb-0.5">Quality-Driven</p>
              <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 block">Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STANDARDS & EXECUTION SHOWCASE SECTION                */}
      {/* ========================================================= */}
      <section className="w-full py-10 sm:py-14 bg-[#F4F6FA] border-b border-[#E5E7EB] text-[#111827]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: High-Tech Engineering Picture */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-[#E5E7EB] h-[320px] sm:h-[460px] group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
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
                  ENGINEERING CULTURE
                </span>
              </div>

              {/* Floating Metric Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E5E7EB] shadow text-left flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-gray-950 block">100% Principal Engineer Led</span>
                  <span className="text-[10px] text-gray-500 font-medium">Zero junior outsourcing. Full accountability.</span>
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
                  Built on Rigorous Enterprise Standards
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every case study in our portfolio is the direct outcome of disciplined architectural principles, continuous automated verification, and zero-compromise security controls.
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

      {/* ========================================================= */}
      {/* 3. ALTERNATING CASE STUDIES SECTION                       */}
      {/* ========================================================= */}
      <section id="portfolio-case-studies" className="w-full py-14 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col gap-16 sm:gap-24">

          {/* CASE 01 (Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-950 h-[280px] sm:h-[400px] group">
              <img
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80"
                alt="Next-Gen Multi-Region High-Frequency Payment Processing Engine"
                width={550}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black/70 backdrop-blur-md text-white font-semibold text-xs flex items-center justify-center border border-white/20 rounded-sm">
                  01
                </span>
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
                  Fintech &amp; Banking
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-white/90 text-xs font-semibold backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-md">
                🏢 Apex Global Settlement Rail • United Kingdom
              </div>
            </div>

            {/* Content Column */}
            <div className="text-left flex flex-col gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0052FF] inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                  Fintech &amp; Banking Rails
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-gray-950 tracking-tight leading-snug">
                Next-Gen Multi-Region High-Frequency Payment Processing Engine
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed">
                Engineered an ultra-low latency transaction clearing engine capable of processing 120,000 TPS with sub-10ms latency and zero transactional data loss.
              </p>

              {/* 3 Impact Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#F2F8FD] rounded-xl border border-[#BFDBFE]">
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">120k TPS</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Throughput Speed</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">-85%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Latency Drop</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">99.999%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Uptime SLA</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Architectural Stack:
                </span>
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Go</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Kubernetes</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">CockroachDB</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Kafka</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">AWS GovCloud</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Redis</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-[#0052FF] text-white font-bold text-xs rounded-sm transition-colors"
                >
                  <span>Explore Case Study Deep-Dive</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CASE 02 (Content Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Content Column */}
            <div className="text-left flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6B00] inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                  Private LLM Orchestration
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-gray-950 tracking-tight leading-snug">
                Enterprise Neural Copilot &amp; Multi-Agent Document Intelligence
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed">
                Deployed private on-premise LLMs and dense vector search to automate compliance extraction across 15M+ medical unstructured diagnostic records.
              </p>

              {/* 3 Impact Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#F2F8FD] rounded-xl border border-[#BFDBFE]">
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">88%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Audit Time Saved</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">99.4%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Extraction Accuracy</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">100% On-Prem</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Zero Data Leakage</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Architectural Stack:
                </span>
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Python</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">PyTorch</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Pinecone</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">LangChain</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">FastAPI</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Docker</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-[#0052FF] text-white font-bold text-xs rounded-sm transition-colors"
                >
                  <span>Explore Case Study Deep-Dive</span>
                </Link>
              </div>
            </div>

            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-950 h-[280px] sm:h-[400px] group order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
                alt="Enterprise Neural Copilot & Multi-Agent Document Intelligence"
                width={550}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black/70 backdrop-blur-md text-white font-semibold text-xs flex items-center justify-center border border-white/20 rounded-sm">
                  02
                </span>
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
                  AI &amp; Machine Learning
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-white/90 text-xs font-semibold backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-md">
                🏢 Cognitive Health Analytics • United States
              </div>
            </div>
          </div>

          {/* CASE 03 (Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-950 h-[280px] sm:h-[400px] group">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80"
                alt="Zero-Trust Multi-Cloud Kubernetes Infrastructure & GitOps Mesh"
                width={550}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black/70 backdrop-blur-md text-white font-semibold text-xs flex items-center justify-center border border-white/20 rounded-sm">
                  03
                </span>
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
                  Cloud &amp; DevOps
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-white/90 text-xs font-semibold backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-md">
                🏢 Nexus Global Logistics • Germany
              </div>
            </div>

            {/* Content Column */}
            <div className="text-left flex flex-col gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#10B981] inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                  Cloud Infrastructure &amp; DevOps
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-gray-950 tracking-tight leading-snug">
                Zero-Trust Multi-Cloud Kubernetes Infrastructure &amp; GitOps Mesh
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed">
                Architected an IoT edge-ingestion pipeline and automated GitOps mesh processing real-time telemetry from 45,000+ freight systems across Europe.
              </p>

              {/* 3 Impact Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#F2F8FD] rounded-xl border border-[#BFDBFE]">
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">14x Daily</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Deploy Frequency</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">-42%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Compute Cost</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">&lt; 2 Mins</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Recovery Time</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Architectural Stack:
                </span>
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Terraform</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Kubernetes</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Istio</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">ArgoCD</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Azure</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Prometheus</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-[#0052FF] text-white font-bold text-xs rounded-sm transition-colors"
                >
                  <span>Explore Case Study Deep-Dive</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CASE 04 (Content Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Content Column */}
            <div className="text-left flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0052FF] inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                  Cybersecurity &amp; Governance
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-gray-950 tracking-tight leading-snug">
                Automated SOC 2 Compliance Logging &amp; Cryptographic Shield
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed">
                Built continuous security telemetry and automated cryptographic vulnerability mitigation meeting strict ISO 27001 and SOC 2 Type II controls.
              </p>

              {/* 3 Impact Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#F2F8FD] rounded-xl border border-[#BFDBFE]">
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">100% Pass</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Security Audit</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">&lt; 30 Sec</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Threat Response</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">50M+</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Encrypted Records</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Architectural Stack:
                </span>
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">HashiCorp Vault</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">eBPF</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Wazuh</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Go</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">GCP</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">PostgreSQL</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-[#0052FF] text-white font-bold text-xs rounded-sm transition-colors"
                >
                  <span>Explore Case Study Deep-Dive</span>
                </Link>
              </div>
            </div>

            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-950 h-[280px] sm:h-[400px] group order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80"
                alt="Automated SOC 2 Compliance Logging & Cryptographic Shield"
                width={550}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black/70 backdrop-blur-md text-white font-semibold text-xs flex items-center justify-center border border-white/20 rounded-sm">
                  04
                </span>
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
                  Cybersecurity
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-white/90 text-xs font-semibold backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-md">
                🏢 VaultSafe InsurTech • Switzerland
              </div>
            </div>
          </div>

          {/* CASE 05 (Image Left, Content Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-950 h-[280px] sm:h-[400px] group">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80"
                alt="High-Concurrency Enterprise Platform Architecture & Automated CI/CD"
                width={550}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-black/70 backdrop-blur-md text-white font-semibold text-xs flex items-center justify-center border border-white/20 rounded-sm">
                  05
                </span>
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
                  Engineering
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-white/90 text-xs font-semibold backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-md">
                🏢 Global Enterprise Partner
              </div>
            </div>

            {/* Content Column */}
            <div className="text-left flex flex-col gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF6B00] inline-block" />
                <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                  Enterprise Engineering
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-gray-950 tracking-tight leading-snug">
                High-Concurrency Enterprise Platform Architecture &amp; Automated CI/CD
              </h3>

              <p className="text-sm text-gray-700 leading-relaxed">
                Engineered high-concurrency cloud platform with automated CI/CD and zero-trust security controls.
              </p>

              {/* 3 Impact Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#F2F8FD] rounded-xl border border-[#BFDBFE]">
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">10x</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Velocity Boost</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">99.99%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Uptime SLA</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">0 Defect</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Code SLA</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Architectural Stack:
                </span>
                <div className="flex items-center flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Go</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Kubernetes</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">Docker</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">PostgreSQL</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200">AWS</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-[#0052FF] text-white font-bold text-xs rounded-sm transition-colors"
                >
                  <span>Explore Case Study Deep-Dive</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. CLIENT ENGAGEMENT CTA BANNER                           */}
      {/* ========================================================= */}
      <section className="w-full bg-[#0B1120] py-14 sm:py-16 text-white text-center relative overflow-hidden border-t border-gray-800">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.22)_0%,transparent_65%)]"
        />
        <div className="max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
          <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider">
            HAVE AN AMBITIOUS ENGINEERING INITIATIVE?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Let&apos;s Build Your Next High-Performance Platform
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed font-normal">
            Schedule a confidential sprint architecture consultation with our principal software architects.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="h-12 px-8 inline-flex items-center justify-center bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Start Technical Scoping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

