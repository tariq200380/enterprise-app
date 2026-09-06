import Link from "next/link";

export default function WhatWeProvide() {
  return (
    <section className="w-full bg-[#F8FAFC] pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-gray-200 relative overflow-hidden select-none" id="what-we-provide-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center relative z-10">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col items-center text-center mb-10 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#0F172A] leading-tight">
            What We Provide
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl">
            Eight specialized engineering domains tailored for mission-critical enterprise scale, cloud modernization, and high availability.
          </p>
        </div>

        {/* 2 Columns × 4 Rows Desktop Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Card 1: Software Development */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                Software Development
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                Custom web and mobile applications engineered for reliability, built with modern maintainable architecture.
              </p>
              <Link href="/services#software-development" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 2: UI/UX Design */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                UI/UX Design
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                Interfaces designed around real user workflows, not just visual polish. Streamlined, accessible, and high-converting.
              </p>
              <Link href="/services#ui-ux" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Mobile Applications */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                Mobile Applications
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                High-performance iOS and Android applications crafted for native speed and intuitive mobile gestures.
              </p>
              <Link href="/services#mobile-applications" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Cloud Infrastructure */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                Cloud Infrastructure
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                Provisioning, CI/CD automated deployment, and hardening for infrastructure that scales with traffic.
              </p>
              <Link href="/services#cloud-infrastructure" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 5: Database Management */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                Database Management
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                Schema design, migrations, and ongoing management for high-concurrency relational and NoSQL databases.
              </p>
              <Link href="/services#database-management" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 6: Cybersecurity & QA */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                Cybersecurity &amp; QA
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                Security audits, automated test suites, and compliance checks to keep your systems protected.
              </p>
              <Link href="/services#cybersecurity" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 7: Artificial Intelligence (AI) */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
                <circle cx="9" cy="13" r="1" />
                <circle cx="15" cy="13" r="1" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                Artificial Intelligence (AI)
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                Private on-premise LLM fine-tuning, dense vector embeddings, and autonomous AI agent orchestration.
              </p>
              <Link href="/services#ai" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Card 8: Digital Marketing & Branding */}
          <div className="relative flex items-start gap-4 sm:gap-5 bg-white border border-gray-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-[#F0F5FF] border border-[#D6E4FF] shadow-xs">
              <svg className="w-5 h-5 text-[#0052FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col h-full">
              <h3 className="text-base sm:text-lg font-medium text-[#0F172A] leading-snug mb-1.5 tracking-tight">
                Digital Marketing &amp; Branding
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3 font-normal">
                Strategic tech product positioning, high-conversion CRO landing pages, and enterprise search visibility.
              </p>
              <Link href="/services#marketing" className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#0052FF] hover:text-[#0042D0] transition-colors w-fit">
                <span>Learn more</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
