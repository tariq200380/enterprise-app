import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CREED TECH",
  description: "Get in touch with our technical scoping team and enterprise architects.",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold text-[#FF6A00] uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight mt-3">
            Contact Our Engineering Team
          </h1>
          <p className="text-lg text-[#3E3E3E] leading-relaxed mt-5 font-normal">
            Start technical scoping or discuss your enterprise architecture requirements with our senior engineers.
          </p>
        </div>
      </div>
    </div>
  );
}
