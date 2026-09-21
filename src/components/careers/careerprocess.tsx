export default function CareerProcess() {
  return (
    <section className="w-full bg-[#F4F3F1] border-b border-[#E6E4DF] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
          TRANSPARENT &amp; COMPENSATED
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-outfit font-bold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
          Our 4-Stage Respectful Hiring Process
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          We value your craftsmanship and your time. No whiteboard trick riddles, no 8-round fatigue loops. Total turnaround time is strictly under 7 business days.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12 sm:mt-16 text-left">
          {/* Stage 1 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-outfit font-bold text-[#FF6B00] block tracking-tight">
                01
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                STAGE 1 · 30 MINUTES
              </span>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] mt-2.5 leading-snug">
                Architectural &amp; Values Alignment Call
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                An informal, high-level conversation with a Principal Systems Architect. We discuss your technical philosophy, past distributed systems work, and your ideal pod setup.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
              Feedback in &lt; 24 hours
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-outfit font-bold text-[#FF6B00] block tracking-tight">
                02
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                STAGE 2 · COMPENSATED
              </span>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] mt-2.5 leading-snug">
                Paid Practical Code &amp; System Challenge
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                A realistic take-home architecture or coding task mirroring real-world client challenges. We respect your effort and compensate your time regardless of outcome.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
              Paid stipend provided
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-outfit font-bold text-[#FF6B00] block tracking-tight">
                03
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                STAGE 3 · 45 MINUTES
              </span>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] mt-2.5 leading-snug">
                Interactive Design &amp; Solution Teardown
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                A collaborative review session with our Technical Founders to walk through trade-offs, edge-case tuning, scalability bottlenecks, and distributed consensus decisions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
              Peer-to-peer dialogue
            </div>
          </div>

          {/* Stage 4 */}
          <div className="bg-white rounded-2xl border border-[#E6E4DF] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-outfit font-bold text-[#FF6B00] block tracking-tight">
                04
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 block">
                STAGE 4 · &lt; 48 HOURS
              </span>
              <h3 className="text-base sm:text-[17px] font-outfit font-bold text-[#0F172A] mt-2.5 leading-snug">
                Formal Offer &amp; Custom Hardware Kit
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-3 leading-relaxed font-normal">
                We present a transparent global compensation offer, equity parameters, and dispatch your $5k custom hardware &amp; ergonomics package prior to your day-one onboarding.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-[11px] sm:text-xs font-semibold text-[#FF6B00]">
              Zero bureaucratic offer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
