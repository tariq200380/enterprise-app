export default function SecurityProcessors() {
  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5] border-t border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8">
          <div>
            <span className="text-[11px] font-bold text-[#FF6B00] tracking-[0.16em] uppercase block mb-2">
              SUPPLIER GOVERNANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Audited enterprise<br />
              sub-processors
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
            Following ISO 27001 (A.5.19) and GDPR (Article 28) supplier governance guidelines, all infrastructure sub-processors undergo rigorous security evaluation.
          </p>
        </div>

        {/* Sub-processors Table Container */}
        <div className="w-full border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F4F3F1] text-slate-700 font-bold border-b border-[#E6E4DF]">
                  <th className="py-3.5 px-4 sm:px-6">Sub-processor</th>
                  <th className="py-3.5 px-4 sm:px-6">Role / processing activity</th>
                  <th className="py-3.5 px-4 sm:px-6">Data location</th>
                  <th className="py-3.5 px-4 sm:px-6">Audited certifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DF]">
                {/* Row 1: AWS */}
                <tr className="hover:bg-[#F9F8F6] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                    Amazon Web Services (AWS)
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-600">
                    Primary cloud infrastructure &amp; KMS
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                    Frankfurt / Ireland / US-East
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                    ISO 27001, SOC 2, PCI-DSS, FedRAMP
                  </td>
                </tr>

                {/* Row 2: GCP */}
                <tr className="hover:bg-[#F9F8F6] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                    Google Cloud Platform (GCP)
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-600">
                    AI &amp; data pipeline processing
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                    Belgium / Frankfurt / Iowa
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                    ISO 27001, SOC 2, HIPAA, GDPR
                  </td>
                </tr>

                {/* Row 3: Cloudflare */}
                <tr className="hover:bg-[#F9F8F6] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                    Cloudflare Enterprise
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-600">
                    Edge WAF / DDoS mitigation &amp; DNS
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                    Global edge network (300+ cities)
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                    SOC 2 Type II, ISO 27001, PCI-DSS
                  </td>
                </tr>

                {/* Row 4: GitHub */}
                <tr className="hover:bg-[#F9F8F6] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#0F172A] whitespace-nowrap">
                    GitHub Enterprise
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-600">
                    Encrypted source code management
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-500 whitespace-nowrap">
                    US / Multi-region secure cloud
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#FF6B00] whitespace-nowrap">
                    SOC 2 Type II, ISO 27001
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
