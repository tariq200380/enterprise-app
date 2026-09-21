export default function IsoIncidentTable() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-semibold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
            INCIDENT RESPONSE PLAYBOOK
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            Incident Severity Classification &amp; Response Framework
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            In accordance with ISO 27001 Annex A.5.24-28, all security telemetry is routed through a structured incident triage and escalation process:
          </p>
        </div>

        {/* Table Container */}
        <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Severity Level
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Definition / Scenario
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Response Priority
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Client Notification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DF]">
                {/* SEV-1 */}
                <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-outfit text-xs font-bold shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                      SEV-1 (Critical)
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                    Active data breach, ransomware, or full service outage
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                    Immediate Escalation
                  </td>
                  <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                    Expedited &mdash; Direct Security Team Lead
                  </td>
                </tr>

                {/* SEV-2 */}
                <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-outfit text-xs font-bold shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                      SEV-2 (High)
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                    Potential unauthorized access or isolated core component failure
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                    High Priority Response
                  </td>
                  <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                    Same-Day Notification
                  </td>
                </tr>

                {/* SEV-3 */}
                <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-outfit text-xs font-bold shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                      SEV-3 (Medium)
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                    Non-critical vulnerability identified in non-production sandbox
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                    Scheduled Assessment
                  </td>
                  <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                    24 Hours / Weekly Report
                  </td>
                </tr>

                {/* SEV-4 */}
                <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E4DF] text-slate-700 font-outfit text-xs font-bold shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                      SEV-4 (Low)
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs sm:text-[13px]">
                    Informational security advisory or minor dependency patch
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#0F172A] text-xs sm:text-[13px]">
                    Planned Remediation
                  </td>
                  <td className="py-4 px-6 text-slate-700 text-xs sm:text-[13px]">
                    Monthly Sprint Release
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
