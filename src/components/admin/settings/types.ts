export interface AnnouncementItem {
  id: string;
  badge: string;
  text: string;
  linkText: string;
  linkUrl: string;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
}

export interface PartnerLogoItem {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface HomeServiceItem {
  id: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  iconKey: string;
  customIconUrl?: string;
}

export interface PortfolioProjectItem {
  id: string;
  coverImageUrl: string;
  category: string;
  clientNameLocation: string;
  imageBadgeTag: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  metric1Value: string;
  metric1Label: string;
  metric2Value: string;
  metric2Label: string;
  metric3Value: string;
  metric3Label: string;
  techStack: string;
}

export interface PortfolioShowcaseSettings {
  headline: string;
  showcasePictureUrl: string;
  badgeLabel: string;
  overlayMetricTitle: string;
  description: string;
}

export interface ContactOnboardingStepItem {
  id: string;
  number: string;
  headline: string;
  timelineSla: string;
  explanation: string;
}

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactGlobalHubItem {
  id: string;
  countryCity: string;
  timezone: string;
  address: string;
}

export interface ContactSettingsData {
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  metric3Label: string;
  metric3Value: string;

  discoveryBadge: string;
  discoveryTitle: string;
  discoveryDescription: string;
  discoveryBookingEmail: string;
  officialInquiriesEmail: string;
  telemetryPhone: string;
  whatsAppDisplay: string;
  whatsAppLinkUrl: string;

  stepsBadge: string;
  stepsTitle: string;
  stepsDescription: string;
  onboardingSteps: ContactOnboardingStepItem[];
  // FAQs
  faqs: ContactFaqItem[];

  // Global Hubs
  hubsTitle: string;
  globalHubs: ContactGlobalHubItem[];

  rfpBannerTitle: string;
  rfpBannerDescription: string;
  rfpButtonText: string;
  rfpTargetEmail: string;
}

export interface AboutEngineeringHubItem {
  id: string;
  city: string;
  country: string;
  coverImageUrl: string;
  statusTag: string;
  specialization: string;
  address: string;
}

export interface AboutLeadershipMemberItem {
  id: string;
  name: string;
  role: string;
  portraitUrl: string;
  badgeTag: string;
  bio: string;
  quote: string;
  ctaText: string;
  ctaUrl: string;
}

export interface AboutSettingsData {
  hubsBadgeTag: string;
  hubsHeadline: string;
  hubsDescription: string;
  hubs: AboutEngineeringHubItem[];

  leadershipBadgeTag: string;
  leadershipHeadline: string;
  leadershipDescription: string;
  leadership: AboutLeadershipMemberItem[];
}

export interface WebsiteSettingsData {
  // Global & Branding
  siteName: string;
  siteTagline: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;

  // Announcements
  showAnnouncement: boolean;
  announcements: AnnouncementItem[];

  // Footer & Social
  copyrightText: string;
  socialLinks: SocialLinkItem[];

  // Home page Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroCta1Text: string;
  heroCta1Url: string;
  heroCta2Text: string;
  heroCta2Url: string;

  // Home Page Partners & Services
  partnerLogos: PartnerLogoItem[];
  servicesHeadline: string;
  servicesDescription: string;
  homeServices: HomeServiceItem[];

  // About Page
  aboutMission: string;
  aboutVision: string;
  statEngineers: string;
  statHubs: string;
  statUptime: string;
  statSystems: string;

  // Contact Page
  contactHeroBadge: string;
  contactHeroTitle: string;
  contactHeroDesc: string;

  // Header & Footer Additional
  headerLogoUrl: string;
  headerCtaText: string;
  headerCtaUrl: string;
  footerP1: string;

  // Portfolio Page
  portfolioShowcase: PortfolioShowcaseSettings;
  portfolioProjects: PortfolioProjectItem[];

  // Contact Page Advanced
  contactSettings: ContactSettingsData;

  // About Page Advanced
  aboutSettings: AboutSettingsData;
}

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettingsData = {
  siteName: "Creed Tech",
  siteTagline: "Enterprise AI & Cloud Engineering",
  contactEmail: "info@creed-tech.com",
  contactPhone: "+92 309 8307115",
  officeAddress: "Office # 02, Main Shopping\nCenter Sheikhupura.",

  showAnnouncement: true,
  announcements: [
    {
      id: "1",
      badge: "LIVE",
      text: "Designing practical and intuitive user experiences for web and mobile.",
      linkText: "Explore Services",
      linkUrl: "/services",
    },
  ],

  copyrightText: "© 2026 Creed Tech. All rights reserved.",
  socialLinks: [
    { id: "1", platform: "Facebook", url: "https://facebook.com/creedtechnology" },
    { id: "2", platform: "Instagram", url: "https://instagram.com/creed.technologiess" },
    { id: "3", platform: "LinkedIn", url: "https://linkedin.com/company/creedtech" },
    { id: "4", platform: "Pinterest", url: "https://pinterest.com/creedtech" },
    { id: "5", platform: "X (Twitter)", url: "https://x.com/CreedtechHq" },
    { id: "6", platform: "GitHub", url: "https://github.com/creed-tech" },
  ],

  heroHeadline: "Engineering Scalable Enterprise Systems & High-Velocity AI Products",
  heroSubheadline: "We design, architect, and deploy production-grade software solutions, high-throughput cloud platforms, and frontier AI systems for ambitious enterprises globally.",
  heroCta1Text: "Get Started",
  heroCta1Url: "/contact",
  heroCta2Text: "Explore Services",
  heroCta2Url: "/services",

  partnerLogos: [
    {
      id: "partner-1",
      name: "Clutch",
      logoUrl: "/images/partners/clutch.webp",
      websiteUrl: "https://clutch.co",
    },
    {
      id: "partner-2",
      name: "Google",
      logoUrl: "/images/partners/google.webp",
      websiteUrl: "https://www.google.com",
    },
    {
      id: "partner-3",
      name: "The Manifest",
      logoUrl: "/images/partners/the-manifest.webp",
      websiteUrl: "https://themanifest.com",
    },
    {
      id: "partner-4",
      name: "Shopify",
      logoUrl: "/images/partners/shopify.webp",
      websiteUrl: "https://www.shopify.com",
    },
    {
      id: "partner-5",
      name: "Trustpilot",
      logoUrl: "/images/partners/trustpilot.webp",
      websiteUrl: "https://www.trustpilot.com",
    },
  ],

  servicesHeadline: "What We Provide",
  servicesDescription:
    "Eight specialized engineering domains tailored for mission-critical enterprise scale, cloud modernization, and high availability.",
  homeServices: [
    {
      id: "service-1",
      title: "Software Development",
      description:
        "Custom web and mobile applications engineered for reliability, built with modern maintainable architecture.",
      linkText: "Learn more",
      linkUrl: "/services#software-development",
      iconKey: "code",
    },
    {
      id: "service-2",
      title: "UI/UX Design",
      description:
        "Interfaces designed around real user workflows, not just visual polish. Streamlined, accessible, and high-converting.",
      linkText: "Learn more",
      linkUrl: "/services#ui-ux",
      iconKey: "design",
    },
    {
      id: "service-3",
      title: "Mobile Applications",
      description:
        "High-performance iOS and Android applications crafted for native speed and intuitive mobile gestures.",
      linkText: "Learn more",
      linkUrl: "/services#mobile-applications",
      iconKey: "mobile",
    },
    {
      id: "service-4",
      title: "Cloud Infrastructure",
      description:
        "Provisioning, CI/CD automated deployment, and hardening for infrastructure that scales with traffic.",
      linkText: "Learn more",
      linkUrl: "/services#cloud-infrastructure",
      iconKey: "cloud",
    },
    {
      id: "service-5",
      title: "Database Management",
      description:
        "Schema design, migrations, and ongoing management for high-concurrency relational and NoSQL databases.",
      linkText: "Learn more",
      linkUrl: "/services#database-management",
      iconKey: "database",
    },
    {
      id: "service-6",
      title: "Cybersecurity & QA",
      description:
        "Security audits, automated test suites, and compliance checks to keep your systems protected.",
      linkText: "Learn more",
      linkUrl: "/services#cybersecurity",
      iconKey: "security",
    },
    {
      id: "service-7",
      title: "Artificial Intelligence (AI)",
      description:
        "Private on-premise LLM fine-tuning, dense vector embeddings, and autonomous AI agent orchestration.",
      linkText: "Learn more",
      linkUrl: "/services#ai",
      iconKey: "ai",
    },
    {
      id: "service-8",
      title: "Digital Marketing & Branding",
      description:
        "Strategic tech product positioning, high-conversion CRO landing pages, and enterprise search visibility.",
      linkText: "Learn more",
      linkUrl: "/services#marketing",
      iconKey: "marketing",
    },
  ],

  aboutMission: "To engineer uncompromising digital infrastructure and autonomous intelligence engines that give ambitious enterprises sovereign technological advantage.",
  aboutVision: "A globally synchronized cognitive enterprise network operating at microsecond latencies.",
  statEngineers: "120+",
  statHubs: "18",
  statUptime: "99.999%",
  statSystems: "450+",

  contactHeroBadge: "GLOBAL ENGAGEMENT",
  contactHeroTitle: "Initiate High-Impact Collaboration",
  contactHeroDesc: "Connect with our technical architects and mission-critical deployment leads worldwide.",

  headerLogoUrl: "",
  headerCtaText: "Schedule Consultation",
  headerCtaUrl: "/contact",
  footerP1: "Pioneering high-assurance cognitive cloud infrastructure for enterprises.",

  portfolioShowcase: {
    headline: "Built on Rigorous Enterprise Standards",
    showcasePictureUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    badgeLabel: "ENGINEERING CULTURE",
    overlayMetricTitle: "100% Principal Engineer Led",
    description: "Every case study in our portfolio is the direct outcome of disciplined architectural principles, continuous automated verification, and zero-compromise security controls.",
  },

  portfolioProjects: [
    {
      id: "case-01",
      coverImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
      category: "Fintech & Banking Rails",
      clientNameLocation: "Apex Global Settlement Rail • United Kingdom",
      imageBadgeTag: "Fintech & Banking",
      title: "Next-Gen Multi-Region High-Frequency Payment Processing Engine",
      description: "Engineered an ultra-low latency transaction clearing engine capable of processing 120,000 TPS with sub-10ms latency and zero transactional data loss.",
      challenge: "Architected an ultra-low latency payment orchestration layer with zero single point of failure.",
      solution: "Deployed Go microservices with distributed CockroachDB across multi-region AWS cloud clusters.",
      metric1Value: "120k TPS",
      metric1Label: "Throughput Speed",
      metric2Value: "-85%",
      metric2Label: "Latency Drop",
      metric3Value: "99.999%",
      metric3Label: "Uptime SLA",
      techStack: "Go, Kubernetes, CockroachDB, Kafka, AWS GovCloud, Redis",
    },
    {
      id: "case-02",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      category: "Private LLM Orchestration",
      clientNameLocation: "Cognitive Health Analytics • United States",
      imageBadgeTag: "AI & Machine Learning",
      title: "Enterprise Neural Copilot & Multi-Agent Document Intelligence",
      description: "Deployed private on-premise LLMs and dense vector search to automate compliance extraction across 15M+ medical unstructured diagnostic records.",
      challenge: "Processing millions of unstructured medical documents with strict HIPAA compliance without sending data to third-party APIs.",
      solution: "Built containerized private LLM inference cluster with LangChain and Pinecone vector database.",
      metric1Value: "88%",
      metric1Label: "Audit Time Saved",
      metric2Value: "99.4%",
      metric2Label: "Extraction Accuracy",
      metric3Value: "100% On-Prem",
      metric3Label: "Zero Data Leakage",
      techStack: "Python, PyTorch, Pinecone, LangChain, FastAPI, Docker",
    },
    {
      id: "case-03",
      coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
      category: "Cloud Infrastructure & DevOps",
      clientNameLocation: "Nexus Global Logistics • Germany",
      imageBadgeTag: "Cloud & DevOps",
      title: "Zero-Trust Multi-Cloud Kubernetes Infrastructure & GitOps Mesh",
      description: "Architected an IoT edge-ingestion pipeline and automated GitOps mesh processing real-time telemetry from 45,000+ freight systems across Europe.",
      challenge: "Massive distributed telemetry data causing frequent network bottlenecks and manual deployment drift.",
      solution: "Automated GitOps pipeline using ArgoCD and Istio service mesh across hybrid AWS and Azure environments.",
      metric1Value: "14x Daily",
      metric1Label: "Deploy Frequency",
      metric2Value: "-42%",
      metric2Label: "Compute Cost",
      metric3Value: "< 2 Mins",
      metric3Label: "Recovery Time",
      techStack: "Terraform, Kubernetes, Istio, ArgoCD, Azure, Prometheus",
    },
    {
      id: "case-04",
      coverImageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
      category: "Cybersecurity & Governance",
      clientNameLocation: "VaultSafe InsurTech • Switzerland",
      imageBadgeTag: "Cybersecurity",
      title: "Automated SOC 2 Compliance Logging & Cryptographic Shield",
      description: "Built continuous security telemetry and automated cryptographic vulnerability mitigation meeting strict ISO 27001 and SOC 2 Type II controls.",
      challenge: "Ensuring real-time cryptographic audit logging without adding perceptible latency to financial transactions.",
      solution: "Implemented eBPF kernel-level event monitoring with HashiCorp Vault secrets management.",
      metric1Value: "100% Pass",
      metric1Label: "Security Audit",
      metric2Value: "< 30 Sec",
      metric2Label: "Threat Response",
      metric3Value: "50M+",
      metric3Label: "Encrypted Records",
      techStack: "HashiCorp Vault, eBPF, Wazuh, Go, GCP, PostgreSQL",
    },
    {
      id: "case-05",
      coverImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
      category: "Enterprise Engineering",
      clientNameLocation: "Global Enterprise Partner",
      imageBadgeTag: "Engineering",
      title: "High-Concurrency Enterprise Platform Architecture & Automated CI/CD",
      description: "Engineered high-concurrency cloud platform with automated CI/CD and zero-trust security controls.",
      challenge: "Legacy monolithic system unable to handle spike traffic and slow manual release cycles.",
      solution: "Containerized modern cloud native architecture with auto-scaling Kubernetes cluster and CI/CD pipelines.",
      metric1Value: "10x",
      metric1Label: "Velocity Boost",
      metric2Value: "99.99%",
      metric2Label: "Uptime SLA",
      metric3Value: "0 Defect",
      metric3Label: "Code SLA",
      techStack: "Go, Kubernetes, Docker, PostgreSQL, AWS",
    },
  ],

  contactSettings: {
    heroBadge: "DIRECT ARCHITECT ACCESS • 4-HOUR GUARANTEED SLA",
    heroHeadline: "Let's Build Something Enduring Together",
    heroDescription:
      "Connect directly with senior systems architects and technical leaders. Whether you need an end-to-end enterprise platform, sovereign AI pipelines, or dedicated engineering pods — we are ready.",
    metric1Label: "Average Response",
    metric1Value: "< 2.4 Hours",
    metric2Label: "NDA & IP Protection",
    metric2Value: "Signed Day 1",
    metric3Label: "Verified Ratings",
    metric3Value: "5.0 Clutch & Google",

    discoveryBadge: "⚡ INSTANT DISCOVERY",
    discoveryTitle: "Need a Direct Architectural Call?",
    discoveryDescription:
      "Skip the form and schedule a 30-minute discovery call directly with one of our Principal Systems Architects.",
    discoveryBookingEmail: "contact@creed-tech.com",
    officialInquiriesEmail: "contact@creed-tech.com",
    telemetryPhone: "+1 (415) 890-4820",
    whatsAppDisplay: "+1 (415) 890-4820",
    whatsAppLinkUrl: "https://wa.me/14158904820",

    stepsBadge: "EXECUTION CERTAINTY",
    stepsTitle: "What Happens After You Reach Out?",
    stepsDescription:
      "Our deterministic 4-stage onboarding model eliminates ambiguity and ensures rapid engineering ramp-up.",
    onboardingSteps: [
      {
        id: "step-1",
        number: "01",
        headline: "Architectural Review",
        timelineSla: "Within 4 Hours",
        explanation:
          "Our systems architects evaluate your scope, stack constraints, and timeline feasibility within 4 hours.",
      },
      {
        id: "step-2",
        number: "02",
        headline: "NDA & Security Clearance",
        timelineSla: "Day 1 Priority",
        explanation:
          "We sign enterprise bilateral NDAs and establish sovereign data handling protocols to protect your IP.",
      },
      {
        id: "step-3",
        number: "03",
        headline: "Technical Discovery Call",
        timelineSla: "Day 2 - 3",
        explanation:
          "A 45-minute deep-dive with your engineering leads to align on API schemas, sprint cadence, and architecture.",
      },
      {
        id: "step-4",
        number: "04",
        headline: "Sprint Deployment",
        timelineSla: "Ready within 3-7 Days",
        explanation:
          "Dedicated pods integrate with your Git workflows, Slack/Jira channels, and commence milestone sprints.",
      },
    ],

    faqs: [
      {
        id: "faq-1",
        question: "How quickly can your senior engineering pods be deployed?",
        answer:
          "Following our initial technical scoping session and mutual NDA execution, our specialized pods can integrate with your repository and sprint ceremonies within 3 to 7 business days.",
      },
      {
        id: "faq-2",
        question: "How is our intellectual property (IP) and data privacy protected?",
        answer:
          "All intellectual property, proprietary algorithms, and code artifacts belong 100% to your organization from day one. We sign bilateral enterprise NDAs and enforce SOC 2 Type II and GDPR-compliant sovereign sandboxes.",
      },
      {
        id: "faq-3",
        question: "What engagement models do you offer for projects?",
        answer:
          "We provide two core engagement models: Dedicated Engineering Pods (integrated full-stack teams with fixed monthly sprints) and Milestone-Based Fixed-Scope Projects with guaranteed deliverables and deterministic timelines.",
      },
      {
        id: "faq-4",
        question: "Which time zones do your global engineering centers support?",
        answer:
          "With specialized centers in Germany (Frankfurt), Spain (Madrid), and the USA (San Francisco), we provide 24/7 follow-the-sun coverage with seamless real-time overlap across US East/West, UK, and European business hours.",
      },
      {
        id: "faq-5",
        question: "Can you modernize existing legacy systems or do you only build greenfield apps?",
        answer:
          "We specialize in both. Our systems architects frequently perform zero-downtime database migrations, monolith-to-microservices decoupling, and automated CI/CD pipeline modernization alongside new greenfield product builds.",
      },
    ],

    hubsTitle: "Three Global Engineering Hubs",
    globalHubs: [
      {
        id: "hub-1",
        countryCity: "🇩🇪 Frankfurt, Germany",
        timezone: "CET (UTC+1)",
        address: "Taunusanlage 8, Financial Centre, Frankfurt",
      },
      {
        id: "hub-2",
        countryCity: "🇪🇸 Madrid, Spain",
        timezone: "CET (UTC+1)",
        address: "Paseo de la Castellana 95, Madrid",
      },
      {
        id: "hub-3",
        countryCity: "🇺🇸 San Francisco, USA",
        timezone: "PST (UTC-8)",
        address: "500 Howard Street, SoMa Tech District, SF",
      },
    ],

    rfpBannerTitle: "Prefer direct enterprise correspondence?",
    rfpBannerDescription:
      "Send your RFP, architecture specs, or tender documents directly to our senior leadership inbox at projects@creed-tech.com.",
    rfpButtonText: "Email RFP / Architecture Docs",
    rfpTargetEmail: "projects@creed-tech.com",
  },

  aboutSettings: {
    hubsBadgeTag: "GLOBAL REACH & CONTINUOUS COVERAGE",
    hubsHeadline: "Three Specialized Global Engineering Centers",
    hubsDescription:
      "Operating across multiple time zones to deliver seamless 24/7 technical continuity and deep regional domain expertise.",
    hubs: [
      {
        id: "hub-01",
        city: "Frankfurt",
        country: "Germany",
        coverImageUrl:
          "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80",
        statusTag: "Active Regional Engineering Pod",
        specialization: "European Cloud Infrastructure & Cyber Defense",
        address: "Taunusanlage 8, Financial Centre, Frankfurt",
      },
      {
        id: "hub-02",
        city: "Madrid",
        country: "Spain",
        coverImageUrl:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80",
        statusTag: "Active Regional Engineering Pod",
        specialization: "Mobile Engineering & Digital Innovation Lab",
        address: "Paseo de la Castellana 95, Madrid",
      },
      {
        id: "hub-03",
        city: "San Francisco",
        country: "United States",
        coverImageUrl:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=80",
        statusTag: "Active Regional Engineering Pod",
        specialization: "AI Research, Neural Systems & Cloud Labs",
        address: "500 Howard Street, SoMa Tech District, San Francisco",
      },
    ],

    leadershipBadgeTag: "THE PEOPLE BEHIND THE CODE",
    leadershipHeadline: "Executive Leadership & Technical Custodians",
    leadershipDescription:
      "Meet the founders and principal architects who guide our engineering vision and mentor our senior pods across 3 global centers.",
    leadership: [
      {
        id: "leader-01",
        name: "Alexander Wright",
        role: "Founder & Chief Executive Officer",
        portraitUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        badgeTag: "Senior Systems Architect",
        bio: "Founded Creed Tech in 2023 with the conviction that next-generation enterprise software should be built with mathematical precision, neural scalability, and uncompromising craftsmanship.",
        quote:
          "We don't build software to sell and walk away. We build digital infrastructure that companies run their entire future on.",
        ctaText: "Connect with Alexander →",
        ctaUrl: "/contact",
      },
      {
        id: "leader-02",
        name: "Dr. Elena Rostova",
        role: "Chief Technology Officer",
        portraitUrl:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
        badgeTag: "Ph.D. Neural Computing",
        bio: "Directs our research in private enterprise LLMs and distributed vector streaming. Champion of vendor-neutral open cloud architecture.",
        quote:
          "The best engineering is invisible—it performs flawlessly under maximum load without ever asking for praise.",
        ctaText: "Connect with Elena →",
        ctaUrl: "/contact",
      },
      {
        id: "leader-03",
        name: "Marcus Vance",
        role: "Head of Global Security & Governance",
        portraitUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        badgeTag: "Ex-Defense Cryptographer",
        bio: "Oversees zero-trust architectures, sovereign data privacy, and SOC 2 Type II governance across all client engagements.",
        quote:
          "In high-stakes systems, trust is not a promise; it is mathematically verified cryptography.",
        ctaText: "Connect with Marcus →",
        ctaUrl: "/contact",
      },
      {
        id: "leader-04",
        name: "Sarah Jenkins",
        role: "VP of Global Client Engineering",
        portraitUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
        badgeTag: "14+ Yrs Agile Delivery",
        bio: "Directs our dedicated senior engineering pods across 3 global centers, guaranteeing milestone velocity, zero-defect releases, and continuous client alignment.",
        quote:
          "Engineering maturity is not just about writing code; it is about delivering business outcomes with absolute predictability.",
        ctaText: "Connect with Sarah →",
        ctaUrl: "/contact",
      },
    ],
  },
};
