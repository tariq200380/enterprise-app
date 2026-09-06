export default function TrackRecord() {
  return (
    <section className="w-full bg-[#0B1120] py-16 lg:py-20 text-white relative overflow-hidden border-b border-[#1E293B]/60 select-none">
      {/* Ambient Orange Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255, 107, 0, 0.12) 0%, rgba(255, 107, 0, 0.03) 45%, rgba(11, 17, 32, 0) 75%)",
        }}
      />

      {/* Diagonal Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ffffff 1px, transparent 1px), linear-gradient(-45deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10 text-left flex flex-col items-start">
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#1E293B] bg-[#131C31] text-gray-300 text-xs font-mono font-semibold tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 bg-[#FF6B00]" />
          TRACK RECORD
        </div>

        {/* Editorial Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-white tracking-tight leading-[1.2] mb-12 sm:mb-14 text-left">
          A decade of{" "}
          <span className="italic text-[#FF6B00] font-serif font-normal">quiet</span>{" "}
          <span className="font-serif">excellence</span>
        </h2>

        {/* Single Horizontal Row of 4 Statistics with Hairline Dividers */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 border-t border-[#1E293B]">
          {/* Stat 1 */}
          <div className="min-h-[190px] sm:min-h-[210px] flex flex-col justify-between items-start text-left py-7 sm:py-8 border-b lg:border-b-0 border-r border-[#1E293B] pr-6 lg:pr-8">
            <div>
              <div className="flex items-baseline mb-3">
                <span className="text-5xl sm:text-6xl font-serif font-normal text-white tracking-tight">
                  10
                </span>
                <span className="text-2xl sm:text-3xl text-[#C99A4D] font-serif font-light ml-1">
                  +
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-medium block leading-snug">
                YEARS OF<br />EXPERIENCE
              </span>
            </div>
            <div
              className="w-[110px] h-[1px] mt-8 pointer-events-none select-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(205, 160, 85, 0.95) 0%, rgba(205, 160, 85, 0.5) 45%, rgba(205, 160, 85, 0.1) 80%, transparent 100%)",
              }}
            />
          </div>

          {/* Stat 2 */}
          <div className="min-h-[190px] sm:min-h-[210px] flex flex-col justify-between items-start text-left py-7 sm:py-8 border-b lg:border-b-0 lg:border-r border-[#1E293B] pl-6 sm:pl-8 lg:px-8">
            <div>
              <div className="flex items-baseline mb-3">
                <span className="text-5xl sm:text-6xl font-serif font-normal text-white tracking-tight">
                  50
                </span>
                <span className="text-2xl sm:text-3xl text-[#C99A4D] font-serif font-light ml-1">
                  +
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-medium block leading-snug">
                PROJECTS<br />DELIVERED
              </span>
            </div>
            <div
              className="w-[110px] h-[1px] mt-8 pointer-events-none select-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(205, 160, 85, 0.95) 0%, rgba(205, 160, 85, 0.5) 45%, rgba(205, 160, 85, 0.1) 80%, transparent 100%)",
              }}
            />
          </div>

          {/* Stat 3 */}
          <div className="min-h-[190px] sm:min-h-[210px] flex flex-col justify-between items-start text-left py-7 sm:py-8 border-r border-[#1E293B] pr-6 lg:px-8">
            <div>
              <div className="flex items-baseline mb-3">
                <span className="text-5xl sm:text-6xl font-serif font-normal text-white tracking-tight">
                  8
                </span>
                <span className="text-2xl sm:text-3xl text-[#C99A4D] font-serif font-light ml-1">
                  +
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-medium block leading-snug">
                CORE<br />SERVICES
              </span>
            </div>
            <div
              className="w-[110px] h-[1px] mt-8 pointer-events-none select-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(205, 160, 85, 0.95) 0%, rgba(205, 160, 85, 0.5) 45%, rgba(205, 160, 85, 0.1) 80%, transparent 100%)",
              }}
            />
          </div>

          {/* Stat 4 */}
          <div className="min-h-[190px] sm:min-h-[210px] flex flex-col justify-between items-start text-left py-7 sm:py-8 pl-6 sm:pl-8 lg:pl-8">
            <div>
              <div className="flex items-baseline mb-3">
                <span className="text-5xl sm:text-6xl font-serif font-normal text-white tracking-tight">
                  100
                </span>
                <span className="text-2xl sm:text-3xl text-[#C99A4D] font-serif font-light ml-1">
                  %
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-medium block leading-snug">
                DEDICATED<br />ENGINEERING
              </span>
            </div>
            <div
              className="w-[110px] h-[1px] mt-8 pointer-events-none select-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(205, 160, 85, 0.95) 0%, rgba(205, 160, 85, 0.5) 45%, rgba(205, 160, 85, 0.1) 80%, transparent 100%)",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
