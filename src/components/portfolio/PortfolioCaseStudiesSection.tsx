import React from "react";
import Link from "next/link";
import {
  PortfolioProjectItem,
  DEFAULT_CASE_STUDIES,
  getTelemetryPreset,
} from "@/lib/portfolio-data";

interface PortfolioCaseStudiesSectionProps {
  projects?: PortfolioProjectItem[];
}

export default function PortfolioCaseStudiesSection({
  projects,
}: PortfolioCaseStudiesSectionProps) {
  const displayProjects =
    Array.isArray(projects) && projects.length > 0 ? projects : DEFAULT_CASE_STUDIES;

  return (
    <div className="w-full bg-[#F7F6F5] text-[#0F172A] font-sans">
      {displayProjects.map((proj, idx) => {
        const isEven = idx % 2 === 0;
        const isLast = idx === displayProjects.length - 1;
        const telemetry = getTelemetryPreset(idx, proj);
        const stackList = Array.isArray(proj.stack)
          ? proj.stack
          : typeof proj.stack === "string"
          ? (proj.stack as string).split(",").map((s) => s.trim()).filter(Boolean)
          : [];

        return (
          <section
            key={proj.id || idx}
            className={`w-full py-16 sm:py-20 ${isLast ? "" : "border-b border-[#E2E8F0]"}`}
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual Preview Card with Ambient Orange Glow */}
                <div
                  className={`col-span-12 md:col-span-6 relative bg-[#0B1120] rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[340px] shadow-lg ${
                    isEven ? "order-1" : "order-1 md:order-2"
                  }`}
                >
                  {/* Soft Orange Glow */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_45%,rgba(249,115,22,0.24)_0%,rgba(249,115,22,0.06)_45%,rgba(11,17,32,0)_70%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.035]"
                  />

                  {/* Top Badge & Case Number */}
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full text-white/90 text-xs font-semibold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
                      {proj.category || "Enterprise Engineering"}
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider text-white/50 bg-black/30 px-2 py-0.5 rounded border border-white/10">
                      CASE #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Project Image Preview if available */}
                  {proj.image_url && (
                    <div className="relative z-10 w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-white/15 mb-4 group shadow-md bg-black/50">
                      <img
                        src={proj.image_url}
                        alt={proj.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-semibold tracking-wider text-white/90">
                        <span className="truncate">{proj.client || "Enterprise Deployment"}</span>
                        <span className="text-orange-400 font-semibold shrink-0">VERIFIED BUILD</span>
                      </div>
                    </div>
                  )}

                  {/* Center Abstract Graphic / High-Tech Monitor */}
                  <div className="relative z-10 my-auto py-2">
                    <div className="border border-white/10 rounded-xl bg-black/40 p-4 font-mono text-xs text-white/50 space-y-1.5 backdrop-blur-xs">
                      <div className="text-orange-400 font-bold flex justify-between">
                        <span>{telemetry.terminalTitle}</span>
                        <span className="text-emerald-400 text-[10px]">
                          {telemetry.terminalStatus}
                        </span>
                      </div>
                      {telemetry.lines.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          className={line.isMuted ? "text-white/35 text-[11px]" : ""}
                        >
                          <span>{line.prefix}</span>
                          {line.highlight && (
                            <strong
                              className={`font-bold ${
                                line.highlightClass || "text-white"
                              }`}
                            >
                              {line.highlight}
                            </strong>
                          )}
                          {line.text && <span>{line.text}</span>}
                          {line.suffix && <span>{line.suffix}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Caption */}
                  <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-semibold tracking-wider mt-2">
                    <span className="text-white/70">
                      {proj.client || "Creed Tech Enterprise Deployment"}
                    </span>
                    <span className="text-orange-400 font-semibold text-[11px]">
                      VERIFIED BUILD
                    </span>
                  </div>
                </div>

                {/* Case Study Details Column */}
                <div
                  className={`col-span-12 md:col-span-6 flex flex-col justify-center text-left ${
                    isEven ? "order-2" : "order-2 md:order-1"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EA580C] mb-2 block">
                    {proj.category || "Enterprise Core"}
                  </span>

                  <h3 className="font-outfit text-xl sm:text-2xl lg:text-[1.8rem] font-bold text-[#0F172A] tracking-tight leading-[1.25] mb-3">
                    {proj.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                    {proj.summary}
                  </p>

                  {/* Metric Boxes (3 In A Row) */}
                  <div className="grid grid-cols-3 gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4 mb-5 shadow-2xs">
                    {telemetry.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={mIdx > 0 ? "border-l border-[#E2E8F0] pl-3" : ""}
                      >
                        <div className="font-outfit text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                          {m.val}
                        </div>
                        <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                          {m.lbl}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  {stackList.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {stackList.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-white border border-[#CBD5E1] text-slate-700 text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-md shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Button */}
                  <div>
                    <Link
                      href={proj.live_url || "/contact"}
                      className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#EA580C] text-white text-xs font-semibold px-5 py-3 rounded-lg shadow-sm transition-colors duration-200"
                    >
                      <span>Explore case study</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
