export default function TopBanner() {
  return (
    <div className="w-full bg-[#090E1A] text-white text-xs sm:text-sm py-2 px-4 overflow-hidden border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5">
        {/* Still / Stationary LIVE Badge */}
        <span className="inline-flex items-center gap-1.5 bg-[#FF5805] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 z-10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          LIVE
        </span>

        {/* Animated News Content */}
        <div className="overflow-hidden relative max-w-2xl">
          <div className="animate-news-ticker hover:[animation-play-state:paused] flex items-center gap-2 whitespace-nowrap cursor-default">
            <span className="text-gray-300 font-normal">
              Designing practical and intuitive user experiences for web and mobile.
            </span>
            <a
              href="#services"
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 transition-colors shrink-0"
            >
              Explore Services <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
