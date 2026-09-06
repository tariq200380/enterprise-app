import Link from "next/link";

export default function WhyCreedTech() {
  return (
    <section className="w-full bg-white border-b border-gray-100 py-14 sm:py-16 lg:py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Column: Heading, Text & CTA */}
        <div className="w-full lg:w-[44%] flex flex-col items-start text-left shrink-0">
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-3">
            WHY CREED TECH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 tracking-tight leading-tight mb-5">
            <span className="block">Focused teams</span>
            <span className="block text-[#0052FF] mt-2 sm:mt-2.5">Reliable delivery</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8 max-w-md font-normal">
            What does this mean for you? You gain enterprise-grade engineering with the responsiveness of a dedicated team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-[#0052FF] hover:bg-[#0042D0] text-white text-sm font-semibold h-10 px-[22px] rounded transition-colors shadow-none"
          >
            Talk to Us
          </Link>
        </div>

        {/* Right Column: 2x2 Feature Cards Grid */}
        <div className="w-full lg:w-[52%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: Risk Free */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 h-full">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center mb-5 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-tight">Risk Free</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Structured delivery with clear milestones reduces project risk from day one.
              </p>
            </div>
          </div>

          {/* Card 2: Cost */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 h-full">
            <div>
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-5 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-tight">Cost</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Transparent pricing with no hidden fees, scoped to your actual needs.
              </p>
            </div>
          </div>

          {/* Card 3: Flexibility */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 h-full">
            <div>
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-5 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-tight">Flexibility</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Engagement models that adapt as your priorities and roadmap change.
              </p>
            </div>
          </div>

          {/* Card 4: Dedicated Delivery */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 h-full">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center mb-5 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-tight">Dedicated Delivery</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                A consistent, dedicated team — not a rotating pool of contractors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
