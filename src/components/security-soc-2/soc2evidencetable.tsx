export default function Soc2EvidenceTable() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-semibold text-[#FF6B00] tracking-wider uppercase block mb-2">
            AUDIT TELEMETRY &bull; CONTINUOUS EVIDENCE
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            Continuous Control Evidence Architecture
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            In accordance with AICPA SSAE 18 standards, automated telemetry collection ensures uninterrupted audit readiness:
          </p>
        </div>

        {/* Table Container */}
        <div className="border border-[#E6E4DF] rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[840px]">
              <thead>
                <tr className="border-b border-[#E6E4DF] bg-[#FAF9F6]">
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Trust Services Category
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider whitespace-nowrap">
                    Criteria Code
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Automated Evidence Ingestion Source
                  </th>
                  <th className="py-4 px-6 text-[#1C1917] font-outfit font-bold text-xs uppercase tracking-wider">
                    Audit Sampling Frequency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DF]">
                {/* Row 1 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Identity &amp; Access Governance
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Logical access &amp; MFA enforcement
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      CC6.1 &ndash; CC6.3
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Okta / Google SSO event logs, WebAuthn 2FA audit trails, and AWS IAM least-privilege telemetry.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Real-Time &bull; Quarterly Access Reviews
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Change Management Verification
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Code deployment safeguards
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      CC8.1
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    GitHub branch protection rules, signed commits, automated CI/CD SAST logs, and peer approvals.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Continuous (Per Production PR)
                    </span>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Infrastructure Threat Detection
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Network perimeter &amp; SIEM telemetry
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      CC6.6 &ndash; CC6.7
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    AWS CloudTrail, GuardDuty threat detection, and Cloudflare enterprise WAF / DDoS logs.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      24/7 Automated Ingestion
                    </span>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-[#1C1917] text-xs sm:text-[13px] block">
                      Disaster Recovery &amp; Availability
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Backup verification &amp; failover drills
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#FAF9F6] text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#E6E4DF] whitespace-nowrap">
                      A1.2 &ndash; A1.3
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-normal">
                    Automated encrypted RDS snapshots, cross-region replication, and annual disaster recovery drill logs.
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-semibold text-[#1C1917]">
                      Daily Automated &bull; Annual Drill
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
