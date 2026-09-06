import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CREED TECH",
  description: "Learn about Creed Tech, our mission, architectural principles, and engineering team.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest">
            Our Identity
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight mt-3">
            About Creed Tech
          </h1>
          <p className="text-lg text-[#3E3E3E] leading-relaxed mt-5 font-normal">
            We are enterprise software architects, cloud engineers, and cybersecurity specialists dedicated to building resilient, scalable foundations for forward-thinking companies.
          </p>
        </div>
      </div>
    </div>
  );
}
