import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { syncAllNewsFeeds } from "@/lib/newsSync";

export interface LiveNewsItem {
  id: string;
  provider: string;
  tag: string;
  providerLabel: string;
  providerColor: string;
  date: string;
  source: string;
  title: string;
  desc: string;
  link: string;
  img: string;
  source_image_url?: string;
  timestamp?: string;
}

const PROVIDER_METADATA: Record<string, { color: string; label: string }> = {
  google: { color: "#0052FF", label: "🌐 GOOGLE • AI & DEVICES" },
  microsoft: { color: "#00A4EF", label: "🪟 MICROSOFT • CLOUD & COPILOT" },
  nvidia: { color: "#059669", label: "⚡ NVIDIA • ACCELERATED AI" },
  anthropic: { color: "#D97706", label: "🧠 ANTHROPIC • SAFETY RESEARCH" },
  openai: { color: "#7C3AED", label: "🤖 OPENAI • AI REASONING" },
  meta: { color: "#0081FB", label: "♾️ META • OPEN SOURCE AI" },
  apple: { color: "#0284C7", label: "🍎 APPLE • HARDWARE & SILICON" },
  intel: { color: "#0071C5", label: "🔷 INTEL • NEXT-GEN SILICON" },
  dawn: { color: "#059669", label: "🇵🇰 DAWN • TECH & SCIENCE" },
  brecorder: { color: "#0284C7", label: "🇵🇰 B-RECORDER • FINTECH" },
  propakistani: { color: "#D97706", label: "🇵🇰 PROPAKISTANI • DIGITAL ECOSYSTEM" },
  tribune: { color: "#DC2626", label: "🇵🇰 TRIBUNE • AEROSPACE & TECH" },
};

function normalizeImagePath(img: string | undefined): string {
  if (!img) return "/uploads/live_news/apple_iphone16_hero.jpg";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/")) return img;
  return `/${img}`;
}

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
  const diffDay = Math.floor(diffHour / 24);

  let timeAgo = "";
  if (diffMin < 1) timeAgo = "Just now";
  else if (diffMin < 60) timeAgo = `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  else if (diffHour < 24) timeAgo = `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  else timeAgo = "Latest Official Dispatch";

  return sourceSuffix ? `${timeAgo} • ${sourceSuffix}` : timeAgo;
}

let lastSyncTime = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get("sync") === "true" || searchParams.get("refresh") === "true";

    const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");

    const backupPath = path.join(process.cwd(), "public", "data", "live_news_cache.backup.json");

    // If cache does not exist, restore from gold master backup immediately
    if (!fs.existsSync(localCachePath) && fs.existsSync(backupPath)) {
      try {
        fs.copyFileSync(backupPath, localCachePath);
      } catch {}
    }

    // Check if cache is stale (older than 15 minutes or missing)
    let isStale = false;
    if (fs.existsSync(localCachePath)) {
      try {
        const stats = fs.statSync(localCachePath);
        if (Date.now() - stats.mtimeMs > 15 * 60 * 1000) {
          isStale = true;
        }
      } catch {}
    } else {
      isStale = true;
    }

    // Trigger sync if forceSync OR if cache is stale (debounced every 5 minutes)
    const canSync = forceSync || (isStale && Date.now() - lastSyncTime > 5 * 60 * 1000);
    if (canSync) {
      lastSyncTime = Date.now();
      if (forceSync) {
        try {
          await syncAllNewsFeeds();
        } catch (err: any) {
          console.error("Live news sync error:", err.message);
        }
      } else {
        // Non-blocking background sync so user response is immediate
        syncAllNewsFeeds().catch((err: any) => {
          console.error("Background live news sync error:", err.message);
        });
      }
    }

    if (!fs.existsSync(localCachePath)) {
      return NextResponse.json(
        {
          status: "fallback",
          timestamp: new Date().toISOString(),
          count: 0,
          breaking_news: [],
          brand_wires: {},
          regional_wires: {},
        },
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    const rawData = fs.readFileSync(localCachePath, "utf-8");
    const parsed = JSON.parse(rawData);

    const breakingRaw: any[] = parsed.breaking_news || [];
    const breakingNews: LiveNewsItem[] = breakingRaw.map((item, idx) => {
      const pKey = (item.provider || "google").toLowerCase();
      const meta = PROVIDER_METADATA[pKey] || {
        color: "#475569",
        label: pKey.toUpperCase(),
      };

      const pubTime = item.provider_published_at || parsed.timestamp;

      return {
        id: item.external_id || `${pKey}-${idx}`,
        provider: pKey,
        tag: item.tag || meta.label,
        providerLabel: meta.label,
        providerColor: meta.color,
        date: formatDynamicRelativeTime(pubTime, item.date, item.source || meta.label),
        source: item.source || "Official Tech Newsroom",
        title: item.title || "",
        desc: item.desc || "",
        link: item.link || "#",
        img: normalizeImagePath(item.img),
        source_image_url: item.source_image_url || "",
        timestamp: pubTime || new Date().toISOString(),
      };
    });

    const rawBrandWires = parsed.brand_wires || {};
    const brandWiresClean: Record<string, any> = {};
    for (const [k, v] of Object.entries(rawBrandWires)) {
      const item: any = v;
      const pubTime = item.provider_published_at || item.timestamp;
      brandWiresClean[k] = {
        ...item,
        date: formatDynamicRelativeTime(pubTime, item.date, item.source || item.captionTag || "Official Wire"),
        img: normalizeImagePath(item.img || item.image),
      };
    }

    const rawRegionalWires = parsed.regional_wires || {};
    const regionalWiresClean: Record<string, any> = {};
    for (const [k, v] of Object.entries(rawRegionalWires)) {
      const item: any = v;
      const pubTime = item.provider_published_at || item.timestamp;
      regionalWiresClean[k] = {
        ...item,
        date: formatDynamicRelativeTime(pubTime, item.date, item.sourceName || item.brandBadge || "Regional Wire"),
        image: normalizeImagePath(item.image || item.img),
        img: normalizeImagePath(item.img || item.image),
      };
    }

    return NextResponse.json(
      {
        status: "success",
        timestamp: parsed.timestamp || new Date().toISOString(),
        count: breakingNews.length,
        breaking_news: breakingNews,
        brand_wires: brandWiresClean,
        regional_wires: regionalWiresClean,
        regional_items: parsed.regional_items || [],
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Failed to load live news",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}
