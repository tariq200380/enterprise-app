import type { Metadata } from "next";
import CareersPageDesign from "@/components/careers/CareersPageDesign";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers & Engineering Pods | Creed Tech",
  description:
    "Build digital infrastructure that endures. We are an autonomous collective of principal systems architects, AI engineers, and design artisans.",
};

export default function CareersPage() {
  return <CareersPageDesign />;
}
