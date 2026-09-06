import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | CREED TECH",
  description: "Enterprise software architecture, robust cloud infrastructure, advanced cybersecurity, and AI solutions.",
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest">
            Capabilities &amp; Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight mt-3">
            Enterprise Services &amp; Digital Engineering
          </h1>
          <p className="text-lg text-[#3E3E3E] leading-relaxed mt-5 font-normal">
            Creed Tech delivers mission-critical software systems, resilient cloud infrastructure, cybersecurity, and intelligent AI automation for high-growth enterprises worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}
