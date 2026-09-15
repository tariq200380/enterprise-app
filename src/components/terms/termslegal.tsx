import Link from "next/link";

export default function TermsLegal() {
  return (
    <article
      id="legal-inquiries"
      className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
        <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
          SECTION 11
        </span>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Contact Protocol
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
        Legal Inquiries &amp; Governance
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
        If you have questions, regulatory concerns, or contractual inquiries regarding these Terms &amp; Conditions, please reach our legal and solutions architecture team directly:
      </p>

      {/* Legal Office Contact Card */}
      <div className="border border-[#E6E4DF] rounded-xl bg-[#FAF9F6] p-5 sm:p-6">
        <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-4">
          Creed Tech Legal &amp; Governance Office
        </p>
        <div className="divide-y divide-[#E6E4DF] text-xs sm:text-sm">
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 first:pt-0">
            <span className="text-slate-500 font-medium">Email Inquiries</span>
            <a
              href="mailto:contact@creed-tech.com"
              className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
            >
              contact@creed-tech.com
            </a>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-slate-500 font-medium">Web Inquiries</span>
            <Link
              href="/contact"
              className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
            >
              creed-tech.com/contact
            </Link>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 last:pb-0">
            <span className="text-slate-500 font-medium">Security Center</span>
            <Link
              href="/security"
              className="text-slate-800 font-medium hover:text-[#FF6B00] transition-colors"
            >
              creed-tech.com/security
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
