import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Center | CREED TECH",
  description: "Enterprise insights, architectural blueprints, tech benchmarks, and industry reports.",
};

export default function KnowledgeCenterPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest">
            Resources &amp; Intelligence
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight mt-3">
            Knowledge Center
          </h1>
          <p className="text-lg text-[#3E3E3E] leading-relaxed mt-5 font-normal">
            Explore our latest whitepapers, engineering case studies, technology benchmarks, and strategic industry reports.
          </p>
        </div>
      </div>
    </div>
  );
}
