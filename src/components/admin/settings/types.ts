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

export interface HeaderNavLinkItem {
  id: string;
  label: string;
  url: string;
  openInNewTab?: boolean;
  enabled?: boolean;
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

export interface ServiceExplorerCardItem {
  id?: string;
  badge?: string;
  step?: string;
  title: string;
  desc: string;
}

export interface ServiceSubHeadings {
  services?: string;
  servicesDesc?: string;
  benefits?: string;
  benefitsDesc?: string;
  process?: string;
  processDesc?: string;
  results?: string;
  resultsDesc?: string;
}

export interface ServiceTechItem {
  name: string;
  iconUrl?: string;
}

export interface ServiceExplorerItem {
  id: string;
  num: string;
  name: string;
  tagline: string;
  intro: string;
  ctaHeading: string;
  ctaDesc: string;
  ctaBtnText: string;
  ctaBtnUrl?: string;
  overviewCards: ServiceExplorerCardItem[];
  servicesList?: ServiceExplorerCardItem[];
  benefitCards?: ServiceExplorerCardItem[];
  process?: ServiceExplorerCardItem[];
  resultCards?: ServiceExplorerCardItem[];
  subHeadings?: ServiceSubHeadings;
  techEcosystemTitle: string;
  techEcosystemSubtitle: string;
  techStack: string;
  techItems?: ServiceTechItem[];
}

export interface ServicesExplorerSettingsData {
  sectionHeadline: string;
  sectionDescription: string;
  services: ServiceExplorerItem[];
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
  headerLogoWidth: number;
  headerLogoHeight: number;
  headerNavLinks: HeaderNavLinkItem[];
  headerCtaText: string;
  headerCtaUrl: string;
  headerShowCta: boolean;
  footerP1: string;

  // Portfolio Page
  portfolioShowcase: PortfolioShowcaseSettings;
  portfolioProjects: PortfolioProjectItem[];

  // Contact Page Advanced
  contactSettings: ContactSettingsData;

  // About Page Advanced
  aboutSettings: AboutSettingsData;

  // Services Page Explorer Section
  servicesExplorer: ServicesExplorerSettingsData;
}

export const DEFAULT_HEADER_NAV_LINKS: HeaderNavLinkItem[] = [
  { id: "nav-1", label: "Home", url: "/", enabled: true },
  { id: "nav-2", label: "Services", url: "/services", enabled: true },
  { id: "nav-3", label: "Knowledge Center", url: "/knowledge-center", enabled: true },
  { id: "nav-4", label: "Portfolio", url: "/portfolio", enabled: true },
  { id: "nav-5", label: "About", url: "/about", enabled: true },
  { id: "nav-6", label: "Contact", url: "/contact", enabled: true },
];

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

  headerLogoUrl: "/images/logo.webp",
  headerLogoWidth: 130,
  headerLogoHeight: 36,
  headerNavLinks: DEFAULT_HEADER_NAV_LINKS,
  headerCtaText: "Get Started",
  headerCtaUrl: "/contact",
  headerShowCta: true,
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

  servicesExplorer: {
    sectionHeadline: "Enterprise Engineering & Digital Solutions",
    sectionDescription:
      "Select any service below to explore dedicated capabilities, technical benefits, delivery methodology, results, and Tech Ecosystem.",
    services: [
      {
        id: "software-development",
        num: "01",
        name: "Software Development",
        tagline: "Reliable Software Built Around Your Business",
        intro:
          "We design and develop secure scalable software solutions tailored to real business requirements. Our approach combines thoughtful architecture clean development practices and long-term maintainability to create software that remains dependable as your operations evolve.",
        ctaHeading: "Have a Software Project in Mind?",
        ctaDesc:
          "Share your requirements with our team and explore a practical development approach for your business.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "CUSTOM",
            title: "Business-Focused Solutions",
            desc: "Software designed around your workflows operational needs and long-term objectives.",
          },
          {
            badge: "SECURE",
            title: "Secure by Design",
            desc: "Authentication data protection access control and secure coding practices built into every development stage.",
          },
          {
            badge: "SCALABLE",
            title: "Growth-Ready Architecture",
            desc: "Flexible systems structured to support new features users integrations and changing business demands.",
          },
          {
            badge: "MAINTAINABLE",
            title: "Clean and Sustainable Code",
            desc: "Well-structured documented code that remains easier to test improve and support over time.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for Software Development solutions.",
        techStack: "JAVA, C#, PYTHON, C++, TYPESCRIPT, .NET, SPRING BOOT, GIT",
      },
      {
        id: "ui-ux-design",
        num: "02",
        name: "UI/UX Design",
        tagline: "Clear and User-Centered Digital Experiences",
        intro:
          "We create clean, intuitive, and conversion-focused user interfaces and user experiences grounded in real human behavior. From interactive design systems to high-fidelity prototypes, every screen is crafted for frictionless engagement and visual clarity.",
        ctaHeading: "Need an Intuitive Product Design?",
        ctaDesc:
          "Let our product design team create prototypes, wireframes, and design systems that users love.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "INTUITIVE",
            title: "Frictionless UX Workflows",
            desc: "User journeys mapped to eliminate cognitive friction and enhance task completion rates.",
          },
          {
            badge: "SYSTEMS",
            title: "Scalable Design Systems",
            desc: "Modular design tokens and atomic components engineered for consistency across web and mobile.",
          },
          {
            badge: "RESEARCH",
            title: "Evidence-Based Prototyping",
            desc: "Interactive prototypes validated against user testing, task analysis, and accessibility standards.",
          },
          {
            badge: "ACCESSIBILITY",
            title: "WCAG 2.1 AA Compliance",
            desc: "Inclusive color palettes, readable typography, and keyboard navigation baked into all layouts.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for UI/UX Design solutions.",
        techStack: "FIGMA, FIGJAM, ADOBE ILLUSTRATOR, ADOBE PHOTOSHOP, FRAMER, MAZE, MIRO, ZEPLIN",
      },
      {
        id: "mobile-application",
        num: "03",
        name: "Mobile Application",
        tagline: "Reliable Mobile Experiences for Modern Users",
        intro:
          "We build fluid, performant native and cross-platform mobile apps for iOS and Android. Engineered for smooth frame rates, offline-first reliability, and seamless API integrations.",
        ctaHeading: "Ready to Build Your Mobile App?",
        ctaDesc:
          "Consult with our mobile engineers to build iOS and Android applications with top-tier performance.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "CROSS-PLATFORM",
            title: "Single Codebase Efficiency",
            desc: "Accelerate time-to-market with React Native and Flutter without compromising native speed.",
          },
          {
            badge: "OFFLINE",
            title: "Offline-First Synchronization",
            desc: "Local data persistence and background sync ensuring continuous app usability anywhere.",
          },
          {
            badge: "SECURITY",
            title: "Hardware Keystore & Biometrics",
            desc: "Biometric authentication and encrypted local storage protecting sensitive client credentials.",
          },
          {
            badge: "PERFORMANCE",
            title: "60 FPS Fluid Interface",
            desc: "Optimized memory footprint, smooth animations, and rapid cold-start launch times.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for Mobile Application solutions.",
        techStack: "SWIFT, SWIFTUI, KOTLIN, JETPACK COMPOSE, DART, FLUTTER, REACT NATIVE",
      },
      {
        id: "cloud-infrastructure",
        num: "04",
        name: "Cloud Infrastructure",
        tagline: "Secure and Scalable Cloud Foundations",
        intro:
          "We architect robust, secure, and auto-scaling cloud architectures on AWS, Azure, and Google Cloud. Utilizing Infrastructure as Code (IaC), zero-trust security, and continuous deployment pipelines.",
        ctaHeading: "Scaling Cloud Infrastructure?",
        ctaDesc:
          "Architect high-availability Kubernetes clusters and automated CI/CD deployment pipelines.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "AUTOMATION",
            title: "Infrastructure as Code",
            desc: "Terraform and automated declarative configuration for reproducible multi-region deployments.",
          },
          {
            badge: "CONTAINERS",
            title: "Kubernetes Orchestration",
            desc: "High-density microservices orchestration with automated zero-downtime rolling updates.",
          },
          {
            badge: "OBSERVABILITY",
            title: "Full-Stack Telemetry",
            desc: "Prometheus metrics, Grafana dashboards, and centralized log alerting for 99.99% uptime.",
          },
          {
            badge: "SECURITY",
            title: "Zero-Trust Cloud Network",
            desc: "VPC peering, least-privilege IAM policies, and encrypted data-at-rest across all buckets.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for Cloud Infrastructure solutions.",
        techStack: "AMAZON WEB SERVICES, MICROSOFT AZURE, GOOGLE CLOUD, DOCKER, KUBERNETES, TERRAFORM, GITHUB ACTIONS, PROMETHEUS",
      },
      {
        id: "database-management",
        num: "05",
        name: "Database Management",
        tagline: "Reliable Data Systems for Business Applications",
        intro:
          "We design high-throughput relational and NoSQL database clusters optimized for sub-millisecond query execution, automated replication, failover, and bulletproof backups.",
        ctaHeading: "Optimizing Your Data Architecture?",
        ctaDesc:
          "Scale your PostgreSQL, MySQL, and distributed cache clusters for heavy enterprise concurrency.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "PERFORMANCE",
            title: "Query & Index Optimization",
            desc: "Execution plan analysis, index tuning, and connection pooling for maximum read/write speeds.",
          },
          {
            badge: "REPLICATION",
            title: "High-Availability Clustering",
            desc: "Active-passive read replicas and automated failover guarantees continuous data availability.",
          },
          {
            badge: "CACHING",
            title: "In-Memory Redis Layer",
            desc: "Sub-millisecond data retrieval and session caching reducing primary database load by up to 80%.",
          },
          {
            badge: "BACKUPS",
            title: "Automated Point-in-Time Recovery",
            desc: "Encrypted snapshot backups and continuous WAL archiving ensuring zero data loss SLAs.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for Database Management solutions.",
        techStack: "POSTGRESQL, MYSQL, MICROSOFT SQL SERVER, ORACLE DATABASE, MONGODB, REDIS, MARIADB, SQLITE",
      },
      {
        id: "web-development",
        num: "06",
        name: "Web Development",
        tagline: "Modern Websites Built for Real Business Needs",
        intro:
          "We engineer high-performance web platforms using modern Next.js, React, and serverless architectures. Built for rapid Core Web Vitals, enterprise SEO, and intuitive content administration.",
        ctaHeading: "Need a High-Performance Web Platform?",
        ctaDesc:
          "Launch full-stack web applications engineered for speed, SEO, and seamless user conversions.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "SPEED",
            title: "Instant Server Rendering",
            desc: "Next.js server-side rendering and static edge optimization delivering sub-second page loads.",
          },
          {
            badge: "RESPONSIVE",
            title: "Adaptive Mobile-First UI",
            desc: "Pixel-perfect interfaces optimized across ultra-wide desktops, tablets, and smartphones.",
          },
          {
            badge: "SEO",
            title: "Technical SEO Foundation",
            desc: "Automated schema markup, metadata tags, and semantic HTML for superior search engine rankings.",
          },
          {
            badge: "SCALABLE",
            title: "Modular Component System",
            desc: "Clean component hierarchy and typed APIs that empower rapid feature iterations over time.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for Web Development solutions.",
        techStack: "HTML5, CSS3, JAVASCRIPT, TYPESCRIPT, REACT, NEXT.JS, NODE.JS, WORDPRESS",
      },
      {
        id: "ai-automation",
        num: "07",
        name: "AI & Automation",
        tagline: "Practical Intelligence for Everyday Business Workflows",
        intro:
          "We integrate state-of-the-art Large Language Models (LLMs), autonomous agents, and workflow automations directly into existing ERP and CRM systems to streamline operational bottlenecks.",
        ctaHeading: "Ready to Automate with AI?",
        ctaDesc:
          "Deploy custom AI agents, document intelligence, and automated workflow pipelines in your operations.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "AGENTS",
            title: "Autonomous Agent Workflows",
            desc: "Multi-step AI agents that process complex data, summarize documents, and trigger API tasks.",
          },
          {
            badge: "RAG",
            title: "Enterprise Knowledge Retrieval",
            desc: "Vector search and Retrieval-Augmented Generation ground AI responses strictly in company data.",
          },
          {
            badge: "AUTOMATION",
            title: "No-Code & Low-Code Pipelines",
            desc: "Connect n8n, Power Automate, and custom webhooks to eliminate repetitive manual entry.",
          },
          {
            badge: "PRIVACY",
            title: "Private & Compliant Models",
            desc: "Enterprise data isolation and sovereign API integrations with strict confidentiality guards.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for AI & Automation solutions.",
        techStack: "OPENAI, GOOGLE GEMINI, ANTHROPIC CLAUDE, LANGCHAIN, HUGGING FACE, N8N, MICROSOFT POWER AUTOMATE, PYTHON",
      },
      {
        id: "digital-growth",
        num: "08",
        name: "Digital Growth",
        tagline: "Connected Strategies for Sustainable Online Growth",
        intro:
          "We combine data-driven conversion rate optimization, technical search engine optimization, and multi-channel paid acquisition to sustainably scale qualified inbound customer leads.",
        ctaHeading: "Ready to Accelerate Growth?",
        ctaDesc:
          "Formulate a data-driven growth strategy combining technical SEO, analytics, and targeted acquisition.",
        ctaBtnText: "Start Your Project",
        ctaBtnUrl: "/contact",
        overviewCards: [
          {
            badge: "ANALYTICS",
            title: "Conversion Funnel Tracking",
            desc: "Google Analytics 4 and event-level telemetry identifying friction points in buyer journeys.",
          },
          {
            badge: "ACQUISITION",
            title: "Precision Paid Campaigns",
            desc: "Google Ads and Meta Ads campaigns managed with algorithmic bidding for optimal CAC and ROAS.",
          },
          {
            badge: "VISIBILITY",
            title: "High-Intent Organic Rankings",
            desc: "Comprehensive keyword architecture and backlink analysis driving continuous qualified inbound traffic.",
          },
          {
            badge: "OPTIMIZATION",
            title: "Heatmap & Behavioral Insights",
            desc: "Hotjar heatmaps and user recordings informing data-backed iterative UX enhancements.",
          },
        ],
        techEcosystemTitle: "Tech Ecosystem",
        techEcosystemSubtitle:
          "Technologies and platforms used for Digital Growth solutions.",
        techStack: "GOOGLE ANALYTICS 4, GOOGLE SEARCH CONSOLE, GOOGLE ADS, META ADS, SEMRUSH, AHREFS, HUBSPOT, HOTJAR",
      },
    ],
  },
};
