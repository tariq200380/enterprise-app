import Link from "next/link";
import TestimonialLogic from "./testimoniallogic";

export default function ClientReviews() {
  return (
    <section
      id="client-reviews"
      className="w-full py-16 sm:py-20 bg-[#E2E8F0] text-gray-900 border-b border-slate-300 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Narrative and CTA */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-xs sm:text-[13px] font-semibold text-[#E67E22] uppercase tracking-wider block mb-2">
                Enterprise Client Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-gray-950 tracking-tight leading-tight">
                <span className="block">What Our Clients Say</span>
                <span className="block mt-2 sm:mt-2.5">About Creed Tech</span>
              </h2>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  Dedicated Principal Engineers on Every Project.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  The Ability to Scale Engineering Pods in Real Time.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  99.8% On-Time Deployment &amp; Strict SLA Controls.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#E67E22] font-semibold text-base shrink-0 mt-0.5">✓</span>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800 leading-snug">
                  Zero-Defect Code Audits &amp; SOC 2 Compliance.
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              {/* Simple Testimonial Buttons & Modal Logic */}
              <TestimonialLogic />

              <div>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-900 hover:text-[#E67E22] border-b-2 border-gray-900 hover:border-[#E67E22] pb-0.5 transition-colors"
                >
                  View Client Portfolio &rarr;
                </Link>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 font-normal pt-2">
              Verified Enterprise Customer Reviews on Clutch &amp; Trustpilot.
            </p>
          </div>

          {/* RIGHT COLUMN: Dual-Direction Vertical Scrolling Marquee */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[520px] overflow-hidden rounded-2xl p-2 select-none">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#E2E8F0] via-[#E2E8F0]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#E2E8F0] via-[#E2E8F0]/80 to-transparent z-20 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              {/* LEFT MARQUEE COLUMN: Moves DOWN Continuously */}
              <div className="relative overflow-hidden h-full">
                <div className="reviews-col-down">
                  
                  {/* Card 1: Marina R. */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;I&apos;m using Creed Tech for our enterprise cloud architecture. It allowed us to deploy multi-region failover seamlessly with zero downtime.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          MR
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            Marina R.
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            Italy &bull; Enterprise Cloud
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: David L. */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;We had a complex legacy database problem and the engineering support was world-class. Solved our bottleneck within days.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          DL
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            David L.
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            United States &bull; Database Arch
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate 1 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;I&apos;m using Creed Tech for our enterprise cloud architecture. It allowed us to deploy multi-region failover seamlessly with zero downtime.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          MR
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            Marina R.
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            Italy &bull; Enterprise Cloud
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate 2 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;We had a complex legacy database problem and the engineering support was world-class. Solved our bottleneck within days.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          DL
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            David L.
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            United States &bull; Database Arch
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT MARQUEE COLUMN: Moves UP Continuously */}
              <div className="hidden sm:block relative overflow-hidden h-full">
                <div className="reviews-col-up">
                  
                  {/* Card 3: Elena Rostova */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;Exceptional full-stack capabilities and attention to detail. They built our AI-driven document intelligence pipeline directly with our ERP.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          ER
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            Elena Rostova
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            Germany &bull; AI Automation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Sarah Jenkins */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;It&apos;s been 4 years now that we rely on Creed Tech for dedicated staff augmentation and infrastructure. Top quality code.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          SJ
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            Sarah Jenkins
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            United Kingdom &bull; Enterprise Squads
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate 3 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;Exceptional full-stack capabilities and attention to detail. They built our AI-driven document intelligence pipeline directly with our ERP.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          ER
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            Elena Rostova
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            Germany &bull; AI Automation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate 4 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-blue-100/70 p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left bg-gradient-to-b from-white to-[#F7FAFE]">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          ★★★★★
                        </div>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                          Verified Client
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal mb-3.5">
                        &ldquo;It&apos;s been 4 years now that we rely on Creed Tech for dedicated staff augmentation and infrastructure. Top quality code.&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-9 h-9 shrink-0 border border-blue-200 flex items-center justify-center bg-gray-900 text-white font-medium text-xs rounded-full">
                          SJ
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight truncate">
                            Sarah Jenkins
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal truncate">
                            United Kingdom &bull; Enterprise Squads
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
