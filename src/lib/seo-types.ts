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
    title: "Creed Tech | Enterprise Software, Cloud Infrastructure & AI Solutions",
    description:
      "Creed Tech provides custom software engineering, robust cloud infrastructure, cybersecurity audits, and enterprise AI integrations. Accelerate your digital transformation.",
    keywords:
      "software development, cloud infrastructure, cybersecurity, AI solutions, Creed Tech, enterprise IT solutions, IT consulting Pakistan",
    og_image: "/images/og-home.webp",
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
  articles: {
    page_key: "articles",
    title: "Technical Articles & Deep Engineering Blueprints | Creed Tech",
    description:
      "Explore peer-reviewed systems architecture blueprints, hardware benchmark teardowns, high-concurrency patterns, and engineering insights from Creed Tech.",
    keywords: "Technical Articles, Engineering Blueprints, Hardware Benchmarks, Architecture Patterns, Software Engineering",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/knowledge-center#articles",
    no_index: false,
    no_follow: false,
  },
  security: {
    page_key: "security",
    title: "Trust, Engineered Into Every Layer | Enterprise Security Center",
    description:
      "Security at Creed Tech is built into our infrastructure, development lifecycle, and governance. Explore the architecture, controls, and audited standards behind every engagement.",
    keywords: "Enterprise Security, Information Security, Secure Software Lifecycle, Data Governance, Cloud Architecture",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/security",
    no_index: false,
    no_follow: false,
  },
  security_soc_2: {
    page_key: "security_soc_2",
    title: "AICPA SOC 2 Type II Security Controls | Creed Tech",
    description:
      "The American Institute of CPAs benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.",
    keywords: "SOC 2 Type II, AICPA Compliance, Enterprise SaaS Security, Operational Controls, Audit Evidence",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/security-soc-2",
    no_index: false,
    no_follow: false,
  },
  security_iso_27001: {
    page_key: "security_iso_27001",
    title: "ISO/IEC 27001:2022 ISMS Architecture | Creed Tech Security",
    description:
      "Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models under the ISO/IEC 27001 standard.",
    keywords: "ISO 27001, Information Security Management System, ISMS, Annex A Controls, Security Certification",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/security-iso-27001",
    no_index: false,
    no_follow: false,
  },
  security_pci_dss: {
    page_key: "security_pci_dss",
    title: "PCI-DSS v4.0 Payment Architecture | Creed Tech",
    description:
      "Creed Tech architects client-side tokenization flows that isolate cardholder data and streamline PCI assessment scope across financial software applications.",
    keywords: "PCI DSS v4.0, Payment Card Security, Tokenization, FinTech Architecture, Secure Payment Gateways",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/security-pci-dss",
    no_index: false,
    no_follow: false,
  },
  security_gdpr: {
    page_key: "security_gdpr",
    title: "EU GDPR Regulation (EU) 2016/679 Privacy Architecture | Creed Tech",
    description:
      "Enacted by the European Parliament, the GDPR mandates sovereign privacy by design. Creed Tech provides structured Article 28 DPA templates and European sovereign cloud infrastructure.",
    keywords: "GDPR Compliance, EU Data Privacy, Sovereign Cloud, Data Processing Agreement, Article 28 DPA",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/security-gdpr",
    no_index: false,
    no_follow: false,
  },
  privacy_policy: {
    page_key: "privacy_policy",
    title: "Privacy Policy | Creed Tech",
    description:
      "Transparent principles governing how Creed Tech respects, processes, and secures information submitted through our website and engineering communication channels.",
    keywords: "Privacy Policy, Data Protection, User Privacy, Information Security, Creed Tech",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/privacy-policy",
    no_index: false,
    no_follow: false,
  },
  terms: {
    page_key: "terms",
    title: "Terms & Conditions | Creed Tech",
    description:
      "Please read these Terms and Conditions carefully before using Creed Tech's website, platforms, and online communication channels.",
    keywords: "Terms of Service, Terms and Conditions, Legal Agreement, Usage Policy, Creed Tech",
    og_image: "/images/hero-services-web-q90.webp",
    canonical_url: "https://creed-tech.com/terms",
    no_index: false,
    no_follow: false,
  },
};

