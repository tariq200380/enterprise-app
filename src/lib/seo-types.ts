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
    title: "Enterprise Software & Cloud Engineering Services | Creed Tech",
    description:
      "Explore Creed Tech's end-to-end technology services: custom enterprise software, cloud infrastructure, autonomous AI agents, database architecture, and cybersecurity audits.",
    keywords:
      "enterprise software development, cloud infrastructure, AI solutions, LLM integration, database management, cybersecurity audit, web applications, mobile app development, Creed Tech services",
    og_image: "/images/og-services.webp",
    canonical_url: "https://creed-tech.com/services",
    no_index: false,
    no_follow: false,
  },
  portfolio: {
    page_key: "portfolio",
    title: "Client Case Studies & Software Portfolio | Creed Tech",
    description:
      "Discover Creed Tech's proven enterprise delivery track record. Explore case studies in cloud architecture, custom web systems, mobile apps, and AI solutions.",
    keywords:
      "software portfolio, enterprise case studies, cloud modernization projects, AI case studies, custom web development portfolio, mobile app showcase, Creed Tech projects",
    og_image: "/images/og-portfolio.webp",
    canonical_url: "https://creed-tech.com/portfolio",
    no_index: false,
    no_follow: false,
  },
  knowledge_center: {
    page_key: "knowledge_center",
    title: "Enterprise Tech Insights & Architecture Blueprints | Creed Tech",
    description:
      "Explore deep technical whitepapers, architectural blueprints, database migration guides, and enterprise software engineering insights from Creed Tech.",
    keywords:
      "software engineering blog, cloud architecture blueprints, database migration checklist, enterprise software scaling, tech insights, Creed Tech knowledge center",
    og_image: "https://creed-tech.com/images/og-knowledge-center.webp",
    canonical_url: "https://creed-tech.com/knowledge-center",
    no_index: false,
    no_follow: false,
  },
  "knowledge-center": {
    page_key: "knowledge-center",
    title: "Enterprise Tech Insights & Architecture Blueprints | Creed Tech",
    description:
      "Explore deep technical whitepapers, architectural blueprints, database migration guides, and enterprise software engineering insights from Creed Tech.",
    keywords:
      "software engineering blog, cloud architecture blueprints, database migration checklist, enterprise software scaling, tech insights, Creed Tech knowledge center",
    og_image: "https://creed-tech.com/images/og-knowledge-center.webp",
    canonical_url: "https://creed-tech.com/knowledge-center",
    no_index: false,
    no_follow: false,
  },
  about: {
    page_key: "about",
    title: "About Creed Tech | Enterprise Software & Cloud Specialists",
    description:
      "Learn about Creed Tech: our mission, dedicated senior engineering pods, enterprise cloud standards, zero-trust security practices, and proven track record.",
    keywords:
      "about Creed Tech, enterprise software engineers, cloud architects, dedicated engineering pods, software delivery methodology, IT consulting company",
    og_image: "/images/og-about.webp",
    canonical_url: "https://creed-tech.com/about",
    no_index: false,
    no_follow: false,
  },
  contact: {
    page_key: "contact",
    title: "Contact Creed Tech | Enterprise Software & Cloud Engineering Consultation",
    description:
      "Get in touch with Creed Tech's senior engineering team. Schedule an architectural consultation for custom software, cloud infrastructure, AI, or cybersecurity.",
    keywords:
      "contact Creed Tech, hire enterprise engineers, software consultation, cloud architecture inquiry, IT consulting Pakistan, hire dedicated software pods",
    og_image: "/images/og-contact.webp",
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
    title: "Enterprise Security Architecture & Compliance Standards | Creed Tech",
    description:
      "Review Creed Tech's zero-trust security architecture, SOC 2 compliance, cryptographic encryption, infrastructure hardening, and ISO 27001 certified protocols.",
    keywords:
      "enterprise cybersecurity, zero trust architecture, SOC 2 compliance, ISO 27001 IT firm, data encryption standards, cloud security posture, Creed Tech security",
    og_image: "/images/og-security.webp",
    canonical_url: "https://creed-tech.com/security",
    no_index: false,
    no_follow: false,
  },
  security_soc_2: {
    page_key: "security_soc_2",
    title: "SOC 2 Type II Compliance & Trust Principles | Creed Tech",
    description:
      "Review Creed Tech's SOC 2 Type II security posture, AICPA trust services criteria, continuous automated compliance monitoring, and audit telemetry.",
    keywords:
      "SOC 2 compliance, SOC 2 Type II report, AICPA trust services criteria, cloud security audit, enterprise SOC 2 IT firm, Creed Tech SOC 2",
    og_image: "/images/og-security.webp",
    canonical_url: "https://creed-tech.com/security-soc-2",
    no_index: false,
    no_follow: false,
  },
  security_iso_27001: {
    page_key: "security_iso_27001",
    title: "ISO/IEC 27001 Compliance & ISMS Architecture | Creed Tech",
    description:
      "Explore Creed Tech's ISO/IEC 27001 alignment, information security management system (ISMS), risk mitigation protocols, and cloud governance frameworks.",
    keywords:
      "ISO 27001 compliance, ISMS certification, information security management, enterprise cloud governance, ISO 27001 IT company, Creed Tech security compliance",
    og_image: "/images/og-security.webp",
    canonical_url: "https://creed-tech.com/security-iso-27001",
    no_index: false,
    no_follow: false,
  },
  security_pci_dss: {
    page_key: "security_pci_dss",
    title: "PCI-DSS Compliance & Payment Data Security | Creed Tech",
    description:
      "Learn how Creed Tech engineers PCI-DSS compliant software architecture, tokenized payment processing, secure cardholder enclaves, and cryptographic controls.",
    keywords:
      "PCI-DSS compliance, payment card industry security, tokenized payments, cardholder data environment CDE, secure payment gateway engineering, Creed Tech PCI-DSS",
    og_image: "/images/og-security.webp",
    canonical_url: "https://creed-tech.com/security-pci-dss",
    no_index: false,
    no_follow: false,
  },
  security_gdpr: {
    page_key: "security_gdpr",
    title: "GDPR Compliance & EU Data Protection Standards | Creed Tech",
    description:
      "Discover Creed Tech's GDPR compliance framework, EU data residency protocols, Data Processing Agreements (DPA), and standard contractual clauses.",
    keywords:
      "GDPR compliance, EU data protection, Data Processing Agreement DPA, GDPR software firm, Standard Contractual Clauses SCC, Creed Tech GDPR",
    og_image: "/images/og-security.webp",
    canonical_url: "https://creed-tech.com/security-gdpr",
    no_index: false,
    no_follow: false,
  },
  privacy_policy: {
    page_key: "privacy_policy",
    title: "Privacy Policy & Data Protection Standards | Creed Tech",
    description:
      "Review Creed Tech's enterprise privacy policy, GDPR compliance protocols, cryptographic data encryption standards, and client data protection practices.",
    keywords:
      "Creed Tech privacy policy, enterprise data protection, GDPR compliance IT, client data confidentiality, secure software engineering privacy",
    og_image: "/images/og-home.webp",
    canonical_url: "https://creed-tech.com/privacy-policy",
    no_index: false,
    no_follow: false,
  },
  terms: {
    page_key: "terms",
    title: "Terms of Service & Enterprise Master Agreement | Creed Tech",
    description:
      "Review Creed Tech's enterprise master service agreement, intellectual property terms, SLA frameworks, and client engagement conditions.",
    keywords:
      "Creed Tech terms of service, enterprise software agreement, IT service level agreement, intellectual property terms, engineering master agreement",
    og_image: "/images/og-home.webp",
    canonical_url: "https://creed-tech.com/terms",
    no_index: false,
    no_follow: false,
  },
};

