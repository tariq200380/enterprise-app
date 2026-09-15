import Link from "next/link";

export default function SecurityCompliance() {
  return (
    <section id="frameworks" className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5] scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-bold text-[#FF6B00] tracking-[0.16em] uppercase block mb-2">
              STANDARDS &amp; AUDITS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Enterprise compliance &amp;<br className="hidden sm:inline" />
              {" "}security frameworks
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
            Each framework below links to the governing authority, statutory requirement, and Creed Tech&apos;s client-facing implementation architecture.
          </p>
        </div>

        {/* 2x2 Grid of Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {/* Framework 1: ISO/IEC 27001:2022 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  STANDARD · AUDIT
                </span>
                <Link
                  href="/security-iso-27001"
                  className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Peer architecture</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                ISO/IEC 27001:2022
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                ISO/IEC JTC 1/SC 27 · Geneva, Switzerland
              </p>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                Comprehensive security governance aligned with all 93 Annex A controls, secure engineering lifecycle, access controls, and risk management.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">
                Framework-aligned
              </span>
              <Link
                href="/security-iso-27001"
                className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
              >
                <span>Explore full breakdown</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Framework 2: EU GDPR Regulation */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  PRIVACY · EU LAW
                </span>
                <Link
                  href="/security-gdpr"
                  className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Peer architecture</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                EU GDPR Regulation (EU) 2016/679
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                European Data Protection Board · Brussels, Belgium
              </p>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                Structured Article 28 Data Processing Agreement templates, European data residency architecture, automated DSAR workflows, and Privacy by Design.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">
                Statutory-aligned
              </span>
              <Link
                href="/security-gdpr"
                className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
              >
                <span>Explore full breakdown</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Framework 3: AICPA SOC 2 Type II */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  TRUST SERVICES · AUDIT
                </span>
                <Link
                  href="/security-soc-2"
                  className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Peer architecture</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                AICPA SOC 2 Type II
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                American Institute of CPAs · USA
              </p>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                Engineered to meet AICPA SOC 2 Trust Services Criteria across Security, Availability, and Confidentiality controls.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">
                Framework-aligned
              </span>
              <Link
                href="/security-soc-2"
                className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
              >
                <span>Explore full breakdown</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Framework 4: PCI-DSS Version 4.0 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  SCOPE · OPTIONAL
                </span>
                <Link
                  href="/security-pci-dss"
                  className="text-[11px] font-semibold text-[#FF6B00] hover:text-[#e05d00] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Peer architecture</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                PCI-DSS Version 4.0
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                PCI Security Standards Council · Wakefield, USA
              </p>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal">
                Client-side payment tokenization and isolated cardholder data environment (CDE) architecture designed to minimize PCI-DSS audit scope.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-[#F0EFEB] flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">
                Scope-engineered
              </span>
              <Link
                href="/security-pci-dss"
                className="font-semibold text-[#0F172A] hover:text-[#FF6B00] transition-colors inline-flex items-center gap-1"
              >
                <span>Explore full breakdown</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
