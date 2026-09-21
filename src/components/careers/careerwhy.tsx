export default function CareerWhy() {
  return (
    <section className="w-full bg-[#F7F6F5] border-b border-[#E6E4DF] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Creed Tech Hiring Guarantee Banner */}
        <div className="bg-[#F4F3F1] border border-[#E6E4DF] rounded-2xl p-4 sm:p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs mb-12 sm:mb-16">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 text-[#FF6B00]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">The Creed Tech Hiring Guarantee</h4>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 font-normal">
                Every candidate receives personalized feedback from a Principal Architect within 24 hours of every interview stage.
              </p>
            </div>
          </div>
          <a
            href="#roles"
            className="text-xs sm:text-sm font-semibold text-[#FF6B00] hover:text-[#e05d00] hover:underline transition-colors shrink-0 sm:ml-4 inline-flex items-center gap-1"
          >
            <span>View upcoming roles</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-outfit font-bold text-[#0F172A] tracking-tight leading-tight">
            Why senior engineers thrive with us
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            We built the engineering organization we always wished we had: intellectual rigor, sovereign autonomy, and genuine respect for deep technical craftsmanship.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          {/* Benefit Card 1 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] leading-snug">
                Autonomous Senior Pods
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                No non-technical layers assigning arbitrary tickets. You partner directly with client engineering leaders and make architectural choices with sovereign authority.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
              Lead-level ownership · Zero micromanagement
            </div>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
              </div>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] leading-snug">
                Deep Asynchronous Focus
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                We default to clear written RFCs, technical briefs, and asynchronous reviews. We protect 4+ continuous hours of daily deep-maker time with zero meeting intrusions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
              RFC-driven · Minimal meeting fatigue
            </div>
          </div>

          {/* Benefit Card 3 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] leading-snug">
                Top-Tier Global Compensation
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                We calibrate compensation against top global technology hubs. We benchmark salaries transparently against US/European tier-1 levels regardless of where you live.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
              Global tier-1 banding · Regular reviews
            </div>
          </div>

          {/* Benefit Card 4 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M20 20H4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] leading-snug">
                $5K Gear &amp; Ergonomics Stipend
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                Choose your battle station: Apple MacBook Pro Max, custom Linux Threadripper workstation, Studio Display, and Herman Miller seating stipend refreshed biennially.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
              Top-spec hardware · Ergonomic support
            </div>
          </div>

          {/* Benefit Card 5 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] leading-snug">
                Annual Learning &amp; Research Fund
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                Continuous growth is an absolute requirement. Dedicated annual funds for international technical conferences (RustConf, KubeCon, NeurIPS), certifications, and book allowances.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
              Conferences · Open-source sponsorship
            </div>
          </div>

          {/* Benefit Card 6 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100/80 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#FF6B00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] leading-snug">
                Comprehensive Health &amp; Unlimited PTO
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2 sm:mt-2.5 leading-relaxed font-normal">
                Full worldwide private health, dental, and vision insurance coverage. Flexible paid time off with mandatory 25+ days minimum annual rest to prevent burn-out.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00] tracking-tight">
              Worldwide coverage · Mandatory rest policy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
