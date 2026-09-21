export default function IsoAnnexA() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-semibold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
            ANNEX A IMPLEMENTATION
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            93 Technical &amp; Operational Controls Across 4 Domains
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            In accordance with the updated ISO/IEC 27001:2022 standard, our security operations are structured into four consolidated control themes:
          </p>
        </div>

        {/* 4 Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {/* Domain 1: Organizational Controls */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
              <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                ANNEX A.5 &bull; 37 CONTROLS
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                ORGANIZATIONAL
              </span>
            </div>
            <h3 className="font-outfit text-xl font-bold text-[#1C1917] tracking-tight mb-2">
              1. Organizational Controls
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
              Covers formal information security policies, asset management inventories, access governance, threat intelligence integration, third-party cloud supplier vetting, and business continuity readiness.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.5.7 Threat Intel
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.5.19 Supplier Risk
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.5.24 Incident Response
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.5.30 ICT Readiness
              </span>
            </div>
          </div>

          {/* Domain 2: People Controls */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
              <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                ANNEX A.6 &bull; 8 CONTROLS
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                PEOPLE
              </span>
            </div>
            <h3 className="font-outfit text-xl font-bold text-[#1C1917] tracking-tight mb-2">
              2. People Controls
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
              Multi-tier background screening prior to onboarding, mandatory signed Non-Disclosure Agreements (NDAs), quarterly simulated phishing exercises, and disciplinary protocols for security policy non-compliance.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.6.1 Background Verification
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.6.3 Security Awareness
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.6.5 Post-Employment
              </span>
            </div>
          </div>

          {/* Domain 3: Physical Controls */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
              <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                ANNEX A.7 &bull; 14 CONTROLS
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                PHYSICAL
              </span>
            </div>
            <h3 className="font-outfit text-xl font-bold text-[#1C1917] tracking-tight mb-2">
              3. Physical Controls
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
              Physical access perimeters, biometric authorization, clean desk and clean screen policies, continuous video surveillance retention, and secure equipment disposal standards.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.7.2 Physical Entry
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.7.7 Clear Desk/Screen
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.7.14 Secure Disposal
              </span>
            </div>
          </div>

          {/* Domain 4: Technological Controls */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
              <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                ANNEX A.8 &bull; 34 CONTROLS
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                TECHNOLOGICAL
              </span>
            </div>
            <h3 className="font-outfit text-xl font-bold text-[#1C1917] tracking-tight mb-2">
              4. Technological Controls
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal mb-5">
              Endpoint encryption, network segregation, automated source code SAST/DAST testing, secure development lifecycle (SSDLC), continuous logging, and automated vulnerability management.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E6E4DF]">
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.8.8 Vuln Management
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.8.25 Secure SDLC
              </span>
              <span className="bg-white text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF] shadow-2xs">
                A.8.28 Secure Coding
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
