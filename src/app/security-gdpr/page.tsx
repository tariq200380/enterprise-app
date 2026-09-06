import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EU GDPR Regulation (EU) 2016/679 Architecture",
  description:
    "Enacted by the European Parliament, the GDPR mandates sovereign privacy by design. Creed Tech provides structured Article 28 Data Processing Agreement (DPA) templates and architects dedicated European cloud infrastructure with sovereign data residency.",
};

export default function SecurityGdprPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section (2-Column) */}
      <section className="w-full pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Breadcrumb Header */}
              <div className="mb-4">
                <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase">
                  <Link href="/security" className="hover:underline">
                    SECURITY CENTER
                  </Link>{" "}
                  <span className="text-slate-400 font-normal">/</span> EU GDPR REGULATION
                </span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FEFCE8] border border-[#FDE047]/80 text-[#854D0E] text-[11px] font-bold tracking-wider uppercase mb-5 shadow-sm">
                <span className="w-2 h-2 rounded-sm bg-[#EAB308]"></span>
                <span>EU REGULATION 2016/679 &bull; BRUSSELS, BELGIUM</span>
              </div>

              {/* Heading with 2-Tone Color */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5">
                <span className="text-[#0B1220] block">European Union GDPR</span>
                <span className="text-[#0052FF] block">Data Privacy &amp; Governance</span>
                <span className="text-[#0052FF] block">Architecture</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-xl mb-6 font-normal">
                Enacted by the European Parliament, the GDPR mandates sovereign privacy by design. Creed Tech provides structured Article 28 Data Processing Agreement (DPA) templates and architects dedicated European cloud infrastructure with sovereign data residency.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-5 py-3 bg-[#0052FF] hover:bg-[#0043D1] text-white font-bold text-xs tracking-wider rounded uppercase transition-colors shadow-sm"
                >
                  REQUEST DPA &amp; PRIVACY OVERVIEW
                </Link>
                <Link
                  href="/security"
                  className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs tracking-wider rounded uppercase border border-slate-200 transition-colors shadow-sm"
                >
                  ALL SECURITY STANDARDS
                </Link>
              </div>

              {/* Footer Notes */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  European Cloud Region Deployment Options
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-300">&bull;</span>
                  Standard Contractual Clauses (SCC)
                </span>
              </div>
            </div>

            {/* Right Column: Statutory Privacy Controls Card */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                {/* Card Top Row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <span className="text-slate-400 font-bold text-[11px] tracking-wider uppercase">
                    STATUTORY PRIVACY CONTROLS
                  </span>
                  <span className="bg-[#EFF6FF] text-[#0052FF] text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-[#BFDBFE]/60">
                    GDPR Mandated
                  </span>
                </div>

                {/* Control Item 1 */}
                <div className="py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Article 17: Right to Erasure
                    </span>
                    <span className="text-emerald-600 font-bold text-[10px] tracking-wider uppercase">
                      AUTOMATED
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1 font-normal">
                    Cryptographic purge across relational DBs and immutable S3 backups.
                  </p>
                </div>

                {/* Control Item 2 */}
                <div className="py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Article 15: DSAR Access Export
                    </span>
                    <span className="text-[#0052FF] font-bold text-[10px] tracking-wider uppercase">
                      INSTANT JSON / CSV
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1 font-normal">
                    Self-service end-user data portability and archive downloads.
                  </p>
                </div>

                {/* Control Item 3 */}
                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0B1220] font-bold text-xs sm:text-[13px]">
                      Article 28: Data Processor DPA
                    </span>
                    <span className="text-[#0052FF] font-bold text-[10px] tracking-wider uppercase">
                      LEGAL SCCs
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1 font-normal">
                    Strict processor obligations preventing unauthorized sub-processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article 6: The 6 Lawful Bases for Processing Data */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase block mb-3">
              STATUTORY FOUNDATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-4">
              Article 6: The 6 Lawful Bases for Processing<br className="hidden sm:inline" /> Data
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] max-w-3xl leading-relaxed">
              Under GDPR, personal data can only be processed if at least one of the following 6 legal conditions is satisfied:
            </p>
          </div>

          {/* 6 Lawful Bases Grid (3 columns, 2 rows) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Base 1 */}
            <div className="bg-white border border-[#BFDBFE]/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <h3 className="text-[#0052FF] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                1. Consent (Art. 6.1.a)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                Freely given, specific, informed, and unambiguous indication of the data subject&apos;s wishes via clear affirmative action.
              </p>
            </div>

            {/* Base 2 */}
            <div className="bg-white border border-[#BFDBFE]/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <h3 className="text-[#0052FF] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                2. Contractual Necessity (Art. 6.1.b)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                Processing is necessary for the performance of a contract to which the data subject is party.
              </p>
            </div>

            {/* Base 3 */}
            <div className="bg-white border border-[#BFDBFE]/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <h3 className="text-[#0052FF] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                3. Legal Obligation (Art. 6.1.c)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                Processing is necessary for compliance with a statutory legal obligation to which the controller is subject.
              </p>
            </div>

            {/* Base 4 */}
            <div className="bg-white border border-[#BFDBFE]/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <h3 className="text-[#0052FF] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                4. Vital Interests (Art. 6.1.d)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                Processing is necessary in order to protect the vital interests of the data subject or of another natural person.
              </p>
            </div>

            {/* Base 5 */}
            <div className="bg-white border border-[#BFDBFE]/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <h3 className="text-[#0052FF] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                5. Public Task (Art. 6.1.e)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                Processing is necessary for the performance of a task carried out in the public interest or official authority.
              </p>
            </div>

            {/* Base 6 */}
            <div className="bg-white border border-[#BFDBFE]/80 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-start">
              <h3 className="text-[#0052FF] font-bold text-xs sm:text-[13px] mb-2 tracking-tight">
                6. Legitimate Interests (Art. 6.1.f)
              </h3>
              <p className="text-slate-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                Processing is necessary for legitimate commercial interests pursued by the controller, provided fundamental rights do not override.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
