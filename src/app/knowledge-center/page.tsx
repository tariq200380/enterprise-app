import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { withCacheBuster } from "@/lib/cacheBuster";
import KnowledgeHero from "@/components/knowledge-center/KnowledgeHero";
import LatestTechNews from "@/components/knowledge-center/LatestTechNews";
import BrandTechWires from "@/components/knowledge-center/BrandTechWires";
import {
  BrandWireItem,
  brandWires,
  LiveNewsItem,
  INITIAL_STORIES,
  RegionalWireItem,
  INITIAL_REGIONAL_WIRES,
} from "@/components/knowledge-center/knowledgeCenterData";
import RegionalTechEcosystem from "@/components/knowledge-center/RegionalTechEcosystem";
import KnowledgeOverviewGrid from "@/components/knowledge-center/KnowledgeOverviewGrid";
import Testimonial3DDeck from "@/components/knowledge-center/Testimonial3DDeck";

export const metadata: Metadata = {
  title: "Enterprise Knowledge Center & Tech Intelligence | Creed Tech",
  description:
    "Curated technical research, engineering blueprints, system architecture patterns, and enterprise technology analysis from Creed Tech.",
};

// Force dynamic SSR so live news and original images are always 100% fresh on reopen
export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDynamicRelativeTime(timestamp?: string, rawDateStr?: string, defaultSource = "Live Wire"): string {
  let sourceSuffix = defaultSource;
  if (rawDateStr && rawDateStr.includes("•")) {
    const extracted = rawDateStr.split("•").slice(1).join("•").trim();
    if (extracted && !extracted.toLowerCase().includes("live rss feed")) sourceSuffix = extracted;
  } else if (rawDateStr && !rawDateStr.toLowerCase().includes("ago") && !rawDateStr.toLowerCase().includes("live rss feed")) {
    sourceSuffix = rawDateStr.trim();
  }

  const dateToParse = timestamp || (rawDateStr && !rawDateStr.toLowerCase().includes("ago") ? rawDateStr : null);
  if (!dateToParse) {
    return rawDateStr || (sourceSuffix ? `${defaultSource} • ${sourceSuffix}` : defaultSource);
  }

  let ts = Date.parse(dateToParse);
  if (isNaN(ts)) {
    ts = Date.parse(dateToParse.replace(" ", "T") + "Z");
  }

  if (isNaN(ts) || ts <= 0) {
    return rawDateStr || (sourceSuffix ? `${defaultSource} • ${sourceSuffix}` : defaultSource);
  }

  const diffMs = Date.now() - ts;
  if (diffMs < 0) {
    return sourceSuffix ? `Just now • ${sourceSuffix}` : "Just now";
  }

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  let timeAgo = "";
  if (diffMin < 1) timeAgo = "Just now";
  else if (diffMin < 60) timeAgo = `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  else if (diffHour < 24) timeAgo = `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  else timeAgo = "Latest Official Dispatch";

  return sourceSuffix ? `${timeAgo} • ${sourceSuffix}` : timeAgo;
}

const PROVIDER_COLORS: Record<string, string> = {
  google: "#0052FF",
  microsoft: "#00A4EF",
  nvidia: "#059669",
  anthropic: "#D97706",
  openai: "#7C3AED",
  meta: "#0081FB",
  apple: "#0284C7",
  intel: "#0071C5",
  dawn: "#059669",
  brecorder: "#0284C7",
  propakistani: "#D97706",
  tribune: "#DC2626",
};

const DEFAULT_BRAND_FALLBACKS: Record<string, string> = {
  apple: "https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg",
  openai: "/uploads/live_news/openai_gpt4o_official.png",
  microsoft: "/uploads/live_news/microsoft_copilot_hero.jpg",
  nvidia: "/uploads/live_news/nvidia_skild_ai.jpg",
  google: "/uploads/live_news/google_venice_film_fest.png",
  meta: "/uploads/live_news/meta_muse_hero.jpg",
  anthropic: "/uploads/live_news/anthropic_fable_mythos_hero.jpg",
  intel: "/uploads/live_news/intel_high_na_euv_cleanroom.png",
  dawn: "https://i.dawn.com/large/2026/09/21112713801fded.webp",
  brecorder: "https://i.brecorder.com/large/2026/09/220759353d42770.webp",
  propakistani: "https://propakistani.pk/wp-content/uploads/2026/09/Vivo-X500-2.jpg",
  tribune: "https://i.tribune.com.pk/media/images/robot-r1790005546-0/robot-r1790005546-0.jpg",
};

function normalizeImagePath(
  img: string | undefined,
  fallback = "/uploads/live_news/openai_gpt4o_official.png",
  version?: string | number | null
): string {
  const target = !img || !img.trim() ? fallback : img.trim();
  const normalized = target.startsWith("http://") || target.startsWith("https://") || target.startsWith("/")
    ? target
    : `/${target}`;
  return withCacheBuster(normalized, version);
}

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
        const pubTime = live.provider_published_at || live.timestamp;
        const fallback = DEFAULT_BRAND_FALLBACKS[item.id] || item.img;
        return {
          ...item,
          title: live.title || item.title,
          summary: live.desc || live.summary || item.summary,
          date: formatDynamicRelativeTime(pubTime, live.date, item.source || item.brandBadge),
          link: live.link || item.link,
          img: normalizeImagePath(rawImg, fallback, pubTime),
          cat: live.tag || live.category || item.cat,
        };
      });

      const breakingNews: LiveNewsItem[] =
        Array.isArray(parsed.breaking_news) && parsed.breaking_news.length > 0
          ? parsed.breaking_news.map((item: any, idx: number) => {
              const rawImg = item.image || item.img || "";
              const pKey = (item.provider || "google").toLowerCase();
              const pubTime = item.provider_published_at || item.timestamp || parsed.timestamp;
              const fallback = DEFAULT_BRAND_FALLBACKS[pKey] || "/uploads/live_news/openai_gpt4o_official.png";
              return {
                id: item.id || item.external_id || `${pKey}-${idx}`,
                provider: pKey,
                tag: item.tag || "TECH NEWS",
                providerLabel: item.providerLabel || item.brand_badge || (item.provider ? item.provider.toUpperCase() : "TECH"),
                providerColor: PROVIDER_COLORS[pKey] || "#475569",
                date: formatDynamicRelativeTime(pubTime, item.date, item.source || item.provider?.toUpperCase()),
                source: item.source || "Tech Newsroom",
                title: item.title || "",
                desc: item.desc || item.summary || "",
                link: item.link || "#",
                img: normalizeImagePath(rawImg, fallback, pubTime),
                source_image_url: item.source_image_url || rawImg,
                timestamp: pubTime || parsed.timestamp,
              };
            })
          : INITIAL_STORIES;

      const regionalWiresList: RegionalWireItem[] = (() => {
        const order = ["dawn", "brecorder", "propakistani", "tribune"];
        const list: RegionalWireItem[] = [];
        for (const key of order) {
          const item = parsed.regional_wires?.[key] || INITIAL_REGIONAL_WIRES.find((w) => w.id === key);
          if (item) {
            const pubTime = item.provider_published_at || item.timestamp;
            const fallback = DEFAULT_BRAND_FALLBACKS[key] || item.image || item.img;
            list.push({
              id: key,
              name: item.name || key.toUpperCase(),
              icon: item.icon || "🇵🇰",
              brandBadge: item.brandBadge || `🇵🇰 ${key.toUpperCase()}`,
              category: item.category || "PAKISTAN TECH",
              date: formatDynamicRelativeTime(pubTime, item.date, item.sourceName || item.name),
              title: item.title,
              summary: item.summary,
              sourceName: item.sourceName || item.name,
              sourceUrl: item.sourceUrl,
              image: normalizeImagePath(item.image || item.img, fallback, pubTime),
            });
          }
        }
        return list.length === 4 ? list : INITIAL_REGIONAL_WIRES;
      })();

      return { brandWiresList, breakingNews, regionalWiresList };
    }
  } catch (err) {
    console.error("Error reading initial news data on server:", err);
  }
  return { brandWiresList: brandWires, breakingNews: INITIAL_STORIES, regionalWiresList: INITIAL_REGIONAL_WIRES };
}

export default function KnowledgeCenterPage() {
  const { brandWiresList, breakingNews, regionalWiresList } = getInitialNewsData();

  return (
    <>
      <KnowledgeHero />
      <div className="w-full bg-[#F7F6F5] text-[#0F172A] font-sans">
        <LatestTechNews initialStories={breakingNews} />
        <BrandTechWires initialWires={brandWiresList} />
        <RegionalTechEcosystem initialWires={regionalWiresList} />
        <KnowledgeOverviewGrid />
        <Testimonial3DDeck />
      </div>
    </>
  );
}
