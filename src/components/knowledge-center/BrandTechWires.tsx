import Image from "next/image";

interface BrandWireItem {
  id: string;
  name: string;
  icon: string;
  brandBadge: string;
  cat: string;
  date: string;
  title: string;
  summary: string;
  source: string;
  link: string;
  img: string;
}

const brandWires: BrandWireItem[] = [
  {
    id: "google",
    name: "Google",
    icon: "🌐",
    brandBadge: "🌐 GOOGLE",
    cat: "GOOGLE AI & DEVICES",
    date: "1 day ago • Google The Keyword (Live RSS)",
    title:
      "Enter Google Play's sweepstakes to win legendary experiences and collectibles with your Play Points.",
    summary:
      "Redeem Google Play Points in the sweepstakes to win a trip to New York Comic Con, rare collectibles, gaming gear, and more.",
    source: "Google The Keyword",
    link: "https://blog.google/products-and-platforms/platforms/google-play/google-play-sweepstakes/",
    img: "/uploads/live_news/google_le-play-sweepstakes_4683461c45eb.webp",
  },
  {
    id: "apple",
    name: "Apple",
    icon: "🍎",
    brandBadge: "🍎 APPLE",
    cat: "HARDWARE & SILICON",
    date: "4 days ago • Apple Newsroom (Live RSS)",
    title: "Apple announces changes for apps in the European Union",
    summary:
      "Apple announces changes for apps in the European Union in compliance with the Digital Markets Act, offering developers new distribution options and security controls.",
    source: "Apple Newsroom",
    link: "https://www.apple.com/newsroom/2026/08/apple-announces-changes-for-apps-in-the-european-union/",
    img: "/uploads/live_news/apple_-the-european-union_9b5b740d847f.jpg",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    icon: "⚡",
    brandBadge: "⚡ NVIDIA",
    cat: "ACCELERATED COMPUTING & AI",
    date: "2 days ago • NVIDIA Official Blog (Live RSS)",
    title:
      "Bring the Fire: Play Games on GeForce NOW With New Firefox Browser Support",
    summary:
      "It's a new way into the cloud. GeForce NOW welcomes Firefox support to the cloud, opening up another way to jump into high-performance PC gaming straight from the browser.",
    source: "NVIDIA Official Blog",
    link: "https://blogs.nvidia.com/blog/geforce-now-thursday-firefox/",
    img: "/uploads/live_news/nvidia_nvidiacomp97798_23872e9ee67b.jpg",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "🧠",
    brandBadge: "🧠 ANTHROPIC",
    cat: "FRONTIER AI & SCIENCE",
    date: "4 days ago • Anthropic Research (Live Wire)",
    title: "How Claude is accelerating protein design and analytical chemistry",
    summary:
      "In this post, we share two results that show how Claude can help life scientists increase the pace of their research, including designing protein binders from scratch.",
    source: "Anthropic Research",
    link: "https://www.anthropic.com/research/Claude-accelerates-protein-design",
    img: "/uploads/live_news/anthropic_rates-protein-design_30f6a17bcff6.png",
  },
  {
    id: "openai",
    name: "OpenAI",
    icon: "🤖",
    brandBadge: "🤖 OPENAI",
    cat: "GENERATIVE AI & REASONING",
    date: "2 days ago • OpenAI Newsroom (Live RSS)",
    title: "Introducing AI Futures",
    summary:
      "Introducing AI Futures, a new OpenAI blog exploring how transformative AI could reshape power, governance, the economy, and individual freedom.",
    source: "OpenAI Newsroom",
    link: "https://openai.com/index/introducing-ai-futures",
    img: "/uploads/live_news/openai_troducing-ai-futures_4571444e8abb.png",
  },
  {
    id: "meta",
    name: "Meta",
    icon: "♾️",
    brandBadge: "♾️ META",
    cat: "OPEN SOURCE AI & INFRASTRUCTURE",
    date: "3 days ago • Meta Newsroom (Live RSS)",
    title:
      "Launching 'Meta Startup School' to Accelerate Growth For Early-Stage Startups",
    summary:
      "We are launching Meta Startup School, a three-month programme designed to help early-stage consumer brands accelerate growth with expert support and venture capital training.",
    source: "Meta Newsroom",
    link: "https://about.fb.com/news/2026/08/launching-meta-startup-school-to-accelerate-growth-for-early-stage-startups/",
    img: "/uploads/live_news/meta_boutfbcomp49978_e466d8d14977.webp",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: "🪟",
    brandBadge: "🪟 MICROSOFT",
    cat: "ENTERPRISE CLOUD & AI",
    date: "1 day ago • Microsoft News Center (Live RSS)",
    title: "Reflections on the 5th anniversary of Windows 365",
    summary:
      "Windows 365 turns five: cloud PCs enable flexible, secure enterprise workspaces at scale across organizations worldwide.",
    source: "Microsoft News Center",
    link: "https://blogs.windows.com/windowsexperience/2026/08/20/windows-365-turns-five-cloud-pcs-enable-workspaces-at-scale/",
    img: "/uploads/live_news/microsoft_comsourcep25445_a569df1c5e5e.png",
  },
  {
    id: "intel",
    name: "Intel",
    icon: "🔷",
    brandBadge: "🔷 INTEL",
    cat: "NEXT-GEN SILICON & SEMICONDUCTORS",
    date: "2 days ago • Intel Newsroom (Live RSS)",
    title: "Six in 10 Leaders Bet Big on Robots. Only Four in 10 Are Ready.",
    summary:
      "NEWS HIGHLIGHTS Six in 10 senior business and IT leaders, robotics specialists, government and healthcare officials expect their organizations to operate robot fleets within five years.",
    source: "Intel Newsroom",
    link: "https://newsroom.intel.com/artificial-intelligence/6-in-10-leaders-bet-big-on-robots-only-4-in-10-are-ready",
    img: "/uploads/live_news/intel_omintelcomp9107_95f0081c1ff8.webp",
  },
];

export default function BrandTechWires() {
  return (
    <section className="w-full py-12 sm:py-14 bg-white border-b border-[#E2E8F0]">
      {/* Hidden Radio Buttons for Pure CSS Tabs (Zero useState, Zero JS) */}
      {brandWires.map((brand, idx) => (
        <input
          key={brand.id}
          type="radio"
          name="brand-wire-tab"
          id={`brand-tab-${brand.id}`}
          defaultChecked={idx === 0}
          className="hidden"
        />
      ))}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center max-w-[48rem] mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1 rounded-full mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span className="text-[10.5px] font-bold text-[#1E40AF] uppercase tracking-[0.06em]">
              LIVE 8-PROVIDER OFFICIAL RSS WIRE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-[#0F172A] tracking-[-0.02em] m-0">
            Frontier AI &amp; Enterprise Tech Wires
          </h2>
        </div>

        {/* 8 Verified Provider Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {brandWires.map((brand) => (
            <label
              key={brand.id}
              htmlFor={`brand-tab-${brand.id}`}
              className={`brand-btn-${brand.id} inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer select-none bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]`}
            >
              <span>{brand.icon}</span>
              <span>{brand.name}</span>
            </label>
          ))}
        </div>

        {/* Showcase Cards (Controlled by Pure CSS) */}
        <div>
          {brandWires.map((wire) => (
            <div
              key={wire.id}
              className={`brand-pane-${wire.id} hidden grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(15,23,42,0.03)]`}
            >
              {/* Visual Container */}
              <div className="relative w-full aspect-[16/9] min-h-[240px] sm:min-h-[280px] rounded-xl overflow-hidden bg-[#0B1120]">
                <Image
                  src={wire.img}
                  alt={wire.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-all duration-300"
                  priority={wire.id === "google"}
                />
                {/* Top right floating badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#0F172A] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                    {wire.brandBadge}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] font-extrabold px-2 py-0.5 rounded-[3px] uppercase">
                    {wire.cat}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    {wire.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-[1.35] mb-2.5">
                  {wire.title}
                </h3>

                <p className="text-[14.5px] sm:text-[15px] text-[#475569] leading-relaxed mb-4">
                  {wire.summary}
                </p>

                <div>
                  <a
                    href={wire.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#0052FF] hover:text-[#0043D6] hover:underline transition-colors"
                  >
                    <span>Read Original on {wire.source}</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
