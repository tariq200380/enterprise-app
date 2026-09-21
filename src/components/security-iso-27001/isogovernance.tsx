export default function IsoGovernance() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-semibold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              POLICY HIERARCHY
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
              4-Tier ISMS Governance Structure
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
            Creed Tech implements an institutional 4-tier documentation and enforcement hierarchy ensuring structured security controls across all internal and client-facing systems.
          </p>
        </div>

        {/* 4 Cards Grid with Top Border Accent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Tier 1 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  TIER 1
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  EXECUTIVE
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Security Policy
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Executive-approved mandates defining organizational security goals, data ownership, legal requirements, and executive accountability.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Mandatory Governance
            </div>
          </div>

          {/* Card 2: Tier 2 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  TIER 2
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  TECHNICAL
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Technical Standards
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Mandatory engineering rules: AES-256 encryption, TLS 1.3 protocol standards, WebAuthn 2FA, and strict zero-trust IAM profiles.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Baseline Specifications
            </div>
          </div>

          {/* Card 3: Tier 3 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  TIER 3
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OPERATIONAL
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Operating Procedures
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Step-by-step SOPs for change management, secret rotation, PR code reviews, sandbox isolation, and continuous CI/CD deployments.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Execution Workflows
            </div>
          </div>

          {/* Card 4: Tier 4 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-outfit font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  TIER 4
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  VERIFICATION
                </span>
              </div>
              <h3 className="font-outfit text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Evidence &amp; Audits
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Immutable audit logs, SIEM telemetry, authorized security assessment records, and employee security training documentation.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Continuous Verification
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
