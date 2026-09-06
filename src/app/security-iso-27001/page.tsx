import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ISO/IEC 27001:2022 ISMS Architecture",
  description:
    "The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.",
};

export default function SecurityIso27001Page() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Breadcrumb Header */}
          <div className="mb-4">
            <span className="text-xs sm:text-[13px] font-bold text-[#0052FF] tracking-widest uppercase">
              <Link href="/security" className="hover:underline">
                SECURITY CENTER
              </Link>{" "}
              <span className="text-slate-400 font-normal">/</span> ISO/IEC 27001:2022
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE]/70 text-[#0052FF] text-xs font-bold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]"></span>
            <span>GLOBAL ISMS STANDARD &bull; ISO/IEC 27001:2022 ALIGNMENT</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-5">
            ISO/IEC 27001:2022 Standard &amp; ISMS<br className="hidden sm:inline" /> Architecture
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-normal">
            The International Organization for Standardization (ISO, Geneva) defines the premier global framework for information security management. Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-[#0052FF] hover:bg-[#0043D1] text-white font-bold text-xs tracking-wider rounded uppercase transition-colors shadow-sm"
            >
              REQUEST ISMS ARCHITECTURE OVERVIEW
            </Link>
            <Link
              href="/security"
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs tracking-wider rounded uppercase border border-slate-200 transition-colors shadow-sm"
            >
              ALL SECURITY STANDARDS
            </Link>
          </div>

          {/* 4-Metric Overview Box */}
          <div className="w-full bg-white border border-slate-200/80 rounded-lg p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] mt-12 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Metric 1 */}
              <div>
                <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase block">
                  STANDARD
                </span>
                <span className="text-[#0B1220] font-bold text-sm sm:text-base block mt-1.5">
                  ISO/IEC 27001:2022
                </span>
              </div>

              {/* Metric 2 */}
              <div>
                <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase block">
                  GOVERNING BODY
                </span>
                <span className="text-[#0B1220] font-bold text-sm sm:text-base block mt-1.5">
                  ISO (Geneva, Switzerland)
                </span>
              </div>

              {/* Metric 3 */}
              <div>
                <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase block">
                  CONTROL FRAMEWORK
                </span>
                <span className="text-[#0B1220] font-bold text-sm sm:text-base block mt-1.5">
                  Annex A (93 Controls)
                </span>
              </div>

              {/* Metric 4 */}
              <div>
                <span className="text-slate-400 text-[11px] font-bold tracking-wider uppercase block">
                  SECURITY STATUS
                </span>
                <span className="text-[#16A34A] font-bold text-sm sm:text-base block mt-1.5">
                  Operational ISMS Alignment
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
