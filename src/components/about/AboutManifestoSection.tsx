import React from "react";

export default function AboutManifestoSection() {
  return (
    <section className="bg-[#0B1120] text-white py-10 sm:py-12 border-t border-white/10 relative overflow-hidden text-left">
      {/* Ambient Orange Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(234,88,12,0.12)_0%,transparent_55%)]"
      />
      {/* Subtle 36px Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.025]"
      />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[2.5px] text-[#AEB6C2]">
                FOUNDING MANIFESTO
              </span>
            </div>
            <div className="w-12 h-[2px] bg-[#EA580C] opacity-80 mb-5" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Architectural Imperative
            </h2>
            <p className="text-sm text-white/60 leading-[1.7] max-w-sm">
              The standard that governs every engineering pod, every commit, and every architecture decision we deliver.
            </p>
          </div>

          {/* Right Column: Statement & Seal */}
          <div className="lg:col-span-8">
            <blockquote className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white leading-[1.4] tracking-tight mb-8">
              &ldquo;Software fails quietly until the day it fails loudly. We treat every release the way a structural engineer treats a blueprint —{" "}
              <strong className="text-white font-extrabold">assume it will be trusted with something critical</strong>, because it will be.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#EA580C]">
                CT
              </div>
              <div>
                <cite className="block not-italic text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Founding Principle &bull; Creed Tech
                </cite>
                <span className="text-[11px] font-mono text-white/50">
                  Sovereign Enterprise Software Standard
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
