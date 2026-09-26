export interface BrandWireItem {
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

export const brandWires: BrandWireItem[] = [
  {
    id: "apple",
    name: "Apple",
    icon: "🍎",
    brandBadge: "🍎 APPLE",
    cat: "HARDWARE & SILICON",
    date: "Apple Newsroom (Live Wire)",
    title: "The new Mac mini and Mac Studio are available today",
    summary:
      "Apple introduces the all-new Mac mini powered by M4 and M4 Pro chips, delivering enormous performance in an unbelievably compact 5x5-inch enclosure with front-facing connectivity.",
    source: "Apple Newsroom",
    link: "https://www.apple.com/newsroom/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/",
    img: "https://www.apple.com/newsroom/images/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/tile/Apple-Mac-mini-and-Mac-Studio-available-hero-lp.jpg.og.jpg",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: "🪟",
    brandBadge: "🪟 MICROSOFT COPILOT",
    cat: "ENTERPRISE CLOUD & AI",
    date: "Microsoft News Center (Live Wire)",
    title: "Microsoft Copilot: The AI Built for Work with Autonomous Agents",
    summary:
      "Microsoft reimagines enterprise productivity with Copilot, integrating autonomous agentic reasoning, Copilot Studio, and code assistance directly across Microsoft 365.",
    source: "Microsoft Official Blog",
    link: "https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/",
    img: "/images/microsoft-copilot-hero.png",
  },
  {
    id: "meta",
    name: "Meta",
    icon: "♾️",
    brandBadge: "♾️ META",
    cat: "OPEN SOURCE AI & INFRASTRUCTURE",
    date: "Meta Newsroom (Live Wire)",
    title: "The Biggest News From Connect 2026",
    summary:
      "Meta showcases the newest developments in spatial computing, holographic displays, and open weights frontier Llama foundation models during the annual Connect keynote.",
    source: "Meta Newsroom",
    link: "https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/",
    img: "https://about.fb.com/wp-content/uploads/2026/09/The-Biggest-News-From-Connect-2026_Header-1.jpg",
  },
  {
    id: "openai",
    name: "OpenAI",
    icon: "🤖",
    brandBadge: "🤖 OPENAI",
    cat: "GENERATIVE AI & REASONING",
    date: "OpenAI Newsroom (Live Wire)",
    title: "Proaction boosts sales 60% and saves 75+ hours with Codex",
    summary:
      "With Codex, GPT-Live-1, and GPT-6 Astra, Proaction builds, operates, and sells modern fleet management faster.",
    source: "OpenAI Newsroom",
    link: "https://openai.com/index/proaction",
    img: "https://images.ctfassets.net/kftzwdyauwt9/2ZDFcePalT1BpkNxHdwpnS/521705b27328ebf7f7449136dcd428c2/proaction-option-a-seo-og.png?w=1600&h=900&fit=fill",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    icon: "⚡",
    brandBadge: "⚡ NVIDIA",
    cat: "ACCELERATED COMPUTING & AI",
    date: "NVIDIA Newsroom (Live Wire)",
    title: "How Open Science Can Help Researchers Prepare for the Next Pandemic",
    summary:
      "NVIDIA accelerated computing and bio-computational simulation models enable international open science consortiums to rapidly identify and neutralize future viral threats.",
    source: "NVIDIA Newsroom",
    link: "https://nvidianews.nvidia.com/",
    img: "https://iprsoftwaremedia.com/219/files/202609/306cbf129044501629326e0a7a1e125d/6ab52d223d63321fe4743d17_AF-0000000212056767-master-black-background-842x450/AF-0000000212056767-master-black-background-842x450_thmb.jpg",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "🧠",
    brandBadge: "🧠 ANTHROPIC CLAUDE",
    cat: "FRONTIER AI & SAFETY RESEARCH",
    date: "Anthropic Research (Live Wire)",
    title: "Claude Opus 5.5: Next-Generation Frontier AI Reasoning and Code Intelligence",
    summary:
      "Anthropic launches Claude Opus 5.5, establishing new industry-leading benchmarks in graduate-level reasoning, code generation, vision comprehension, and multi-step autonomous workflows.",
    source: "Anthropic Research",
    link: "https://www.anthropic.com/claude-opus-5-5",
    img: "/images/anthropic-opus-hero.jpg",
  },
  {
    id: "google",
    name: "Google",
    icon: "🌐",
    brandBadge: "🌐 GOOGLE",
    cat: "GOOGLE AI & DEVICES",
    date: "Google The Keyword (Live Wire)",
    title: "Introducing Gemini 3.8 Live with Real-Time Video & Multimodal Reasoning",
    summary:
      "Google expands the Gemini frontier with Gemini 3.8 Live, featuring ultra-low latency real-time video comprehension, natural conversational avatars, and advanced multi-step system reasoning.",
    source: "Google The Keyword",
    link: "https://blog.google/technology/ai/google-gemini-next-gen-multimodal-reasoning/",
    img: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Slide_16_9_-_37.max-1000x1000.format-webp.webp",
  },
  {
    id: "intel",
    name: "Intel",
    icon: "🔷",
    brandBadge: "🔷 INTEL",
    cat: "NEXT-GEN SILICON & SEMICONDUCTORS",
    date: "Intel Newsroom (Live Wire)",
    title: "Googlebook Launches with Intel Core Ultra Series 3 Processors",
    summary:
      "Intel and Google introduce flagship computing devices powered by the latest Intel Core Ultra Series 3 processors with integrated high-efficiency neural acceleration engines.",
    source: "Intel Newsroom",
    link: "https://www.intel.com/content/www/us/en/newsroom/news/client-computing/googlebook-launches-with-intel-core-ultra-series-3-processors.html",
    img: "/images/news-screenshots/intel-googlebook-launches-with-intel-core-ultra-series-3-processors.webp",
  },
];

export interface LiveNewsItem {
  id: string;
  provider: string;
  tag: string;
  providerLabel: string;
  providerColor: string;
  date: string;
  source: string;
  title: string;
  desc: string;
  link: string;
  img: string;
  image?: string;
  source_image_url?: string;
  timestamp?: string;
}

export const INITIAL_STORIES: LiveNewsItem[] = [
  {
    id: "apple-mac-mini-m4",
    provider: "apple",
    tag: "HARDWARE & SILICON",
    providerLabel: "🍎 APPLE • HARDWARE & SILICON",
    providerColor: "#0284C7",
    date: "Apple Newsroom (Live Wire)",
    source: "Apple Newsroom",
    title: "The new Mac mini and Mac Studio are available today",
    desc: "Apple introduces the all-new Mac mini powered by M4 and M4 Pro chips, delivering enormous performance in an unbelievably compact 5x5-inch enclosure.",
    link: "https://www.apple.com/newsroom/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/",
    img: "https://www.apple.com/newsroom/images/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/tile/Apple-Mac-mini-and-Mac-Studio-available-hero-lp.jpg.og.jpg",
  },
  {
    id: "openai-proaction-codex",
    provider: "openai",
    tag: "GENERATIVE AI & REASONING",
    providerLabel: "🤖 OPENAI • AI REASONING",
    providerColor: "#7C3AED",
    date: "OpenAI Newsroom (Live Wire)",
    source: "OpenAI Newsroom",
    title: "Proaction boosts sales 60% and saves 75+ hours with Codex",
    desc: "With Codex, GPT-Live-1, and GPT-6 Astra, Proaction builds, operates, and sells modern fleet management faster.",
    link: "https://openai.com/index/proaction",
    img: "https://images.ctfassets.net/kftzwdyauwt9/2ZDFcePalT1BpkNxHdwpnS/521705b27328ebf7f7449136dcd428c2/proaction-option-a-seo-og.png?w=1600&h=900&fit=fill",
  },
  {
    id: "nvidia-pandemic-research",
    provider: "nvidia",
    tag: "ACCELERATED COMPUTING & AI",
    providerLabel: "⚡ NVIDIA • ACCELERATED AI",
    providerColor: "#059669",
    date: "NVIDIA Newsroom (Live Wire)",
    source: "NVIDIA Newsroom",
    title: "How Open Science Can Help Researchers Prepare for the Next Pandemic",
    desc: "NVIDIA accelerated computing and bio-computational simulation models enable international open science consortiums to rapidly identify and neutralize future viral threats.",
    link: "https://nvidianews.nvidia.com/",
    img: "https://iprsoftwaremedia.com/219/files/202609/306cbf129044501629326e0a7a1e125d/6ab52d223d63321fe4743d17_AF-0000000212056767-master-black-background-842x450/AF-0000000212056767-master-black-background-842x450_thmb.jpg",
  },
  {
    id: "microsoft-copilot-home",
    provider: "microsoft",
    tag: "ENTERPRISE CLOUD & AI",
    providerLabel: "🪟 MICROSOFT • CLOUD & COPILOT",
    providerColor: "#00A4EF",
    date: "Microsoft Official Blog (Live Wire)",
    source: "Microsoft Official Blog",
    title: "Microsoft Copilot: The AI Built for Work with Autonomous Agents",
    desc: "Microsoft reimagines enterprise productivity with Copilot, integrating autonomous agentic reasoning, Copilot Studio, and code assistance directly across Microsoft 365.",
    link: "https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/",
    img: "/images/microsoft-copilot-hero.png",
  },
  {
    id: "meta-connect-2026",
    provider: "meta",
    tag: "OPEN SOURCE AI & INFRASTRUCTURE",
    providerLabel: "♾️ META • OPEN SOURCE AI",
    providerColor: "#0081FB",
    date: "Meta Newsroom (Live Wire)",
    source: "Meta Newsroom",
    title: "The Biggest News From Connect 2026",
    desc: "Meta showcases the newest developments in spatial computing, holographic displays, and open weights frontier Llama foundation models during the annual Connect keynote.",
    link: "https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/",
    img: "https://about.fb.com/wp-content/uploads/2026/09/The-Biggest-News-From-Connect-2026_Header-1.jpg",
  },
  {
    id: "google-gemini-live",
    provider: "google",
    tag: "GOOGLE AI & DEVICES",
    providerLabel: "🌐 GOOGLE • AI & DEVICES",
    providerColor: "#0052FF",
    date: "Google The Keyword (Live Wire)",
    source: "Google The Keyword",
    title: "Introducing Gemini 3.8 Live with Real-Time Video & Multimodal Reasoning",
    desc: "Google expands the Gemini frontier with Gemini 3.8 Live, featuring ultra-low latency real-time video comprehension, natural conversational avatars, and advanced multi-step system reasoning.",
    link: "https://blog.google/technology/ai/google-gemini-next-gen-multimodal-reasoning/",
    img: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Slide_16_9_-_37.max-1000x1000.format-webp.webp",
  },
  {
    id: "anthropic-claude-frontier",
    provider: "anthropic",
    tag: "FRONTIER AI & SAFETY RESEARCH",
    providerLabel: "🧠 ANTHROPIC • SAFETY RESEARCH",
    providerColor: "#D97706",
    date: "Anthropic Research (Live Wire)",
    source: "Anthropic Research",
    title: "Claude Opus 5.5: Next-Generation Frontier AI Reasoning and Code Intelligence",
    desc: "Anthropic launches Claude Opus 5.5, establishing new industry-leading benchmarks in graduate-level reasoning, code generation, vision comprehension, and multi-step autonomous workflows.",
    link: "https://www.anthropic.com/claude-opus-5-5",
    img: "/images/anthropic-opus-hero.jpg",
  },
  {
    id: "intel-googlebook",
    provider: "intel",
    tag: "NEXT-GEN SILICON & SEMICONDUCTORS",
    providerLabel: "🔷 INTEL • NEXT-GEN SILICON",
    providerColor: "#0071C5",
    date: "Intel Newsroom (Live Wire)",
    source: "Intel Newsroom",
    title: "Googlebook Launches with Intel Core Ultra Series 3 Processors",
    desc: "Intel and Google introduce flagship computing devices powered by the latest Intel Core Ultra Series 3 processors with integrated high-efficiency neural acceleration engines.",
    link: "https://www.intel.com/content/www/us/en/newsroom/home.html",
    img: "/images/news-screenshots/intel-CBMi0wFBVV95cUxPRC1Edk83QjdDemRmenpkRzcwdWxm.webp",
  },
  {
    id: "brecorder-crypto",
    provider: "brecorder",
    tag: "PAKISTAN FINTECH & BUSINESS",
    providerLabel: "🇵🇰 B-RECORDER • FINTECH",
    providerColor: "#0284C7",
    date: "Business Recorder (Live Wire)",
    source: "Business Recorder",
    title: "PSX-listed Trust Securities plans to enter crypto business, seeks PVARA licences",
    desc: "Trust Securities and Brokerage Limited announces strategic entry into regulated virtual asset services and digital financial technology operations in Pakistan.",
    link: "https://www.brecorder.com/feeds/technology/",
    img: "/images/kc-news.webp",
  },
  {
    id: "propakistani-geely",
    provider: "propakistani",
    tag: "PAKISTAN DIGITAL ECOSYSTEM",
    providerLabel: "🇵🇰 PROPAKISTANI • DIGITAL ECOSYSTEM",
    providerColor: "#D97706",
    date: "ProPakistani (Live Wire)",
    source: "ProPakistani",
    title: "Geely’s PR Stunt at PAPS 2026 Gets Everyone Talking",
    desc: "Geely captures attention at the Pakistan Auto Parts Show with high-profile tech demonstrations and autonomous vehicle mobility showcases.",
    link: "https://propakistani.pk/category/tech-and-telecom/feed/",
    img: "/images/kc-news.webp",
  },
  {
    id: "dawn-chips",
    provider: "dawn",
    tag: "PAKISTAN TECH & SCIENCE",
    providerLabel: "🇵🇰 DAWN • TECH & SCIENCE",
    providerColor: "#059669",
    date: "Dawn Sci-Tech (Live Wire)",
    source: "Dawn Sci-Tech",
    title: "Google plans first test of AI chips in space under Project Suncatcher",
    desc: "Google prepares orbital deployment to benchmark neural processing units in deep space radiation environments for satellite edge intelligence.",
    link: "https://www.dawn.com/feeds/tech/",
    img: "/images/kc-news.webp",
  },
  {
    id: "tribune-ai-video",
    provider: "tribune",
    tag: "PAKISTAN AEROSPACE & TECH",
    providerLabel: "🇵🇰 TRIBUNE • AEROSPACE & TECH",
    providerColor: "#DC2626",
    date: "The Express Tribune (Live Wire)",
    source: "The Express Tribune",
    title: "China fuels rush to turn AI video into an industry",
    desc: "Generative video diffusion models and enterprise commercial production platforms experience rapid commercialization across Asian cloud providers.",
    link: "https://tribune.com.pk/feed/technology",
    img: "/images/kc-news.webp",
  },
];

export const FALLBACK_IMAGE = "/images/kc-news.webp";

export const BRAND_FALLBACK_IMAGES: Record<string, string> = {
  apple: "https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg",
  google: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Slide_16_9_-_37.max-1000x1000.format-webp.webp",
  nvidia: "https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png",
  openai: "https://images.ctfassets.net/kftzwdyauwt9/2ZDFcePalT1BpkNxHdwpnS/521705b27328ebf7f7449136dcd428c2/proaction-option-a-seo-og.png?w=1600&h=900&fit=fill",
  meta: "https://about.fb.com/wp-content/uploads/2026/09/The-Biggest-News-From-Connect-2026_Header-1.jpg",
  microsoft: "/images/microsoft-copilot-hero.png",
  anthropic: "/images/anthropic-opus-hero.jpg",
  intel: "https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png",
  dawn: "https://i.dawn.com/large/2026/09/24185550bbf621f.webp",
  brecorder: "https://i.brecorder.com/large/2026/09/2516305186574f1.webp",
  propakistani: "https://propakistani.pk/wp-content/uploads/2026/09/Remove-AI-Slop-From-LinkedIn.jpg",
  tribune: "https://i.tribune.com.pk/media/images/tiktok1790352528-0/tiktok1790352528-0.jpg",
};

export interface RegionalWireItem {
  id: string;
  name: string;
  icon: string;
  brandBadge: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  image: string;
}

export const INITIAL_REGIONAL_WIRES: RegionalWireItem[] = [
  {
    id: "dawn",
    name: "Dawn Sci-Tech",
    icon: "🇵🇰",
    brandBadge: "🇵🇰 DAWN TECH",
    category: "PAKISTAN TECH & SCIENCE",
    date: "Dawn Sci-Tech (Live Wire)",
    title: "Google plans first test of AI chips in space under Project Suncatcher",
    summary:
      "Alphabet’s Google said on Thursday it will launch a prototype satellite next week in its first in-orbit test of Project Suncatcher.",
    sourceName: "Dawn Sci-Tech",
    sourceUrl: "https://www.dawn.com/news/2032357/google-plans-first-test-of-ai-chips-in-space-under-project-suncatcher",
    image: "https://i.dawn.com/large/2026/09/24185550bbf621f.webp",
  },
  {
    id: "brecorder",
    name: "Business Recorder",
    icon: "📈",
    brandBadge: "🇵🇰 B-RECORDER",
    category: "PAKISTAN FINTECH & BUSINESS",
    date: "Business Recorder (Live Wire)",
    title: "PSX-listed Trust Securities plans to enter crypto business, seeks PVARA licences",
    summary:
      "Trust Securities & Brokerage Limited (TSBL) said its board had approved plans to seek regulatory licences to offer virtual asset services.",
    sourceName: "Business Recorder",
    sourceUrl: "https://www.brecorder.com/news/40441228/psx-listed-trust-securities-plans-to-enter-crypto-business-seeks-pvara-licences",
    image: "https://i.brecorder.com/large/2026/09/251630518657a52.webp",
  },
  {
    id: "propakistani",
    name: "ProPakistani",
    icon: "📱",
    brandBadge: "🇵🇰 PROPAKISTANI",
    category: "PAKISTAN DIGITAL ECOSYSTEM",
    date: "ProPakistani (Live Wire)",
    title: "Remove AI Slop From LinkedIn Using Browser Extension",
    summary:
      "A new Chrome extension called Slop Mop is using Jev, a decision-making AI model, to identify and flag low-value writing across LinkedIn.",
    sourceName: "ProPakistani",
    sourceUrl: "https://propakistani.pk/2026/09/25/remove-ai-slop-from-linkedin-using-browser-extension/",
    image: "https://propakistani.pk/wp-content/uploads/2026/09/AI-Slop.jpg",
  },
  {
    id: "tribune",
    name: "The Express Tribune",
    icon: "🚀",
    brandBadge: "🇵🇰 TRIBUNE",
    category: "PAKISTAN AEROSPACE & TECH",
    date: "The Express Tribune (Live Wire)",
    title: "Microsoft revamps Copilot with code generation, agentic AI tools",
    summary:
      "Microsoft unveils significant architectural updates to Copilot with real-time agentic workflows and developer copilots.",
    sourceName: "The Express Tribune",
    sourceUrl: "https://tribune.com.pk/story/2631402/microsoft-revamps-copilot-with-code-generation-agentic-ai-tools",
    image: "https://i.tribune.com.pk/media/images/microsoft-copilot1790357352-0/microsoft-copilot1790357352-0.jpg",
  },
];
