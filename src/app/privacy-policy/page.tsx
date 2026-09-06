import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CREED TECH",
  description: "Privacy policy, data protection governance, and confidentiality standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-base text-[#3E3E3E] leading-relaxed mt-4 font-normal">
            Creed Tech is committed to safeguarding client confidentiality, intellectual property, and enterprise data in accordance with international data protection standards.
          </p>
        </div>
      </div>
    </div>
  );
}
