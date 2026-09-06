export default function NewsletterStrip() {
  return (
    <section className="w-full bg-[#F4F6F8] py-16 sm:py-20">
      <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mx-auto">
        
        {/* Main Card */}
        <div className="bg-white border border-[#E5E8EB] p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          
          {/* Left Text */}
          <div className="w-full md:w-1/2 flex flex-col text-left">
            <h2 className="text-xl md:text-2xl font-medium text-[#1A1A1A] mb-2 tracking-tight">
              Subscribe to Enterprise Insights
            </h2>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed max-w-md font-normal">
              Get quarterly whitepapers, architectural blueprints, and technology benchmarks directly to your inbox.
            </p>
          </div>
          
          {/* Vertical Separator for Desktop */}
          <div className="hidden md:block w-[1px] h-20 bg-[#E5E8EB] shrink-0"></div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 flex flex-col">
            <form
              action="#"
              className="flex flex-col sm:flex-row items-center gap-4 w-full"
            >
              <input
                type="email"
                placeholder="Enter your work email"
                required
                className="w-full flex-1 h-14 px-5 bg-[#F4F6F8] border border-[#E5E8EB] text-[#1A1A1A] placeholder-gray-400 text-sm rounded outline-none focus:border-[#0052FF] transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-[180px] h-14 px-6 bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold rounded inline-flex items-center justify-center transition-colors shrink-0 shadow-none cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Orange Accent Line */}
        <div className="w-full h-[3px] bg-[#FF6A00] mt-8 rounded-[2px]"></div>

      </div>
    </section>
  );
}
