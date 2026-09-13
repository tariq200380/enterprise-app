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
    title: "Get ready to experience iPhone 18 Pro, the new Apple Watch lineup, and AirPods 5",
    summary:
      "Apple today introduced iPhone 18 Pro and iPhone 18 Pro Max, powered by the next-generation A20 Pro chip, breakthrough Apple Intelligence capabilities, and unprecedented battery life.",
    source: "Apple Newsroom",
    link: "https://www.apple.com/newsroom/2026/09/get-ready-to-experience-iphone-18-pro-the-new-apple-watch-lineup-and-airpods-5/",
    img: "/uploads/live_news/apple_ineup-and-airpods-5_88773506c08c.jpg",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: "🪟",
    brandBadge: "🪟 MICROSOFT",
    cat: "ENTERPRISE CLOUD & AI",
    date: "Microsoft News Center (Live Wire)",
    title: "The yield imperative: Turning AI infrastructure into useful intelligence",
    summary:
      "Rani Borkar, President of Azure Hardware Systems and Infrastructure, outlines how Microsoft Azure Maia accelerators and Copilot infrastructure translate massive compute into tangible enterprise productivity.",
    source: "Microsoft Official Blog",
    link: "https://blogs.microsoft.com/blog/2026/09/01/the-yield-imperative-turning-ai-infrastructure-into-useful-intelligence/",
    img: "/uploads/live_news/microsoft_semicon_hero.png",
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
      "Meta introduces Muse, an advanced multimodal personal AI agent capable of autonomous task execution, cross-platform workflows, and real-time reasoning across personal devices.",
    source: "Meta Newsroom",
    link: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
    img: "/uploads/live_news/meta_muse_hero.jpg",
  },
  {
    id: "openai",
    name: "OpenAI",
    icon: "🤖",
    brandBadge: "🤖 OPENAI",
    cat: "GENERATIVE AI & REASONING",
    date: "OpenAI Newsroom (Live Wire)",
    title: "Perplexity trusts GPT-6 Astra with end-to-end systems",
    summary:
      "Perplexity uses Astra to write communications, change software, and monitor production systems, and checks in much less frequently than with earlier models.",
    source: "OpenAI Newsroom",
    link: "https://openai.com/index/perplexity-improving-accuracy-with-astra/",
    img: "/uploads/live_news/openai_perplexity_aravind_hero.jpg",
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
      "Skild AI collaborates with NVIDIA to deploy foundational physical AI models, enabling robotic platforms to learn dextrous manipulation and locomotion from solitary video demonstrations.",
    source: "NVIDIA Official Blog",
    link: "https://blogs.nvidia.com/blog/skild-ai-s1-physical-ai/",
    img: "/uploads/live_news/nvidia_skild_ai.jpg",
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
    title: "Three Google supported projects premiere during the 83rd Venice International Film Festival.",
    summary:
      "Three immersive XR projects supported by Google have premiered at the prestigious Venice International Film Festival, showcasing cutting-edge spatial computing and interactive storytelling.",
    source: "Google The Keyword",
    link: "https://blog.google/innovation-and-ai/technology/xr-ar/three-google-supported-projects-premiere-during-the-83rd-venice-international-film-festival/",
    img: "/uploads/live_news/google_venice_film_fest.png",
  },
  {
    id: "intel",
    name: "Intel",
    icon: "🔷",
    brandBadge: "🔷 INTEL",
    cat: "NEXT-GEN SILICON & SEMICONDUCTORS",
    date: "Intel Newsroom (Live Wire)",
    title: "Intel Foundry and ASML Collaborate to Accelerate Industry Readiness for High-NA EUV",
    summary:
      "Intel Foundry and lithography leader ASML announce milestone integration of High-NA EUV scanners, paving the way for sub-14A Angstrom-era process nodes and advanced chiplet packaging.",
    source: "Intel Newsroom",
    link: "https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry/intel-foundry-asml-accelerate-industry-readiness-for-high-na-euv.html",
    img: "/uploads/live_news/intel_high_na_euv_cleanroom.png",
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
    id: "apple-iphone18",
    provider: "apple",
    tag: "HARDWARE & SILICON",
    providerLabel: "🍎 APPLE • HARDWARE & SILICON",
    providerColor: "#0284C7",
    date: "8 hours ago • Apple Newsroom",
    source: "Apple Newsroom",
    title: "Get ready to experience iPhone 18 Pro, the new Apple Watch lineup, and AirPods 5",
    desc: "Apple today introduced iPhone 18 Pro and iPhone 18 Pro Max, powered by the next-generation A20 Pro chip, breakthrough Apple Intelligence capabilities, and unprecedented battery life.",
    link: "https://www.apple.com/newsroom/2026/09/get-ready-to-experience-iphone-18-pro-the-new-apple-watch-lineup-and-airpods-5/",
    img: "/uploads/live_news/apple_ineup-and-airpods-5_88773506c08c.jpg",
  },
  {
    id: "openai-astra",
    provider: "openai",
    tag: "GENERATIVE AI & REASONING",
    providerLabel: "🤖 OPENAI • AI REASONING",
    providerColor: "#7C3AED",
    date: "Just now • OpenAI Newsroom",
    source: "OpenAI Newsroom",
    title: "Perplexity trusts GPT-6 Astra with end-to-end systems",
    desc: "Perplexity uses Astra to write communications, change software, and monitor production systems, and checks in much less frequently than with earlier models.",
    link: "https://openai.com/index/perplexity-improving-accuracy-with-astra/",
    img: "/uploads/live_news/openai_perplexity_aravind_hero.jpg",
  },
  {
    id: "nvidia-skild-ai",
    provider: "nvidia",
    tag: "ACCELERATED COMPUTING & AI",
    providerLabel: "⚡ NVIDIA • ACCELERATED AI",
    providerColor: "#059669",
    date: "2 hours ago • NVIDIA Official Blog",
    source: "NVIDIA Official Blog",
    title: "Skild AI Taps NVIDIA Physical AI to Teach Robots New Tasks From a Single Video",
    desc: "Skild AI collaborates with NVIDIA to deploy foundational physical AI models, enabling robotic platforms to learn dextrous manipulation and locomotion from solitary video demonstrations.",
    link: "https://blogs.nvidia.com/blog/skild-ai-s1-physical-ai/",
    img: "/uploads/live_news/nvidia_skild_ai.jpg",
  },
  {
    id: "microsoft-infrastructure",
    provider: "microsoft",
    tag: "ENTERPRISE CLOUD & AI",
    providerLabel: "🪟 MICROSOFT • CLOUD & COPILOT",
    providerColor: "#00A4EF",
    date: "6 hours ago • Microsoft News Center",
    source: "Microsoft Official Blog",
    title: "The yield imperative: Turning AI infrastructure into useful intelligence",
    desc: "Rani Borkar, President of Azure Hardware Systems and Infrastructure, outlines how Microsoft Azure Maia accelerators and Copilot infrastructure translate massive compute into tangible enterprise productivity.",
    link: "https://blogs.microsoft.com/blog/2026/09/01/the-yield-imperative-turning-ai-infrastructure-into-useful-intelligence/",
    img: "/uploads/live_news/microsoft_semicon_hero.png",
  },
  {
    id: "meta-muse",
    provider: "meta",
    tag: "OPEN SOURCE AI & INFRASTRUCTURE",
    providerLabel: "♾️ META • OPEN SOURCE AI",
    providerColor: "#0081FB",
    date: "5 hours ago • Meta Newsroom",
    source: "Meta Newsroom",
    title: "Introducing Muse: The World’s First Personal AI Agent Built for Everyone",
    desc: "Meta introduces Muse, an advanced multimodal personal AI agent capable of autonomous task execution, cross-platform workflows, and real-time reasoning across personal devices.",
    link: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
    img: "/uploads/live_news/meta_muse_hero.jpg",
  },
  {
    id: "google-venice-filmfest",
    provider: "google",
    tag: "GOOGLE AI & DEVICES",
    providerLabel: "🌐 GOOGLE • AI & DEVICES",
    providerColor: "#0052FF",
    date: "3 hours ago • Google The Keyword",
    source: "Google The Keyword",
    title: "Three Google supported projects premiere during the 83rd Venice International Film Festival.",
    desc: "Three immersive XR projects supported by Google have premiered at the prestigious Venice International Film Festival, showcasing cutting-edge spatial computing and interactive storytelling.",
    link: "https://blog.google/innovation-and-ai/technology/xr-ar/three-google-supported-projects-premiere-during-the-83rd-venice-international-film-festival/",
    img: "/uploads/live_news/google_venice_film_fest.png",
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
    id: "intel-highna",
    provider: "intel",
    tag: "NEXT-GEN SILICON & SEMICONDUCTORS",
    providerLabel: "🔷 INTEL • NEXT-GEN SILICON",
    providerColor: "#0071C5",
    date: "12 hours ago • Intel Newsroom",
    source: "Intel Newsroom",
    title: "Intel Foundry and ASML Collaborate to Accelerate Industry Readiness for High-NA EUV",
    desc: "Intel Foundry and lithography leader ASML announce milestone integration of High-NA EUV scanners, paving the way for sub-14A Angstrom-era process nodes and advanced chiplet packaging.",
    link: "https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry/intel-foundry-asml-accelerate-industry-readiness-for-high-na-euv.html",
    img: "/uploads/live_news/intel_high_na_euv_cleanroom.png",
  },
];

export const FALLBACK_IMAGE = "/uploads/live_news/apple_ineup-and-airpods-5_88773506c08c.jpg";
