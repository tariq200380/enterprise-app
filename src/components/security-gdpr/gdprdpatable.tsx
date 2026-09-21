export default function GdprDpaTable() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-semibold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
            ARTICLE 28 &bull; SUB-PROCESSOR GOVERNANCE
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            Data Processor Governance &amp; Cross-Border Safeguards
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            In strict accordance with GDPR Article 28 and Chapter V, our technical and contractual mechanisms ensure uninterrupted legal compliance across cloud infrastructure:
          </p>
        </div>

        {/* Table Container */}
        <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Safeguard Area
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Statutory Article
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Technical Architecture Enforcement
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Contractual Instrument
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DF]">
                {/* Row 1 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Sub-Processor Authorizations
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Third-party cloud vendor vetting
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-[#FAF9F6] text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                      Article 28.2
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Zero-trust IAM isolation, annual SOC 2 Type II vendor audits, and 30-day change notification webhooks.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Mutual DPA Schedule A
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      International Data Transfers
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Cross-border transmission
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-[#FAF9F6] text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                      Chapter V (Art. 46)
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    EU sovereign key management (AWS KMS / CloudHSM) and TLS 1.3 encrypted transit tunnels with PFS.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      EU Commission SCCs (2021/914)
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Breach Notification SLA
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Supervisory escalation
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-[#FAF9F6] text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                      Articles 33 &amp; 34
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Automated SIEM telemetry triage, forensic immutable audit logging, and prompt 72-hour regulatory notification protocol.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Statutory 72h SLA Playbook
                    </span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Privacy by Default (SSDLC)
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Engineering controls
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-[#FAF9F6] text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-[#E6E4DF]">
                      Article 25
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Field-level pseudonymization, column-level DB encryption, strict data minimization, and automated CI/CD security linters.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Engineering Policy EP-04
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
