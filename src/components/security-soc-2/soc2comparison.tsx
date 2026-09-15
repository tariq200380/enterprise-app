export default function Soc2Comparison() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              AUDIT RIGOR COMPARISON
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
              Why Type II Operational Rigor Matters for SaaS
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
            Many software vendors design for a point-in-time snapshot. Creed Tech architects continuous operational proof across everyday engineering and infrastructure lifecycles.
          </p>
        </div>

        {/* 2 Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: SOC 2 Type I */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-slate-400 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  TYPE I REPORT
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  POINT-IN-TIME
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                Single Point-in-Time Snapshot
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                Examines only whether security policies are designed properly on a single calendar day. Does not verify whether controls were actually enforced in daily operational practices or engineering code commits.
              </p>
              <div className="space-y-2 pt-2 border-t border-[#F0EFEB] text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">&times;</span>
                  <span>No historical observation window</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">&times;</span>
                  <span>Theoretical policy design only</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">&times;</span>
                  <span>Zero proof of operational adherence</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-[#F0EFEB] text-xs font-semibold text-slate-400">
              Baseline Policy Verification Only
            </div>
          </div>

          {/* Card 2: SOC 2 Type II */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  TYPE II ALIGNMENT
                </span>
                <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">
                  12-MONTH PROOF
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1917] tracking-tight mb-2">
                12-Month Live Operational Proof
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                We engineer continuous controls across daily development: verifying every code PR with automated SAST/DAST, logging immutable deployments, automating access revocations, and executing regular disaster recovery drills.
              </p>
              <div className="space-y-2 pt-2 border-t border-[#F0EFEB] text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6B00] font-bold">&check;</span>
                  <span>12-month continuous observation period</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6B00] font-bold">&check;</span>
                  <span>Live automated audit evidence collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6B00] font-bold">&check;</span>
                  <span>Proves daily engineering &amp; operational compliance</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-[#F0EFEB] text-xs font-semibold text-[#FF6B00]">
              Continuous Operational Effectiveness
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
