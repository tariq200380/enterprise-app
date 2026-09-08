import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Creed Tech | Engineering Principles & Leadership",
  description: "Learn about Creed Tech's engineering principles, distributed architecture hubs, and commitment to sovereign enterprise software.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white text-[#111827] font-sans text-left overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. HERO: COMPANY STORY (LIGHT PLATINUM THEME)             */}
      {/* ========================================================= */}
      <section className="w-full bg-gradient-to-b from-[#F2F5FB] via-[#F8FAFC] to-white py-14 sm:py-24 relative overflow-hidden border-b border-[#E5E7EB] text-center">
        {/* Ambient Radial Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,82,255,0.08)_0%,transparent_60%),radial-gradient(circle_at_85%_60%,rgba(255,107,0,0.06)_0%,transparent_50%)]"
        />
        {/* Subtle 48px Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 pointer-events-none bg-[linear-gradient(to_right,rgba(0,82,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,82,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center gap-5 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-gray-300 text-[#0052FF] text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full inline-block" />
            <span>OUR STORY • OUR PHILOSOPHY • OUR CRAFT</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#030712] leading-tight max-w-4xl">
            We are architects, builders, and custodians of{" "}
            <span className="text-[#0052FF]">critical digital infrastructure.</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-[#4B5563] leading-relaxed max-w-2xl font-normal">
            Founded on the belief that software should be engineered like bridges and skyscrapers—with mathematical precision, enduring resilience, and an obsessive focus on human utility.
          </p>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="h-11 px-6 inline-flex items-center justify-center bg-[#0052FF] hover:bg-[#0042D0] text-white text-sm font-semibold rounded transition-colors"
            >
              Start a Conversation
            </Link>
            <Link
              href="#philosophy"
              className="h-11 px-6 inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#1F2937] font-bold text-[13px] rounded border border-gray-300 shadow-sm transition-colors"
            >
              Explore Our Journey &darr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PARTNERS MARQUEE RIBBON                                */}
      {/* ========================================================= */}
      <section className="w-full py-6 border-t border-b border-[#D6E4FF] overflow-hidden relative select-none bg-[#F4F8FF]">
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Gradient Edge Fade Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F4F8FF] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F4F8FF] to-transparent" />

          {/* Infinite Continuous Marquee Track */}
          <div className="partner-marquee-track items-center gap-14 sm:gap-20 px-6">
            {/* Set 1 */}
            <div className="flex items-center gap-14 sm:gap-20 shrink-0">
              <a href="https://clutch.co" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/clutch.webp" alt="Clutch" className="h-7 w-auto object-contain" width={105} height={28} loading="lazy" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/google.webp" alt="Google" className="h-9 w-auto object-contain" width={110} height={36} loading="lazy" />
              </a>
              <a href="https://themanifest.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/the-manifest.webp" alt="The Manifest" className="h-11 w-auto object-contain" width={130} height={44} loading="lazy" />
              </a>
              <a href="https://www.shopify.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/shopify.webp" alt="Shopify" className="h-9 w-auto object-contain" width={120} height={36} loading="lazy" />
              </a>
              <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/trustpilot.webp" alt="Trustpilot" className="h-9 w-auto object-contain" width={130} height={36} loading="lazy" />
              </a>
            </div>

            {/* Set 2 */}
            <div className="flex items-center gap-14 sm:gap-20 shrink-0">
              <a href="https://clutch.co" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/clutch.webp" alt="Clutch" className="h-7 w-auto object-contain" width={105} height={28} loading="lazy" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/google.webp" alt="Google" className="h-9 w-auto object-contain" width={110} height={36} loading="lazy" />
              </a>
              <a href="https://themanifest.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/the-manifest.webp" alt="The Manifest" className="h-11 w-auto object-contain" width={130} height={44} loading="lazy" />
              </a>
              <a href="https://www.shopify.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/shopify.webp" alt="Shopify" className="h-9 w-auto object-contain" width={120} height={36} loading="lazy" />
              </a>
              <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/trustpilot.webp" alt="Trustpilot" className="h-9 w-auto object-contain" width={130} height={36} loading="lazy" />
              </a>
            </div>

            {/* Set 3 */}
            <div className="flex items-center gap-14 sm:gap-20 shrink-0">
              <a href="https://clutch.co" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/clutch.webp" alt="Clutch" className="h-7 w-auto object-contain" width={105} height={28} loading="lazy" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/google.webp" alt="Google" className="h-9 w-auto object-contain" width={110} height={36} loading="lazy" />
              </a>
              <a href="https://themanifest.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/the-manifest.webp" alt="The Manifest" className="h-11 w-auto object-contain" width={130} height={44} loading="lazy" />
              </a>
              <a href="https://www.shopify.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/shopify.webp" alt="Shopify" className="h-9 w-auto object-contain" width={120} height={36} loading="lazy" />
              </a>
              <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/trustpilot.webp" alt="Trustpilot" className="h-9 w-auto object-contain" width={130} height={36} loading="lazy" />
              </a>
            </div>

            {/* Set 4 */}
            <div className="flex items-center gap-14 sm:gap-20 shrink-0">
              <a href="https://clutch.co" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/clutch.webp" alt="Clutch" className="h-7 w-auto object-contain" width={105} height={28} loading="lazy" />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/google.webp" alt="Google" className="h-9 w-auto object-contain" width={110} height={36} loading="lazy" />
              </a>
              <a href="https://themanifest.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/the-manifest.webp" alt="The Manifest" className="h-11 w-auto object-contain" width={130} height={44} loading="lazy" />
              </a>
              <a href="https://www.shopify.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/shopify.webp" alt="Shopify" className="h-9 w-auto object-contain" width={120} height={36} loading="lazy" />
              </a>
              <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                <img src="/images/partners/trustpilot.webp" alt="Trustpilot" className="h-9 w-auto object-contain" width={130} height={36} loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR PHILOSOPHY & 6 CORE PRINCIPLES                     */}
      {/* ========================================================= */}
      <section id="philosophy" className="w-full py-16 sm:py-24 border-b border-[#E5E7EB] text-center bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11.5px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1.5">
              CORE VALUES &amp; DIRECTION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
              Our Philosophy
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              Our vision is to be at the forefront of technological innovation, enabling businesses worldwide to harness the power of digital transformation for sustainable growth and success. Established in 2023 with a mission to eliminate technical debt and bridge deep computer science with real-world enterprise velocity.
            </p>
          </div>

          {/* 6 Core Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {/* Card 1: Progress */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center text-2xl mb-5">
                  📊
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">Progress</h3>
                <p className="text-[13.5px] text-[#374151] leading-relaxed font-normal">
                  Our driving force is our clients&apos; success, fostering enduring business relationships built on trust, collaboration, and mutual growth. We measure achievements by measurable scale and uptime resilience.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[#F3F4F6] flex items-center text-xs font-bold text-[#0052FF]">
                <span>Continuous Innovation</span>
              </div>
            </div>

            {/* Card 2: Focused */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center text-2xl mb-5">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">Focused</h3>
                <p className="text-[13.5px] text-[#374151] leading-relaxed font-normal">
                  We prioritize discipline and focus, excelling in what we do best and transparently communicating if a task falls outside our specialized engineering domain. Zero diluted efforts.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[#F3F4F6] flex items-center text-xs font-bold text-[#0052FF]">
                <span>Uncompromising Discipline</span>
              </div>
            </div>

            {/* Card 3: Flexible */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center text-2xl mb-5">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">Flexible</h3>
                <p className="text-[13.5px] text-[#374151] leading-relaxed font-normal">
                  Embracing a client-centric ethos, we deliver exceptional quality without compromise, tailoring engineering pods and architectures to your unique organizational constraints.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[#F3F4F6] flex items-center text-xs font-bold text-[#0052FF]">
                <span>Adaptive Engineering</span>
              </div>
            </div>

            {/* Card 4: User Experience */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center text-2xl mb-5">
                  ✨
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">User Experience</h3>
                <p className="text-[13.5px] text-[#374151] leading-relaxed font-normal">
                  We prioritize human-centric user experience, ensuring intuitive interfaces, sub-second response latencies, and seamless interactions to drive organic product adoption.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[#F3F4F6] flex items-center text-xs font-bold text-[#0052FF]">
                <span>Human-Centric Design</span>
              </div>
            </div>

            {/* Card 5: Partner */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center text-2xl mb-5">
                  🤝
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">Partner</h3>
                <p className="text-[13.5px] text-[#374151] leading-relaxed font-normal">
                  We view every client as a long-term strategic partner, dedicated to evolving together in a continuous journey of technical maturity, resilience, and market success.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[#F3F4F6] flex items-center text-xs font-bold text-[#0052FF]">
                <span>Long-Term Alignment</span>
              </div>
            </div>

            {/* Card 6: Inventiveness */}
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#FF6B00] flex items-center justify-center text-2xl mb-5">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">Inventiveness</h3>
                <p className="text-[13.5px] text-[#374151] leading-relaxed font-normal">
                  In a rapidly evolving digital world, we stay ahead of the curve with futuristic development, pioneering autonomous AI pipelines and modern distributed architectures.
                </p>
              </div>
              <div className="pt-4 mt-5 border-t border-[#F3F4F6] flex items-center text-xs font-bold text-[#0052FF]">
                <span>Futuristic R&amp;D</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHAT WE DO? (3 SERVICE CARDS)                          */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 border-b border-[#E5E7EB] text-center bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="max-w-xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] text-[11px] font-bold uppercase tracking-wider rounded-sm mb-3">
              <span className="w-1.5 h-1.5 bg-[#0052FF] rounded-full inline-block" />
              SERVICES &amp; EXPERTISE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
              What We Do?
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              We help businesses turn technology into their biggest competitive advantage
            </p>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {/* Card 1: Software Development */}
            <div className="bg-[#F6F8FC] border border-[#DBEAFE] rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-13 h-13 rounded-xl bg-[#0052FF] text-white flex items-center justify-center text-xl font-bold font-mono mb-5 shadow-[0_4px_10px_rgba(0,82,255,0.3)]">
                  &lt;/&gt;
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">Software Development</h3>
                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-6 font-normal">
                  Scalable, high-performance web, cloud, and enterprise software solutions tailored to accelerate your business goals.
                </p>
              </div>
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#030712] hover:bg-[#0052FF] text-white font-bold text-xs rounded transition-colors shadow-sm"
                >
                  <span>Build with Us</span>
                </Link>
              </div>
            </div>

            {/* Card 2: AI Solutions */}
            <div className="bg-[#FCF8F4] border border-[#FFEDD5] rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-13 h-13 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center mb-5 shadow-[0_4px_10px_rgba(255,107,0,0.3)]">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">AI Solutions</h3>
                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-6 font-normal">
                  Smarter decision-making, predictive machine learning, and autonomous AI-driven automation built for enterprise workflows.
                </p>
              </div>
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#030712] hover:bg-[#FF6B00] text-white font-bold text-xs rounded transition-colors shadow-sm"
                >
                  <span>Build with Us</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Digital Growth */}
            <div className="bg-[#F4F9F7] border border-[#D1FAE5] rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-13 h-13 rounded-xl bg-[#059669] text-white flex items-center justify-center mb-5 shadow-[0_4px_10px_rgba(5,150,105,0.3)]">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-2 tracking-tight">Digital Growth</h3>
                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-6 font-normal">
                  Data-driven SEO strategies, conversion rate optimization, and multi-channel brand scaling that maximize your digital ROI.
                </p>
              </div>
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#030712] hover:bg-[#059669] text-white font-bold text-xs rounded transition-colors shadow-sm"
                >
                  <span>Grow with Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. THE CREED CODE: 4 CORE ENGINEERING PRINCIPLES          */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 border-b border-[#E5E7EB] text-center bg-[#F4F6FA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11.5px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1.5">
              THE CREED CODE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
              Our 4 Pillars of Uncompromising Engineering
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              The fundamental principles that govern every technical decision, sprint review, and architectural deployment at Creed Tech.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-left">
            {/* Pillar 01 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-7 sm:p-9 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F3F4F6]">
                  <span className="text-2xl font-bold font-mono text-[#0052FF]">01</span>
                  <span className="px-2.5 py-1 bg-[#EFF6FF] text-[#0052FF] text-[11px] font-bold rounded-sm">
                    Pillar of Excellence
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-1">Architectural Integrity Over Shortcuts</h3>
                <p className="text-xs font-bold text-[#FF6B00] mb-2.5">We build for decades, not for quick demos.</p>
                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-4 font-normal">
                  Software is the central nervous system of modern business. We reject fragile hacks, unnecessary dependencies, and opaque abstractions. Every line of code is structured to withstand massive scale.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3F4F6]">
                <span className="text-xs font-semibold text-[#1F2937] flex items-center gap-1.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Clean, deterministic, and self-documenting codebases.</span>
                </span>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-7 sm:p-9 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F3F4F6]">
                  <span className="text-2xl font-bold font-mono text-[#0052FF]">02</span>
                  <span className="px-2.5 py-1 bg-[#EFF6FF] text-[#0052FF] text-[11px] font-bold rounded-sm">
                    Pillar of Excellence
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-1">Direct Architect-to-Client Pairing</h3>
                <p className="text-xs font-bold text-[#FF6B00] mb-2.5">No layers of non-technical middlemen.</p>
                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-4 font-normal">
                  When you collaborate with Creed Tech, your product roadmap is shaped directly by senior principal engineers who have built high-scale systems. We eliminate translation friction from day one.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3F4F6]">
                <span className="text-xs font-semibold text-[#1F2937] flex items-center gap-1.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>100% principal engineer involvement from kickoff to launch.</span>
                </span>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-7 sm:p-9 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F3F4F6]">
                  <span className="text-2xl font-bold font-mono text-[#0052FF]">03</span>
                  <span className="px-2.5 py-1 bg-[#EFF6FF] text-[#0052FF] text-[11px] font-bold rounded-sm">
                    Pillar of Excellence
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-1">Zero-Trust &amp; Sovereign Privacy</h3>
                <p className="text-xs font-bold text-[#FF6B00] mb-2.5">Security is non-negotiable; it is our foundation.</p>
                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-4 font-normal">
                  In an era of relentless cyber threats and sensitive AI models, we treat data sovereignty as a fundamental duty. We embed zero-knowledge cryptography and immutable audit trails into every platform.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3F4F6]">
                <span className="text-xs font-semibold text-[#1F2937] flex items-center gap-1.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Cryptographic data protection built into core architectures.</span>
                </span>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-7 sm:p-9 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F3F4F6]">
                  <span className="text-2xl font-bold font-mono text-[#0052FF]">04</span>
                  <span className="px-2.5 py-1 bg-[#EFF6FF] text-[#0052FF] text-[11px] font-bold rounded-sm">
                    Pillar of Excellence
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#030712] mb-1">Empathetic Craftsmanship</h3>
                <p className="text-xs font-bold text-[#FF6B00] mb-2.5">Engineering with a deep respect for the end user.</p>
                <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-4 font-normal">
                  Brilliant engineering means nothing if the interface creates friction. We unite deep backend computer science with intuitive human-centric product design, creating platforms that people love.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3F4F6]">
                <span className="text-xs font-semibold text-[#1F2937] flex items-center gap-1.5">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Intuitive micro-interactions powered by resilient backend logic.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. GLOBAL ENGINEERING HUBS                                */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 border-b border-[#E5E7EB] text-center bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11.5px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1.5">
              GLOBAL REACH &amp; CONTINUOUS COVERAGE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
              Three Specialized Global Engineering Centers
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              Operating across multiple time zones to deliver seamless 24/7 technical continuity and deep regional domain expertise.
            </p>
          </div>

          {/* 3 Hub Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {/* Hub 1: Frankfurt */}
            <div className="bg-[#FAFAFC] rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-44 relative overflow-hidden bg-gray-900">
                  <img
                    src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80"
                    alt="Frankfurt"
                    width={380}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-lg font-bold block leading-tight">Frankfurt</span>
                    <span className="text-xs text-gray-300 font-medium">Germany</span>
                  </div>
                </div>
                <div className="p-5 pb-3 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                    Core Specialization:
                  </span>
                  <p className="text-[13px] text-gray-900 font-bold leading-snug">
                    European Cloud Infrastructure &amp; Cyber Defense
                  </p>
                  <p className="text-[11.5px] text-gray-500 pt-1.5 mt-1 border-t border-[#F3F4F6]">
                    📍 Taunusanlage 8, Financial Centre, Frankfurt
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <span className="text-[11.5px] font-bold text-[#059669] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full inline-block" />
                  Active Regional Engineering Pod
                </span>
              </div>
            </div>

            {/* Hub 2: Madrid */}
            <div className="bg-[#FAFAFC] rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-44 relative overflow-hidden bg-gray-900">
                  <img
                    src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80"
                    alt="Madrid"
                    width={380}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-lg font-bold block leading-tight">Madrid</span>
                    <span className="text-xs text-gray-300 font-medium">Spain</span>
                  </div>
                </div>
                <div className="p-5 pb-3 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                    Core Specialization:
                  </span>
                  <p className="text-[13px] text-gray-900 font-bold leading-snug">
                    Mobile Engineering &amp; Digital Innovation Lab
                  </p>
                  <p className="text-[11.5px] text-gray-500 pt-1.5 mt-1 border-t border-[#F3F4F6]">
                    📍 Paseo de la Castellana 95, Madrid
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <span className="text-[11.5px] font-bold text-[#059669] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full inline-block" />
                  Active Regional Engineering Pod
                </span>
              </div>
            </div>

            {/* Hub 3: San Francisco */}
            <div className="bg-[#FAFAFC] rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-full h-44 relative overflow-hidden bg-gray-900">
                  <img
                    src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=80"
                    alt="San Francisco"
                    width={380}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-lg font-bold block leading-tight">San Francisco</span>
                    <span className="text-xs text-gray-300 font-medium">United States</span>
                  </div>
                </div>
                <div className="p-5 pb-3 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider">
                    Core Specialization:
                  </span>
                  <p className="text-[13px] text-gray-900 font-bold leading-snug">
                    AI Research, Neural Systems &amp; Cloud Labs
                  </p>
                  <p className="text-[11.5px] text-gray-500 pt-1.5 mt-1 border-t border-[#F3F4F6]">
                    📍 500 Howard Street, SoMa Tech District, San Francisco
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <span className="text-[11.5px] font-bold text-[#059669] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full inline-block" />
                  Active Regional Engineering Pod
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. EXECUTIVE LEADERSHIP & TECHNICAL CUSTODIANS            */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 border-b border-[#E5E7EB] text-center bg-[#FAFAFC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF7ED] border border-[#FFEDD5] text-[#FF6B00] text-[11.5px] font-bold uppercase tracking-wider rounded-sm mb-3">
              <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full inline-block" />
              THE PEOPLE BEHIND THE CODE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
              Executive Leadership &amp; Technical Custodians
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
              Meet the founders and principal architects who guide our engineering vision and mentor our senior pods across 3 global centers.
            </p>
          </div>

          {/* 4 Leaders (2x2 Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-left">
            {/* Leader 1 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 sm:gap-6">
              <div className="w-full sm:w-44 h-48 sm:h-54 rounded-xl overflow-hidden shrink-0 relative bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
                  alt="Alexander Wright"
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-mono font-semibold">
                  Senior Systems Architect
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                <div>
                  <h3 className="text-xl font-bold text-[#030712] leading-tight">Alexander Wright</h3>
                  <span className="text-xs font-bold text-[#0052FF] block mt-0.5">Founder &amp; Chief Executive Officer</span>
                  <p className="text-[12.5px] text-[#4B5563] leading-relaxed my-2 font-normal">
                    Founded Creed Tech in 2023 with the conviction that next-generation enterprise software should be built with mathematical precision, neural scalability, and uncompromising craftsmanship.
                  </p>
                  <blockquote className="my-0 px-2.5 py-2 bg-[#F9FAFB] rounded-md border border-[#F3F4F6] text-[11.5px] text-[#374151] italic leading-relaxed">
                    &ldquo;We don&apos;t build software to sell and walk away. We build digital infrastructure that companies run their entire future on.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-2 border-t border-[#F3F4F6]">
                  <Link href="/contact" className="text-xs font-bold text-[#0052FF] hover:underline">
                    Connect with Alexander &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Leader 2 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 sm:gap-6">
              <div className="w-full sm:w-44 h-48 sm:h-54 rounded-xl overflow-hidden shrink-0 relative bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                  alt="Dr. Elena Rostova"
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-mono font-semibold">
                  Ph.D. Neural Computing
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                <div>
                  <h3 className="text-xl font-bold text-[#030712] leading-tight">Dr. Elena Rostova</h3>
                  <span className="text-xs font-bold text-[#0052FF] block mt-0.5">Chief Technology Officer</span>
                  <p className="text-[12.5px] text-[#4B5563] leading-relaxed my-2 font-normal">
                    Directs our research in private enterprise LLMs and distributed vector streaming. Champion of vendor-neutral open cloud architecture.
                  </p>
                  <blockquote className="my-0 px-2.5 py-2 bg-[#F9FAFB] rounded-md border border-[#F3F4F6] text-[11.5px] text-[#374151] italic leading-relaxed">
                    &ldquo;The best engineering is invisible—it performs flawlessly under maximum load without ever asking for praise.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-2 border-t border-[#F3F4F6]">
                  <Link href="/contact" className="text-xs font-bold text-[#0052FF] hover:underline">
                    Connect with Elena &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Leader 3 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 sm:gap-6">
              <div className="w-full sm:w-44 h-48 sm:h-54 rounded-xl overflow-hidden shrink-0 relative bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
                  alt="Marcus Vance"
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-mono font-semibold">
                  Ex-Defense Cryptographer
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                <div>
                  <h3 className="text-xl font-bold text-[#030712] leading-tight">Marcus Vance</h3>
                  <span className="text-xs font-bold text-[#0052FF] block mt-0.5">Head of Global Security &amp; Governance</span>
                  <p className="text-[12.5px] text-[#4B5563] leading-relaxed my-2 font-normal">
                    Oversees zero-trust architectures, sovereign data privacy, and SOC 2 Type II governance across all client engagements.
                  </p>
                  <blockquote className="my-0 px-2.5 py-2 bg-[#F9FAFB] rounded-md border border-[#F3F4F6] text-[11.5px] text-[#374151] italic leading-relaxed">
                    &ldquo;In high-stakes systems, trust is not a promise. It is mathematically verified cryptography.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-2 border-t border-[#F3F4F6]">
                  <Link href="/contact" className="text-xs font-bold text-[#0052FF] hover:underline">
                    Connect with Marcus &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Leader 4 */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 sm:gap-6">
              <div className="w-full sm:w-44 h-48 sm:h-54 rounded-xl overflow-hidden shrink-0 relative bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80"
                  alt="Sarah Jenkins"
                  width={200}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-mono font-semibold">
                  14+ Yrs Agile Delivery
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                <div>
                  <h3 className="text-xl font-bold text-[#030712] leading-tight">Sarah Jenkins</h3>
                  <span className="text-xs font-bold text-[#0052FF] block mt-0.5">VP of Global Client Engineering</span>
                  <p className="text-[12.5px] text-[#4B5563] leading-relaxed my-2 font-normal">
                    Directs our dedicated senior engineering pods across 3 global centers, guaranteeing milestone velocity, zero-defect releases, and continuous client alignment.
                  </p>
                  <blockquote className="my-0 px-2.5 py-2 bg-[#F9FAFB] rounded-md border border-[#F3F4F6] text-[11.5px] text-[#374151] italic leading-relaxed">
                    &ldquo;Engineering maturity is not just about writing code; it is about delivering business outcomes with absolute predictability.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-2 border-t border-[#F3F4F6]">
                  <Link href="/contact" className="text-xs font-bold text-[#0052FF] hover:underline">
                    Connect with Sarah &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. DATA DRIVEN: 4 METRICS + 2 CTAs                        */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 bg-white border-t border-gray-100 text-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="inline-flex items-center px-3.5 py-1 bg-[#EBF3FF] text-[#0066FF] text-[11.5px] font-bold rounded-sm mb-3">
            Data Driven
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-3">
            Leading You to Digital Growth
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-xl mx-auto mb-10 sm:mb-12 font-normal">
            Our proven expertise and cutting-edge technology have driven measurable success—see the numbers that showcase our impact.
          </p>

          {/* 4 Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
            <div className="flex flex-col items-center gap-1.5 p-5 bg-[#FAFAFC] border border-[#F3F4F6] rounded-xl">
              <div className="w-10 h-10 bg-[#FDF2F8] text-[#F472B6] flex items-center justify-center text-xl rounded-md">
                ⭐
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-[#030712] tracking-tight">99%</span>
              <span className="text-xs sm:text-sm font-semibold text-[#4B5563]">Job Success Rate</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-5 bg-[#FAFAFC] border border-[#F3F4F6] rounded-xl">
              <div className="w-10 h-10 bg-[#FDF2F8] text-[#F472B6] flex items-center justify-center text-xl rounded-md">
                ⏱
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-[#030712] tracking-tight">15000+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#4B5563]">Working Hours</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-5 bg-[#FAFAFC] border border-[#F3F4F6] rounded-xl">
              <div className="w-10 h-10 bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center text-xl rounded-md">
                👍
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-[#030712] tracking-tight">300+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#4B5563]">Satisfied Clients</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-5 bg-[#FAFAFC] border border-[#F3F4F6] rounded-xl">
              <div className="w-10 h-10 bg-[#ECFDF5] text-[#10B981] flex items-center justify-center text-xl rounded-md">
                👥
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-[#030712] tracking-tight">80+</span>
              <span className="text-xs sm:text-sm font-semibold text-[#4B5563]">Professional Team</span>
            </div>
          </div>

          {/* 2 CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#030712] hover:bg-gray-800 text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-sm"
            >
              <span>Get Free Consultation</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-white hover:bg-blue-50 text-[#0066FF] font-bold text-xs sm:text-sm rounded border border-[#0066FF] shadow-sm transition-colors"
            >
              <span>Hire Top Talent</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. READY TO TRANSFORM YOUR BUSINESS? BLUE CTA BANNER      */}
      {/* ========================================================= */}
      <section className="w-full bg-[#0066FF] py-14 sm:py-18 text-white relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[size:24px_24px]"
        />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
              Ready to Transform Your Business? Let&apos;s Talk!
            </h3>
          </div>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white hover:bg-gray-100 text-[#030712] font-bold text-xs sm:text-sm rounded shadow-lg transition-colors shrink-0"
            >
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

