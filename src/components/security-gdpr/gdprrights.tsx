export default function GdprRights() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-semibold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
            INDIVIDUAL PRIVACY RIGHTS
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            8 Data Subject Rights Architected for Enterprise Systems
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            Our software solutions are engineered with modular privacy mechanisms supporting all eight statutory data subject rights defined under Chapter III of Regulation (EU) 2016/679:
          </p>
        </div>

        {/* 8 Rights Grid (4 columns desktop, 2 columns tablet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Right 1: Article 15 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 15
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  DSAR
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Right of Access
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Self-service interface enabling users to generate and download structured JSON/CSV archives containing all personal data, telemetry, and access logs.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Instant Export &bull; 30-Day SLA
            </div>
          </div>

          {/* Right 2: Article 16 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 16
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ACCURACY
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Right to Rectification
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Direct profile settings interfaces and RESTful APIs enabling individuals to correct, update, or complete inaccurate personal information instantly.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Self-Service Profile Edit
            </div>
          </div>

          {/* Right 3: Article 17 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 17
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ERASURE
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Right to Erasure
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Cascading cryptographic data deletion pipeline purging records across primary databases, object caches, and immutable backup replicas.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Cryptographic Shredding
            </div>
          </div>

          {/* Right 4: Article 18 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 18
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  SUSPENSION
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Right to Restriction
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                System-level processing locks suspending downstream transformation and external sync while retaining records safely during dispute reviews.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Automated Processing Freeze
            </div>
          </div>

          {/* Right 5: Article 19 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 19
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  BROADCAST
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Notification of Changes
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Automated webhook notifications dispatching data corrections, erasures, and processing restrictions to all downstream sub-processors.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Sub-Processor Sync Webhooks
            </div>
          </div>

          {/* Right 6: Article 20 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 20
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  INTEROP
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Data Portability
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Standardized, machine-readable JSON and CSV export endpoints enabling users to transfer personal information directly to third-party platforms.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Machine-Readable Schema
            </div>
          </div>

          {/* Right 7: Article 21 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 21
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OPT-OUT
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Right to Object
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Granular consent management UI providing individual toggle controls to opt out of marketing telemetry, third-party analytics, and tracking cookies.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Granular Consent Toggles
            </div>
          </div>

          {/* Right 8: Article 22 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  ARTICLE 22
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OVERSIGHT
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Automated Decisions
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Algorithmic transparency controls supporting human review, rationale disclosure, and contestation mechanisms for automated assessments.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] text-slate-500 font-medium">
              Human-in-the-Loop Review
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
