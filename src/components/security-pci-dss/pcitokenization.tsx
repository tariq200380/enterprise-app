export default function PciTokenization() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-[#F7F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
              DATA PIPELINE ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight">
              Zero-PAN Tokenization Data Flow
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
            Primary Account Numbers (PAN) never touch merchant web servers. Direct client-side vault tokenization eliminates cardholder data storage risks and minimizes compliance scope.
          </p>
        </div>

        {/* 3 Step Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  STEP 01
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  BROWSER CLIENT
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Client-Side Vault Iframe
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                End-users enter sensitive credit card information directly into a sandboxed, PCI Level 1 certified vault iframe hosted within their web browser.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Cardholder Data Enters Vault Directly
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  STEP 02
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ENCRYPTED VAULT
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Hardware Token Generation
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                The certified payment gateway vault ingests the PAN, encrypts cardholder data using HSM-backed AES-256 keys, and returns a single-use token.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Returns Ephemeral Token: &apos;tok_sec_99a&apos;
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] border-t-2 border-t-[#FF6B00] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0EFEB] mb-4">
                <span className="text-[10px] font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded">
                  STEP 03
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  MERCHANT SERVER
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Zero-Scope Charge Execution
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Merchant servers receive only the cryptographic token to execute payment transactions. Sensitive cardholder numbers never touch your application code or databases.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#F0EFEB] text-[11px] font-semibold text-slate-500">
              Zero PAN Stored &bull; Complete SAQ A Isolation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
