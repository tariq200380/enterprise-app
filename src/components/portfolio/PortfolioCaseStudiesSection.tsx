import React from "react";
import Link from "next/link";
import { PortfolioProjectItem } from "../admin/settings/types";

interface PortfolioCaseStudiesSectionProps {
  projects: PortfolioProjectItem[];
}

export default function PortfolioCaseStudiesSection({
  projects,
}: PortfolioCaseStudiesSectionProps) {
  return (
    <section
      id="portfolio-case-studies"
      className="w-full py-14 sm:py-20 bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col gap-16 sm:gap-24">
        {projects.map((proj, idx) => {
          const caseNumber = String(idx + 1).padStart(2, "0");
          const isEven = idx % 2 === 0;
          const techStackItems = (proj.techStack || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

          return (
            <div
              key={proj.id || idx}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
            >
              {/* Image Box */}
              <div
                className={`relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-950 h-[280px] sm:h-[400px] group ${
                  isEven ? "" : "order-1 lg:order-2"
                }`}
              >
                <img
                  src={
                    proj.coverImageUrl ||
                    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80"
                  }
                  alt={proj.title}
                  width={550}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-black/70 backdrop-blur-md text-white font-semibold text-xs flex items-center justify-center border border-white/20 rounded-sm">
                    {caseNumber}
                  </span>
                  {proj.imageBadgeTag && (
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-sm">
                      {proj.imageBadgeTag}
                    </span>
                  )}
                </div>

                {proj.clientNameLocation && (
                  <div className="absolute bottom-4 left-4 text-white/90 text-xs font-semibold backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-md">
                    🏢 {proj.clientNameLocation}
                  </div>
                )}
              </div>

              {/* Content Column */}
              <div
                className={`text-left flex flex-col gap-4 sm:gap-5 ${
                  isEven ? "" : "order-2 lg:order-1"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 inline-block ${
                      isEven ? "bg-[#0052FF]" : "bg-[#FF6B00]"
                    }`}
                  />
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                    {proj.category || "Enterprise Engineering"}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-gray-950 tracking-tight leading-snug">
                  {proj.title}
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {proj.description}
                </p>

                {/* 3 Impact Metrics */}
                {(proj.metric1Value || proj.metric2Value || proj.metric3Value) && (
                  <div className="grid grid-cols-3 gap-3 p-4 bg-[#F2F8FD] rounded-xl border border-[#BFDBFE]">
                    {proj.metric1Value && (
                      <div>
                        <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">
                          {proj.metric1Value}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          {proj.metric1Label}
                        </span>
                      </div>
                    )}
                    {proj.metric2Value && (
                      <div>
                        <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">
                          {proj.metric2Value}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          {proj.metric2Label}
                        </span>
                      </div>
                    )}
                    {proj.metric3Value && (
                      <div>
                        <span className="text-lg sm:text-xl font-semibold text-[#0052FF] block leading-tight">
                          {proj.metric3Value}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          {proj.metric3Label}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech Stack */}
                {techStackItems.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Architectural Stack:
                    </span>
                    <div className="flex items-center flex-wrap gap-1.5">
                      {techStackItems.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[11px] font-mono rounded-sm border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-950 hover:bg-[#0052FF] text-white font-bold text-xs rounded-sm transition-colors"
                  >
                    <span>Explore Case Study Deep-Dive</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
