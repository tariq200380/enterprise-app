import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import KnowledgeHero from "@/components/knowledge-center/KnowledgeHero";
import LatestTechNews from "@/components/knowledge-center/LatestTechNews";
import BrandTechWires from "@/components/knowledge-center/BrandTechWires";
import {
  BrandWireItem,
  brandWires,
  LiveNewsItem,
  INITIAL_STORIES,
} from "@/components/knowledge-center/knowledgeCenterData";
import RegionalTechEcosystem from "@/components/knowledge-center/RegionalTechEcosystem";
import KnowledgeOverviewGrid from "@/components/knowledge-center/KnowledgeOverviewGrid";
import Testimonial3DDeck from "@/components/knowledge-center/Testimonial3DDeck";

export const metadata: Metadata = {
  title: "Enterprise Knowledge Center & Tech Intelligence | Creed Tech",
  description:
    "Curated technical research, engineering blueprints, system architecture patterns, and enterprise technology analysis from Creed Tech.",
};

function getInitialNewsData() {
  try {
    const cachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");
    if (fs.existsSync(cachePath)) {
      const raw = fs.readFileSync(cachePath, "utf-8");
      const parsed = JSON.parse(raw);

      const brandWiresList: BrandWireItem[] = brandWires.map((item) => {
        const live = parsed.brand_wires?.[item.id];
        if (!live) return item;
        const rawImg = live.img || item.img;
        return {
          ...item,
          title: live.title || item.title,
          summary: live.desc || live.summary || item.summary,
          date: live.date || item.date,
          link: live.link || item.link,
          img: rawImg?.startsWith("/") ? rawImg : `/${rawImg}`,
          cat: live.tag || live.category || item.cat,
        };
      });

      const breakingNews: LiveNewsItem[] =
        Array.isArray(parsed.breaking_news) && parsed.breaking_news.length > 0
          ? parsed.breaking_news.map((item: any, idx: number) => {
              const rawImg = item.img || "";
              return {
                id: item.external_id || `${item.provider || "news"}-${idx}`,
                provider: item.provider || "google",
                tag: item.tag || "TECH NEWS",
                providerLabel: item.brand_badge || (item.provider ? item.provider.toUpperCase() : "TECH"),
                providerColor:
                  item.provider === "apple"
                    ? "#0284C7"
                    : item.provider === "intel"
                    ? "#0071C5"
                    : "#475569",
                date: item.date || "Live RSS Feed",
                source: item.source || "Tech Newsroom",
                title: item.title || "",
                desc: item.desc || item.summary || "",
                link: item.link || "#",
                img: rawImg.startsWith("/") ? rawImg : `/${rawImg}`,
                source_image_url: item.source_image_url,
                timestamp: item.provider_published_at || parsed.timestamp,
              };
            })
          : INITIAL_STORIES;

      return { brandWiresList, breakingNews };
    }
  } catch (err) {
    console.error("Error reading initial news data on server:", err);
  }
  return { brandWiresList: brandWires, breakingNews: INITIAL_STORIES };
}

export default function KnowledgeCenterPage() {
  const { brandWiresList, breakingNews } = getInitialNewsData();

  return (
    <>
      <KnowledgeHero />
      <LatestTechNews initialStories={breakingNews} />
      <BrandTechWires initialWires={brandWiresList} />
      <RegionalTechEcosystem />
      <KnowledgeOverviewGrid />
      <Testimonial3DDeck />
    </>
  );
}
