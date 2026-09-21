export default function ServicesProject() {
  return (
    <section id="delivery-process" className="relative w-full py-14 sm:py-16 bg-[#F7F6F5] text-[#0F172A] overflow-hidden border-t border-b border-[#E2E8F0]">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.8)_1px,transparent_1px)] bg-[size:44px_44px]" />
      
      {/* Subtle Radial Glow */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06)_0%,rgba(255,107,0,0.015)_45%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[50rem] mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-[7px] px-3.5 py-1 bg-white border border-[#FF6B00] text-[#FF6B00] text-[11px] font-semibold uppercase tracking-wider mb-3.5 rounded-full shadow-[0_2px_8px_rgba(255,107,0,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] inline-block"></span>
            <span>DELIVERY FRAMEWORK</span>
          </div>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight leading-[1.15] mb-2">
            OUR PROJECT DELIVERY PROCESS
          </h2>
          <p className="text-[15px] text-[#5B6472] leading-relaxed font-normal">
            A clear eight-step process from discovery and planning to launch and continued growth.
          </p>
        </div>

        {/* 8 Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-[1240px] mx-auto">
          {/* Step 01: DISCOVERY */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0F172A]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <circle cx="18" cy="18" r="14" stroke="#FFFFFF" strokeWidth="3" />
                    <circle cx="18" cy="18" r="8" stroke="#FFFFFF" strokeWidth="3" />
                    <circle cx="18" cy="18" r="3" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    01
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    DISCOVERY
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Goals • Users • Challenges
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We explore the idea, goals, users, and challenges.</p>
                <p>Key details are clarified before the project begins.</p>
              </div>
            </div>
          </div>

          {/* Step 02: REQUIREMENTS */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0052FF]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <rect x="7" y="5" width="22" height="26" rx="4.5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                    <line x1="12" y1="12" x2="24" y2="12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="12" y1="18" x2="24" y2="18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="12" y1="24" x2="20" y2="24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    02
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    REQUIREMENTS
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Scope • Features • Priorities
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We define the scope, features, and priorities.</p>
                <p>Requirements and deliverables are documented clearly.</p>
              </div>
            </div>
          </div>

          {/* Step 03: PLANNING */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0F172A]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <rect x="7" y="20" width="5.5" height="11" rx="2" fill="#FFFFFF" />
                    <rect x="15" y="14" width="5.5" height="17" rx="2" fill="#FFFFFF" />
                    <rect x="23" y="8" width="5.5" height="23" rx="2" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    03
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    PLANNING
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Roadmap • Stack • Milestones
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We set the roadmap, milestones, timeline, and roles.</p>
                <p>The technology stack and required resources are selected.</p>
              </div>
            </div>
          </div>

          {/* Step 04: UI/UX DESIGN */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0052FF]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <rect x="5" y="6" width="26" height="18" rx="3.5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                    <path d="M15 24 L14 29 L22 29 L21 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="29" x2="24" y2="29" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    04
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    UI/UX DESIGN
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Flows • Wireframes • Prototype
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We shape user flows, wireframes, and visual screens.</p>
                <p>The interactive prototype is reviewed and approved.</p>
              </div>
            </div>
          </div>

          {/* Step 05: DEVELOPMENT */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0F172A]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <polyline points="12 11 5 18 12 25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="24 11 31 18 24 25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="20" y1="9" x2="16" y2="27" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    05
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    DEVELOPMENT
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Frontend • Backend • Security
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We write clean, documented frontend and backend code.</p>
                <p>APIs, business logic, and security layers are implemented.</p>
              </div>
            </div>
          </div>

          {/* Step 06: QUALITY ASSURANCE */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0052FF]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <path d="M18 4 L28 8 V16 C28 23.5 23.5 29.5 18 32 C12.5 29.5 8 23.5 8 16 V8 Z" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                    <polyline points="13 18 17 22 23 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    06
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    QUALITY ASSURANCE
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Testing • Performance • Review
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We test functionality, security, responsiveness, and speed.</p>
                <p>Issues are identified and resolved before release.</p>
              </div>
            </div>
          </div>

          {/* Step 07: INTEGRATION & LAUNCH */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0F172A]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <path d="M18 6 L28 14 L24 28 L12 28 L8 14 Z" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                    <circle cx="18" cy="18" r="4" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    07
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    INTEGRATION &amp; LAUNCH
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Deploy • Config • Verification
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We deploy, test in production, and verify stability.</p>
                <p>All integrations and cloud settings are confirmed.</p>
              </div>
            </div>
          </div>

          {/* Step 08: SUPPORT & GROWTH */}
          <div className="h-full">
            <div className="group bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-[14px] p-6 h-full min-h-[220px] flex flex-col box-border shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_-2px_rgba(15,23,42,0.08)] hover:-translate-y-[3px] transition-all duration-200">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-[#0052FF]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                    <path d="M18 6 C11.37 6 6 11.37 6 18 C6 24.63 11.37 30 18 30 C24.63 30 30 24.63 30 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <polyline points="22 6 30 6 30 14" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="18 18 29 7" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-wider leading-none mb-1">
                    08
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    SUPPORT &amp; GROWTH
                  </h3>
                  <span className="text-xs text-[#5B6472] leading-tight">
                    Monitor • Improve • Scale
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E8F0] mb-3.5" />
              <div className="text-[15px] text-[#5B6472] leading-[1.55]">
                <p className="mb-1">We monitor stability, performance, and updates.</p>
                <p>The product is improved and scaled as needs grow.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
