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
    title: "Apple unveils iPhone Duo",
    summary:
      "Apple unveiled a passport-shaped foldable phone called the Duo, marking the tech giant's first foray into foldable smartphones alongside next-generation AI silicon.",
    source: "Apple Newsroom",
    link: "https://www.apple.com/newsroom/2026/09/apple-unveils-iphone-duo/",
    img: "/uploads/live_news/apple_-unveils-iphone-duo_eafc7d9c1ea0.jpg",
  },
  {
    id: "google",
    name: "Google",
    icon: "🌐",
    brandBadge: "🌐 GOOGLE",
    cat: "GOOGLE AI & DEVICES",
    date: "Google The Keyword (Live Wire)",
    title: "3 ways to prep for your next big race with Search",
    summary:
      "Search can help runners get race-day ready with registration alerts, tailored training plans, and more.",
    source: "Google The Keyword",
    link: "https://blog.google/products-and-platforms/products/search/running-race-training-tips/",
    img: "/uploads/live_news/google_-race-training-tips_bf300f8a5e20.webp",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    icon: "⚡",
    brandBadge: "⚡ NVIDIA",
    cat: "ACCELERATED COMPUTING & AI",
    date: "NVIDIA Official Blog (Live Wire)",
    title: "Skild AI Taps NVIDIA Physical AI to Teach Robots New Tasks From a Single Video",
    summary:
      "Skild AI’s new S1 robot foundation model helps robots learn and perform new tasks from video footage using NVIDIA physical AI technologies.",
    source: "NVIDIA Official Blog",
    link: "https://blogs.nvidia.com/blog/skild-ai-s1-physical-ai/",
    img: "/uploads/live_news/nvidia_nvidiacomp98131_88343e10323f.jpg",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "🧠",
    brandBadge: "🧠 ANTHROPIC",
    cat: "FRONTIER AI & SCIENCE",
    date: "Anthropic Research (Live Wire)",
    title: "Measuring AI capabilities in intelligence targeting and conventional weapons",
    summary:
      "Anthropic’s Frontier Red Team developed new evaluations to measure AI capabilities in tactical intelligence targeting and conventional weapons development.",
    source: "Anthropic Research",
    link: "https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities",
    img: "/uploads/live_news/anthropic_targeting_evals.jpg",
  },
  {
    id: "openai",
    name: "OpenAI",
    icon: "🤖",
    brandBadge: "🤖 OPENAI",
    cat: "GENERATIVE AI & REASONING",
    date: "OpenAI Newsroom (Live Wire)",
    title: "How a researcher uses Codex and ChatGPT to search for new antimicrobial molecules",
    summary:
      "César de la Fuente’s lab uses Codex and ChatGPT to search living and extinct genomes for antimicrobial candidates to fight drug-resistant infections.",
    source: "OpenAI Newsroom",
    link: "https://openai.com/index/using-codex-chatgpt-to-search-for-new-antimicrobials",
    img: "/uploads/live_news/openai_r-new-antimicrobials_d70527d05960.png",
  },
  {
    id: "meta",
    name: "Meta",
    icon: "♾️",
    brandBadge: "♾️ META",
    cat: "OPEN SOURCE AI & INFRASTRUCTURE",
    date: "Meta Newsroom (Live Wire)",
    title: "Introducing Muse: The World’s First Personal AI Agent Built for Everyone",
    summary:
      "Muse is a secure, private personal AI agent that proactively helps people meet their goals and suggests ideas.",
    source: "Meta Newsroom",
    link: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
    img: "/uploads/live_news/meta_boutfbcomp50106_91ebdef77311.webp",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: "🪟",
    brandBadge: "🪟 MICROSOFT",
    cat: "ENTERPRISE CLOUD & AI",
    date: "Microsoft News Center (Live Wire)",
    title: "A framework for safe participation with AI for the next generation",
    summary:
      "Microsoft outlines a comprehensive framework for safe participation with AI for the next generation in the era of enterprise cloud and AI.",
    source: "Microsoft News Center",
    link: "https://blogs.microsoft.com/on-the-issues/2026/09/10/safe-participation-framework-opportunity-and-safety-for-the-next-generation-in-the-age-of-ai/",
    img: "/uploads/live_news/microsoft_comsourcep25579_8e30a3c1a7c1.jpg",
  },
  {
    id: "intel",
    name: "Intel",
    icon: "🔷",
    brandBadge: "🔷 INTEL",
    cat: "NEXT-GEN SILICON & SEMICONDUCTORS",
    date: "Intel Newsroom (Live Wire)",
    title: "ChatPPT Collaborates with Intel to Launch Hybrid AI PC Edition",
    summary:
      "ChatPPT collaborates with Intel to integrate high-performance hybrid AI PC processing, system-wide acceleration, and next-generation enterprise silicon architectures.",
    source: "Intel Newsroom",
    link: "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOaUZBX2QxWHJYQUVZUjZoM2JJZ3BHRE5XM2h1Y3RJc1F5N05qcUp5SnY0cVgyck1fZXZxUEtrVzl5Ty1xOUJ0OExWZ29SNVBRVExBYW5aV0tmUWJKa2tPdXpPLTFoOW5PYUZjMHpLbHk5SHFVdlBSU2xLQkF4Y0tER2hCbnh5OUlVaUNDc0tJY2w5UjZHWTJrNjZnd0p4SzhXNkdBTnoxdU0xLTk1ZGhMZkxGdGg5U3JJTW5XSUFwRmszbUhISnFDY3BFeWRBRGlQcXY2UlNEOU1KS1BYcWc?oc=5",
    img: "/uploads/live_news/intel_QcXY2UlNEOU1KS1BYcWc_7127ecebbbef.jpg",
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
    id: "apple-duo",
    provider: "apple",
    tag: "HARDWARE & SILICON",
    providerLabel: "🍎 APPLE • HARDWARE & SILICON",
    providerColor: "#0284C7",
    date: "23 hours ago • Apple Newsroom (Live RSS)",
    source: "Apple Newsroom",
    title: "Apple unveils iPhone Duo",
    desc: "Apple unveiled a passport-shaped foldable phone called the Duo, marking the tech giant's first foray into foldable smartphones alongside next-generation AI silicon.",
    link: "https://www.apple.com/newsroom/2026/09/apple-unveils-iphone-duo/",
    img: "/uploads/live_news/apple_-unveils-iphone-duo_eafc7d9c1ea0.jpg",
  },
  {
    id: "google-search",
    provider: "google",
    tag: "GOOGLE AI & DEVICES",
    providerLabel: "🌐 GOOGLE • AI & DEVICES",
    providerColor: "#0052FF",
    date: "1 hour ago • Google The Keyword (Live RSS)",
    source: "Google The Keyword",
    title: "3 ways to prep for your next big race with Search",
    desc: "Search can help runners get race-day ready with registration alerts, tailored training plans, and more.",
    link: "https://blog.google/products-and-platforms/products/search/running-race-training-tips/",
    img: "/uploads/live_news/google_-race-training-tips_bf300f8a5e20.webp",
  },
  {
    id: "nvidia-skild",
    provider: "nvidia",
    tag: "ACCELERATED COMPUTING & AI",
    providerLabel: "⚡ NVIDIA • ACCELERATED AI",
    providerColor: "#059669",
    date: "1 hour ago • NVIDIA Official Blog (Live RSS)",
    source: "NVIDIA Official Blog",
    title: "Skild AI Taps NVIDIA Physical AI to Teach Robots New Tasks From a Single Video",
    desc: "Skild AI’s new S1 robot foundation model helps robots learn and perform new tasks from video footage using NVIDIA physical AI technologies.",
    link: "https://blogs.nvidia.com/blog/skild-ai-s1-physical-ai/",
    img: "/uploads/live_news/nvidia_nvidiacomp98131_88343e10323f.jpg",
  },
  {
    id: "anthropic-evals",
    provider: "anthropic",
    tag: "FRONTIER AI & SCIENCE",
    providerLabel: "🧠 ANTHROPIC • SAFETY RESEARCH",
    providerColor: "#D97706",
    date: "17 hours ago • Anthropic Research (Live Wire)",
    source: "Anthropic Research",
    title: "Measuring AI capabilities in intelligence targeting and conventional weapons",
    desc: "Anthropic’s Frontier Red Team developed new evaluations to measure AI capabilities in tactical intelligence targeting and conventional weapons development.",
    link: "https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities",
    img: "/uploads/live_news/anthropic_targeting_evals.jpg",
  },
  {
    id: "openai-codex",
    provider: "openai",
    tag: "GENERATIVE AI & REASONING",
    providerLabel: "🤖 OPENAI • AI REASONING",
    providerColor: "#7C3AED",
    date: "1 hour ago • OpenAI Newsroom (Live RSS)",
    source: "OpenAI Newsroom",
    title: "How a researcher uses Codex and ChatGPT to search for new antimicrobial molecules",
    desc: "César de la Fuente’s lab uses Codex and ChatGPT to search living and extinct genomes for antimicrobial candidates to fight drug-resistant infections.",
    link: "https://openai.com/index/using-codex-chatgpt-to-search-for-new-antimicrobials",
    img: "/uploads/live_news/openai_r-new-antimicrobials_d70527d05960.png",
  },
  {
    id: "meta-muse",
    provider: "meta",
    tag: "OPEN SOURCE AI & INFRASTRUCTURE",
    providerLabel: "♾️ META • OPEN SOURCE AI",
    providerColor: "#0081FB",
    date: "1 day ago • Meta Newsroom (Live RSS)",
    source: "Meta Newsroom",
    title: "Introducing Muse: The World’s First Personal AI Agent Built for Everyone",
    desc: "Muse is a secure, private personal AI agent that proactively helps people meet their goals and suggests ideas.",
    link: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
    img: "/uploads/live_news/meta_boutfbcomp50106_91ebdef77311.webp",
  },
  {
    id: "ms-safe-participation",
    provider: "microsoft",
    tag: "ENTERPRISE CLOUD & AI",
    providerLabel: "🪟 MICROSOFT • CLOUD & COPILOT",
    providerColor: "#00A4EF",
    date: "58 mins ago • Microsoft News Center (Live RSS)",
    source: "Microsoft News Center",
    title: "A framework for safe participation with AI for the next generation",
    desc: "Microsoft outlines a comprehensive framework for safe participation with AI for the next generation in the era of enterprise cloud and AI.",
    link: "https://blogs.microsoft.com/on-the-issues/2026/09/10/safe-participation-framework-opportunity-and-safety-for-the-next-generation-in-the-age-of-ai/",
    img: "/uploads/live_news/microsoft_comsourcep25579_8e30a3c1a7c1.jpg",
  },
  {
    id: "intel-pc-edition",
    provider: "intel",
    tag: "NEXT-GEN SILICON & SEMICONDUCTORS",
    providerLabel: "🔷 INTEL • NEXT-GEN SILICON",
    providerColor: "#0071C5",
    date: "3 hours ago • Intel Newsroom (Live RSS)",
    source: "Intel Newsroom",
    title: "ChatPPT Collaborates with Intel to Launch Hybrid AI PC Edition",
    desc: "ChatPPT collaborates with Intel to integrate high-performance hybrid AI PC processing, system-wide acceleration, and next-generation enterprise silicon architectures.",
    link: "https://news.google.com/rss/articles/CBMi3gFBVV95cUxOaUZBX2QxWHJYQUVZUjZoM2JJZ3BHRE5XM2h1Y3RJc1F5N05qcUp5SnY0cVgyck1fZXZxUEtrVzl5Ty1xOUJ0OExWZ29SNVBRVExBYW5aV0tmUWJKa2tPdXpPLTFoOW5PYUZjMHpLbHk5SHFVdlBSU2xLQkF4Y0tER2hCbnh5OUlVaUNDc0tJY2w5UjZHWTJrNjZnd0p4SzhXNkdBTnoxdU0xLTk1ZGhMZkxGdGg5U3JJTW5XSUFwRmszbUhISnFDY3BFeWRBRGlQcXY2UlNEOU1KS1BYcWc?oc=5",
    img: "/uploads/live_news/intel_QcXY2UlNEOU1KS1BYcWc_7127ecebbbef.jpg",
  },
];

export const FALLBACK_IMAGE = "/uploads/live_news/apple_-unveils-iphone-duo_eafc7d9c1ea0.jpg";
