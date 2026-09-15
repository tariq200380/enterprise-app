export default function GdprPillars() {
  return (
    <section className="w-full bg-[#F4F3F1] text-[#0F172A] border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E6E4DF] py-3 sm:py-4">
          {/* Pillar 1 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              Privacy by Design
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Article 25 default protection
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              Sovereign Residency
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Dedicated European cloud zones
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              DSAR Automation
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Self-service export &amp; downloads
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-serif font-bold text-base sm:text-lg tracking-tight">
              Cryptographic Erasure
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Immutable Right to be Forgotten
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
