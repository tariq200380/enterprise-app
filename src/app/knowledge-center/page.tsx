import type { Metadata } from "next";
import KnowledgeHero from "@/components/knowledge-center/KnowledgeHero";
import LatestTechNews from "@/components/knowledge-center/LatestTechNews";

export const metadata: Metadata = {
  title: "Enterprise Knowledge Center & Tech Intelligence | Creed Tech",
  description:
    "Curated technical research, engineering blueprints, system architecture patterns, and enterprise technology analysis from Creed Tech.",
};

export default function KnowledgeCenterPage() {
  return (
    <>
      <KnowledgeHero />
      <LatestTechNews />
    </>
  );
}
