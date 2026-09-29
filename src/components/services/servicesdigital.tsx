"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ServicesExplorerSettingsData, ServiceTechItem } from "@/components/admin/settings/types";
import { ORDERED_SVCS, SVCS, TECH_ICONS, ORDERED_SUBTABS, type SubTabId, type ServiceDetail } from "./servicesData";

interface Props {
  data?: ServicesExplorerSettingsData;
}

/* ========================================================================= */
/* COMPLETE CYBERSECURITY & QA SERVICE DATA                                  */
/* Full 5-tab data model for domain 07 (Cybersecurity & QA Testing)           */
/* ========================================================================= */
const CYBERSECURITY_DATA: ServiceDetail = {
  num: "07",
  announcement: "Zero-trust architectures, automated penetration testing, and continuous compliance verification.",
  name: "Cybersecurity, QA & Penetration Testing",
  tagline: "Bank-Grade Security Architecture & Comprehensive QA Testing",
  intro:
    "We defend enterprise applications, cloud infrastructure, and sensitive data with end-to-end security audits, automated penetration testing, and zero-trust access controls.",
  subHeadings: {
    services: "Cybersecurity, QA & Compliance Services",
    servicesDesc:
      "From vulnerability assessments to SOC2 readiness and automated CI/CD security gates, we fortify enterprise digital perimeters.",
    benefits: "Benefits of Enterprise Cybersecurity & QA",
    benefitsDesc:
      "Mitigate attack vectors, ensure uninterrupted regulatory compliance, and deliver software with zero regression confidence.",
    process: "Security & QA Audit Process",
    processDesc:
      "A phase-gated methodology covering threat reconnaissance, penetration testing, automated quality controls, and verification.",
    results: "Security Impact & Performance",
    resultsDesc:
      "Quantifiable risk reduction, 100% compliance audit readiness, and rapid vulnerability remediation SLAs.",
  },
  cta: {
    heading: "Protect Your Enterprise Digital Assets",
    desc: "Schedule a comprehensive vulnerability assessment and security architecture review with our cybersecurity specialists.",
    btn: "Schedule Security Audit",
  },
  overview: [
    {
      badge: "ZERO-TRUST",
      title: "Zero-Trust Architecture",
      desc: "Micro-segmentation, identity-aware proxies, and least-privilege access policies across all services.",
    },
    {
      badge: "PEN-TESTING",
      title: "Penetration Testing & Red Teaming",
      desc: "Simulated adversary attacks identifying deep business logic flaws, API vulnerabilities, and data leakage.",
    },
    {
      badge: "COMPLIANCE",
      title: "Compliance & Governance",
      desc: "Pre-audit readiness and architectural alignment for SOC2 Type II, ISO 27001, HIPAA, and GDPR.",
    },
    {
      badge: "AUTOMATION",
      title: "Automated QA Quality Gates",
      desc: "Continuous regression suites, automated SAST/DAST scans, and load testing integrated directly into CI/CD.",
    },
  ],
  servicesList: [
    {
      title: "Zero-Trust Architecture & Threat Modeling",
      desc: "Granular perimeter defense, mutual TLS, and threat modeling built directly into software design.",
    },
    {
      title: "Automated Penetration Testing & Vulnerability Audits",
      desc: "Continuous automated scanning paired with expert manual exploits across web, mobile, and API surfaces.",
    },
    {
      title: "Regulatory Compliance Frameworks (SOC2, ISO 27001)",
      desc: "Evidence automation, gap assessments, and remediation roadmaps for enterprise regulatory certification.",
    },
    {
      title: "End-to-End QA Automation & Security Gates",
      desc: "Playwright, Cypress, and Jest automated suites blocking defects and vulnerabilities before deployment.",
    },
    {
      title: "Cloud Security Posture Management (CSPM)",
      desc: "Real-time misconfiguration detection and IAM policy hardening across AWS, GCP, and Azure.",
    },
    {
      title: "Incident Response & Forensics Readiness",
      desc: "Tabletop exercise protocols, automated anomaly detection, and tamper-proof audit log streaming.",
    },
  ],
  benefitCards: [
    {
      title: "Eliminate Critical Vulnerabilities",
      desc: "Proactive vulnerability remediation preventing costly data breaches, ransomware, and downtime.",
    },
    {
      title: "Accelerated Audit Readiness",
      desc: "Streamlined compliance evidence collection reducing audit preparation cycles from months to days.",
    },
    {
      title: "Zero Defect Release Velocity",
      desc: "Automated test suites catching regressions early, enabling high-frequency deployments with confidence.",
    },
    {
      title: "Cryptographic IP Protection",
      desc: "End-to-end data encryption at rest and in transit protecting proprietary algorithms and customer records.",
    },
    {
      title: "Customer & Enterprise Trust",
      desc: "Demonstrate verified security posture to enterprise procurement teams, closing deals faster.",
    },
    {
      title: "Lower Total Cost of Ownership",
      desc: "Catching architectural flaws early prevents exponentially more expensive emergency hotfixes post-launch.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Attack Surface Reconnaissance",
      desc: "Mapping public endpoints, infrastructure topology, third-party libraries, and threat vectors.",
    },
    {
      step: "02",
      title: "Vulnerability & Threat Modeling",
      desc: "Cataloging potential exploit paths, STRIDE threat analysis, and automated SAST/DAST scans.",
    },
    {
      step: "03",
      title: "Manual Penetration Testing",
      desc: "Simulating targeted attacks against business logic, authentication flows, and data boundaries.",
    },
    {
      step: "04",
      title: "Remediation & Quality Automation",
      desc: "Implementing hardened configurations, code fixes, and automated test regression gates.",
    },
    {
      step: "05",
      title: "Verification & Continuous Monitoring",
      desc: "Re-testing vulnerabilities, issuing compliance verification reports, and setting up observability.",
    },
  ],
  resultCards: [
    {
      title: "100% Audit Readiness",
      desc: "Guaranteed compliance alignment for SOC2 Type II, ISO 27001, and HIPAA frameworks.",
    },
    {
      title: "85% Reduction in Regressions",
      desc: "Automated test pipelines eliminating production defects and breaking changes.",
    },
    {
      title: "<1hr Patch SLAs",
      desc: "Documented rapid-response vulnerability containment workflows.",
    },
    {
      title: "Zero Data Leak Incidents",
      desc: "Cryptographic data isolation verified across multi-tenant enterprise environments.",
    },
    {
      title: "99.99% Pipeline Reliability",
      desc: "Resilient automated test suites with zero flaky test failures slowing releases.",
    },
    {
      title: "Bank-Grade SLA Compliance",
      desc: "Adherence to sovereign data residency and enterprise privacy regulations.",
    },
  ],
  techStack: [
    "Zero-Trust",
    "OWASP",
    "Burp Suite",
    "Playwright",
    "SonarQube",
    "Snyk",
    "Terraform",
    "Kubernetes",
    "Docker",
    "PostgreSQL",
  ],
};

/* ========================================================================= */
/* CANONICAL ENTERPRISE SERVICES SPECIFICATION                               */
/* Adheres to technical SEO keyword targets and deep-link anchor IDs          */
/* ========================================================================= */
export interface CanonicalServiceDef {
  id: string;
  canonicalId: string;
  num: string;
  badge: string;
  shortName: string;
  h2Title: string;
  fallbackKey: keyof typeof SVCS | "cybersecurity";
}

export const CANONICAL_SERVICES: CanonicalServiceDef[] = [
  {
    id: "software-development",
    canonicalId: "software-development",
    num: "01",
    badge: "CUSTOM ENGINEERING",
    shortName: "Software Dev",
    h2Title: "Custom Software Development",
    fallbackKey: "software-development",
  },
  {
    id: "cloud-infrastructure",
    canonicalId: "cloud-infrastructure",
    num: "02",
    badge: "CLOUD & DEVOPS",
    shortName: "Cloud & DevOps",
    h2Title: "Cloud Infrastructure & DevOps Modernization",
    fallbackKey: "cloud-infrastructure",
  },
  {
    id: "ai",
    canonicalId: "ai",
    num: "03",
    badge: "AI & AUTOMATION",
    shortName: "AI & Automation",
    h2Title: "Artificial Intelligence (AI) & Autonomous Systems",
    fallbackKey: "ai-automation",
  },
  {
    id: "database-management",
    canonicalId: "database-management",
    num: "04",
    badge: "DATA ARCHITECTURE",
    shortName: "Database Arch",
    h2Title: "High-Concurrency Database Management & Architecture",
    fallbackKey: "database-management",
  },
  {
    id: "web-development",
    canonicalId: "web-development",
    num: "05",
    badge: "WEB APPLICATIONS",
    shortName: "Web Apps",
    h2Title: "Web Application Engineering",
    fallbackKey: "web-development",
  },
  {
    id: "ui-ux",
    canonicalId: "ui-ux",
    num: "06",
    badge: "PRODUCT DESIGN",
    shortName: "UI/UX Design",
    h2Title: "UI/UX Design & User Experience Workflows",
    fallbackKey: "ui-ux-design",
  },
  {
    id: "cybersecurity",
    canonicalId: "cybersecurity",
    num: "07",
    badge: "SECURITY & QA",
    shortName: "Cybersecurity & QA",
    h2Title: "Cybersecurity, QA & Penetration Testing",
    fallbackKey: "cybersecurity",
  },
  {
    id: "marketing",
    canonicalId: "marketing",
    num: "08",
    badge: "DIGITAL GROWTH",
    shortName: "Digital Growth",
    h2Title: "Digital Marketing & Technical Growth Strategy",
    fallbackKey: "digital-growth",
  },
  {
    id: "mobile-applications",
    canonicalId: "mobile-applications",
    num: "09",
    badge: "MOBILE ENGINEERING",
    shortName: "Mobile Apps",
    h2Title: "Mobile Application Engineering (iOS & Android)",
    fallbackKey: "mobile-application",
  },
];

/* ========================================================================= */
/* HELPER: SERVICE SELECTOR ICONS                                           */
/* Renders the distinct SVG icon for each of the 9 enterprise domains       */
/* ========================================================================= */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "software-development": (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  "cloud-infrastructure": (
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  ),
  "ai": (
    <>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  "ai-automation": (
    <>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  "database-management": (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  "web-development": (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  "ui-ux": (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  "ui-ux-design": (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  "cybersecurity": (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
  "marketing": (
    <>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </>
  ),
  "digital-growth": (
    <>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </>
  ),
  "mobile-applications": (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
  "mobile-application": (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
};

function ServiceIcon({ id }: { id: string }) {
  const iconPaths = SERVICE_ICONS[id] || (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  );

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      {iconPaths}
    </svg>
  );
}

/* ========================================================================= */
/* HELPER: CHEVRON NAVIGATION ICONS                                         */
/* ========================================================================= */
function ChevronIcon({ dir, className = "w-5 h-5" }: { dir: "prev" | "next"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points={dir === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

/* ========================================================================= */
/* HELPER: FEATURE CARDS GRID (SERVICES & BENEFITS SUBTABS)                 */
/* Implements semantic <h3> headings for sub-features                        */
/* ========================================================================= */
function FeatureCardGrid({
  items,
  keyPrefix,
}: {
  items: { title: string; desc: string }[];
  keyPrefix: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {items.map((item, idx) => (
        <div
          key={`${keyPrefix}-${idx}`}
          style={{ animationDelay: `${idx * 40}ms` }}
          className="bg-[#F7F6F5] border border-[#E2E8F0] hover:border-[#CBD5E1] active:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 active:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] active:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out animate-card-enter cursor-default touch-manipulation"
        >
          <div className="flex items-start gap-4 mb-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <h3 className="font-outfit font-bold text-[18px] text-[#1A1A1A] tracking-tight leading-snug m-0">
              {item.title}
            </h3>
          </div>
          <p className="text-[15px] text-[#5B6472] leading-relaxed pl-10 m-0 font-normal">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ServicesDigital({ data }: Props) {
  const [activeSvcId, setActiveSvcId] = useState<string>("software-development");
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>("overview");

  // Sync active service tab when page hash changes (e.g. /services#cloud-infrastructure or /services#ai)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (!hash) return;

      const HASH_MAP: Record<string, string> = {
        "software-development": "software-development",
        "cloud-infrastructure": "cloud-infrastructure",
        "ai": "ai",
        "ai-automation": "ai",
        "database-management": "database-management",
        "web-development": "web-development",
        "ui-ux": "ui-ux",
        "ui-ux-design": "ui-ux",
        "cybersecurity": "cybersecurity",
        "marketing": "marketing",
        "digital-growth": "marketing",
        "mobile-applications": "mobile-applications",
        "mobile-application": "mobile-applications",
      };

      if (HASH_MAP[hash]) {
        setActiveSvcId(HASH_MAP[hash]);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Resolve available services list ensuring all 9 canonical domains are always present
  const availableServices = CANONICAL_SERVICES.map((c) => {
    // Check if custom data from DB exists for this service
    const matchingCustom = data?.services?.find(
      (s) =>
        s.id === c.id ||
        s.id === c.canonicalId ||
        (c.id === "ai" && s.id === "ai-automation") ||
        (c.id === "ui-ux" && s.id === "ui-ux-design") ||
        (c.id === "marketing" && s.id === "digital-growth") ||
        (c.id === "mobile-applications" && s.id === "mobile-application")
    );

    return {
      id: c.canonicalId,
      canonicalId: c.canonicalId,
      dbId: matchingCustom?.id || c.id,
      num: matchingCustom?.num || c.num,
      name: matchingCustom?.name || c.shortName,
      badge: c.badge,
      h2Title: c.h2Title,
      fallbackKey: c.fallbackKey,
    };
  });

  // Active service resolved data
  const currentCanonical =
    availableServices.find((s) => s.canonicalId === activeSvcId || s.id === activeSvcId) ||
    availableServices[0];

  const customSvc = data?.services?.find(
    (s) =>
      s.id === currentCanonical.canonicalId ||
      s.id === currentCanonical.dbId ||
      (currentCanonical.canonicalId === "ai" && s.id === "ai-automation") ||
      (currentCanonical.canonicalId === "ui-ux" && s.id === "ui-ux-design") ||
      (currentCanonical.canonicalId === "marketing" && s.id === "digital-growth") ||
      (currentCanonical.canonicalId === "mobile-applications" && s.id === "mobile-application")
  );

  const staticSvc: ServiceDetail =
    currentCanonical.fallbackKey === "cybersecurity"
      ? CYBERSECURITY_DATA
      : SVCS[currentCanonical.fallbackKey as keyof typeof SVCS] || SVCS["software-development"];

  const svc = {
    ...staticSvc,
    num: customSvc?.num || currentCanonical.num,
    name: customSvc?.name || currentCanonical.h2Title,
    tagline: customSvc?.tagline || staticSvc.tagline,
    intro: customSvc?.intro || staticSvc.intro,
    cta: {
      heading: customSvc?.ctaHeading || staticSvc.cta.heading,
      desc: customSvc?.ctaDesc || staticSvc.cta.desc,
      btn: customSvc?.ctaBtnText || staticSvc.cta.btn,
      link: customSvc?.ctaBtnUrl || "/contact",
    },
    overview: customSvc?.overviewCards?.length ? customSvc.overviewCards : staticSvc.overview,
    servicesList: customSvc?.servicesList?.length ? customSvc.servicesList : staticSvc.servicesList || [],
    benefitCards: customSvc?.benefitCards?.length ? customSvc.benefitCards : staticSvc.benefitCards || [],
    process: customSvc?.process?.length ? customSvc.process : staticSvc.process || [],
    resultCards: customSvc?.resultCards?.length ? customSvc.resultCards : staticSvc.resultCards || [],
    subHeadings: {
      services: customSvc?.subHeadings?.services || staticSvc.subHeadings?.services || "Comprehensive Service Offerings",
      servicesDesc: customSvc?.subHeadings?.servicesDesc || staticSvc.subHeadings?.servicesDesc || "",
      benefits: customSvc?.subHeadings?.benefits || staticSvc.subHeadings?.benefits || "Tangible Business Value & Benefits",
      benefitsDesc: customSvc?.subHeadings?.benefitsDesc || staticSvc.subHeadings?.benefitsDesc || "",
      process: customSvc?.subHeadings?.process || staticSvc.subHeadings?.process || "Execution Methodology & Roadmap",
      processDesc: customSvc?.subHeadings?.processDesc || staticSvc.subHeadings?.processDesc || "",
      results: customSvc?.subHeadings?.results || staticSvc.subHeadings?.results || "Documented Impact & Performance Metrics",
      resultsDesc: customSvc?.subHeadings?.resultsDesc || staticSvc.subHeadings?.resultsDesc || "",
    },
    techItems:
      customSvc?.techItems?.length
        ? customSvc.techItems
        : staticSvc.techStack.map((name) => ({ name })),
    techEcosystemTitle: customSvc?.techEcosystemTitle || "Tech Ecosystem",
    techEcosystemSubtitle:
      customSvc?.techEcosystemSubtitle ||
      `Technologies and platforms used for ${customSvc?.name || currentCanonical.h2Title} solutions.`,
  };

  // Header and descriptions based on active subtab
  const subTabHeaderMap: Record<Exclude<SubTabId, "overview">, { title: string; desc: string }> = {
    services: { title: svc.subHeadings.services, desc: svc.subHeadings.servicesDesc },
    benefits: { title: svc.subHeadings.benefits, desc: svc.subHeadings.benefitsDesc },
    process: { title: svc.subHeadings.process, desc: svc.subHeadings.processDesc },
    proven: { title: svc.subHeadings.results, desc: svc.subHeadings.resultsDesc },
  };

  const isOverview = activeSubTab === "overview";
  const paneTitle = isOverview ? currentCanonical.h2Title : subTabHeaderMap[activeSubTab].title;
  const paneSubtitle = isOverview ? (svc.tagline || "") : "";
  const paneDesc = isOverview ? (svc.intro || "") : subTabHeaderMap[activeSubTab].desc;

  // Navigation indices
  const activeSvcIndex = Math.max(0, availableServices.findIndex((s) => s.canonicalId === activeSvcId));
  const activeSubTabIndex = Math.max(0, ORDERED_SUBTABS.findIndex((t) => t.id === activeSubTab));

  const handleNavigateService = (dir: "prev" | "next") => {
    const nextIdx = dir === "next" ? activeSvcIndex + 1 : activeSvcIndex - 1;
    if (nextIdx >= 0 && nextIdx < availableServices.length) {
      setActiveSvcId(availableServices[nextIdx].canonicalId);
      setActiveSubTab("overview");
    }
  };

  const handleNavigateSubTab = (dir: "prev" | "next") => {
    const nextIdx = dir === "next" ? activeSubTabIndex + 1 : activeSubTabIndex - 1;
    if (nextIdx >= 0 && nextIdx < ORDERED_SUBTABS.length) {
      setActiveSubTab(ORDERED_SUBTABS[nextIdx].id);
    }
  };

  return (
    <section id="what-we-provide" className="relative w-full py-12 lg:py-16 bg-[#F7F6F5] border-b border-[#E2E8F0] overflow-hidden scroll-mt-24">
      {/* Background blueprint grid pattern overlay - Pure Tailwind CSS */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,rgba(0,82,255,0.7)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,82,255,0.7)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Semantic Directory for Search Engines (SSR Crawlers) & Screen Readers */}
      <div className="sr-only">
        <section id="semantic-services-index" aria-label="Creed Tech Enterprise Services Directory">
          <article id="seo-software-development">
            <h2>Custom Software Development</h2>
            <p>Bespoke enterprise applications, scalable microservices, and robust API architectures tailored for business workflows.</p>
            <h3>Enterprise Application Development</h3>
            <h3>Bespoke Software Architecture</h3>
            <h3>API Architecture &amp; Microservices</h3>
            <h3>Legacy System Modernization</h3>
          </article>
          <article id="seo-cloud-infrastructure">
            <h2>Cloud Infrastructure &amp; DevOps Modernization</h2>
            <p>Multi-region cloud architecture, Kubernetes containerization, automated CI/CD pipelines, and 99.99% uptime infrastructure management.</p>
            <h3>Multi-Region Kubernetes Architecture</h3>
            <h3>Automated CI/CD Pipelines</h3>
            <h3>Cloud Migration &amp; Cost Optimization</h3>
            <h3>99.99% Uptime SRE &amp; SLA Management</h3>
          </article>
          <article id="seo-ai">
            <h2>Artificial Intelligence (AI) &amp; Autonomous Systems</h2>
            <p>Enterprise LLM integration, autonomous AI agent pipelines, private retrieval-augmented generation (RAG), and machine learning workflows.</p>
            <h3>Enterprise LLM &amp; Agent Pipelines</h3>
            <h3>Private Retrieval-Augmented Generation (RAG)</h3>
            <h3>Custom Fine-Tuning &amp; Model Evaluation</h3>
            <h3>Autonomous Workflow Orchestration</h3>
          </article>
          <article id="seo-database-management">
            <h2>High-Concurrency Database Management &amp; Architecture</h2>
            <p>Distributed database tuning, query optimization, high-availability replication, and zero-downtime data migration.</p>
            <h3>Distributed SQL &amp; NoSQL Architecture</h3>
            <h3>Query Optimization &amp; Performance Tuning</h3>
            <h3>High-Availability Replication &amp; Failover</h3>
            <h3>Zero-Downtime Data Migration</h3>
          </article>
          <article id="seo-web-development">
            <h2>Web Application Engineering</h2>
            <p>High-performance enterprise web applications built with modern frameworks, sub-second load times, and bank-grade security standards.</p>
            <h3>Full-Stack Next.js &amp; React Applications</h3>
            <h3>High-Throughput API Gateway Integration</h3>
            <h3>Performance &amp; Core Web Vitals Optimization</h3>
            <h3>Enterprise CMS &amp; Custom Portals</h3>
          </article>
          <article id="seo-ui-ux">
            <h2>UI/UX Design &amp; User Experience Workflows</h2>
            <p>Enterprise design systems, interactive Figma prototypes, accessible user journeys, and customer portal interface design.</p>
            <h3>Design Systems &amp; Component Libraries</h3>
            <h3>Interactive Figma Prototyping</h3>
            <h3>User Research &amp; Usability Testing</h3>
            <h3>Accessibility (WCAG 2.1 AA) Compliance</h3>
          </article>
          <article id="seo-cybersecurity">
            <h2>Cybersecurity, QA &amp; Penetration Testing</h2>
            <p>Comprehensive security audits, vulnerability scanning, SOC2/ISO compliance reviews, and automated QA regression pipelines.</p>
            <h3>Zero-Trust Architecture &amp; Threat Modeling</h3>
            <h3>Automated Penetration Testing &amp; Vulnerability Audits</h3>
            <h3>Regulatory Compliance (SOC2, ISO 27001, HIPAA)</h3>
            <h3>End-to-End QA Automation &amp; Security Gates</h3>
          </article>
          <article id="seo-marketing">
            <h2>Digital Marketing &amp; Technical Growth Strategy</h2>
            <p>Data-driven B2B digital growth, technical search engine optimization (SEO), conversion rate optimization, and enterprise marketing analytics.</p>
            <h3>Technical Enterprise SEO &amp; Crawl Optimization</h3>
            <h3>Conversion Rate Optimization (CRO)</h3>
            <h3>Multi-Channel Attribution &amp; Analytics</h3>
            <h3>B2B Lead Generation Funnels</h3>
          </article>
          <article id="seo-mobile-applications">
            <h2>Mobile Application Engineering (iOS &amp; Android)</h2>
            <p>Cross-platform and native mobile apps built with Swift, Kotlin, Flutter, and React Native for seamless mobile enterprise workflows.</p>
            <h3>Native iOS &amp; Android Engineering</h3>
            <h3>Cross-Platform Mobile Apps (Flutter &amp; React Native)</h3>
            <h3>Enterprise Mobility &amp; Offline Sync</h3>
            <h3>App Store Optimization &amp; Release Pipelines</h3>
          </article>
        </section>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-[52rem] mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] text-[11.5px] font-bold uppercase tracking-wider mb-3.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            <span>ENTERPRISE SERVICE CAPABILITIES</span>
          </div>
          <p className="font-outfit font-bold tracking-tight text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-2">
            {data?.sectionHeadline || "Enterprise Engineering & Digital Solutions"}
          </p>
          <p className="text-[15px] sm:text-[16px] text-[#5B6472] leading-relaxed font-normal m-0">
            {data?.sectionDescription || "Select any service below to explore dedicated capabilities, technical benefits, delivery methodology, results, and Tech Ecosystem."}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: TOP HORIZONTAL SERVICE SELECTOR BAR                            */}
        {/* Renders all 9 enterprise domains with explicit anchor IDs & scroll offset */}
        {/* Multi-column at md: (768px+) per AGENTS.md desktop layout standards        */}
        {/* ========================================================================= */}
        <div className="relative w-full mb-8">
          {/* Mobile 1-Item Carousel (< md) */}
          <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] gap-2 items-center md:hidden w-full">
            <button
              type="button"
              onClick={() => handleNavigateService("prev")}
              disabled={activeSvcIndex === 0}
              aria-label="Previous service"
              className={`w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.15)] transition-all ${
                activeSvcIndex === 0 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              <ChevronIcon dir="prev" />
            </button>

            <div
              key={`m-${currentCanonical.canonicalId}`}
              className="relative bg-white border-2 border-[#0052FF] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2.5 shadow-[0_10px_24px_-4px_rgba(0,82,255,0.22)] h-[160px] animate-header-enter"
            >
              <div className="absolute top-0 left-[18%] right-[18%] h-[3.5px] rounded-b-[4px] bg-[#FF6B00]" />
              <div className="w-[46px] h-[46px] rounded-xl bg-[#0052FF] text-white flex items-center justify-center shadow-sm">
                <ServiceIcon id={currentCanonical.canonicalId} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] leading-none mb-1">
                  SERVICE {currentCanonical.num}
                </span>
                <span className="text-[16px] font-bold text-[#0052FF] leading-snug">
                  {currentCanonical.name}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleNavigateService("next")}
              disabled={activeSvcIndex === availableServices.length - 1}
              aria-label="Next service"
              className={`w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_4px_14px_rgba(15,23,42,0.15)] transition-all ${
                activeSvcIndex === availableServices.length - 1 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              <ChevronIcon dir="next" />
            </button>
          </div>

          {/* Desktop & Tablet 9-Column Grid (>= md) per AGENTS.md */}
          <div className="hidden md:grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-2.5 w-full" role="tablist">
            {availableServices.map((serviceItem) => {
              const id = serviceItem.canonicalId;
              const isActive = id === activeSvcId;
              return (
                <button
                  key={id}
                  id={id}
                  type="button"
                  onClick={() => {
                    setActiveSvcId(id);
                    setActiveSubTab("overview");
                  }}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Explore ${serviceItem.h2Title}`}
                  className={`group relative bg-white rounded-xl py-3 px-1.5 flex flex-col items-center text-center gap-1.5 cursor-pointer outline-none transition-all duration-300 ease-out active:scale-95 scroll-mt-20 ${
                    isActive
                      ? "border-2 border-[#0052FF] shadow-[0_12px_28px_-4px_rgba(0,82,255,0.25)] -translate-y-1.5"
                      : "border border-[#E2E8F0] shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:border-[#0052FF] hover:shadow-[0_10px_24px_-4px_rgba(15,23,42,0.1)]"
                  }`}
                >
                  {/* Anchor alias target for legacy or alternate links */}
                  {serviceItem.dbId !== serviceItem.canonicalId && (
                    <span id={serviceItem.dbId} className="scroll-mt-20 absolute top-0" aria-hidden="true" />
                  )}

                  {/* Top Orange Accent */}
                  <div
                    className={`absolute top-0 left-[18%] right-[18%] h-[3.5px] rounded-b-[4px] transition-all duration-300 ${
                      isActive ? "bg-[#FF6B00] opacity-100 scale-x-100" : "bg-transparent opacity-0 scale-x-50"
                    }`}
                  />

                  {/* Icon Box */}
                  <div
                    className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center transition-all duration-300 ease-out ${
                      isActive
                        ? "bg-[#0052FF] border border-[#0052FF] text-white shadow-sm scale-105"
                        : "bg-[#FFF3EB] border border-[#FFE4D3] text-[#FF6B00] group-hover:border-[#FFB787] group-hover:scale-105"
                    }`}
                  >
                    <ServiceIcon id={id} />
                  </div>

                  {/* Number & Name */}
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-bold text-[#FF6B00] tracking-[0.04em] leading-none mb-0.5">
                      {serviceItem.num}
                    </span>
                    <span
                      className={`text-[12px] leading-tight transition-colors duration-200 line-clamp-2 ${
                        isActive ? "font-bold text-[#0052FF]" : "font-semibold text-[#0F172A] group-hover:text-[#0052FF]"
                      }`}
                    >
                      {serviceItem.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-COLUMN STICKY LAYOUT (SIDEBAR + MAIN CONTENT PANE) */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[270px_1fr] gap-6 mb-8 items-start">
          
          {/* ========================================================================= */}
          {/* SECTION 2: LEFT COLUMN - SERVICE SIDEBAR & SUBTABS NAVIGATION             */}
          {/* Renders active service title, 5 subtabs buttons menu, and sticky CTA card */}
          {/* ========================================================================= */}
          <aside className="w-full">
            <div className="relative flex flex-col gap-6 lg:sticky lg:top-[90px]">
              {/* Navigation Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
                <div
                  key={`sb-head-${activeSvcId}`}
                  className="pb-4 mb-4 border-b border-[#E2E8F0] animate-header-enter"
                >
                  <span className="text-[12px] font-bold text-[#FF6B00] tracking-[0.04em] block mb-1 leading-none">
                    SERVICE {currentCanonical.num}
                  </span>
                  <p className="font-outfit font-bold text-[19px] text-[#1A1A1A] tracking-tight leading-tight m-0">
                    {currentCanonical.name}
                  </p>
                </div>

                {/* Mobile Subtabs Carousel (< md) */}
                <div className="grid grid-cols-[38px_minmax(0,1fr)_38px] gap-2 items-center md:hidden w-full">
                  <button
                    type="button"
                    onClick={() => handleNavigateSubTab("prev")}
                    disabled={activeSubTabIndex === 0}
                    aria-label="Previous section"
                    className={`w-[34px] h-[34px] rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,82,255,0.15)] transition-all ${
                      activeSubTabIndex === 0 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95 cursor-pointer"
                    }`}
                  >
                    <ChevronIcon dir="prev" className="w-4 h-4" />
                  </button>

                  <div
                    key={`m-tab-${activeSubTab}`}
                    className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-3.5 py-2.5 flex items-center justify-center gap-2.5 text-[#0052FF] font-bold text-[16px] animate-header-enter"
                  >
                    <span className="w-[7px] h-[7px] rounded-full bg-[#FF6B00] shadow-[0_0_0_3px_rgba(255,107,0,0.2)]" />
                    <span>{ORDERED_SUBTABS[activeSubTabIndex]?.label}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigateSubTab("next")}
                    disabled={activeSubTabIndex === ORDERED_SUBTABS.length - 1}
                    aria-label="Next section"
                    className={`w-[34px] h-[34px] rounded-full bg-white border border-[#CBD5E1] text-[#0052FF] flex items-center justify-center shadow-[0_2px_8px_rgba(0,82,255,0.15)] transition-all ${
                      activeSubTabIndex === ORDERED_SUBTABS.length - 1 ? "invisible pointer-events-none" : "hover:scale-105 active:scale-95 cursor-pointer"
                    }`}
                  >
                    <ChevronIcon dir="next" className="w-4 h-4" />
                  </button>
                </div>

                {/* Desktop Subsection Buttons Menu (>= md) */}
                <div className="hidden md:flex flex-col gap-2 w-full" role="tablist">
                  {ORDERED_SUBTABS.map((subTab) => {
                    const isTabActive = subTab.id === activeSubTab;
                    return (
                      <button
                        key={subTab.id}
                        type="button"
                        onClick={() => setActiveSubTab(subTab.id)}
                        role="tab"
                        aria-selected={isTabActive}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border transition-all duration-200 text-left text-[16px] leading-none cursor-pointer active:scale-[0.98] ${
                          isTabActive
                            ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#0052FF] font-bold shadow-xs"
                            : "bg-transparent border-transparent text-[#5B6472] font-semibold hover:bg-[#EFECE6] hover:text-[#0F172A]"
                        }`}
                      >
                        <span
                          className={`w-[7px] h-[7px] rounded-full shrink-0 transition-all duration-200 ${
                            isTabActive ? "bg-[#FF6B00] shadow-[0_0_0_3px_rgba(255,107,0,0.2)]" : "bg-[#CBD5E1]"
                          }`}
                        />
                        <span>{subTab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sticky Start Project CTA Card */}
              <div
                key={`sb-cta-${activeSvcId}`}
                className="hidden md:block bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)] animate-header-enter"
              >
                <h3 className="font-outfit font-bold text-[18px] text-[#1A1A1A] tracking-tight mb-2 leading-snug">
                  {svc.cta.heading}
                </h3>
                <p className="text-[15px] text-[#5B6472] mb-4 leading-relaxed font-normal">
                  {svc.cta.desc}
                </p>
                <Link
                  href={svc.cta.link || "/contact"}
                  aria-label={`Start consultation for ${currentCanonical.h2Title}`}
                  className="bg-[#1E3A8A] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-800 transition-colors w-full inline-flex items-center justify-center gap-1.5"
                >
                  <span>{svc.cta.btn}</span>
                  <span className="text-white font-extrabold ml-1.5">&rarr;</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* SECTION 3: RIGHT COLUMN - DYNAMIC SERVICE CONTENT PANE                    */}
          {/* Renders Semantic <h2> Title and <h3> Offerings per SEO Specifications     */}
          {/* ========================================================================= */}
          <main className="w-full">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] min-h-[400px] transition-all duration-300">
              
              {/* Content Header & Description */}
              <div
                key={`header-${activeSvcId}-${activeSubTab}`}
                className="pb-6 mb-6 border-b border-[#E2E8F0] animate-header-enter"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF3EB] border border-[#FFD8BE] rounded-md text-[#FF6B00] text-[12px] font-bold tracking-[0.04em] leading-none mb-3">
                  <span>
                    SERVICE {currentCanonical.num} / {String(availableServices.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Explicit Semantic H2 Tag for Service Domain */}
                <h2 className="font-outfit font-bold text-3xl sm:text-[34px] lg:text-[38px] text-[#1A1A1A] tracking-tight mb-2 leading-tight">
                  {paneTitle}
                </h2>

                {paneSubtitle && (
                  <p className="text-[18px] font-normal text-[#0052FF] mb-3 leading-snug">
                    {paneSubtitle}
                  </p>
                )}
                <p className="text-[17px] text-[#5B6472] leading-relaxed max-w-[850px] m-0">
                  {paneDesc}
                </p>
              </div>

              {/* Subtab 1: OVERVIEW (4 Cards: 2-Column Grid) */}
              {activeSubTab === "overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {svc.overview?.map((item, idx) => (
                    <div
                      key={`${activeSvcId}-ov-${idx}`}
                      style={{ animationDelay: `${idx * 45}ms` }}
                      className="bg-[#F7F6F5] border border-[#E2E8F0] hover:border-[#CBD5E1] active:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 active:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] active:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out animate-card-enter cursor-default touch-manipulation"
                    >
                      <div className="flex items-center justify-between mb-4">
                        {item.badge ? (
                          <span className="text-[11px] font-extrabold text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded uppercase tracking-[0.04em]">
                            {item.badge}
                          </span>
                        ) : <span />}
                        <span className="w-2 h-2 rounded-full bg-[#FF6B00] inline-block" />
                      </div>
                      <h3 className="font-outfit font-bold text-[18px] text-[#1A1A1A] tracking-tight mb-3 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-[#5B6472] leading-relaxed m-0 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Subtab 2: SERVICES (6 Cards: 3-Column Grid) */}
              {activeSubTab === "services" && (
                <FeatureCardGrid
                  items={svc.servicesList || []}
                  keyPrefix={`${activeSvcId}-svc`}
                />
              )}

              {/* Subtab 3: BENEFITS (6 Cards: 3-Column Grid) */}
              {activeSubTab === "benefits" && (
                <FeatureCardGrid
                  items={svc.benefitCards || []}
                  keyPrefix={`${activeSvcId}-ben`}
                />
              )}

              {/* Subtab 4: PROCESS (Execution Roadmap Cards: 3-Column Grid) */}
              {activeSubTab === "process" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {svc.process?.map((st, idx) => (
                    <div
                      key={`${activeSvcId}-proc-${idx}`}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className="bg-[#F7F6F5] border border-[#E2E8F0] border-t-[3.5px] border-t-[#0052FF] hover:border-t-[#FF6B00] active:border-t-[#FF6B00] hover:border-[#CBD5E1] active:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 active:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] active:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out animate-card-enter cursor-default touch-manipulation"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {st.step && (
                          <span className="text-[11px] font-extrabold text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2 py-0.5 rounded">
                            STEP {st.step}
                          </span>
                        )}
                        <h3 className="font-outfit font-bold text-[17px] text-[#1A1A1A] tracking-tight leading-snug m-0">
                          {st.title}
                        </h3>
                      </div>
                      <p className="text-[15px] text-[#5B6472] leading-relaxed mt-2 m-0 font-normal">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Subtab 5: RESULTS (Documented Impact & Performance Metrics) */}
              {activeSubTab === "proven" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {svc.resultCards?.map((item, idx) => (
                    <div
                      key={`${activeSvcId}-res-${idx}`}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className="bg-[#F0F7FF] border border-[#CFE2FE] border-t-[3.5px] border-t-[#FF6B00] hover:border-[#0052FF] active:border-[#0052FF] rounded-[14px] p-7 h-full flex flex-col shadow-[0_4px_14px_rgba(0,82,255,0.05)] hover:-translate-y-1.5 active:-translate-y-1.5 hover:shadow-[0_12px_24px_-2px_rgba(0,82,255,0.15)] active:shadow-[0_12px_24px_-2px_rgba(0,82,255,0.15)] transition-all duration-300 ease-out animate-card-enter cursor-default touch-manipulation"
                    >
                      <div className="flex items-start gap-3.5 mb-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE] text-[#0052FF] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                          </svg>
                        </span>
                        <h3 className="font-outfit font-bold text-[18px] text-[#1A1A1A] tracking-tight leading-snug m-0">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[15px] text-[#5B6472] leading-relaxed pl-11 m-0 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </main>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: BOTTOM - TECHNOLOGY ECOSYSTEM & TECH STACK ICONS               */}
        {/* Displays technologies and platforms used for the active service           */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-7 sm:p-8 shadow-[0_4px_16px_rgba(15,23,42,0.03)] transition-all duration-300">
          <div
            key={`tech-hdr-${activeSvcId}`}
            className="text-center max-w-[850px] mx-auto mb-8 animate-header-enter"
          >
            <h3 className="font-outfit font-bold text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight mb-1.5 leading-tight">
              {svc.techEcosystemTitle}
            </h3>
            <p className="text-[14.5px] text-[#5B6472] m-0 font-normal">
              {svc.techEcosystemSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5">
            {svc.techItems?.map((tech: ServiceTechItem, idx: number) => {
              const iconSvg =
                TECH_ICONS[tech.name.toUpperCase()] ||
                TECH_ICONS[tech.name] ||
                null;

              return (
                <div
                  key={`${activeSvcId}-${tech.name}-${idx}`}
                  style={{ animationDelay: `${idx * 35}ms` }}
                  className="bg-white border border-[#E2E8F0] hover:border-[#0052FF] active:border-[#0052FF] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center text-center h-full min-h-[104px] shadow-[0_2px_6px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 active:-translate-y-1.5 hover:shadow-[0_10px_22px_-2px_rgba(0,82,255,0.15)] active:shadow-[0_10px_22px_-2px_rgba(0,82,255,0.15)] transition-all duration-300 ease-out animate-card-enter cursor-default touch-manipulation"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-3 [&>svg]:w-9 [&>svg]:h-9 [&>svg]:object-contain">
                    {tech.iconUrl ? (
                      <Image
                        src={tech.iconUrl}
                        alt={`${tech.name} Enterprise Technology Stack`}
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                      />
                    ) : iconSvg ? (
                      <div className="w-9 h-9 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: iconSvg }} />
                    ) : (
                      <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-[11px] font-bold text-slate-700">
                        {tech.name.substring(0, 3)}
                      </div>
                    )}
                  </div>
                  <span className="text-[13px] font-normal text-[#1A1A1A] tracking-tight leading-tight text-center break-words">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
