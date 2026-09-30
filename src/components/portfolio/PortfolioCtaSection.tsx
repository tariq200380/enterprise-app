"use client";

import { useState } from "react";
import PortfolioScopingModal from "./PortfolioScopingModal";

export default function PortfolioCtaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full bg-[#0B1120] py-14 sm:py-16 text-white text-center relative overflow-hidden border-t border-gray-800">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.22)_0%,transparent_65%)]"
        />
        <div className="max-w-2xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
          <span className="text-[11px] font-semibold text-[#FF6B00] uppercase tracking-wider">
            HAVE AN AMBITIOUS ENGINEERING INITIATIVE?
          </span>
          <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Let&apos;s Build Your Next High-Performance Platform
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed font-normal">
            Schedule a confidential sprint architecture consultation with our principal software architects.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="h-12 px-8 inline-flex items-center justify-center bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Start Technical Scoping
            </button>
          </div>
        </div>
      </section>

      {/* TECHNICAL TEAM SCOPING FORM MODAL */}
      {isModalOpen && (
        <PortfolioScopingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
