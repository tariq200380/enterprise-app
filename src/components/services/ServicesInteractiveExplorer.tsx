"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ServicesExplorerSettingsData, ServiceTechItem } from "@/components/admin/settings/types";
import {
  ORDERED_SVCS,
  ORDERED_SUBTABS,
  SVCS,
  type SubTabId,
} from "./servicesData";
import ServiceSelectorBar from "./explorer/ServiceSelectorBar";
import ServiceSidebar from "./explorer/ServiceSidebar";
import ServiceContentPane from "./explorer/ServiceContentPane";
import ServiceTechEcosystem from "./explorer/ServiceTechEcosystem";

interface Props {
  data?: ServicesExplorerSettingsData;
}

export default function ServicesInteractiveExplorer({ data }: Props) {
  // Compute available services (dynamic admin settings or fallback to static data)
  const availableServices = useMemo(() => {
    if (data?.services && data.services.length > 0) {
      return data.services;
    }
    return ORDERED_SVCS.map((id) => ({
      id,
      num: SVCS[id].num,
      name: SVCS[id].name,
      tagline: SVCS[id].tagline,
      intro: SVCS[id].intro,
      ctaHeading: SVCS[id].cta.heading,
      ctaDesc: SVCS[id].cta.desc,
      ctaBtnText: SVCS[id].cta.btn,
      ctaBtnUrl: "/contact",
      overviewCards: SVCS[id].overview,
      servicesList: SVCS[id].servicesList,
      benefitCards: SVCS[id].benefitCards,
      process: SVCS[id].process,
      resultCards: SVCS[id].resultCards,
      subHeadings: SVCS[id].subHeadings,
      techEcosystemTitle: "Tech Ecosystem",
      techEcosystemSubtitle: `Technologies and platforms used for ${SVCS[id].name} solutions.`,
      techStack: SVCS[id].techStack.join(", "),
    }));
  }, [data?.services]);

  const initialServiceId = availableServices[0]?.id || "software-development";
  const [activeSvcId, setActiveSvcId] = useState<string>(initialServiceId);
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>("overview");

  // Sync with URL Hash on Mount and PopState
  useEffect(() => {
    function parseHash(hashString: string): string {
      const clean = hashString.replace(/^#/, "").trim().toLowerCase();
      const aliases: Record<string, string> = {
        software: "software-development",
        "ui-ux": "ui-ux-design",
        mobile: "mobile-application",
        "mobile-applications": "mobile-application",
        cloud: "cloud-infrastructure",
        database: "database-management",
        web: "web-development",
        ai: "ai-automation",
        growth: "digital-growth",
      };

      if (aliases[clean]) return aliases[clean];
      const match = availableServices.find((s) => s.id.toLowerCase() === clean);
      if (match) return match.id;
      return availableServices[0]?.id || "software-development";
    }

    const initial = parseHash(window.location.hash);
    if (initial) {
      setActiveSvcId(initial);
    }

    const handleHashChange = () => {
      const updated = parseHash(window.location.hash);
      if (updated) {
        setActiveSvcId(updated);
        setActiveSubTab("overview");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [availableServices]);

  const handleSelectSvc = (id: string) => {
    if (id === activeSvcId) return;
    setActiveSvcId(id);
    setActiveSubTab("overview");

    try {
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
    } catch {}
  };

  const handleSelectSubTab = (tab: SubTabId) => {
    setActiveSubTab(tab);
  };

  const activeSvcIndex = Math.max(
    0,
    availableServices.findIndex((s) => s.id === activeSvcId)
  );

  const handleNavigateService = (dir: "prev" | "next") => {
    const nextIdx = dir === "next" ? activeSvcIndex + 1 : activeSvcIndex - 1;
    if (nextIdx >= 0 && nextIdx < availableServices.length) {
      handleSelectSvc(availableServices[nextIdx].id);
    }
  };

  const handleNavigateSubTab = (dir: "prev" | "next") => {
    const curIdx = ORDERED_SUBTABS.findIndex((t) => t.id === activeSubTab);
    const nextIdx = dir === "next" ? curIdx + 1 : curIdx - 1;
    if (nextIdx >= 0 && nextIdx < ORDERED_SUBTABS.length) {
      handleSelectSubTab(ORDERED_SUBTABS[nextIdx].id);
    }
  };

  const sectionHeadline = data?.sectionHeadline || "Enterprise Engineering & Digital Solutions";
  const sectionDescription =
    data?.sectionDescription ||
    "Select any service below to explore dedicated capabilities, technical benefits, delivery methodology, results, and Tech Ecosystem.";

  // Memoize resolved active service data
  const svc = useMemo(() => {
    const dynamicSvcItem = data?.services?.find((s) => s.id === activeSvcId);
    const staticSvc = SVCS[activeSvcId as keyof typeof SVCS] || {
      id: activeSvcId,
      num: "01",
      name: "Enterprise Service",
      tagline: "High-Performance Technical Architecture",
      intro: "End-to-end enterprise software development and consulting services.",
      subHeadings: {
        services: "Comprehensive Service Offerings",
        servicesDesc: "",
        benefits: "Tangible Business Value & Benefits",
        benefitsDesc: "",
        process: "Execution Methodology & Roadmap",
        processDesc: "",
        results: "Documented Impact & Performance Metrics",
        resultsDesc: "",
      },
      cta: {
        heading: "Ready to Transform Your Infrastructure?",
        desc: "Connect with our engineering specialists to schedule a discovery call.",
        btn: "Schedule Consultation",
        link: "/contact",
      },
      overview: [],
      servicesList: [],
      benefitCards: [],
      process: [],
      resultCards: [],
      techStack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
    };

    const techItems: ServiceTechItem[] =
      dynamicSvcItem?.techItems && dynamicSvcItem.techItems.length > 0
        ? dynamicSvcItem.techItems
        : dynamicSvcItem?.techStack
        ? dynamicSvcItem.techStack
            .split(",")
            .map((s) => ({ name: s.trim() }))
            .filter((i) => Boolean(i.name))
        : staticSvc.techStack.map((name) => ({ name }));

    return {
      ...staticSvc,
      num: dynamicSvcItem?.num || staticSvc.num,
      name: dynamicSvcItem?.name || staticSvc.name,
      tagline: dynamicSvcItem?.tagline || staticSvc.tagline,
      intro: dynamicSvcItem?.intro || staticSvc.intro,
      cta: {
        heading: dynamicSvcItem?.ctaHeading || staticSvc.cta.heading,
        desc: dynamicSvcItem?.ctaDesc || staticSvc.cta.desc,
        btn: dynamicSvcItem?.ctaBtnText || staticSvc.cta.btn,
        link: dynamicSvcItem?.ctaBtnUrl || "/contact",
      },
      overview:
        dynamicSvcItem?.overviewCards && dynamicSvcItem.overviewCards.length > 0
          ? dynamicSvcItem.overviewCards
          : staticSvc.overview,
      servicesList:
        dynamicSvcItem?.servicesList && dynamicSvcItem.servicesList.length > 0
          ? dynamicSvcItem.servicesList
          : staticSvc.servicesList || [],
      benefitCards:
        dynamicSvcItem?.benefitCards && dynamicSvcItem.benefitCards.length > 0
          ? dynamicSvcItem.benefitCards
          : staticSvc.benefitCards || [],
      process:
        dynamicSvcItem?.process && dynamicSvcItem.process.length > 0
          ? dynamicSvcItem.process
          : staticSvc.process || [],
      resultCards:
        dynamicSvcItem?.resultCards && dynamicSvcItem.resultCards.length > 0
          ? dynamicSvcItem.resultCards
          : staticSvc.resultCards || [],
      subHeadings: {
        services: dynamicSvcItem?.subHeadings?.services || staticSvc.subHeadings?.services || "Comprehensive Service Offerings",
        servicesDesc: dynamicSvcItem?.subHeadings?.servicesDesc || staticSvc.subHeadings?.servicesDesc || "",
        benefits: dynamicSvcItem?.subHeadings?.benefits || staticSvc.subHeadings?.benefits || "Tangible Business Value & Benefits",
        benefitsDesc: dynamicSvcItem?.subHeadings?.benefitsDesc || staticSvc.subHeadings?.benefitsDesc || "",
        process: dynamicSvcItem?.subHeadings?.process || staticSvc.subHeadings?.process || "Execution Methodology & Roadmap",
        processDesc: dynamicSvcItem?.subHeadings?.processDesc || staticSvc.subHeadings?.processDesc || "",
        results: dynamicSvcItem?.subHeadings?.results || staticSvc.subHeadings?.results || "Documented Impact & Performance Metrics",
        resultsDesc: dynamicSvcItem?.subHeadings?.resultsDesc || staticSvc.subHeadings?.resultsDesc || "",
      },
      techItems,
      techEcosystemTitle: dynamicSvcItem?.techEcosystemTitle || "Tech Ecosystem",
      techEcosystemSubtitle:
        dynamicSvcItem?.techEcosystemSubtitle ||
        `Technologies and platforms used for ${dynamicSvcItem?.name || staticSvc.name} solutions.`,
    };
  }, [data?.services, activeSvcId]);

  // Dynamic header text based on selected subtab
  const { paneTitle, paneSubtitle, paneDesc } = useMemo(() => {
    let title = svc.name;
    let subtitle = svc.tagline || "";
    let desc = svc.intro || "";

    if (activeSubTab === "services" && svc.subHeadings.services) {
      title = svc.subHeadings.services;
      subtitle = "";
      desc = svc.subHeadings.servicesDesc || "";
    } else if (activeSubTab === "benefits" && svc.subHeadings.benefits) {
      title = svc.subHeadings.benefits;
      subtitle = "";
      desc = svc.subHeadings.benefitsDesc || "";
    } else if (activeSubTab === "process" && svc.subHeadings.process) {
      title = svc.subHeadings.process;
      subtitle = "";
      desc = svc.subHeadings.processDesc || "";
    } else if (activeSubTab === "proven" && svc.subHeadings.results) {
      title = svc.subHeadings.results;
      subtitle = "";
      desc = svc.subHeadings.resultsDesc || "";
    }

    return { paneTitle: title, paneSubtitle: subtitle, paneDesc: desc };
  }, [svc, activeSubTab]);

  return (
    <section id="what-we-provide" className="relative w-full py-12 lg:py-16 bg-white overflow-hidden">
      {/* Background blueprint grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,82,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,82,255,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[52rem] mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold text-[#0F172A] tracking-[-0.02em] mb-2 leading-tight">
            {sectionHeadline}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-relaxed font-normal m-0">
            {sectionDescription}
          </p>
        </div>

        {/* 1. HORIZONTAL SERVICE SELECTOR */}
        <ServiceSelectorBar
          availableServices={availableServices}
          activeSvcId={activeSvcId}
          activeSvcIndex={activeSvcIndex}
          activeSvcNum={svc.num}
          activeSvcName={svc.name}
          onSelectService={handleSelectSvc}
          onNavigateService={handleNavigateService}
        />

        {/* 2. TWO-COLUMN STICKY LAYOUT (SIDEBAR + MAIN CONTENT PANE) */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[270px_1fr] gap-6 mb-8 items-start">
          <ServiceSidebar
            activeSvcId={activeSvcId}
            num={svc.num}
            name={svc.name}
            activeSubTab={activeSubTab}
            onSelectSubTab={handleSelectSubTab}
            onNavigateSubTab={handleNavigateSubTab}
            cta={svc.cta}
          />

          <ServiceContentPane
            activeSvcId={activeSvcId}
            activeSubTab={activeSubTab}
            num={svc.num}
            totalServices={availableServices.length}
            paneTitle={paneTitle}
            paneSubtitle={paneSubtitle}
            paneDesc={paneDesc}
            overview={svc.overview}
            servicesList={svc.servicesList}
            benefitCards={svc.benefitCards}
            process={svc.process}
            resultCards={svc.resultCards}
          />
        </div>

        {/* 3. BOTTOM TECH ECOSYSTEM BLOCK */}
        <ServiceTechEcosystem
          activeSvcId={activeSvcId}
          title={svc.techEcosystemTitle}
          subtitle={svc.techEcosystemSubtitle}
          techItems={svc.techItems}
        />
      </div>
    </section>
  );
}
