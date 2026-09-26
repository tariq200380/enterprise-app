import fs from "fs";
import path from "path";
import {
  fetchAllAggregatedNews,
  fetchLiveNewsFromDb,
  fetchLatestProviderArticlesFromDb,
  AggregatedArticle,
} from "@/lib/newsSync";
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
  BRAND_FALLBACK_IMAGES,
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

const DEFAULT_NEUTRAL_IMAGE = BRAND_FALLBACK_IMAGES.google;

function normalizeImagePath(
  img: string | undefined,
  fallback = DEFAULT_NEUTRAL_IMAGE,
  version?: string | number | null,
  provider = ""
): string {
  const pKey = provider.toLowerCase();
  const brandDefault = BRAND_FALLBACK_IMAGES[pKey] || fallback;
  const target =
    !img ||
    !img.trim() ||
    img.includes("kc-news.webp") ||
    img.includes("25a7c99743ebfb3b") ||
    img.includes("8a4eb6c412e5e7ffa38f07233344f4b7e6644994") ||
    img.toLowerCase().includes("omb-home-final") ||
    (pKey === "microsoft" && (img.includes("blogs.microsoft.com") || img.includes("thesourcemediaassets")))
      ? brandDefault
      : img.trim();
  const normalized = target.startsWith("http://") || target.startsWith("https://") || target.startsWith("/")
    ? target
    : `/${target}`;
  return withCacheBuster(normalized, version);
}

const SSR_FETCH_TIMEOUT_MS = 1500;

function readDiskCache(): { brandWiresList: BrandWireItem[]; breakingNews: LiveNewsItem[]; regionalWiresList: RegionalWireItem[] } | null {
  try {
    const cachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");
    if (!fs.existsSync(cachePath)) return null;
    const raw = fs.readFileSync(cachePath, "utf-8");
    const parsed = JSON.parse(raw);

    const brandWiresList: BrandWireItem[] = brandWires.map((item) => {
      const live = parsed.brand_wires?.[item.id];
      if (!live) return item;
      const rawImg = live.img || DEFAULT_NEUTRAL_IMAGE;
      const pubTime = live.provider_published_at || live.timestamp;
      return {
        ...item,
        title: live.title || item.title,
        summary: live.desc || live.summary || item.summary,
        date: formatDynamicRelativeTime(pubTime, live.date, item.source || item.brandBadge),
        link: live.link || item.link,
        img: normalizeImagePath(rawImg, DEFAULT_NEUTRAL_IMAGE, pubTime, item.id),
        cat: live.tag || live.category || item.cat,
      };
    });

    const breakingNews: LiveNewsItem[] =
      Array.isArray(parsed.breaking_news) && parsed.breaking_news.length > 0
        ? parsed.breaking_news.map((item: any, idx: number) => {
            const rawImg = item.image || item.img || "";
            const pKey = (item.provider || "google").toLowerCase();
            const pubTime = item.provider_published_at || item.timestamp || parsed.timestamp;
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
              img: normalizeImagePath(rawImg, DEFAULT_NEUTRAL_IMAGE, pubTime, pKey),
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
            image: normalizeImagePath(item.image || item.img, DEFAULT_NEUTRAL_IMAGE, pubTime, key),
          });
        }
      }
      return list.length === 4 ? list : INITIAL_REGIONAL_WIRES;
    })();

    return { brandWiresList, breakingNews, regionalWiresList };
  } catch (err) {
    console.error("Error reading disk news cache fallback:", err);
    return null;
  }
}

function formatArticlesData(
  allArticles: AggregatedArticle[],
  latestPerProvider: Record<string, AggregatedArticle> = {}
) {
  const brandWiresList: BrandWireItem[] = brandWires.map((item) => {
    const aiStory = allArticles.find(
      (a) =>
        a.provider.toLowerCase() === item.id.toLowerCase() &&
        !a.title.toLowerCase().includes("crispr") &&
        !a.title.toLowerCase().includes("enzyme") &&
        (a.title.toLowerCase().includes("opus") ||
          a.title.toLowerCase().includes("sonnet") ||
          a.title.toLowerCase().includes("gemini") ||
          a.title.toLowerCase().includes("claude") ||
          a.title.toLowerCase().includes("copilot"))
    );
    const live =
      aiStory ||
      (latestPerProvider[item.id.toLowerCase()] &&
       !latestPerProvider[item.id.toLowerCase()].title.toLowerCase().includes("crispr") &&
       !latestPerProvider[item.id.toLowerCase()].title.toLowerCase().includes("enzyme")
        ? latestPerProvider[item.id.toLowerCase()]
        : null) ||
      allArticles.find(
        (a) =>
          a.provider.toLowerCase() === item.id.toLowerCase() &&
          !a.title.toLowerCase().includes("crispr") &&
          !a.title.toLowerCase().includes("enzyme")
      ) ||
      allArticles.find((a) => a.provider.toLowerCase() === item.id.toLowerCase());
    if (!live) return item;
    const rawImg = live.image || live.img || DEFAULT_NEUTRAL_IMAGE;
    const pubTime = live.timestamp || live.date;
    return {
      ...item,
      title: live.title || item.title,
      summary: live.desc || item.summary,
      date: formatDynamicRelativeTime(pubTime, live.date, item.source || item.brandBadge),
      link: live.link || item.link,
      img: normalizeImagePath(rawImg, DEFAULT_NEUTRAL_IMAGE, pubTime, item.id),
      cat: live.tag || item.cat,
    };
  });

  const breakingNews: LiveNewsItem[] = allArticles.map((item, idx) => {
    const pKey = (item.provider || "google").toLowerCase();
    const pubTime = item.timestamp || item.date;
    const rawImg = item.image || item.img || "";
    return {
      id: item.id || `${pKey}-${idx}`,
      provider: pKey,
      tag: item.tag || "TECH NEWS",
      providerLabel: item.providerLabel || (item.provider ? item.provider.toUpperCase() : "TECH"),
      providerColor: PROVIDER_COLORS[pKey] || "#475569",
      date: formatDynamicRelativeTime(pubTime, item.date, item.source || item.provider?.toUpperCase()),
      source: item.source || "Tech Newsroom",
      title: item.title || "",
      desc: item.desc || "",
      link: item.link || "#",
      img: normalizeImagePath(rawImg, DEFAULT_NEUTRAL_IMAGE, pubTime, pKey),
      source_image_url: item.image || rawImg,
      timestamp: pubTime,
    };
  });

  const regionalWiresList: RegionalWireItem[] = (() => {
    const order = ["dawn", "brecorder", "propakistani", "tribune"];
    const list: RegionalWireItem[] = [];
    for (const key of order) {
      const defaultWire = INITIAL_REGIONAL_WIRES.find((w) => w.id === key);
      const live = latestPerProvider[key] ||
        allArticles.find((a) => a.provider.toLowerCase() === key.toLowerCase());
      if (live) {
        const pubTime = live.timestamp || live.date;
        list.push({
          id: key,
          name: live.source || defaultWire?.name || key.toUpperCase(),
          icon: defaultWire?.icon || "🇵🇰",
          brandBadge: live.providerLabel || defaultWire?.brandBadge || `🇵🇰 ${key.toUpperCase()}`,
          category: live.tag || defaultWire?.category || "PAKISTAN TECH",
          date: formatDynamicRelativeTime(pubTime, live.date, live.source || defaultWire?.name),
          title: live.title || defaultWire?.title || "",
          summary: live.desc || defaultWire?.summary || "",
          sourceName: live.source || defaultWire?.sourceName || key.toUpperCase(),
          sourceUrl: live.link || defaultWire?.sourceUrl || "",
          image: normalizeImagePath(live.image || live.img, DEFAULT_NEUTRAL_IMAGE, pubTime, key),
        });
      } else if (defaultWire) {
        list.push(defaultWire);
      }
    }
    return list.length === 4 ? list : INITIAL_REGIONAL_WIRES;
  })();

  return { brandWiresList, breakingNews, regionalWiresList };
}

async function getInitialNewsData() {
  // 1. Primary Strategy: Database-First Hydration from local PostgreSQL (<10ms verified live)
  try {
    const [dbArticles, latestPerProvider] = await Promise.all([
      fetchLiveNewsFromDb(28),
      fetchLatestProviderArticlesFromDb(),
    ]);
    if (dbArticles && dbArticles.length > 0) {
      // Trigger background sync non-blockingly to keep database and cache warm
      fetchAllAggregatedNews().catch(() => {});
      return formatArticlesData(dbArticles, latestPerProvider);
    }
  } catch (dbErr) {
    console.warn("PostgreSQL fetch error on Knowledge Center SSR:", dbErr);
  }

  // 2. Secondary Strategy: Disk Cache
  const diskFallback = readDiskCache();
  if (diskFallback) {
    return diskFallback;
  }

  // 3. Fallback to initial stories
  return { brandWiresList: brandWires, breakingNews: INITIAL_STORIES, regionalWiresList: INITIAL_REGIONAL_WIRES };
}

export default async function KnowledgeCenterPage() {
  const { brandWiresList, breakingNews, regionalWiresList } = await getInitialNewsData();

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
