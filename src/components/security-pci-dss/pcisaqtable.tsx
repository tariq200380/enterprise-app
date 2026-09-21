export default function PciSaqTable() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-semibold text-[#FF6B00] tracking-wider uppercase block mb-2">
            AUDIT SCOPE &bull; SAQ COMPLIANCE
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            Self-Assessment Questionnaire (SAQ) Scope Matrix
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            Merchant compliance obligations vary based on payment integration architecture. Tokenization reduces assessment complexity:
          </p>
        </div>

        {/* Table Container */}
        <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[840px]">
              <thead>
                <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Validation Level
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                    SAQ Type
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Cardholder Scope Isolation
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Audit Instrument
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DF]">
                {/* Row 1 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Hosted Iframe / Tokenization
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      E-commerce client-side vaulting
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      SAQ A
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Zero PAN Exposure &bull; Cardholder data never touches merchant servers. Complete CDE scope reduction.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Annual SAQ A &amp; AoC
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Direct Post API Integration
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Merchant server serves form fields
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      SAQ A-EP
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Restricted Transit &bull; Web server controls JavaScript delivery but does not store cardholder data.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Quarterly ASV &bull; SAQ A-EP
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Hardware Standalone Terminals
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Point-of-Sale IP terminals
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      SAQ B-IP
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Physical POS Isolation &bull; Hardware encryption prevents electronic card data access on local networks.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Annual SAQ B-IP
                    </span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Custom Payment Engine Provider
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Full card transmission and storage
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      SAQ D
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Full CDE Scope &bull; Comprehensive audit of all network nodes, databases, and encryption keys.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Annual QSA On-Site Audit &bull; RoC
                    </span>
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
