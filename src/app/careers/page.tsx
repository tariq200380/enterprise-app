import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | CREED TECH",
  description: "Join our world-class engineering and enterprise architecture team.",
};

export default function CareersPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest">
            Join The Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight mt-3">
            Careers at Creed Tech
          </h1>
          <p className="text-lg text-[#3E3E3E] leading-relaxed mt-5 font-normal">
            Build high-impact systems, explore scalable architectures, and collaborate with passionate engineers.
          </p>
        </div>
      </div>
    </div>
  );
}
