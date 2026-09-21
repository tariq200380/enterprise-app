export default function Soc2Criteria() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-semibold text-[#FF6B00] tracking-wider uppercase block mb-2">
            TRUST CRITERIA BREAKDOWN
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            AICPA Common Criteria (CC1&ndash;CC9) Implementation
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            How Creed Tech implements technical safeguards across the nine core AICPA trust services criteria categories:
          </p>
        </div>

        {/* 6 Cards Grid (3 columns desktop, 2 columns tablet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: CC1 & CC2 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  CC1 &bull; CC2
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  GOVERNANCE
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Control Environment &amp; Communication
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Executive oversight, mandatory signed employee code of conduct, background checks prior to hire, and transparent communication of security policies.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-medium text-slate-500">
              Annual Policy Reviews &bull; Signed NDAs
            </div>
          </div>

          {/* Card 2: CC3 & CC4 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  CC3 &bull; CC4
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  RISK
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Risk Assessment &amp; Monitoring
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Continuous automated vulnerability telemetry, architectural threat modeling, and 24/7 SIEM anomaly alerts evaluated against documented risk appetite.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-medium text-slate-500">
              Continuous Telemetry &bull; Threat Matrix
            </div>
          </div>

          {/* Card 3: CC5 & CC6 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  CC5 &bull; CC6
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ACCESS
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Logical &amp; Physical Access Controls
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Zero standing administrative privileges, mandatory WebAuthn 2FA, session recording, and automated access deprovisioning within 1 hour of role change.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-medium text-slate-500">
              Zero Standing Privileges &bull; WebAuthn
            </div>
          </div>

          {/* Card 4: CC7 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  CC7
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OPERATIONS
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                System Operations &amp; Incident Management
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Immutable audit logging, anti-malware telemetry, file integrity monitoring (FIM), and structured incident detection and escalation playbooks for SEV1-4 events.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-medium text-slate-500">
              Immutable S3 Logs &bull; SEV Escalation
            </div>
          </div>

          {/* Card 5: CC8 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  CC8
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  CHANGE
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Change Management &amp; SDLC
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Mandatory peer review on all code PRs, automated SAST/DAST unit testing, strict environment segregation (dev, staging, prod), and single-click rollbacks.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-medium text-slate-500">
              100% PR Review &bull; Automated CI/CD
            </div>
          </div>

          {/* Card 6: CC9 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  CC9
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  SUPPLIER
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Vendor &amp; Supplier Risk Management
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Mandatory annual SOC 2 review of all cloud providers (AWS, GCP, Cloudflare), signed DPAs, and strict contractual security minimums.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-medium text-slate-500">
              Annual Vendor Review &bull; DPA Schedules
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
