import Link from "next/link";

interface TopicCard {
  topic: string;
  badge: string;
  badgeColor: string;
  gradient: string;
  title: string;
  link: string;
}

const topicCards: TopicCard[] = [
  // Hosting
  {
    topic: "Hosting",
    badge: "CLOUD HOSTING",
    badgeColor: "#FDE68A",
    gradient: "linear-gradient(135deg, #92400E, #7C2D12, #1C1917)",
    title: "Cloud Native Microservices Architecture & Hosting",
    link: "/knowledge-center#article-3",
  },
  {
    topic: "Hosting",
    badge: "INFRASTRUCTURE",
    badgeColor: "#FDE68A",
    gradient: "linear-gradient(135deg, #78350F, #451A03, #1C1917)",
    title: "High-Throughput Kubernetes Clusters & Global Edge",
    link: "/knowledge-center#article-3",
  },
  // AI & Cloud
  {
    topic: "AI & Cloud",
    badge: "AI HARDWARE",
    badgeColor: "#38BDF8",
    gradient: "linear-gradient(135deg, #1E293B, #0F172A, #000)",
    title: "The 7 Best Enterprise AI & Cloud Laptops",
    link: "/knowledge-center#article-1",
  },
  {
    topic: "AI & Cloud",
    badge: "NEURAL ARCHITECTURE",
    badgeColor: "#A5B4FC",
    gradient: "linear-gradient(135deg, #312E81, #1E1B4B, #0F172A)",
    title: "Early Perceptrons & Symbolic Reasoning in LLMs",
    link: "/knowledge-center#article-2",
  },
  // SEO
  {
    topic: "SEO",
    badge: "TECHNICAL SEO",
    badgeColor: "#6EE7B7",
    gradient: "linear-gradient(135deg, #047857, #064E3B, #06281E)",
    title: "Enterprise Technical SEO & Core Web Vitals",
    link: "/knowledge-center#article-1",
  },
  // Social
  {
    topic: "Social",
    badge: "DIGITAL SOCIAL",
    badgeColor: "#FDA4AF",
    gradient: "linear-gradient(135deg, #BE123C, #881337, #4C0519)",
    title: "Social Engineering Defense & Enterprise Trust",
    link: "/knowledge-center#article-2",
  },
  // DevOps
  {
    topic: "DevOps",
    badge: "GITOPS & K8S",
    badgeColor: "#C7D2FE",
    gradient: "linear-gradient(135deg, #4338CA, #312E81, #1E1B4B)",
    title: "Automated CI/CD GitOps with ArgoCD & Helm",
    link: "/knowledge-center#article-3",
  },
];

const trendingCards = [
  {
    badge: "HISTORICAL AI",
    badgeColor: "#67E8F9",
    gradient: "linear-gradient(135deg, #0F172A, #111827, #000)",
    title: "Artificial Intelligence Development from 1950 to 1965: Foundations",
    link: "/knowledge-center#article-2",
  },
  {
    isSpecialIcon: true,
    badge: "TRENDING",
    gradient: "linear-gradient(135deg, #EFF6FF, #EEF2FF)",
    title: "Autonomous Multi-Agent AI Workflows",
    link: "/knowledge-center#article-1",
  },
  {
    badge: "CLOUD DEVOPS",
    badgeColor: "#6EE7B7",
    gradient: "linear-gradient(135deg, #064E3B, #134E4A, #0F172A)",
    title: "Distributed Microservices & Envoy Routing",
    link: "/knowledge-center#article-3",
  },
  {
    badge: "HARDWARE SPECS",
    badgeColor: "#FDE68A",
    gradient: "linear-gradient(135deg, #B45309, #7C2D12, #1C1917)",
    title: "The 7 Best Enterprise AI & Cloud Laptops",
    link: "/knowledge-center#article-1",
  },
];

const topicFilters = [
  { label: "ALL", id: "all" },
  { label: "SEO", id: "seo" },
  { label: "Hosting", id: "hosting" },
  { label: "Social", id: "social" },
  { label: "AI & Cloud", id: "ai" },
  { label: "DevOps", id: "devops" },
];

const getTopicKey = (topic: string) => {
  if (topic === "SEO") return "seo";
  if (topic === "Hosting") return "hosting";
  if (topic === "Social") return "social";
  if (topic === "AI & Cloud") return "ai";
  if (topic === "DevOps") return "devops";
  return "all";
};

export default function KnowledgeOverviewGrid() {
  return (
    <section className="w-full py-12 sm:py-16 bg-[#FAFAFC] border-b border-[#E2E8F0]">
      {/* Hidden Radio Buttons for Pure CSS Filter Tabs (Zero useState, Zero JS) */}
      {topicFilters.map((tab, idx) => (
        <input
          key={tab.id}
          type="radio"
          name="topic-filter"
          id={`filter-${tab.id}`}
          defaultChecked={idx === 0}
          className="hidden"
        />
      ))}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Overview Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          {/* LEFT 1FR COLUMN */}
          <div className="flex flex-col gap-10 text-left">
            {/* 1. DON'T MISS SECTION */}
            <div>
              <div className="border-b-2 border-[#030712] pb-2 mb-6 inline-block">
                <h3 className="text-[1.35rem] font-extrabold text-[#030712] m-0">
                  Don&apos;t Miss
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Don't Miss Card 1 */}
                <Link
                  href="/knowledge-center#article-2"
                  className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-200 block"
                >
                  <div className="w-full h-48 sm:h-52 bg-[linear-gradient(135deg,#111827,#1E293B,#000)] flex items-center justify-center p-4 text-center">
                    <div>
                      <div className="w-14 h-14 mx-auto mb-2 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-2xl">
                        🤖
                      </div>
                      <span className="text-[11.5px] font-mono text-[#67E8F9] tracking-wider uppercase font-semibold">
                        AI RESEARCH ARCHIVE
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-[0.95rem] sm:text-base font-bold text-[#111827] leading-[1.4] m-0">
                      Artificial Intelligence Development from 1950 to 1965: The Foundation of Modern AI Research
                    </h4>
                  </div>
                </Link>

                {/* Don't Miss Card 2 */}
                <Link
                  href="/knowledge-center#article-3"
                  className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-200 block"
                >
                  <div className="w-full h-48 sm:h-52 bg-[linear-gradient(135deg,#064E3B,#134E4A,#0F172A)] flex items-center justify-center p-4 text-center">
                    <div>
                      <div className="w-14 h-14 mx-auto mb-2 rounded-lg bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-2xl">
                        ⚡
                      </div>
                      <span className="text-[11.5px] font-mono text-[#6EE7B7] tracking-wider uppercase font-semibold">
                        CLOUD ORCHESTRATION
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-[0.95rem] sm:text-base font-bold text-[#111827] leading-[1.4] m-0">
                      Cloud Native Microservices Architecture: A Deep Dive into Kubernetes
                    </h4>
                  </div>
                </Link>
              </div>
            </div>

            {/* 2. TOPIC DIRECTORY & FILTER SECTION */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-[10.5px] font-bold text-[#0052FF] uppercase tracking-[0.1em] block mb-0.5">
                    CATEGORY DIRECTORY
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0F172A] m-0">
                    Discover Articles by Topic
                  </h3>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center flex-wrap gap-1.5">
                  {topicFilters.map((tab) => (
                    <label
                      key={tab.id}
                      htmlFor={`filter-${tab.id}`}
                      className={`btn-filter-${tab.id} px-3.5 py-1.5 text-xs rounded font-bold transition-all duration-150 cursor-pointer select-none bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]`}
                    >
                      {tab.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtered Grid (Controlled by Pure CSS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {topicCards.map((card, idx) => (
                  <Link
                    key={`${card.title}-${idx}`}
                    href={card.link}
                    className={`hidden card-topic-all card-topic-${getTopicKey(card.topic)} bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
                  >
                    <div
                      className="w-full h-36 flex items-center justify-center p-3 text-center"
                      style={{ background: card.gradient }}
                    >
                      <span
                        className="text-[11px] font-mono font-bold tracking-wider uppercase"
                        style={{ color: card.badgeColor }}
                      >
                        {card.badge}
                      </span>
                    </div>
                    <div className="p-4">
                      <h5 className="text-[13.5px] font-bold text-[#111827] leading-[1.4] m-0 line-clamp-2">
                        {card.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. WHAT'S TRENDING ACROSS LABS */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-6 pb-4 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-[10.5px] font-bold text-[#EF4444] uppercase tracking-[0.1em] block mb-0.5">
                    🔥 VIRAL INTELLIGENCE
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0F172A] m-0">
                    What&apos;s Trending Across Labs
                  </h3>
                </div>
                <span className="text-[11.5px] text-[#64748B] font-mono font-semibold">
                  UPDATED HOURLY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {trendingCards.map((card, idx) => (
                  <Link
                    key={idx}
                    href={card.link}
                    className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <div
                      className="w-full h-36 flex items-center justify-center p-3 text-center border-b border-[#E5E7EB]"
                      style={{ background: card.gradient }}
                    >
                      {card.isSpecialIcon ? (
                        <svg
                          className="w-12 h-12 text-[#3B82F6]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2" />
                        </svg>
                      ) : (
                        <span
                          className="text-[11px] font-mono font-bold tracking-wider uppercase"
                          style={{ color: card.badgeColor }}
                        >
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-center">
                      {card.isSpecialIcon && (
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1">
                          TRENDING
                        </span>
                      )}
                      <h5 className="text-[13.5px] font-bold text-[#111827] leading-[1.4] m-0 line-clamp-2">
                        {card.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR COLUMN (~320PX) */}
          <aside className="flex flex-col gap-6 w-full text-left">
            {/* WIDGET 1: TOP STORIES */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3F4F6]">
                <h4 className="text-[13px] font-extrabold text-[#030712] uppercase m-0 tracking-wider">
                  Top Stories
                </h4>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3.5">
                <Link
                  href="/knowledge-center#article-1"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#1E293B] shrink-0 flex items-center justify-center text-xl">
                    💻
                  </div>
                  <div>
                    <h5 className="text-[12.5px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-1 transition-colors">
                      The 7 Best Enterprise AI &amp; Cloud Laptops in 2026
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      15-Aug-2026
                    </span>
                  </div>
                </Link>

                <Link
                  href="/knowledge-center#article-2"
                  className="flex items-center gap-3 pt-3 border-t border-[#F9FAFB] group"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#312E81] shrink-0 flex items-center justify-center text-xl">
                    🤖
                  </div>
                  <div>
                    <h5 className="text-[12.5px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-1 transition-colors">
                      Artificial Intelligence Development: Modern AI Foundations
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      18-Aug-2026
                    </span>
                  </div>
                </Link>

                <Link
                  href="/knowledge-center#article-3"
                  className="flex items-center gap-3 pt-3 border-t border-[#F9FAFB] group"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#0F766E] shrink-0 flex items-center justify-center text-xl">
                    📈
                  </div>
                  <div>
                    <h5 className="text-[12.5px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-1 transition-colors">
                      International Growth &amp; High-Throughput Cloud Scaling
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      25-Apr-2026
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* WIDGET 2: SPECIAL FEATURE 1 */}
            <div className="bg-[#0B1120] text-white rounded-2xl p-6 relative overflow-hidden border border-[#1F2937] shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4ADE80] via-[#22D3EE] to-[#3B82F6]"></div>
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                Special Feature
              </span>
              <p className="text-[12.5px] text-[#D1D5DB] leading-relaxed mb-4">
                Watch our exclusive video briefings &amp; live architecture teardowns.
              </p>
              <Link
                href="/contact"
                className="inline-block px-5 py-2 bg-[#E53935] hover:bg-[#C62828] text-white font-bold text-xs rounded-sm shadow-[0_4px_6px_-1px_rgba(229,57,53,0.4)] transition-colors text-center"
              >
                Watch Now
              </Link>
            </div>

            {/* WIDGET 3: NEWEST VIDEOS */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3F4F6]">
                <h4 className="text-[13px] font-extrabold text-[#030712] uppercase m-0 tracking-wider">
                  Newest Videos
                </h4>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-14 h-14 rounded-lg bg-[#312E81] shrink-0 flex items-center justify-center text-white text-sm group-hover:scale-105 transition-transform">
                    ▶
                  </div>
                  <div>
                    <h5 className="text-[12px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-1 uppercase transition-colors">
                      WHAT ARE SOCIAL ADVERTISING?
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      25-Apr-2024
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#F9FAFB] cursor-pointer group">
                  <div className="w-14 h-14 rounded-lg bg-[#312E81] shrink-0 flex items-center justify-center text-white text-sm group-hover:scale-105 transition-transform">
                    ▶
                  </div>
                  <div>
                    <h5 className="text-[12px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-1 uppercase transition-colors">
                      ENTERPRISE AI ARCHITECTURE
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      18-Apr-2024
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#F9FAFB] cursor-pointer group">
                  <div className="w-14 h-14 rounded-lg bg-[#312E81] shrink-0 flex items-center justify-center text-white text-sm group-hover:scale-105 transition-transform">
                    ▶
                  </div>
                  <div>
                    <h5 className="text-[12px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-1 uppercase transition-colors">
                      HYBRID CLOUD DEVOPS TEARDOWN
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      12-May-2024
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WIDGET 4: SPECIAL FEATURE 2 */}
            <div className="bg-[#0B1120] text-white rounded-2xl p-6 relative overflow-hidden border border-[#1F2937] shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FB923C] via-[#EF4444] to-[#EC4899]"></div>
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                Special Feature
              </span>
              <p className="text-[12.5px] text-[#D1D5DB] leading-relaxed mb-4">
                Explore our high-throughput AI infrastructure benchmarks.
              </p>
              <Link
                href="/contact"
                className="inline-block px-5 py-2 bg-[#E53935] hover:bg-[#C62828] text-white font-bold text-xs rounded-sm shadow-[0_4px_6px_-1px_rgba(229,57,53,0.4)] transition-colors text-center"
              >
                Watch Now
              </Link>
            </div>

            {/* WIDGET 5: UPCOMING EVENTS */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F3F4F6]">
                <h4 className="text-[13px] font-extrabold text-[#030712] uppercase m-0 tracking-wider">
                  Upcoming Events
                </h4>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="w-6 h-6 bg-[#F1F5F9] border border-[#CBD5E1] rounded flex items-center justify-center text-xs font-bold text-[#1E293B] hover:bg-[#E2E8F0] transition-colors"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3.5 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-extrabold text-[#0F172A] leading-none">
                      13
                    </span>
                    <span className="text-[9px] font-bold text-[#64748B] tracking-wider">
                      APR
                    </span>
                  </div>
                  <div>
                    <h5 className="text-[12.5px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-0.5 transition-colors">
                      International Conference on World Cloud Architecture
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      25-Apr-2026
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pt-3 border-t border-[#F9FAFB] cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-extrabold text-[#0F172A] leading-none">
                      28
                    </span>
                    <span className="text-[9px] font-bold text-[#64748B] tracking-wider">
                      MAY
                    </span>
                  </div>
                  <div>
                    <h5 className="text-[12.5px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-0.5 transition-colors">
                      Global AI &amp; Autonomous Agents Summit 2026
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      28-May-2026
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pt-3 border-t border-[#F9FAFB] cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-extrabold text-[#0F172A] leading-none">
                      15
                    </span>
                    <span className="text-[9px] font-bold text-[#64748B] tracking-wider">
                      JUN
                    </span>
                  </div>
                  <div>
                    <h5 className="text-[12.5px] font-bold text-[#111827] group-hover:text-[#0052FF] leading-[1.35] mb-0.5 transition-colors">
                      Enterprise Cybersecurity &amp; Threat Modeling Workshop
                    </h5>
                    <span className="text-[10.5px] text-[#9CA3AF] font-semibold block">
                      15-Jun-2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
