export default function PciRequirements() {
  return (
    <section className="w-full pt-8 pb-8 sm:pt-10 sm:pb-10 bg-white border-t border-b border-[#E6E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-8">
          <span className="text-[11px] font-mono font-bold text-[#FF6B00] tracking-[0.18em] uppercase block mb-2">
            STATUTORY MATRIX
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight mb-4">
            The 6 Goals &amp; 12 Statutory PCI-DSS Requirements
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed font-normal">
            PCI-DSS v4.0 mandates twelve statutory technical requirements organized under six comprehensive security objectives:
          </p>
        </div>

        {/* 6 Cards Grid (3 columns desktop, 2 columns tablet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Goal 1 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  GOAL 1
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  NETWORK
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Build &amp; Maintain a Secure Network
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Req 1 &amp; 2: Install and maintain network firewalls isolating cardholder data environments (CDE) and forbid vendor-supplied default passwords.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
              Firewall Isolation &bull; Hardened Configs
            </div>
          </div>

          {/* Goal 2 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  GOAL 2
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  CARD DATA
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Protect Cardholder Data
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Req 3 &amp; 4: Protect stored account data with AES-256 GCM encryption and enforce strong cryptographic protocols (TLS 1.3) during transmission over public networks.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
              AES-256 Storage &bull; TLS 1.3 Transit
            </div>
          </div>

          {/* Goal 3 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  GOAL 3
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  VULNERABILITY
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Vulnerability Management Program
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Req 5 &amp; 6: Deploy automated anti-malware telemetry and develop secure software following OWASP Top 10 guidelines with automated SAST/DAST code reviews.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
              OWASP Guidelines &bull; Automated SAST
            </div>
          </div>

          {/* Goal 4 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  GOAL 4
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ACCESS
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Strong Access Control Measures
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Req 7 &amp; 8: Restrict cardholder access to business need-to-know, assign unique user IDs, and enforce mandatory multi-factor authentication (MFA) on all CDE access.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
              Need-to-Know IAM &bull; Mandatory 2FA
            </div>
          </div>

          {/* Goal 5 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  GOAL 5
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  MONITORING
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Regularly Monitor &amp; Test Networks
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Req 9 &amp; 10: Track and monitor all access to network resources and cardholder data with immutable audit trails synchronized to atomic NTP clocks.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
              Immutable Logging &bull; NTP Sync
            </div>
          </div>

          {/* Goal 6 */}
          <div className="bg-[#FAF9F6] border border-[#E6E4DF] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E6E4DF] mb-4">
                <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded">
                  GOAL 6
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  GOVERNANCE
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] tracking-tight mb-2">
                Maintain Information Security Policy
              </h3>
              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-normal">
                Req 11 &amp; 12: Conduct quarterly Approved Scanning Vendor (ASV) vulnerability scans, annual penetration testing, and maintain formal security policies.
              </p>
            </div>
            <div className="pt-3 mt-4 border-t border-[#E6E4DF] text-[11px] font-mono text-slate-500">
              Quarterly ASV Scans &bull; Pen Testing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
