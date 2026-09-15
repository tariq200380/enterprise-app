export default function TermsAgreements() {
  return (
    <article
      id="client-agreements"
      className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
        <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-mono text-[11px] font-bold text-slate-500">
          SECTION 02
        </span>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Contract Hierarchy
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
        Relationship to Formal Client Agreements
      </h2>

      {/* Callout Box with Orange Accent Border */}
      <div className="border-l-4 border-l-[#FF6B00] bg-[#FFFBF7] border border-[#FFD8B3] rounded-xl p-5 sm:p-6 space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-[#C2410C] tracking-wide uppercase">
          Master Services Agreement (MSA) Precedence
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          These Website Terms govern general public access, content review, and preliminary electronic inquiry submissions. They do not replace, alter, or supersede separate, individually executed Master Services Agreements (MSAs), Statements of Work (SOWs), Non-Disclosure Agreements (NDAs), Service Level Agreements (SLAs), or Data Processing Agreements (DPAs) signed between Creed Tech and its commercial clients.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          In the event of any direct conflict between these Website Terms and a signed client contract, the specific terms of the signed client contract shall strictly govern.
        </p>
      </div>
    </article>
  );
}
