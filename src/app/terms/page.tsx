import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | CREED TECH",
  description: "Terms and conditions governing enterprise services and software architecture engagements.",
};

export default function TermsPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-base text-[#3E3E3E] leading-relaxed mt-4 font-normal">
            Standard terms governing enterprise services delivery, technical scoping, and software engineering engagements.
          </p>
        </div>
      </div>
    </div>
  );
}
