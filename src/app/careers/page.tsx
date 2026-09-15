import type { Metadata } from "next";
import CareerHero from "@/components/careers/careerhero";
import CareerWhy from "@/components/careers/careerwhy";
import CareerProcess from "@/components/careers/careerprocess";
import CareerRoles from "@/components/careers/careerroles";
import CareerFaq from "@/components/careers/careerfaq";
import CareerHotline from "@/components/careers/careerhotline";
import CareerLogic from "@/components/careers/careerlogic";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers & Engineering Pods | Creed Tech",
  description:
    "Build digital infrastructure that endures. We are an autonomous collective of principal systems architects, AI engineers, and design artisans.",
};

export default function CareersPage() {
  return (
    <main className="w-full bg-[#F7F6F5] font-sans text-[#0F172A] border-b border-[#E6E4DF]">
      <CareerHero />
      <CareerWhy />
      <CareerProcess />
      <CareerRoles />
      <CareerFaq />
      <CareerHotline />
      <CareerLogic />
    </main>
  );
}
