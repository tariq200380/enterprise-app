export default function TermsProhibited() {
  return (
    <article
      id="prohibited-conduct"
      className="bg-white border border-[#E6E4DF] rounded-2xl p-6 sm:p-8 shadow-2xs scroll-mt-28"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0EEEA]">
        <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] font-outfit text-[11px] font-bold text-[#FF6B00]">
          SECTION 07
        </span>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Security Boundaries
        </span>
      </div>
      <h2 className="font-outfit text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-4">
        Acceptable Use &amp; Prohibited Conduct
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
        When accessing or using the Website, you expressly agree not to:
      </p>
      <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-rose-500 font-bold mt-0.5">&times;</span>
          <span>
            Attempt to probe, scan, test vulnerability, or breach security controls on any Creed Tech server, network, or data endpoint.
          </span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-rose-500 font-bold mt-0.5">&times;</span>
          <span>
            Submit automated payloads, spam, injection attacks, or abusive scripts designed to disrupt infrastructure integrity.
          </span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-rose-500 font-bold mt-0.5">&times;</span>
          <span>
            Deploy aggressive scrapers, bots, or harvesting mechanisms that overwhelm server resources or degrade user experience.
          </span>
        </li>
        <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF9F6] border border-[#F0EEEA]">
          <span className="text-rose-500 font-bold mt-0.5">&times;</span>
          <span>
            Violate any applicable local, national, or international laws and data regulations through interaction with this service.
          </span>
        </li>
      </ul>
    </article>
  );
}
