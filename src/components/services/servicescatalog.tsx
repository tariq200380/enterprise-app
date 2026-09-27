import React from "react";
import Link from "next/link";

interface ServiceOffering {
  title: string;
  description: string;
}

interface ServiceDomain {
  id: string;
  num: string;
  badge: string;
  h2Title: string;
  summary: string;
  offerings: ServiceOffering[];
  techTags: string[];
}

const SERVICE_DOMAINS: ServiceDomain[] = [
  {
    id: "software-development",
    num: "01",
    badge: "CUSTOM ENGINEERING",
    h2Title: "Custom Software Development",
    summary:
      "Bespoke enterprise software applications engineered from the ground up for high concurrency, microservice maintainability, and domain-driven design.",
    offerings: [
      {
        title: "Enterprise Application Development",
        description: "Robust business applications handling complex workflows, role hierarchies, and multi-tenant architectures.",
      },
      {
        title: "Bespoke Software Architecture",
        description: "Custom-tailored software systems eliminating operational bottlenecks and aligning tightly with strategic goals.",
      },
      {
        title: "API Architecture & Microservices",
        description: "Low-latency REST and GraphQL microservices engineered with resilient fault-tolerance and automated circuit breakers.",
      },
      {
        title: "Legacy System Modernization",
        description: "De-monolithing legacy codebases into modern containerized architectures with zero business disruption.",
      },
    ],
    techTags: ["Java", "C# .NET", "Python", "Go", "TypeScript", "Spring Boot"],
  },
  {
    id: "cloud-infrastructure",
    num: "02",
    badge: "CLOUD & DEVOPS",
    h2Title: "Cloud Infrastructure & DevOps Modernization",
    summary:
      "Resilient, multi-region cloud architectures and automated continuous integration pipelines delivering 99.99% uptime SLAs.",
    offerings: [
      {
        title: "Multi-Region Kubernetes Architecture",
        description: "Elastic, automated container orchestration across AWS, Azure, and Google Cloud with self-healing clusters.",
      },
      {
        title: "Automated CI/CD Pipelines",
        description: "GitOps continuous integration and continuous deployment pipelines reducing deployment friction to minutes.",
      },
      {
        title: "Cloud Migration & Cost Optimization",
        description: "Strategic workload migrations, FinOps infrastructure right-sizing, and egress cost containment.",
      },
      {
        title: "99.99% Uptime SRE & SLA Management",
        description: "Proactive telemetry, Prometheus observability, and 24/7 site reliability engineering for mission-critical apps.",
      },
    ],
    techTags: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "ai",
    num: "03",
    badge: "AI & AUTOMATION",
    h2Title: "Artificial Intelligence (AI) & Autonomous Systems",
    summary:
      "Production-grade Large Language Model integrations, autonomous multi-agent pipelines, and proprietary semantic retrieval systems.",
    offerings: [
      {
        title: "Enterprise LLM & Agent Pipelines",
        description: "Context-aware LLM agents orchestrated to automate complex operational decisions and administrative processes.",
      },
      {
        title: "Private Retrieval-Augmented Generation (RAG)",
        description: "Secure, sovereign vector databases indexing enterprise IP without data leakage or third-party training risks.",
      },
      {
        title: "Custom Fine-Tuning & Model Evaluation",
        description: "Domain-specific fine-tuning on proprietary corpora with rigorous benchmark evals and hallucination guardrails.",
      },
      {
        title: "Autonomous Workflow Orchestration",
        description: "End-to-end automation connecting enterprise databases, CRMs, and APIs with self-correcting agentic workflows.",
      },
    ],
    techTags: ["OpenAI", "Claude", "Gemini", "LangChain", "Vector DBs", "n8n"],
  },
  {
    id: "database-management",
    num: "04",
    badge: "DATA ARCHITECTURE",
    h2Title: "High-Concurrency Database Management & Architecture",
    summary:
      "Scalable SQL and NoSQL database engineering structured for low-latency query throughput, transactional consistency, and data replication.",
    offerings: [
      {
        title: "Distributed SQL & NoSQL Architecture",
        description: "Engineered clustering and sharding strategies for high-frequency transactional data and massive read scale.",
      },
      {
        title: "Query Optimization & Performance Tuning",
        description: "Deep query plan inspection, index topology redesign, and memory-tier caching that reduce query latency by 80%+.",
      },
      {
        title: "High-Availability Replication & Failover",
        description: "Multi-zone active-active replication, automatic failover orchestration, and disaster recovery point objectives.",
      },
      {
        title: "Zero-Downtime Data Migration",
        description: "Battle-tested schema migrations and cross-cloud database transfers conducted without scheduled maintenance windows.",
      },
    ],
    techTags: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "CockroachDB"],
  },
  {
    id: "web-development",
    num: "05",
    badge: "WEB APPLICATIONS",
    h2Title: "Web Application Engineering",
    summary:
      "High-throughput, performant web applications built with modern frontend frameworks, server-side rendering, and responsive desktop-mobile architectures.",
    offerings: [
      {
        title: "Full-Stack Next.js & React Applications",
        description: "Server-side rendered enterprise portals and PWAs engineered for extreme interactivity and blazing speed.",
      },
      {
        title: "High-Throughput API Gateway Integration",
        description: "Seamless orchestration between client applications, edge microservices, and third-party enterprise platforms.",
      },
      {
        title: "Performance & Core Web Vitals Optimization",
        description: "Sub-second LCP, 0 CLS, and instant INP scores guaranteeing top-tier organic search and user conversion rates.",
      },
      {
        title: "Enterprise CMS & Custom Portals",
        description: "Bespoke, secure content systems and authenticated client hubs designed with granular permission structures.",
      },
    ],
    techTags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
  },
  {
    id: "ui-ux",
    num: "06",
    badge: "PRODUCT DESIGN",
    h2Title: "UI/UX Design & User Experience Workflows",
    summary:
      "Data-informed product design systems, user journey optimization, and accessible interface architectures that elevate enterprise brand credibility.",
    offerings: [
      {
        title: "Design Systems & Component Libraries",
        description: "Comprehensive Figma design token architectures guaranteeing pixel-perfect engineering consistency across devices.",
      },
      {
        title: "Interactive Figma Prototyping",
        description: "High-fidelity clickable user flows and validation prototypes tested against real enterprise stakeholder requirements.",
      },
      {
        title: "User Research & Usability Testing",
        description: "Empirical heuristic evaluations and session analysis identifying UX friction points and conversion drop-offs.",
      },
      {
        title: "Accessibility (WCAG 2.1 AA) Compliance",
        description: "Color contrast, keyboard navigation, and screen reader compatibility certified to global accessibility standards.",
      },
    ],
    techTags: ["Figma", "FigJam", "Adobe Suite", "Miro", "Maze", "Design Tokens"],
  },
  {
    id: "cybersecurity",
    num: "07",
    badge: "SECURITY & QA",
    h2Title: "Cybersecurity, QA & Penetration Testing",
    summary:
      "Zero-trust cryptographic security architectures, rigorous automated vulnerability auditing, and comprehensive quality assurance testing suites.",
    offerings: [
      {
        title: "Zero-Trust Architecture & Threat Modeling",
        description: "Least-privilege network isolation, end-to-end encryption at rest and in transit, and robust identity policies.",
      },
      {
        title: "Automated Vulnerability & Pentest Auditing",
        description: "Simulated adversary red-teaming, dependency CVE scanning, and code-level static analysis (SAST/DAST).",
      },
      {
        title: "SOC2, ISO 27001 & Compliance Scoping",
        description: "Architectural alignment with sovereign privacy regulations, HIPAA, SOC2 Type II, and ISO security frameworks.",
      },
      {
        title: "End-to-End QA Automation & Security Gate",
        description: "Automated regression pipelines, load testing, and integration quality gates blocking regressions before release.",
      },
    ],
    techTags: ["Zero-Trust", "Penetration Testing", "SOC2", "ISO 27001", "OWASP", "Playwright"],
  },
  {
    id: "marketing",
    num: "08",
    badge: "DIGITAL GROWTH",
    h2Title: "Digital Marketing & Technical Growth Strategy",
    summary:
      "Engineering-driven search engine optimization, programmatic technical visibility, and data-backed enterprise conversion funnels.",
    offerings: [
      {
        title: "Technical Enterprise SEO & Crawl Optimization",
        description: "Structured JSON-LD data, canonical graph management, SSR hydration audits, and XML sitemap orchestration.",
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description: "Empirical multivariate testing and UX friction reductions that transform organic traffic into qualified enterprise leads.",
      },
      {
        title: "Multi-Channel Attribution & Analytics",
        description: "Server-side Google Analytics 4, Tag Manager pipelines, and privacy-compliant conversion tracking.",
      },
      {
        title: "B2B Lead Generation Funnels",
        description: "Targeted outbound content strategies and search intent marketing engineered for high-value enterprise contracts.",
      },
    ],
    techTags: ["Technical SEO", "GA4", "Search Console", "SEMrush", "Ahrefs", "HubSpot"],
  },
  {
    id: "mobile-applications",
    num: "09",
    badge: "MOBILE ENGINEERING",
    h2Title: "Mobile Application Engineering (iOS & Android)",
    summary:
      "Native and cross-platform mobile apps engineered for fluid 60fps performance, hardware acceleration, offline persistence, and biometric security.",
    offerings: [
      {
        title: "Native iOS (Swift) & Android (Kotlin)",
        description: "Platform-native mobile experiences leveraging device hardware, background sync, and native OS notification frameworks.",
      },
      {
        title: "Cross-Platform Flutter & React Native",
        description: "Single-codebase mobile applications delivering native-feel user interfaces across iOS and Android ecosystems.",
      },
      {
        title: "Offline-First Sync & Biometric Security",
        description: "Local SQLite/Realm persistence, cryptographic keychain encryption, and seamless background database sync.",
      },
      {
        title: "App Store Deployment & MDM Distribution",
        description: "Automated TestFlight pipelines, Google Play release tracks, and enterprise Mobile Device Management distribution.",
      },
    ],
    techTags: ["Swift", "Kotlin", "Flutter", "React Native", "SwiftUI", "Jetpack Compose"],
  },
];

export default function ServicesCatalog() {
  return (
    <section id="services-catalog" className="w-full bg-white py-14 sm:py-16 md:py-20 border-b border-[#E2E8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] text-[11.5px] font-bold uppercase tracking-wider mb-3.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>ENTERPRISE SERVICE DOMAINS</span>
          </div>
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A] tracking-tight leading-[1.15] mb-3">
            Core Technology &amp; Software Engineering Disciplines
          </h2>
          <p className="text-base sm:text-lg text-[#5B6472] font-normal leading-relaxed">
            Nine specialized engineering domains delivering scalable architectures, resilient cloud foundations, and mission-critical SLAs.
          </p>
        </div>

        {/* 9 Service Domain Cards - Multi-column at md: (768px+) per AGENTS.md rule */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICE_DOMAINS.map((domain) => (
            <article
              key={domain.id}
              id={domain.id}
              className="scroll-mt-24 bg-[#F8F9FA] hover:bg-white border border-[#E2E8F0] hover:border-[#0052FF] rounded-2xl p-6 sm:p-7 flex flex-col shadow-xs hover:shadow-lg transition-all duration-300 group relative"
            >
              {/* Top Accent Gradient on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card Meta Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold tracking-wider text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded uppercase">
                  {domain.badge}
                </span>
                <span className="font-outfit text-xs font-bold text-[#FF6B00] tracking-widest">
                  SERVICE {domain.num}
                </span>
              </div>

              {/* Semantic H2 Heading */}
              <h2 className="font-outfit font-bold text-xl sm:text-2xl text-[#0F172A] group-hover:text-[#0052FF] tracking-tight leading-snug mb-3 transition-colors">
                {domain.h2Title}
              </h2>

              {/* Summary Description */}
              <p className="text-sm sm:text-[15px] text-[#5B6472] leading-relaxed mb-5 font-normal">
                {domain.summary}
              </p>

              {/* Sub-features / Offerings with Semantic H3 tags */}
              <div className="mt-auto space-y-3 pt-4 border-t border-[#E2E8F0]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] block mb-2">
                  Specialized Capabilities:
                </span>
                <ul className="space-y-2.5">
                  {domain.offerings.map((offering, idx) => (
                    <li key={idx} className="flex flex-col">
                      <div className="flex items-start gap-2">
                        <span className="text-[#0052FF] font-bold text-xs mt-0.5">&bull;</span>
                        <h3 className="font-outfit font-semibold text-sm text-[#1E293B] leading-tight">
                          {offering.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#64748B] pl-3.5 mt-0.5 leading-normal">
                        {offering.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#E2E8F0]/70">
                {domain.techTags.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium text-[#475569] bg-white border border-[#CBD5E1] px-2 py-0.5 rounded shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Link to Contact / Consultation */}
              <div className="mt-5 pt-2 flex items-center justify-between">
                <Link
                  href="/contact"
                  aria-label={`Schedule a consultation for ${domain.h2Title}`}
                  className="text-xs font-semibold text-[#0052FF] group-hover:text-[#003DC0] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Schedule Consultation</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </Link>
                <Link
                  href="#what-we-provide"
                  aria-label={`Explore interactive technical details for ${domain.h2Title}`}
                  className="text-xs text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  Deep Specs &darr;
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
