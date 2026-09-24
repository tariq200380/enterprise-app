import Link from "next/link";

export default function Homeclient() {
  return (
    <section
      id="client-reviews"
      className="w-full py-12 sm:py-14 lg:py-16 bg-[#F7F6F5] text-[#0F172A] border-b border-[#E2E8F0] overflow-hidden relative select-none"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Narrative and CTA */}
          <div className="md:col-span-5 text-left space-y-6">
            <div>
              <span className="text-xs sm:text-[13px] font-semibold text-[#EA580C] uppercase tracking-wider block mb-2">
                Enterprise Client Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-outfit font-bold text-[#1A1A1A] tracking-tight leading-[1.15]">
                <span className="block">What Our Clients Say</span>
                <span className="block">About Creed Tech</span>
              </h2>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <span className="text-[#EA580C] font-semibold text-base shrink-0 mt-0.5">&#10003;</span>
                <span className="text-sm sm:text-[15px] font-normal text-[#334155] leading-snug">
                  Dedicated Principal Engineers on Every Project.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#EA580C] font-semibold text-base shrink-0 mt-0.5">&#10003;</span>
                <span className="text-sm sm:text-[15px] font-normal text-[#334155] leading-snug">
                  The Ability to Scale Engineering Pods in Real Time.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#EA580C] font-semibold text-base shrink-0 mt-0.5">&#10003;</span>
                <span className="text-sm sm:text-[15px] font-normal text-[#334155] leading-snug">
                  99.8% On-Time Deployment &amp; Strict SLA Controls.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#EA580C] font-semibold text-base shrink-0 mt-0.5">&#10003;</span>
                <span className="text-sm sm:text-[15px] font-normal text-[#334155] leading-snug">
                  Zero-Defect Code Audits &amp; SOC 2 Compliance.
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                <button
                  type="button"
                  data-modal="project"
                  className="inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#E05D00] text-white font-semibold text-sm h-10 px-6 rounded transition-colors text-center w-full sm:w-[220px] cursor-pointer shadow-xs"
                >
                  Schedule Consultation
                </button>
                <button
                  type="button"
                  data-modal="review"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium hover:bg-slate-800 text-[13.5px] h-10 px-5 rounded border border-gray-700 transition-colors text-center w-full sm:w-[220px] cursor-pointer shadow-xs"
                >
                  <span className="text-[#FFAA00]">&#9733;</span>
                  <span className="text-white">Write a Client Review</span>
                </button>
              </div>

              <div>
                <Link
                  href="/portfolio"
                  className="text-slate-800 hover:text-blue-600 font-semibold text-sm inline-flex items-center gap-1"
                >
                  View Client Portfolio &rarr;
                </Link>
              </div>
            </div>

            <p className="text-[11px] text-[#64748B] font-normal pt-2">
              Verified Enterprise Customer Reviews on Clutch &amp; Trustpilot.
            </p>
          </div>

          {/* RIGHT COLUMN: Dual-Direction Vertical Scrolling Marquee */}
          <div className="md:col-span-7 relative h-[480px] sm:h-[520px] overflow-hidden rounded-2xl p-2 select-none">
            {/* Top & Bottom Gradient Edge Fade Masks */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#F7F6F5] via-[#F7F6F5]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F7F6F5] via-[#F7F6F5]/80 to-transparent z-20 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              {/* LEFT MARQUEE COLUMN: Moves DOWN Continuously */}
              <div className="relative overflow-hidden h-full">
                <div className="reviews-col-down">
                  {/* Card 1 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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

                  {/* Card 2 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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

                  {/* Duplicate 1 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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
                </div>
              </div>

              {/* RIGHT MARQUEE COLUMN: Moves UP Continuously */}
              <div className="hidden sm:block relative overflow-hidden h-full">
                <div className="reviews-col-up">
                  {/* Card 1 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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

                  {/* Card 2 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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

                  {/* Duplicate 1 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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

                  {/* Duplicate 2 */}
                  <div className="mb-4">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left">
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="text-xs sm:text-sm text-[#FFAA00] tracking-wider">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
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
