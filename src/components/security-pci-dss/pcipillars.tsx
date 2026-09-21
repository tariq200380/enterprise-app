export default function PciPillars() {
  return (
    <section className="w-full bg-[#F4F3F1] text-[#0F172A] border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E6E4DF] py-3 sm:py-4">
          {/* Pillar 1 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-outfit font-bold text-base sm:text-lg tracking-tight">
              Zero-PAN Storage
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Direct client-side tokenization
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-outfit font-bold text-base sm:text-lg tracking-tight">
              SAQ A Scope
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Complete CDE isolation audit
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-outfit font-bold text-base sm:text-lg tracking-tight">
              End-to-End Encryption
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              AES-256-GCM &amp; TLS 1.3 tunnels
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 sm:px-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-[#1C1917] font-outfit font-bold text-base sm:text-lg tracking-tight">
              ASV Vulnerability Scans
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-normal">
              Quarterly certified scan reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
