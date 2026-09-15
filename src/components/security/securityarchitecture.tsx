export default function SecurityArchitecture() {
  return (
    <section id="architecture" className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F6F5] border-t border-[#E6E4DF] scroll-mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 sm:pb-10 border-b border-[#E6E4DF] mb-8">
          <div>
            <span className="text-[11px] font-bold text-[#FF6B00] tracking-[0.16em] uppercase block mb-2">
              DEFENSE IN DEPTH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Four-layer enterprise<br className="hidden sm:inline" />
              {" "}security architecture
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-normal lg:text-left">
            Layered technical and operational safeguards protect client systems against advanced threat vectors, applied in sequence from identity to response.
          </p>
        </div>

        {/* 4 Horizontal Columns in Connected Card Strip */}
        <div className="bg-white border border-[#E6E4DF] rounded-2xl shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E4DF]">
            {/* Layer 01 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                  01
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                  Zero-Trust Identity &amp; Access (IAM)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Mandatory hardware WebAuthn / FIDO2, biometric validity checkpoints, zero standing administrative privileges, and session recording.
                </p>
              </div>
            </div>

            {/* Layer 02 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                  02
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                  Cryptographic Protection
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  AES-256-GCM encryption at rest with third-party key management, TLS 1.3 in-transit with strict HSTS, and multi-party quorum via cloud managed KMS.
                </p>
              </div>
            </div>

            {/* Layer 03 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                  03
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                  Secure Development Lifecycle (SSDLC)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Automated SAST/DAST vulnerability scanning, immutable PR audit trails, phrase-activated secret management, and architectural peer teardowns.
                </p>
              </div>
            </div>

            {/* Layer 04 */}
            <div className="p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block mb-2">
                  04
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight mb-2">
                  24/7 Threat Telemetry &amp; SIEM
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Real-time infrastructure threat detection, immutable audit logs with atomic clock synchronization, and automated breach dispatch playbooks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
