"use client";

import React, { useState } from "react";
import { WebsiteSettingsData, ServiceExplorerItem, ServiceExplorerCardItem } from "./types";
import ServicesExplorerHeaderCard from "./services/ServicesExplorerHeaderCard";
import ServiceGeneralCard from "./services/ServiceGeneralCard";
import ServiceCtaCard from "./services/ServiceCtaCard";
import ServiceCardListEditor from "./services/ServiceCardListEditor";
import ServiceTechStackCard from "./services/ServiceTechStackCard";

interface Props {
  settings: WebsiteSettingsData;
  onChange: <K extends keyof WebsiteSettingsData>(key: K, value: WebsiteSettingsData[K]) => void;
}

type CardSubTabType = "overview" | "services" | "benefits" | "process" | "results";

export default function ServicesSettingsSection({ settings, onChange }: Props) {
  const explorer = settings.servicesExplorer;
  const services = explorer?.services || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeCardTab, setActiveCardTab] = useState<CardSubTabType>("overview");

  // Safe current service reference
  const safeIdx = Math.max(0, Math.min(activeIdx, Math.max(0, services.length - 1)));
  const currentService: ServiceExplorerItem | undefined = services[safeIdx] || services[0];

  // Update section headline / description
  const handleHeaderChange = (field: "sectionHeadline" | "sectionDescription", value: string) => {
    onChange("servicesExplorer", {
      ...explorer,
      [field]: value,
    });
  };

  // Add a new Service Domain
  const handleAddServiceDomain = () => {
    const nextNum = String(services.length + 1).padStart(2, "0");
    const newId = `custom-service-${Date.now()}`;
    const newService: ServiceExplorerItem = {
      id: newId,
      num: nextNum,
      name: `New Service ${nextNum}`,
      tagline: "High-Performance Engineering Solutions",
      intro: "Enterprise-grade digital and engineering solutions tailored for modern business requirements.",
      ctaHeading: "Ready to Transform Your Infrastructure?",
      ctaDesc: "Collaborate with our senior engineers and architects for a high-impact solution.",
      ctaBtnText: "Schedule Consultation",
      ctaBtnUrl: "/contact",
      techEcosystemTitle: "Tech Ecosystem",
      techEcosystemSubtitle: "Integrated frameworks and scalable infrastructure",
      techStack: "TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, AWS, GraphQL",
      overviewCards: [
        { badge: "CORE", title: "Enterprise Architecture", desc: "Robust and scalable software foundation designed for high-availability systems." },
        { badge: "SPEED", title: "Rapid Execution", desc: "Iterative agile delivery pipelines ensuring fast time-to-market without technical debt." },
        { badge: "SECURITY", title: "End-to-End Security", desc: "Zero-trust security compliance with modern encryption and governance protocols." },
        { badge: "SCALE", title: "High Throughput", desc: "Elastic horizontal scalability handling millions of concurrent enterprise workloads." },
      ],
      servicesList: [
        { title: "Strategic Technical Consulting", desc: "Advisory and architecture blueprints for high-scale enterprise systems." },
        { title: "Custom Engineering Delivery", desc: "Turnkey development of mission-critical platforms and bespoke features." },
      ],
      benefitCards: [
        { title: "Maximized Operational ROI", desc: "Lower total cost of ownership with optimized infrastructure spend." },
        { title: "Accelerated Velocity", desc: "Deploy new features up to 3x faster with streamlined CI/CD pipelines." },
      ],
      process: [
        { step: "01", title: "Architecture & Discovery", desc: "In-depth discovery sprint to define technical specifications and scope." },
        { step: "02", title: "Iterative Sprint Execution", desc: "Bi-weekly milestone delivery with continuous stakeholder feedback." },
      ],
      resultCards: [
        { title: "99.99% Production Uptime", desc: "Engineered fault-tolerant systems with zero unplanned downtime." },
        { title: "45% Performance Boost", desc: "Optimized database queries and API response latencies significantly." },
      ],
      subHeadings: {
        services: "Dedicated Service Offerings",
        servicesDesc: "End-to-end technical capabilities addressing your core challenges.",
        benefits: "Business Benefits & Advantages",
        benefitsDesc: "Tangible ROI and strategic leverage delivered to your team.",
        process: "Execution Methodology & Roadmap",
        processDesc: "Structured sprint framework guaranteeing predictable milestones.",
        results: "Documented Impact & Performance Metrics",
        resultsDesc: "Measurable milestones achieved across engagements.",
      },
    };

    const updatedServices = [...services, newService];
    onChange("servicesExplorer", {
      ...explorer,
      services: updatedServices,
    });
    setActiveIdx(updatedServices.length - 1);
  };

  // Delete current active Service Domain
  const handleDeleteServiceDomain = (idxToDelete: number) => {
    if (services.length <= 1) {
      alert("At least one service domain must remain.");
      return;
    }
    const targetService = services[idxToDelete];
    const confirmDelete = window.confirm(
      `Are you sure you want to delete service domain "${targetService?.name || 'this service'}"? This action will remove all its subtab cards.`
    );
    if (!confirmDelete) return;

    const updatedServices = services.filter((_, i) => i !== idxToDelete);
    onChange("servicesExplorer", {
      ...explorer,
      services: updatedServices,
    });
    setActiveIdx(Math.max(0, Math.min(idxToDelete, updatedServices.length - 1)));
  };

  // Update field of current active service
  const handleServiceChange = (field: keyof ServiceExplorerItem, value: any) => {
    if (!currentService) return;
    const updatedServices = [...services];
    updatedServices[safeIdx] = {
      ...updatedServices[safeIdx],
      [field]: value,
    };
    onChange("servicesExplorer", {
      ...explorer,
      services: updatedServices,
    });
  };

  // Update card lists (Overview, Services List, Benefits, Process, Results)
  const handleCardListChange = (
    field: "overviewCards" | "servicesList" | "benefitCards" | "process" | "resultCards",
    items: ServiceExplorerCardItem[]
  ) => {
    if (!currentService) return;
    const updatedServices = [...services];
    updatedServices[safeIdx] = {
      ...updatedServices[safeIdx],
      [field]: items,
    };
    onChange("servicesExplorer", {
      ...explorer,
      services: updatedServices,
    });
  };

  // Update sub-tab headings & descriptions
  const handleSubHeadingChange = (
    tabKey: "services" | "benefits" | "process" | "results",
    heading: string,
    desc: string
  ) => {
    if (!currentService) return;
    const currentSubHeadings = currentService.subHeadings || {};
    const updatedSubHeadings = {
      ...currentSubHeadings,
      [tabKey]: heading,
      [`${tabKey}Desc`]: desc,
    };
    const updatedServices = [...services];
    updatedServices[safeIdx] = {
      ...updatedServices[safeIdx],
      subHeadings: updatedSubHeadings,
    };
    onChange("servicesExplorer", {
      ...explorer,
      services: updatedServices,
    });
  };

  const cardSubTabs: { id: CardSubTabType; label: string; icon: string; count: number }[] = [
    { id: "overview", label: "Overview Cards", icon: "📋", count: currentService?.overviewCards?.length || 0 },
    { id: "services", label: "Services List", icon: "⚡", count: currentService?.servicesList?.length || 0 },
    { id: "benefits", label: "Benefits", icon: "💎", count: currentService?.benefitCards?.length || 0 },
    { id: "process", label: "Process Steps", icon: "🔄", count: currentService?.process?.length || 0 },
    { id: "results", label: "Results & Impact", icon: "🏆", count: currentService?.resultCards?.length || 0 },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">⚙️</span>
          <h2 className="text-sm font-bold text-[#0F172A]">
            Services Page &amp; Interactive Explorer Architecture
          </h2>
        </div>
        <p className="text-xs text-[#64748B]">
          Configure the main interactive services explorer section. You can add, edit, or remove service domains, manage cards inside every subtab, and customize the bottom Tech Ecosystem with active technologies.
        </p>
      </div>

      {/* 1. Section Header Card */}
      <ServicesExplorerHeaderCard
        headline={explorer?.sectionHeadline || ""}
        description={explorer?.sectionDescription || ""}
        onChange={handleHeaderChange}
      />

      {/* 2. Service Domains Selector with Add / Delete */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              SERVICE DOMAINS ({services.length})
            </h3>
            <p className="text-xs text-[#64748B]">
              Select a service domain to edit its general info, subtabs, and tech ecosystem.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddServiceDomain}
            className="px-3 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>＋</span>
            <span>Add Service Domain</span>
          </button>
        </div>

        {/* Domain Tabs List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {services.map((svc, idx) => {
            const isSelected = idx === safeIdx;
            return (
              <button
                key={svc.id || idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`p-2.5 rounded-lg border flex flex-col items-center text-center gap-1 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#0052FF] border-[#0052FF] text-white shadow-md font-bold"
                    : "bg-[#F8FAFC] border-[#CBD5E1] text-[#334155] hover:bg-[#EFF6FF] hover:border-[#BFDBFE]"
                }`}
              >
                <span
                  className={`text-[11px] font-extrabold ${
                    isSelected ? "text-[#FFD8BE]" : "text-[#FF6B00]"
                  }`}
                >
                  {svc.num || `0${idx + 1}`}
                </span>
                <span className="text-xs leading-tight line-clamp-2">
                  {svc.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Full Editor */}
        {currentService && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-6">
            {/* Active Domain Info Bar with Delete Domain */}
            <div className="flex items-center justify-between flex-wrap gap-2 bg-[#F1F5F9] p-3 rounded-lg border border-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#0052FF] text-white font-bold text-xs rounded">
                  {currentService.num}
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  Editing Service: {currentService.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteServiceDomain(safeIdx)}
                  disabled={services.length <= 1}
                  className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 ${
                    services.length <= 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B]"
                  }`}
                  title={services.length <= 1 ? "Cannot delete the only remaining domain" : "Delete this domain"}
                >
                  <span>✕</span>
                  <span>Delete Domain</span>
                </button>
              </div>
            </div>

            {/* Part A: General Service Info & Sidebar CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ServiceGeneralCard
                service={currentService}
                onChange={handleServiceChange}
              />
              <ServiceCtaCard
                service={currentService}
                onChange={handleServiceChange}
              />
            </div>

            {/* Part B: Sub-Tab Content Cards Editor (5 Subtabs: Overview, Services, Benefits, Process, Results) */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-gray-200 pb-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mr-1">
                    SUB-TAB CARDS:
                  </span>
                  {cardSubTabs.map((t) => {
                    const isCurrentTab = activeCardTab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveCardTab(t.id)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isCurrentTab
                            ? "bg-[#0052FF] text-white shadow-sm"
                            : "bg-[#F8FAFC] text-[#475569] border border-gray-200 hover:bg-[#EFF6FF] hover:text-[#0052FF]"
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                            isCurrentTab ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {t.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subtab 1: Overview Cards */}
              {activeCardTab === "overview" && (
                <ServiceCardListEditor
                  title="Overview Feature & Capability Cards"
                  description="The highlight cards displayed on the overview pane (with optional badge tags)."
                  icon="📋"
                  items={currentService.overviewCards || []}
                  showBadge={true}
                  onChange={(items) => handleCardListChange("overviewCards", items)}
                />
              )}

              {/* Subtab 2: Services List */}
              {activeCardTab === "services" && (
                <ServiceCardListEditor
                  title="Dedicated Services List"
                  description="Comprehensive list of sub-services displayed when the 'Services' tab is selected."
                  icon="⚡"
                  items={currentService.servicesList || []}
                  showBadge={false}
                  sectionHeading={currentService.subHeadings?.services}
                  sectionDesc={currentService.subHeadings?.servicesDesc}
                  onHeadingChange={(h, d) => handleSubHeadingChange("services", h, d)}
                  onChange={(items) => handleCardListChange("servicesList", items)}
                />
              )}

              {/* Subtab 3: Benefits */}
              {activeCardTab === "benefits" && (
                <ServiceCardListEditor
                  title="Tangible Business Benefits Cards"
                  description="Value-driven outcomes and ROI metrics shown on the 'Benefits' tab."
                  icon="💎"
                  items={currentService.benefitCards || []}
                  showBadge={false}
                  sectionHeading={currentService.subHeadings?.benefits}
                  sectionDesc={currentService.subHeadings?.benefitsDesc}
                  onHeadingChange={(h, d) => handleSubHeadingChange("benefits", h, d)}
                  onChange={(items) => handleCardListChange("benefitCards", items)}
                />
              )}

              {/* Subtab 4: Process Steps */}
              {activeCardTab === "process" && (
                <ServiceCardListEditor
                  title="Execution Process & Methodology Steps"
                  description="Numbered step-by-step roadmap displayed when the 'Process' tab is selected."
                  icon="🔄"
                  items={currentService.process || []}
                  showStep={true}
                  sectionHeading={currentService.subHeadings?.process}
                  sectionDesc={currentService.subHeadings?.processDesc}
                  onHeadingChange={(h, d) => handleSubHeadingChange("process", h, d)}
                  onChange={(items) => handleCardListChange("process", items)}
                />
              )}

              {/* Subtab 5: Results & Impact */}
              {activeCardTab === "results" && (
                <ServiceCardListEditor
                  title="Documented Results & Performance Cards"
                  description="Proven track record and impact cards shown on the 'Results' tab."
                  icon="🏆"
                  items={currentService.resultCards || []}
                  showBadge={false}
                  sectionHeading={currentService.subHeadings?.results}
                  sectionDesc={currentService.subHeadings?.resultsDesc}
                  onHeadingChange={(h, d) => handleSubHeadingChange("results", h, d)}
                  onChange={(items) => handleCardListChange("resultCards", items)}
                />
              )}
            </div>

            {/* Part C: TECH ECOSYSTEM & STACK TECHNOLOGIES (ALWAYS VISIBLE & EDITABLE) */}
            <ServiceTechStackCard
              service={currentService}
              onChange={handleServiceChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
