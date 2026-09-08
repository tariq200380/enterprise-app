import Image from "next/image";

interface Testimonial {
  company: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  linkedin: string;
}

const testimonials: Testimonial[] = [
  {
    company: "SQUIRE",
    quote:
      "Robin and Creed Tech consistently deliver clean, intuitive designs that strike the perfect balance between aesthetic and usability. Whether it's for a complex workflow or a lightweight self-service feature, the user experience always feels effortless and refined.",
    author: "Dave Salvant",
    role: "Co-Founder of Squire",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    company: "HIREFRESH",
    quote:
      "It's always an extraordinary pleasure working with Creed Tech. They bring 100% engineering rigor to each milestone and execute mission-critical cloud workflows when they are needed the most.",
    author: "Vlad Hryhoren",
    role: "UX/UI Director @ HiRefresh",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    company: "ADOR NETWORK",
    quote:
      "We engaged Creed Tech with the goal of scaling our high-throughput transactional infrastructure. Their team was extraordinary in orchestrating zero-downtime microservices and cloud automation.",
    author: "Jonathan Anastas",
    role: "Chief Marketing Officer @ Ador",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    company: "COGNITIVE HEALTH",
    quote:
      "Crystal-clear documentation, transparent code audits, and proactive communication. Finding rigorously tested enterprise AI and data synchronization capabilities like this is extraordinarily rare.",
    author: "Elena Rostova",
    role: "AI Product Lead @ Cognitive Health",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    company: "CLOUDNATIVE GLOBAL",
    quote:
      "Creed Tech has an amazing squad of principal engineers. They possess deep, practical mastery over modern cloud topologies, eBPF routing, and deliver rock-solid results on every sprint.",
    author: "Alex Linetski",
    role: "Principal SRE Architect @ CloudNative",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
  },
];

export default function Testimonial3DDeck() {
  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#F8F9FB] border-t border-[#E5E7EB] overflow-hidden">
      {/* Hidden Radio Buttons for Pure CSS 3D Deck (Zero useState, Zero JS) */}
      {testimonials.map((_, i) => (
        <input
          key={i}
          type="radio"
          name="testimonial-deck"
          id={`testi-${i}`}
          defaultChecked={i === 0}
          className="hidden"
        />
      ))}

      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 bg-[size:28px_28px]"
        style={{
          backgroundImage: "radial-gradient(#E2E8F0 1.5px, transparent 1.5px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.2em] block mb-1.5">
            Testimonials
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-extrabold text-[#0F172A] uppercase tracking-[-0.01em] m-0 mb-1.5">
            Trusted by Founders &bull; Backed by Results
          </h2>
          <p className="text-[13.5px] sm:text-sm text-[#64748B] font-normal m-0">
            Results that speak through founder voices.
          </p>
        </div>

        {/* 3D Badge Lanyard Card Deck Wrapper */}
        <div
          className="relative max-w-[820px] mx-auto pt-6"
          style={{ perspective: "1400px" }}
        >
          {/* Top Lanyard Badge Clip Strap Holder */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[46px] bg-gradient-to-b from-[#E2E8F0] to-[#CBD5E1] rounded-t-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] z-30 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-16 h-[18px] bg-white/90 rounded border border-[#CBD5E1] shadow-inner"></div>
            <div className="w-6 h-1 bg-[#94A3B8] rounded-full mt-1"></div>
          </div>

          {/* The 3D Stacked Cards Deck Container */}
          <div
            className="relative w-full h-[370px] sm:h-[340px] md:h-[320px] cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Click overlays to advance to next card */}
            {testimonials.map((_, i) => {
              const nextIdx = (i + 1) % testimonials.length;
              return (
                <label
                  key={i}
                  htmlFor={`testi-${nextIdx}`}
                  className={`testi-click-${i} hidden absolute inset-0 z-20 cursor-pointer`}
                  title="Click to view next review"
                />
              );
            })}

            {testimonials.map((item, idx) => (
              <div
                key={item.author}
                className={`testi-card testi-card-${idx} absolute top-0 left-0 right-0 bg-white rounded-[20px] p-7 sm:py-8 sm:px-10 border border-[#E5E7EB] box-border select-none text-left will-change-transform`}
              >
                {/* Top Company Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl sm:text-[1.3rem] font-black tracking-wider text-[#0F172A] uppercase font-sans">
                    {item.company}
                  </span>
                  <span className="text-[#94A3B8] text-lg tracking-[3px] font-bold">
                    &bull;&bull;&bull;
                  </span>
                </div>

                {/* Large Quote Mark */}
                <div className="text-4xl text-[#0F172A] leading-none mb-2 font-serif font-black">
                  &ldquo;
                </div>

                {/* Quote Text */}
                <p className="text-[14px] sm:text-[15px] text-[#334155] leading-[1.75] mb-6 font-normal min-h-[72px]">
                  {item.quote}
                </p>

                {/* Bottom Founder Row */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] relative z-30">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#F1F5F9] shadow-[0_1px_3px_rgba(0,0,0,0.06)] shrink-0">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[14.5px] font-extrabold text-[#0F172A] m-0 leading-tight">
                        {item.author}
                      </h4>
                      <span className="text-xs text-[#64748B] font-medium block mt-0.5">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[34px] h-[34px] rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center text-[#0A66C2] font-extrabold text-sm transition-colors"
                  >
                    in
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Progress Dots & Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="relative w-9 h-9">
              {testimonials.map((_, i) => {
                const prevIdx = (i - 1 + testimonials.length) % testimonials.length;
                return (
                  <label
                    key={i}
                    htmlFor={`testi-${prevIdx}`}
                    className={`testi-prev-${i} hidden w-9 h-9 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] font-bold text-base items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.06)] hover:bg-[#F1F5F9] transition-all cursor-pointer select-none`}
                  >
                    ‹
                  </label>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <label
                  key={i}
                  htmlFor={`testi-${i}`}
                  className={`testi-dot-${i} inline-block h-1 w-2 rounded-full bg-[#CBD5E1] hover:bg-[#94A3B8] transition-all duration-300 cursor-pointer select-none`}
                />
              ))}
            </div>

            <div className="relative w-9 h-9">
              {testimonials.map((_, i) => {
                const nextIdx = (i + 1) % testimonials.length;
                return (
                  <label
                    key={i}
                    htmlFor={`testi-${nextIdx}`}
                    className={`testi-next-${i} hidden w-9 h-9 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] font-bold text-base items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.06)] hover:bg-[#F1F5F9] transition-all cursor-pointer select-none`}
                  >
                    ›
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
