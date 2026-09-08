import type { Metadata } from "next";
import ContactLogic from "@/components/contact/contactlogic";

export const metadata: Metadata = {
  title: "Contact Solutions Architecture & Engineering | Creed Tech",
  description: "Schedule a technical consultation with Creed Tech's principal solutions architects. Direct engineering scoping and zero-obligation NDA protection.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white text-[#111827] font-sans text-left overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (LIGHT PLATINUM WITH AMBIENT TECH GLOW)   */}
      {/* ========================================================= */}
      <section className="w-full bg-gradient-to-b from-[#F2F5FB] via-[#F8FAFC] to-white py-14 sm:py-24 border-b border-[#E5E7EB] relative overflow-hidden text-center">
        {/* Ambient Radial Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,82,255,0.08)_0%,transparent_60%),radial-gradient(circle_at_85%_60%,rgba(255,107,0,0.06)_0%,transparent_50%)]"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-gray-300 text-[#0052FF] text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full inline-block" />
            <span>DIRECT ARCHITECT ACCESS • 4-HOUR GUARANTEED SLA</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#030712] tracking-tight leading-tight max-w-4xl mx-auto mb-3">
            Let&apos;s Build Something Enduring Together.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-[#4B5563] font-normal leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
            Connect directly with senior systems architects and technical leaders. Whether you need an end-to-end enterprise platform, sovereign AI pipelines, or dedicated engineering pods—we are ready.
          </p>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto text-left">
            <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] rounded-lg shadow-sm">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Average Response
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0052FF] mt-1 block">
                &lt; 2.4 Hours
              </span>
            </div>

            <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] rounded-lg shadow-sm">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                NDA &amp; IP Protection
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#030712] mt-1 block">
                Signed Day 1
              </span>
            </div>

            <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] rounded-lg shadow-sm">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Verified Ratings
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#FF6B00] mt-1 block">
                5.0 Clutch &amp; Google
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN 2-COLUMN TECHNICAL SCOPING & DIRECT CONTACT HUB   */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 bg-[#FAFAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* LEFT COLUMN: TECHNICAL SCOPING FORM */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-sm text-left">
              <div className="border-b border-[#F3F4F6] pb-5 mb-6">
                <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">
                  PROJECT SPECIFICATION FORM
                </span>
                <h2 className="text-2xl font-bold text-[#030712] tracking-tight">
                  Scope Your Project
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-normal">
                  Fill out the parameters below to receive an architectural estimate and discovery invite.
                </p>
              </div>

              <ContactLogic />
            </div>

            {/* RIGHT COLUMN: DIRECT CONTACTS & GLOBAL HUBS */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">

              {/* Direct Booking Card */}
              <div className="bg-gradient-to-br from-[#030712] to-[#111827] text-white p-7 rounded-2xl border border-[#1F2937] shadow-lg">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-[#FB923C] text-[10.5px] font-bold uppercase tracking-wider rounded-sm mb-3">
                  <span>⚡ INSTANT DISCOVERY</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Need a Direct Architectural Call?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-5">
                  Skip the form and schedule a 30-minute discovery call directly with one of our Principal Systems Architects.
                </p>
                <a
                  href="mailto:contact@creed-tech.com?subject=Schedule%20Discovery%20Call"
                  className="w-full h-11 inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Schedule Discovery Call
                </a>
              </div>

              {/* Direct Communication Channels */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col gap-5">
                <h4 className="text-[11.5px] font-bold text-[#030712] uppercase tracking-wider pb-3 border-b border-[#F3F4F6]">
                  Direct Communications
                </h4>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center text-base shrink-0 font-bold rounded-md">
                      ✉
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Official Inquiries
                      </span>
                      <a
                        href="mailto:contact@creed-tech.com"
                        className="text-sm font-semibold text-gray-900 hover:text-[#0052FF] transition-colors break-all"
                      >
                        contact@creed-tech.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EFF6FF] text-[#0052FF] flex items-center justify-center text-base shrink-0 font-bold rounded-md">
                      📞
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Global Telemetry Line
                      </span>
                      <a
                        href="tel:+14158904820"
                        className="text-sm font-semibold text-gray-900 hover:text-[#0052FF] transition-colors"
                      >
                        +1 (415) 890-4820
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#ECFDF5] text-[#059669] flex items-center justify-center text-base shrink-0 font-bold rounded-md">
                      💬
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider block">
                        WhatsApp Architect Hotline
                      </span>
                      <a
                        href="https://wa.me/14158904820"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-900 hover:text-[#059669] transition-colors"
                      >
                        +1 (415) 890-4820 (Direct Chat)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Global Engineering Hubs */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col gap-3.5">
                <h4 className="text-[11.5px] font-bold text-[#030712] uppercase tracking-wider pb-3 border-b border-[#F3F4F6]">
                  Three Global Engineering Hubs
                </h4>

                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-md">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[#030712]">🇩🇪 Frankfurt, Germany</span>
                      <span className="text-[10.5px] text-gray-400 font-mono">CET (UTC+1)</span>
                    </div>
                    <p className="text-[11.5px] text-gray-500 m-0">Taunusanlage 8, Financial Centre, Frankfurt</p>
                  </div>

                  <div className="p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-md">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[#030712]">🇪🇸 Madrid, Spain</span>
                      <span className="text-[10.5px] text-gray-400 font-mono">CET (UTC+1)</span>
                    </div>
                    <p className="text-[11.5px] text-gray-500 m-0">Paseo de la Castellana 95, Madrid</p>
                  </div>

                  <div className="p-3 bg-[#F9FAFB] border border-[#F3F4F6] rounded-md">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-[#030712]">🇺🇸 San Francisco, USA</span>
                      <span className="text-[10.5px] text-gray-400 font-mono">PST (UTC-8)</span>
                    </div>
                    <p className="text-[11.5px] text-gray-500 m-0">500 Howard Street, SoMa Tech District, SF</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TRANSPARENT 4-STEP ONBOARDING PROCESS                  */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-[#E5E7EB] text-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11.5px] font-bold text-[#FF6B00] uppercase tracking-wider block mb-1.5">
              EXECUTION CERTAINTY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-2">
              What Happens After You Reach Out?
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] font-normal leading-relaxed">
              Our deterministic 4-stage onboarding model eliminates ambiguity and ensures rapid engineering ramp-up.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Step 01 */}
            <div className="bg-[#FAFAFC] border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0052FF] block mb-3">01</span>
                <h3 className="text-lg font-bold text-[#030712] mb-2">Architectural Review</h3>
                <p className="text-[13px] text-[#4B5563] leading-relaxed font-normal">
                  Our systems architects evaluate your scope, stack constraints, and timeline feasibility within 4 hours.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E5E7EB] text-xs font-bold text-[#0052FF]">
                Within 4 Hours
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-[#FAFAFC] border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0052FF] block mb-3">02</span>
                <h3 className="text-lg font-bold text-[#030712] mb-2">NDA &amp; Security Clearance</h3>
                <p className="text-[13px] text-[#4B5563] leading-relaxed font-normal">
                  We sign enterprise bilateral NDAs and establish sovereign data handling protocols to protect your IP.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E5E7EB] text-xs font-bold text-[#0052FF]">
                Day 1 Priority
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-[#FAFAFC] border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0052FF] block mb-3">03</span>
                <h3 className="text-lg font-bold text-[#030712] mb-2">Technical Discovery Call</h3>
                <p className="text-[13px] text-[#4B5563] leading-relaxed font-normal">
                  A 45-minute deep-dive with your engineering leads to align on API schemas, sprint cadence, and architecture.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E5E7EB] text-xs font-bold text-[#0052FF]">
                Day 2 - 3
              </div>
            </div>

            {/* Step 04 */}
            <div className="bg-[#FAFAFC] border border-[#E5E7EB] rounded-2xl p-7 shadow-sm flex flex-col justify-between min-h-[240px]">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0052FF] block mb-3">04</span>
                <h3 className="text-lg font-bold text-[#030712] mb-2">Sprint Deployment</h3>
                <p className="text-[13px] text-[#4B5563] leading-relaxed font-normal">
                  Dedicated pods integrate with your Git workflows, Slack/Jira channels, and commence milestone sprints.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E5E7EB] text-xs font-bold text-[#0052FF]">
                Ready within 3-7 Days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS ACCORDION                   */}
      {/* ========================================================= */}
      <section className="w-full py-16 sm:py-24 bg-[#FAFAFC] border-b border-[#E5E7EB] text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-10 sm:mb-12">
            <span className="text-[11.5px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1.5">
              ANSWERS &amp; ASSURANCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#030712] tracking-tight leading-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] font-normal">
              Everything you need to know about working with our senior engineering pods and custodians.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 text-left">
            {/* FAQ 1 */}
            <details className="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden" open>
              <summary className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#030712] cursor-pointer select-none list-none">
                <span>How quickly can your senior engineering pods be deployed?</span>
                <span className="text-xl font-mono text-gray-400 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] pt-3">
                Following our initial technical scoping session and mutual NDA execution, our specialized pods can integrate with your repository and sprint ceremonies within 3 to 7 business days.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#030712] cursor-pointer select-none list-none">
                <span>How is our intellectual property (IP) and data privacy protected?</span>
                <span className="text-xl font-mono text-gray-400 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] pt-3">
                All intellectual property, proprietary algorithms, and code artifacts belong 100% to your organization from day one. We sign bilateral enterprise NDAs and enforce SOC 2 Type II and GDPR-compliant sovereign sandboxes.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#030712] cursor-pointer select-none list-none">
                <span>What engagement models do you offer for projects?</span>
                <span className="text-xl font-mono text-gray-400 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] pt-3">
                We provide two core engagement models: Dedicated Engineering Pods (integrated full-stack teams with fixed monthly sprints) and Milestone-Based Fixed-Scope Projects with guaranteed deliverables and deterministic timelines.
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#030712] cursor-pointer select-none list-none">
                <span>Which time zones do your global engineering centers support?</span>
                <span className="text-xl font-mono text-gray-400 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] pt-3">
                With specialized centers in Germany (Frankfurt), Spain (Madrid), and the USA (San Francisco), we provide 24/7 follow-the-sun coverage with seamless real-time overlap across US East/West, UK, and European business hours.
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#030712] cursor-pointer select-none list-none">
                <span>Can you modernize existing legacy systems or do you only build greenfield apps?</span>
                <span className="text-xl font-mono text-gray-400 group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] pt-3">
                We specialize in both. Our systems architects frequently perform zero-downtime database migrations, monolith-to-microservices decoupling, and automated CI/CD pipeline modernization alongside new greenfield product builds.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. READY TO ACCELERATE CTA BANNER                         */}
      {/* ========================================================= */}
      <section className="w-full py-14 sm:py-18 bg-[#0052FF] text-white text-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 flex flex-col items-center gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Prefer direct enterprise correspondence?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed max-w-xl">
            Send your RFP, architecture specs, or tender documents directly to our senior leadership inbox at projects@creed-tech.com.
          </p>
          <div className="pt-2">
            <a
              href="mailto:projects@creed-tech.com"
              className="inline-block px-7 py-3 bg-white hover:bg-gray-100 text-[#0052FF] font-bold text-xs uppercase tracking-wider rounded shadow-md transition-colors"
            >
              Email RFP / Architecture Docs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

