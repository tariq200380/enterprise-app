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
    title: "Apple opens Apple Music Hall, a state-of-the-art live music venue in London",
    summary:
      "Apple today announced the grand opening of Apple Music Hall, a state-of-the-art live music and broadcast venue located in the historic Battersea Power Station in London.",
    source: "Apple Newsroom",
    link: "https://www.apple.com/newsroom/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/",
    img: "https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: "🪟",
    brandBadge: "🪟 MICROSOFT",
    cat: "ENTERPRISE CLOUD & AI",
    date: "Microsoft News Center (Live Wire)",
    title: "What we’ve learned from Microsoft’s own AI transformation",
    summary:
      "Microsoft leaders share key lessons and telemetry from enterprise Copilot adoption, business automation, and sovereign cloud AI across global operations.",
    source: "Microsoft Official Blog",
    link: "https://blogs.microsoft.com/blog/2026/09/17/what-weve-learned-from-microsofts-own-ai-transformation/",
    img: "https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Hero-FINAL-9_17-1024x683.jpg",
  },
  {
    id: "meta",
    name: "Meta",
    icon: "♾️",
    brandBadge: "♾️ META",
    cat: "OPEN SOURCE AI & INFRASTRUCTURE",
    date: "Meta Newsroom (Live Wire)",
    title: "Announcing Petal, a First-of-its-Kind Transoceanic Subsea Cable",
    summary:
      "Meta announces Petal, an ultra-high capacity transoceanic subsea fiber optic infrastructure linking global cloud regions to support distributed AI training and inference.",
    source: "Meta Newsroom",
    link: "https://about.fb.com/news/2026/09/announcing-petal-meta-petabit-transoceanic-cable/",
    img: "https://about.fb.com/wp-content/uploads/2026/09/Announcing-Petal-a-First-of-its-Kind-Transoceanic-Subsea-Cable_Header.jpg",
  },
  {
    id: "openai",
    name: "OpenAI",
    icon: "🤖",
    brandBadge: "🤖 OPENAI",
    cat: "GENERATIVE AI & REASONING",
    date: "OpenAI Newsroom (Live Wire)",
    title: "Advisory Group on Mathematics and Artificial Intelligence",
    summary:
      "OpenAI announces the formation of an external Advisory Group on Mathematics and Artificial Intelligence to evaluate automated theorem proving and frontier reasoning.",
    source: "OpenAI Newsroom",
    link: "https://openai.com/index/advisory-group-on-mathematics-and-artificial-intelligence/",
    img: "https://images.ctfassets.net/kftzwdyauwt9/11yqmSO7D1dfYveBnOdmJt/e451277f37f82f51d6d20f2b86826590/advisory-group-on-mathematics-and-artificial-intelligence-seo.png?w=1600&h=900&fit=fill",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    icon: "⚡",
    brandBadge: "⚡ NVIDIA",
    cat: "ACCELERATED COMPUTING & AI",
    date: "NVIDIA Official Blog (Live Wire)",
    title: "NVIDIA Launches DSX Ready to Qualify Power and Cooling Products for AI Factories",
    summary:
      "NVIDIA launches the DSX Ready qualification program to standardize power delivery and liquid cooling solutions for multi-gigawatt gigascale AI factories.",
    source: "NVIDIA Official Blog",
    link: "https://blogs.nvidia.com/blog/dsx-ready-ai-factories-power-cooling/",
    img: "https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "🧠",
    brandBadge: "🧠 ANTHROPIC",
    cat: "FRONTIER AI & SCIENCE",
    date: "Anthropic Research (Live Wire)",
    title: "Introducing Claude Fable 5.1 and Claude Mythos 5.1",
    summary:
      "Anthropic announces Claude Fable 5.1 and Claude Mythos 5.1, setting new industry records in multi-agent orchestration, complex logic reasoning, and constitutional cybersecurity safeguards.",
    source: "Anthropic Research",
    link: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
    img: "/uploads/live_news/anthropic_fable_mythos_hero.jpg",
  },
  {
    id: "google",
    name: "Google",
    icon: "🌐",
    brandBadge: "🌐 GOOGLE",
    cat: "GOOGLE AI & DEVICES",
    date: "Google The Keyword (Live Wire)",
    title: "Expanding free AI training for educators",
    summary:
      "Google expands its generative AI training programs and interactive classroom curriculum tools for educators and academic institutions worldwide.",
    source: "Google The Keyword",
    link: "https://blog.google/products-and-platforms/products/education/digital-promise/",
    img: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/28525___EDNA_Blog_header_01.max-600x600.format-webp.webp",
  },
  {
    id: "intel",
    name: "Intel",
    icon: "🔷",
    brandBadge: "🔷 INTEL",
    cat: "NEXT-GEN SILICON & SEMICONDUCTORS",
    date: "Intel Newsroom (Live Wire)",
    title: "Intel on-the-ground at the AI Infra Summit",
    summary:
      "Intel CEO Lip-Bu Tan emphasizes that the future of AI will be built through open, heterogeneous systems spanning silicon, software, and ecosystem partnerships during fireside chat at AI Infra Summit.",
    source: "Intel Newsroom",
    link: "https://www.intel.com/content/www/us/en/newsroom/news/artificial-intelligence/intel-on-the-ground-at-the-ai-infra-summit.html",
    img: "/uploads/live_news/intel_ai_infra_summit_2026.jpg",
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
  source_image_url?: string;
  timestamp?: string;
}

export const INITIAL_STORIES: LiveNewsItem[] = [
  {
    id: "apple-music-hall",
    provider: "apple",
    tag: "HARDWARE & SILICON",
    providerLabel: "🍎 APPLE • HARDWARE & SILICON",
    providerColor: "#0284C7",
    date: "Apple Newsroom (Live Wire)",
    source: "Apple Newsroom",
    title: "Apple opens Apple Music Hall, a state-of-the-art live music venue in London",
    desc: "Apple today announced the grand opening of Apple Music Hall, a state-of-the-art live music and broadcast venue located in the historic Battersea Power Station in London.",
    link: "https://www.apple.com/newsroom/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/",
    img: "https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg",
  },
  {
    id: "openai-advisory-math",
    provider: "openai",
    tag: "GENERATIVE AI & REASONING",
    providerLabel: "🤖 OPENAI • AI REASONING",
    providerColor: "#7C3AED",
    date: "OpenAI Newsroom (Live Wire)",
    source: "OpenAI Newsroom",
    title: "Advisory Group on Mathematics and Artificial Intelligence",
    desc: "OpenAI announces the formation of an external Advisory Group on Mathematics and Artificial Intelligence to evaluate automated theorem proving and frontier reasoning.",
    link: "https://openai.com/index/advisory-group-on-mathematics-and-artificial-intelligence/",
    img: "https://images.ctfassets.net/kftzwdyauwt9/11yqmSO7D1dfYveBnOdmJt/e451277f37f82f51d6d20f2b86826590/advisory-group-on-mathematics-and-artificial-intelligence-seo.png?w=1600&h=900&fit=fill",
  },
  {
    id: "nvidia-dsx-ready",
    provider: "nvidia",
    tag: "ACCELERATED COMPUTING & AI",
    providerLabel: "⚡ NVIDIA • ACCELERATED AI",
    providerColor: "#059669",
    date: "NVIDIA Official Blog (Live Wire)",
    source: "NVIDIA Official Blog",
    title: "NVIDIA Launches DSX Ready to Qualify Power and Cooling Products for AI Factories",
    desc: "NVIDIA launches the DSX Ready qualification program to standardize power delivery and liquid cooling solutions for multi-gigawatt gigascale AI factories.",
    link: "https://blogs.nvidia.com/blog/dsx-ready-ai-factories-power-cooling/",
    img: "https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png",
  },
  {
    id: "microsoft-transformation",
    provider: "microsoft",
    tag: "ENTERPRISE CLOUD & AI",
    providerLabel: "🪟 MICROSOFT • CLOUD & COPILOT",
    providerColor: "#00A4EF",
    date: "Microsoft Official Blog (Live Wire)",
    source: "Microsoft Official Blog",
    title: "What we’ve learned from Microsoft’s own AI transformation",
    desc: "Microsoft leaders share key lessons and telemetry from enterprise Copilot adoption, business automation, and sovereign cloud AI across global operations.",
    link: "https://blogs.microsoft.com/blog/2026/09/17/what-weve-learned-from-microsofts-own-ai-transformation/",
    img: "https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Hero-FINAL-9_17-1024x683.jpg",
  },
  {
    id: "meta-petal-cable",
    provider: "meta",
    tag: "OPEN SOURCE AI & INFRASTRUCTURE",
    providerLabel: "♾️ META • OPEN SOURCE AI",
    providerColor: "#0081FB",
    date: "Meta Newsroom (Live Wire)",
    source: "Meta Newsroom",
    title: "Announcing Petal, a First-of-its-Kind Transoceanic Subsea Cable",
    desc: "Meta announces Petal, an ultra-high capacity transoceanic subsea fiber optic infrastructure linking global cloud regions to support distributed AI training and inference.",
    link: "https://about.fb.com/news/2026/09/announcing-petal-meta-petabit-transoceanic-cable/",
    img: "https://about.fb.com/wp-content/uploads/2026/09/Announcing-Petal-a-First-of-its-Kind-Transoceanic-Subsea-Cable_Header.jpg",
  },
  {
    id: "google-education-ai",
    provider: "google",
    tag: "GOOGLE AI & DEVICES",
    providerLabel: "🌐 GOOGLE • AI & DEVICES",
    providerColor: "#0052FF",
    date: "Google The Keyword (Live Wire)",
    source: "Google The Keyword",
    title: "Expanding free AI training for educators",
    desc: "Google expands its generative AI training programs and interactive classroom curriculum tools for educators and academic institutions worldwide.",
    link: "https://blog.google/products-and-platforms/products/education/digital-promise/",
    img: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/28525___EDNA_Blog_header_01.max-600x600.format-webp.webp",
  },
  {
    id: "anthropic-claude51",
    provider: "anthropic",
    tag: "FRONTIER AI & SCIENCE",
    providerLabel: "🧠 ANTHROPIC • SAFETY RESEARCH",
    providerColor: "#D97706",
    date: "45 mins ago • Anthropic Research",
    source: "Anthropic Research",
    title: "Introducing Claude Fable 5.1 and Claude Mythos 5.1",
    desc: "Anthropic announces Claude Fable 5.1 and Claude Mythos 5.1, setting new industry records in multi-agent orchestration, complex logic reasoning, and constitutional cybersecurity safeguards.",
    link: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
    img: "/uploads/live_news/anthropic_fable_mythos_hero.jpg",
  },
  {
    id: "intel-ai-infra-summit",
    provider: "intel",
    tag: "NEXT-GEN SILICON & SEMICONDUCTORS",
    providerLabel: "🔷 INTEL • NEXT-GEN SILICON",
    providerColor: "#0071C5",
    date: "Intel Newsroom (Live Wire)",
    source: "Intel Newsroom",
    title: "Intel on-the-ground at the AI Infra Summit",
    desc: "Intel CEO Lip-Bu Tan emphasizes that the future of AI will be built through open, heterogeneous systems spanning silicon, software, and ecosystem partnerships during fireside chat at AI Infra Summit.",
    link: "https://www.intel.com/content/www/us/en/newsroom/news/artificial-intelligence/intel-on-the-ground-at-the-ai-infra-summit.html",
    img: "/uploads/live_news/intel_ai_infra_summit_2026.jpg",
  },
  {
    id: "brecorder-initial",
    provider: "brecorder",
    tag: "PAKISTAN FINTECH & BUSINESS",
    providerLabel: "🇵🇰 B-RECORDER • FINTECH",
    providerColor: "#0284C7",
    date: "Just now • Business Recorder",
    source: "Business Recorder",
    title: "Alibaba plans AI model with 5 trillion to 10 trillion parameters, unveils new chip",
    desc: "Alibaba Cloud announces next-generation frontier AI model scaling to 10 trillion parameters alongside specialized accelerator silicon for enterprise cloud infrastructure.",
    link: "https://www.brecorder.com/feeds/technology/",
    img: "https://i.brecorder.com/large/2026/09/220759353d42770.webp",
  },
  {
    id: "dawn-initial",
    provider: "dawn",
    tag: "PAKISTAN TECH & SCIENCE",
    providerLabel: "🇵🇰 DAWN • TECH & SCIENCE",
    providerColor: "#059669",
    date: "Today • Dawn Sci-Tech",
    source: "Dawn Sci-Tech",
    title: "'I live in fear': 1.5 million Pakistani children sexually exploited online",
    desc: "Digital safety advocates and law enforcement highlight urgency for cyber safety measures protecting children across Pakistan's digital space.",
    link: "https://www.dawn.com/feeds/tech/",
    img: "https://i.dawn.com/large/2026/09/21112713801fded.webp",
  },
  {
    id: "propakistani-initial",
    provider: "propakistani",
    tag: "PAKISTAN DIGITAL ECOSYSTEM",
    providerLabel: "🇵🇰 PROPAKISTANI • DIGITAL ECOSYSTEM",
    providerColor: "#D97706",
    date: "Today • ProPakistani",
    source: "ProPakistani",
    title: "Vivo X500 Brings Gimbal-Level Stabilization, 3x Optical Zoom",
    desc: "Vivo officially unveils the X500 series featuring micro-gimbal optical stabilization, customized periscope optics, and next-generation battery architecture.",
    link: "https://propakistani.pk/category/tech-and-telecom/feed/",
    img: "https://propakistani.pk/wp-content/uploads/2026/09/Vivo-X500-2.jpg",
  },
  {
    id: "tribune-initial",
    provider: "tribune",
    tag: "PAKISTAN AEROSPACE & TECH",
    providerLabel: "🇵🇰 TRIBUNE • AEROSPACE & TECH",
    providerColor: "#DC2626",
    date: "Yesterday • The Express Tribune",
    source: "The Express Tribune",
    title: "Kojima Productions comments on PlayStation relationship after PHYSINT split",
    desc: "Hideo Kojima clarifies long-standing production and publishing partnerships with Sony Interactive Entertainment following announcement of upcoming tactical espionage action title.",
    link: "https://tribune.com.pk/feed/technology",
    img: "https://i.tribune.com.pk/media/images/silent-hill-f-11759313708-0/silent-hill-f-11759313708-0.png",
  },
];

export const FALLBACK_IMAGE = "https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png";

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
    title: "'I live in fear': 1.5 million Pakistani children sexually exploited online",
    summary:
      "Digital safety advocates and law enforcement highlight urgency for cyber safety measures protecting children across Pakistan's digital space.",
    sourceName: "Dawn Sci-Tech",
    sourceUrl: "https://www.dawn.com/feeds/tech/",
    image: "https://i.dawn.com/large/2026/09/21112713801fded.webp",
  },
  {
    id: "brecorder",
    name: "Business Recorder",
    icon: "📈",
    brandBadge: "🇵🇰 B-RECORDER",
    category: "PAKISTAN FINTECH & BUSINESS",
    date: "Business Recorder (Live Wire)",
    title: "Alibaba plans AI model with 5 trillion to 10 trillion parameters, unveils new chip",
    summary:
      "Alibaba Cloud announces next-generation frontier AI model scaling to 10 trillion parameters alongside specialized accelerator silicon for enterprise cloud infrastructure.",
    sourceName: "Business Recorder",
    sourceUrl: "https://www.brecorder.com/feeds/technology/",
    image: "https://i.brecorder.com/large/2026/09/220759353d42770.webp",
  },
  {
    id: "propakistani",
    name: "ProPakistani",
    icon: "📱",
    brandBadge: "🇵🇰 PROPAKISTANI",
    category: "PAKISTAN DIGITAL ECOSYSTEM",
    date: "ProPakistani (Live Wire)",
    title: "Vivo X500 Brings Gimbal-Level Stabilization, 3x Optical Zoom",
    summary:
      "Vivo officially unveils the X500 series featuring micro-gimbal optical stabilization, customized periscope optics, and next-generation battery architecture.",
    sourceName: "ProPakistani",
    sourceUrl: "https://propakistani.pk/category/tech-and-telecom/feed/",
    image: "https://propakistani.pk/wp-content/uploads/2026/09/Vivo-X500-2.jpg",
  },
  {
    id: "tribune",
    name: "The Express Tribune",
    icon: "🚀",
    brandBadge: "🇵🇰 TRIBUNE",
    category: "PAKISTAN AEROSPACE & TECH",
    date: "The Express Tribune (Live Wire)",
    title: "Kojima Productions comments on PlayStation relationship after PHYSINT split",
    summary:
      "Hideo Kojima clarifies long-standing production and publishing partnerships with Sony Interactive Entertainment following announcement of upcoming tactical espionage action title.",
    sourceName: "The Express Tribune",
    sourceUrl: "https://tribune.com.pk/feed/technology",
    image: "https://i.tribune.com.pk/media/images/silent-hill-f-11759313708-0/silent-hill-f-11759313708-0.png",
  },
];
