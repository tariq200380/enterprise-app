import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | CREED TECH",
  description: "Proven client success stories, enterprise engineering deployments, and global projects.",
};

export default function PortfolioPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest">
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight mt-3">
            Our Enterprise Portfolio
          </h1>
          <p className="text-lg text-[#3E3E3E] leading-relaxed mt-5 font-normal">
            Discover how Creed Tech engineers high-performance architectures, complex cloud ecosystems, and transformative web platforms for leading global organizations.
          </p>
        </div>
      </div>
    </div>
  );
}
