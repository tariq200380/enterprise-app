export interface PageSeoData {
  page_key: string;
  title: string;
  description: string;
  keywords: string;
  og_image: string;
  canonical_url: string;
  no_index: boolean;
  no_follow: boolean;
  meta_tags?: {
    googleVerification?: string;
    bingVerification?: string;
    gaMeasurementId?: string;
  };
  updated_at?: string;
}

export const FALLBACK_SEO: Record<string, PageSeoData> = {
  global: {
    page_key: "global",
    title: "CREED TECH | Enterprise IT Intelligence & Custom Software Engineering",
    description:
      "Enterprise IT solutions, custom software engineering, AI workflow orchestration, cloud modernization, and real-time intelligence for high-growth enterprises.",
    keywords:
      "Enterprise IT Solutions, Custom Software Engineering, Cloud Modernization, AI Workflow Automation, Cybersecurity",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com",
    no_index: false,
    no_follow: false,
    meta_tags: { googleVerification: "", bingVerification: "", gaMeasurementId: "" },
  },
  home: {
    page_key: "home",
    title: "CREED TECH | Enterprise IT Intelligence & Custom Software Engineering",
    description:
      "Enterprise IT solutions, custom software engineering, AI workflow orchestration, and resilient cloud infrastructure.",
    keywords: "Enterprise Software, Cloud Modernization, AI Solutions, Custom Engineering",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com",
    no_index: false,
    no_follow: false,
  },
  services: {
    page_key: "services",
    title: "Enterprise Services & Engineering Solutions | Creed Tech",
    description:
      "End-to-end cloud infrastructure, bespoke software engineering, AI automation, and cybersecurity engineered for unprecedented enterprise scale.",
    keywords: "Cloud Architecture, Software Engineering, AI Automation, Enterprise Cybersecurity",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/services",
    no_index: false,
    no_follow: false,
  },
  portfolio: {
    page_key: "portfolio",
    title: "Enterprise Case Studies & Delivered Systems | Creed Tech",
    description:
      "Explore real-world software architecture deployments, high-concurrency systems, and digital transformations delivered by Creed Tech.",
    keywords: "Case Studies, Enterprise Software Deployments, Cloud Infrastructure, Architecture",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/portfolio",
    no_index: false,
    no_follow: false,
  },
  knowledge_center: {
    page_key: "knowledge_center",
    title: "Enterprise Knowledge Center & Tech Intelligence | Creed Tech",
    description:
      "Curated technical research, engineering blueprints, system architecture patterns, and enterprise technology analysis from Creed Tech.",
    keywords: "Tech Intelligence, System Architecture, Engineering Blueprints, Knowledge Center",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/knowledge-center",
    no_index: false,
    no_follow: false,
  },
  about: {
    page_key: "about",
    title: "About Creed Tech | Engineering Principles & Leadership",
    description:
      "Learn about Creed Tech's engineering principles, distributed architecture hubs, and commitment to sovereign enterprise software.",
    keywords: "About Creed Tech, Leadership, Engineering Principles, Enterprise Software",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/about",
    no_index: false,
    no_follow: false,
  },
  contact: {
    page_key: "contact",
    title: "Contact Solutions Architecture & Engineering | Creed Tech",
    description:
      "Schedule a technical consultation with Creed Tech's principal solutions architects. Direct engineering scoping and zero-obligation NDA protection.",
    keywords: "Contact Creed Tech, Technical Consultation, Solutions Architecture, Enterprise Inquiries",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/contact",
    no_index: false,
    no_follow: false,
  },
  careers: {
    page_key: "careers",
    title: "Careers & Engineering Pods | Creed Tech",
    description:
      "Build digital infrastructure that endures. We are an autonomous collective of principal systems architects, AI engineers, and design artisans.",
    keywords: "Careers, Engineering Pods, Systems Architects, Software Jobs",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/careers",
    no_index: false,
    no_follow: false,
  },
};
