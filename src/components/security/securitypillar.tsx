export default function SecurityPillar() {
  return (
    <section className="w-full bg-[#F4F3F1] text-[#0F172A] border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E4DF] py-4 sm:py-5">
          {/* Pillar 1 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center">
            <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
              High Availability
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Resilient cloud architecture
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center">
            <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
              Zero Trust
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Proactive risk mitigation
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center">
            <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
              Centralized SIEM
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Security telemetry &amp; alerting
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center">
            <h3 className="text-[#0F172A] font-bold text-sm sm:text-base tracking-tight">
              Rapid Triage
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Structured incident playbooks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
