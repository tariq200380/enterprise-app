import Link from "next/link";

export default function PrivacyRights() {
  return (
    <article id="statutory-gdpr" className="border-b border-[#E6E4DF] pb-10 sm:pb-12 mb-10 sm:mb-12 scroll-mt-28">
      <span className="text-xs font-outfit font-bold text-[#FF6B00] block mb-2">
        06
      </span>
      <h2 className="font-outfit text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
        Statutory Data Rights &amp; GDPR Compliance
      </h2>

      {/* Callout Box */}
      <div className="bg-[#FFF9F5] border border-[#FDBA74]/70 rounded-xl p-6 sm:p-7 space-y-3">
        <h3 className="text-sm sm:text-base font-outfit font-bold text-[#C2410C]">
          Your rights under GDPR
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          Depending on your jurisdiction &mdash; including the European Economic Area under EU GDPR Regulation 2016/679 &mdash; you may hold statutory rights regarding your personal data, including the right to access, rectify, port, or request erasure of your data, or to restrict or object to certain processing.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          For an in-depth breakdown of our European data residency architecture, Data Protection Officer (DPO) contact, and Article 28 Data Processing Agreements, please review our dedicated{" "}
          <Link
            href="/security-gdpr"
            className="font-semibold text-[#FF6B00] underline hover:text-[#e05d00] transition-colors"
          >
            European Privacy &amp; GDPR Compliance Center
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
