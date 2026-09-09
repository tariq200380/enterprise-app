import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

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
  if (!img) return "/uploads/live_news/apple_-unveils-iphone-duo_eafc7d9c1ea0.jpg";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/")) return img;
  return `/${img}`;
}

let lastSyncTime = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get("sync") === "true" || searchParams.get("refresh") === "true";

    const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");
    const externalCachePath = "/home/tariq/Desktop/procreedtech/public_html/data/live_news_cache.json";
    const externalUploadsDir = "/home/tariq/Desktop/procreedtech/public_html/uploads/live_news";
    const localUploadsDir = path.join(process.cwd(), "public", "uploads", "live_news");

    // If external cache is newer, sync to public
    if (fs.existsSync(externalCachePath)) {
      try {
        const extStats = fs.statSync(externalCachePath);
        const locStats = fs.existsSync(localCachePath) ? fs.statSync(localCachePath) : null;
        if (!locStats || extStats.mtimeMs > locStats.mtimeMs) {
          fs.copyFileSync(externalCachePath, localCachePath);
        }
      } catch {}
    }

    // Check if cache is stale (older than 30 minutes or missing)
    let isStale = false;
    if (fs.existsSync(localCachePath)) {
      try {
        const stats = fs.statSync(localCachePath);
        if (Date.now() - stats.mtimeMs > 30 * 60 * 1000) {
          isStale = true;
        }
      } catch {}
    } else {
      isStale = true;
    }

    // Trigger background sync if requested OR if cache is stale (debounced every 10 mins)
    const canSync = forceSync || (isStale && Date.now() - lastSyncTime > 10 * 60 * 1000);
    if (canSync && fs.existsSync("/home/tariq/Desktop/procreedtech/public_html/cron/import_news.php")) {
      lastSyncTime = Date.now();
      exec(
        `php /home/tariq/Desktop/procreedtech/public_html/cron/import_news.php && cp -ru ${externalUploadsDir}/* ${localUploadsDir}/ 2>/dev/null || true && cp ${externalCachePath} ${localCachePath} 2>/dev/null || true`,
        (err) => {
          if (err) console.error("Live news background sync error:", err.message);
        }
      );
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

      return {
        id: item.external_id || `${pKey}-${idx}`,
        provider: pKey,
        tag: item.tag || meta.label,
        providerLabel: meta.label,
        providerColor: meta.color,
        date: item.date || "Live RSS Feed",
        source: item.source || "Official Tech Newsroom",
        title: item.title || "",
        desc: item.desc || "",
        link: item.link || "#",
        img: normalizeImagePath(item.img),
        source_image_url: item.source_image_url || "",
        timestamp: item.provider_published_at || parsed.timestamp || new Date().toISOString(),
      };
    });

    return NextResponse.json(
      {
        status: "success",
        timestamp: parsed.timestamp || new Date().toISOString(),
        count: breakingNews.length,
        breaking_news: breakingNews,
        brand_wires: parsed.brand_wires || {},
        regional_wires: parsed.regional_wires || {},
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
