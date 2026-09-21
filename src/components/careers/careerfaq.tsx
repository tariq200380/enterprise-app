export default function CareerFaq() {
  return (
    <section className="w-full bg-[#F4F3F1] border-b border-[#E6E4DF] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
          CANDIDATE QUESTIONS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-outfit font-bold text-[#0F172A] tracking-tight leading-tight max-w-2xl mx-auto">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Direct answers regarding our hiring process, equipment, working hours, and contracts.
        </p>

        <div className="mt-10 sm:mt-12 flex flex-col gap-3.5 max-w-4xl mx-auto text-left">
          {/* FAQ 1 */}
          <details
            open
            className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none select-none font-outfit font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
              <span>How does Creed Tech handle remote work and time zones?</span>
              <span className="text-base text-slate-400 group-open:hidden">+</span>
              <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
            </summary>
            <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
              We are 100% remote-first and asynchronous. We have team members across Germany, Spain, USA, and global time zones. Rather than demanding rigid 9-to-5 schedules, we require a minimum 3-hour daily overlap with your pod and rely on high-fidelity written documentation (RFCs and PR walkthroughs).
            </p>
          </details>

          {/* FAQ 2 */}
          <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none font-outfit font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
              <span>Is the take-home technical challenge really paid?</span>
              <span className="text-base text-slate-400 group-open:hidden">+</span>
              <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
            </summary>
            <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
              Yes, unconditionally. We respect the time and effort required to craft architectural solutions. Candidates who complete our practical take-home challenge receive an honorarium stipend regardless of whether we move forward with an offer.
            </p>
          </details>

          {/* FAQ 3 */}
          <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none font-outfit font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
              <span>What contract and employment types do you offer?</span>
              <span className="text-base text-slate-400 group-open:hidden">+</span>
              <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
            </summary>
            <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
              We accommodate both full-time permanent contracts through global Employer of Record (EOR) entities in 80+ countries and B2B contractor arrangements with flexible invoicing, depending on your tax and location preferences.
            </p>
          </details>

          {/* FAQ 4 */}
          <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none font-outfit font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
              <span>What hardware and software stack do you support?</span>
              <span className="text-base text-slate-400 group-open:hidden">+</span>
              <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
            </summary>
            <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
              Engineers receive a $5,000 hardware stipend to configure their choice of Apple Silicon (M3/M4 Max) or custom Linux workstations with high-refresh 4K displays and ergonomic seating. You also receive full access to commercial AI tooling (Copilot, Claude Enterprise) and sovereign cloud dev environments.
            </p>
          </details>

          {/* FAQ 5 */}
          <details className="group bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs transition-all duration-200">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none font-outfit font-bold text-sm sm:text-[15px] text-[#0F172A] transition-colors focus:outline-none">
              <span>What happens after I submit a Vacancy Alert registration?</span>
              <span className="text-base text-slate-400 group-open:hidden">+</span>
              <span className="text-base text-[#FF6B00] hidden group-open:inline">&minus;</span>
            </summary>
            <p className="mt-3.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal border-t border-[#F0EFEB] pt-3.5">
              Your profile is privately indexed in our Principal Talent Registry. When our partners spin up a dedicated engineering pod in your domain, our technical founders reach out to you directly before any role is published publicly.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
