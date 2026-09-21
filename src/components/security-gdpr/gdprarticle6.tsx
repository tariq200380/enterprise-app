export default function GdprArticle6() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-semibold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              STATUTORY FOUNDATION
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
              Article 6: 6 Lawful Bases for Processing
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
            Under GDPR Article 6, personal data ingestion can only proceed when satisfied by at least one explicit legal foundation governing the specific processing lifecycle.
          </p>
        </div>

        {/* 6 Cards Grid with Top Border Accent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Consent */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  ART. 6.1.a
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  EXPLICIT
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                1. Consent
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Freely given, specific, informed, and unambiguous indication of the data subject&apos;s wishes demonstrated through affirmative action and revocable at any time.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Affirmative Authorization
            </div>
          </div>

          {/* Card 2: Contractual Necessity */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  ART. 6.1.b
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OPERATIONAL
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                2. Contractual Necessity
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Processing strictly required for executing obligations under an agreement or taking preliminary steps at the data subject&apos;s request prior to contracting.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Service Delivery Requirement
            </div>
          </div>

          {/* Card 3: Legal Obligation */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  ART. 6.1.c
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  MANDATORY
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                3. Legal Obligation
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Statutory compliance with European Union or member state legislation, covering tax retention, corporate reporting, and law enforcement directives.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Statutory Mandate
            </div>
          </div>

          {/* Card 4: Vital Interests */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  ART. 6.1.d
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  CRITICAL
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                4. Vital Interests
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Emergency processing necessary to protect essential life, health, safety, or physical integrity of the individual or another natural person.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Life &amp; Safety Protection
            </div>
          </div>

          {/* Card 5: Public Task */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  ART. 6.1.e
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  INSTITUTIONAL
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                5. Public Task
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Processing required in the performance of an official function or statutory task carried out in the public interest by accredited governmental entities.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Public Authority Task
            </div>
          </div>

          {/* Card 6: Legitimate Interests */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  ART. 6.1.f
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  COMMERCIAL
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                6. Legitimate Interests
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Processing necessary for legitimate commercial interests, provided these are rigorously balanced against fundamental rights, freedoms, and user expectations.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Balancing Assessment Mandated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
