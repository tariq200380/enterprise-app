export default function IsoPillars() {
  return (
    <section className="w-full bg-[#F4F3F1] text-[#0F172A] border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E4DF] py-4 sm:py-5">
          {/* Pillar 1 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              Policy Hierarchy
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Structured 4-tier governance
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              Annex A Coverage
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              93 technical &amp; operational controls
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              Secure Engineering
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              SSDLC &amp; automated SAST/DAST
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              Incident Response
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              SEV-1 through SEV-4 playbooks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
