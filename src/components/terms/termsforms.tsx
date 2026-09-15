import Link from "next/link";

export default function TermsForms() {
  return (
    <article
      id="form-submissions"
      className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
        <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
          SECTION 04
        </span>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Electronic Submissions
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
        Information Submitted Through Forms
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
        When you submit information via our Contact, Get Started, Vision Scope Estimation, Careers, or Newsletter forms:
      </p>
      <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
          <span>
            <strong className="font-semibold text-[#0F172A]">Accuracy of Information</strong> &mdash; You agree to provide accurate, current, and genuine contact and project information.
          </span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
          <span>
            <strong className="font-semibold text-[#0F172A]">Legal Authority</strong> &mdash; You represent that you hold full legal authority to share any business requirements, specifications, or documents uploaded through our forms.
          </span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
          <span>
            <strong className="font-semibold text-[#0F172A]">Confidential Scoping &amp; NDAs</strong> &mdash; Inquiries submitted with an NDA request are safeguarded under strict enterprise confidentiality standards and bilateral review.
          </span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-[#FF6B00] font-bold mt-0.5">&bull;</span>
          <span>
            <strong className="font-semibold text-[#0F172A]">Data Governance</strong> &mdash; For details on how form submissions are stored, processed, and protected, please review our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-[#FF6B00] underline hover:text-[#e05d00] transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </li>
      </ul>
    </article>
  );
}
