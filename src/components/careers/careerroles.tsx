export default function CareerRoles() {
  return (
    <section id="roles" className="w-full bg-[#F7F6F5] border-b border-[#E6E4DF] py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] sm:text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-3">
          OPEN ENGINEERING VACANCIES
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-outfit font-bold text-[#0F172A] tracking-tight leading-tight max-w-3xl mx-auto">
          Explore active pod<br className="hidden sm:inline" /> openings &amp; upcoming roles
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Join an active hiring cycle or register for priority notification on upcoming engineering pod positions.
        </p>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 max-w-4xl mx-auto">
          <span className="text-xs px-4 py-1.5 rounded-full bg-[#FF6B00] text-white font-semibold shadow-xs">
            All Departments
          </span>
          <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
            Engineering
          </span>
          <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
            AI &amp; Machine Learning
          </span>
          <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
            UI/UX &amp; Design
          </span>
          <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
            Cloud &amp; SRE
          </span>
          <span className="text-xs px-4 py-1.5 rounded-full bg-white hover:bg-[#F4F3F1] text-slate-600 border border-[#E6E4DF] font-medium transition-colors">
            Solutions &amp; Growth
          </span>
        </div>

        {/* 7 Jobs List (Direct Static JSX Cards) */}
        <div className="flex flex-col gap-3.5 sm:gap-4 mt-10 sm:mt-12 max-w-5xl mx-auto text-left">
          {/* Job 1 */}
          <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">
                Senior Distributed Systems &amp; Rust Architect
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Frankfurt / Remote · Engineering
              </p>
            </div>
            <button
              type="button"
              data-modal="job"
              data-role="Senior Distributed Systems & Rust Architect"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Apply</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Job 2 */}
          <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">
                Lead AI Systems Engineer (LLM Inference &amp; CUDA)
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                San Francisco / Hybrid · AI &amp; Machine Learning
              </p>
            </div>
            <button
              type="button"
              data-modal="job"
              data-role="Lead AI Systems Engineer (LLM Inference & CUDA)"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Apply</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Job 3 */}
          <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">
                Staff Design Systems Architect (WCAG AAA)
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                London / Remote · UI/UX &amp; Design
              </p>
            </div>
            <button
              type="button"
              data-modal="job"
              data-role="Staff Design Systems Architect (WCAG AAA)"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Apply</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Job 4 */}
          <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">
                Cloud DevOps &amp; SRE Architect (Kubernetes &amp; Terraform)
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Berlin / Remote · Cloud &amp; SRE
              </p>
            </div>
            <button
              type="button"
              data-modal="job"
              data-role="Cloud DevOps & SRE Architect (Kubernetes & Terraform)"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Apply</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Job 5 */}
          <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">
                Solutions Architect &amp; Technical Engagement Lead
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                New York / Remote · Solutions &amp; Growth
              </p>
            </div>
            <button
              type="button"
              data-modal="job"
              data-role="Solutions Architect & Technical Engagement Lead"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Apply</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Job 6 */}
          <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">
                Principal Platform &amp; Linux Kernel Engineer
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Zurich / Remote · Engineering
              </p>
            </div>
            <button
              type="button"
              data-modal="job"
              data-role="Principal Platform & Linux Kernel Engineer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Apply</span>
              <span>&rarr;</span>
            </button>
          </div>

          {/* Job 7 */}
          <div className="bg-white rounded-xl border border-[#E6E4DF] p-5 sm:p-6 shadow-2xs hover:border-[#FF6B00]/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-outfit font-bold text-slate-900 tracking-tight">
                Senior AI &amp; Deep Learning Research Scientist
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                Toronto / Remote · AI &amp; Machine Learning
              </p>
            </div>
            <button
              type="button"
              data-modal="job"
              data-role="Senior AI & Deep Learning Research Scientist"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-[#F4F3F1] border border-[#E6E4DF] rounded-lg px-3.5 py-1.5 shadow-2xs transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Apply</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* Bottom Talent Network Card */}
        <div className="mt-10 sm:mt-12 rounded-2xl bg-white border border-[#E6E4DF] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left max-w-5xl mx-auto shadow-xs">
          <div>
            <h3 className="text-base sm:text-lg font-outfit font-bold text-[#0F172A]">
              Don&apos;t see your exact engineering domain?
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 max-w-2xl leading-relaxed font-normal">
              Register your coordinates with our Senior Talent Network. When new pod requirements open, we contact registered candidates before public listings.
            </p>
          </div>
          <button
            type="button"
            data-modal="job"
            data-role="Senior Talent Network"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#e05d00] active:scale-[0.99] text-white text-xs font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            Talent Network
          </button>
        </div>
      </div>
    </section>
  );
}
