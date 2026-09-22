import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  fetchAllAggregatedNews,
  revalidateAllNews,
  syncAllNewsFeeds,
  AggregatedArticle,
} from "@/lib/newsSync";
import { withCacheBuster } from "@/lib/cacheBuster";

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
  image: string;
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

  let timeAgo = "";
  if (diffMin < 1) timeAgo = "Just now";
  else if (diffMin < 60) timeAgo = `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  else if (diffHour < 24) timeAgo = `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  else timeAgo = "Latest Official Dispatch";

  return sourceSuffix ? `${timeAgo} • ${sourceSuffix}` : timeAgo;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get("sync") === "true" || searchParams.get("refresh") === "true";

    // Immediate on-demand cache invalidation when refresh requested
    if (forceSync) {
      revalidateAllNews();
      await syncAllNewsFeeds().catch(() => {});
    }

    // Fetch all aggregated news via per-source isolated cache
    const allArticles = await fetchAllAggregatedNews();

    // Map each article ensuring title, image, source, and unique id are never mismatched
    const breakingNews: LiveNewsItem[] = allArticles.map((item) => {
      const pKey = (item.provider || "google").toLowerCase();
      const meta = PROVIDER_METADATA[pKey] || {
        color: "#475569",
        label: item.providerLabel || pKey.toUpperCase(),
      };

      const rawNormalized = normalizeImagePath(item.image || item.img);
      const finalImg = withCacheBuster(rawNormalized, item.timestamp || item.date || item.id);

      return {
        id: item.id,
        provider: pKey,
        tag: item.tag || meta.label,
        providerLabel: meta.label,
        providerColor: meta.color,
        date: formatDynamicRelativeTime(item.timestamp, item.date, item.source || meta.label),
        source: item.source || meta.label,
        title: item.title,
        desc: item.desc,
        link: item.link,
        img: finalImg,
        image: finalImg,
        source_image_url: item.image || "",
        timestamp: item.timestamp,
      };
    });

    // Group for brand wires (international) and regional wires (Pakistani)
    const brandWiresClean: Record<string, any> = {};
    const regionalWiresClean: Record<string, any> = {};
    const regionalItems: any[] = [];

    for (const item of breakingNews) {
      const pKey = item.provider;
      const isRegional = ["dawn", "brecorder", "propakistani", "tribune"].includes(pKey);

      if (!isRegional) {
        const isValidBrandTitle =
          item.title && item.title.trim().length >= 10 && !item.title.trim().startsWith("-");
        if (!brandWiresClean[pKey] && isValidBrandTitle) {
          brandWiresClean[pKey] = {
            id: pKey,
            brandBadge: item.providerLabel,
            captionTag: `${pKey.toUpperCase()} OFFICIAL WIRE`,
            cat: item.tag,
            date: item.date,
            title: item.title,
            summary: item.desc,
            source: item.source,
            link: item.link,
            img: item.img,
            caption: `📷 ${item.title}`,
            provider_published_at: item.timestamp,
          };
        }
      } else {
        if (!regionalWiresClean[pKey]) {
          regionalWiresClean[pKey] = {
            id: pKey,
            name: item.source,
            brandBadge: item.providerLabel,
            category: item.tag,
            date: item.date,
            title: item.title,
            summary: item.desc,
            sourceName: item.source,
            sourceUrl: item.link,
            link: item.link,
            image: item.img,
            img: item.img,
            provider_published_at: item.timestamp,
          };
        }
        regionalItems.push(item);
      }
    }

    // Guarantee all 4 regional wires are always present and never dropped
    const DEFAULT_REGIONAL_FALLBACKS: Record<string, any> = {
      dawn: {
        id: "dawn",
        name: "Dawn Sci-Tech",
        brandBadge: "🇵🇰 DAWN TECH",
        category: "PAKISTAN TECH & SCIENCE",
        date: "Dawn Sci-Tech (Live Wire)",
        title: "'I live in fear': 1.5 million Pakistani children sexually exploited online",
        summary: "Digital safety advocates and law enforcement highlight urgency for cyber safety measures protecting children across Pakistan's digital space.",
        sourceName: "Dawn Sci-Tech",
        sourceUrl: "https://www.dawn.com/feeds/tech/",
        link: "https://www.dawn.com/feeds/tech/",
        image: withCacheBuster("https://i.dawn.com/large/2026/09/21112713801fded.webp", Date.now()),
        img: withCacheBuster("https://i.dawn.com/large/2026/09/21112713801fded.webp", Date.now()),
      },
      brecorder: {
        id: "brecorder",
        name: "Business Recorder",
        brandBadge: "🇵🇰 B-RECORDER",
        category: "PAKISTAN FINTECH & BUSINESS",
        date: "Business Recorder (Live Wire)",
        title: "Alibaba plans AI model with 5 trillion to 10 trillion parameters, unveils new chip",
        summary: "Alibaba Cloud announces next-generation frontier AI model scaling to 10 trillion parameters alongside specialized accelerator silicon for enterprise cloud infrastructure.",
        sourceName: "Business Recorder",
        sourceUrl: "https://www.brecorder.com/feeds/technology/",
        link: "https://www.brecorder.com/feeds/technology/",
        image: withCacheBuster("https://i.brecorder.com/large/2026/09/220759353d42770.webp", Date.now()),
        img: withCacheBuster("https://i.brecorder.com/large/2026/09/220759353d42770.webp", Date.now()),
      },
      propakistani: {
        id: "propakistani",
        name: "ProPakistani",
        brandBadge: "🇵🇰 PROPAKISTANI",
        category: "PAKISTAN DIGITAL ECOSYSTEM",
        date: "ProPakistani (Live Wire)",
        title: "Vivo X500 Brings Gimbal-Level Stabilization, 3x Optical Zoom",
        summary: "Vivo officially unveils the X500 series featuring micro-gimbal optical stabilization, customized periscope optics, and next-generation battery architecture.",
        sourceName: "ProPakistani",
        sourceUrl: "https://propakistani.pk/category/tech-and-telecom/feed/",
        link: "https://propakistani.pk/category/tech-and-telecom/feed/",
        image: withCacheBuster("https://propakistani.pk/wp-content/uploads/2026/09/Vivo-X500-2.jpg", Date.now()),
        img: withCacheBuster("https://propakistani.pk/wp-content/uploads/2026/09/Vivo-X500-2.jpg", Date.now()),
      },
      tribune: {
        id: "tribune",
        name: "The Express Tribune",
        brandBadge: "🇵🇰 TRIBUNE",
        category: "PAKISTAN AEROSPACE & TECH",
        date: "The Express Tribune (Live Wire)",
        title: "Kojima Productions comments on PlayStation relationship after PHYSINT split",
        summary: "Hideo Kojima clarifies long-standing production and publishing partnerships with Sony Interactive Entertainment following announcement of upcoming tactical espionage action title.",
        sourceName: "The Express Tribune",
        sourceUrl: "https://tribune.com.pk/feed/technology",
        link: "https://tribune.com.pk/feed/technology",
        image: withCacheBuster("https://i.tribune.com.pk/media/images/silent-hill-f-11759313708-0/silent-hill-f-11759313708-0.png", Date.now()),
        img: withCacheBuster("https://i.tribune.com.pk/media/images/silent-hill-f-11759313708-0/silent-hill-f-11759313708-0.png", Date.now()),
      },
    };

    for (const rKey of ["dawn", "brecorder", "propakistani", "tribune"]) {
      if (!regionalWiresClean[rKey] && DEFAULT_REGIONAL_FALLBACKS[rKey]) {
        regionalWiresClean[rKey] = DEFAULT_REGIONAL_FALLBACKS[rKey];
      }
    }

    // Guarantee all 8 international brand wires are always present and never dropped
    const DEFAULT_BRAND_FALLBACKS: Record<string, any> = {
      apple: {
        id: "apple",
        brandBadge: "🍎 APPLE",
        captionTag: "APPLE OFFICIAL WIRE",
        cat: "HARDWARE & SILICON",
        date: "Apple Newsroom (Live Wire)",
        title: "Apple opens Apple Music Hall, a state-of-the-art live music venue in London",
        summary: "Apple today announced the grand opening of Apple Music Hall, a state-of-the-art live music and broadcast venue located in the historic Battersea Power Station in London.",
        source: "Apple Newsroom",
        link: "https://www.apple.com/newsroom/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/",
        img: withCacheBuster("https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg", Date.now()),
        caption: "📷 Apple opens Apple Music Hall",
      },
      microsoft: {
        id: "microsoft",
        brandBadge: "🪟 MICROSOFT",
        captionTag: "MICROSOFT OFFICIAL WIRE",
        cat: "ENTERPRISE CLOUD & AI",
        date: "Microsoft News Center (Live Wire)",
        title: "What we’ve learned from Microsoft’s own AI transformation",
        summary: "Microsoft leaders share key lessons and telemetry from enterprise Copilot adoption, business automation, and sovereign cloud AI across global operations.",
        source: "Microsoft Official Blog",
        link: "https://blogs.microsoft.com/blog/2026/09/17/what-weve-learned-from-microsofts-own-ai-transformation/",
        img: withCacheBuster("https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Hero-FINAL-9_17-1024x683.jpg", Date.now()),
        caption: "📷 What we’ve learned from Microsoft’s own AI transformation",
      },
      meta: {
        id: "meta",
        brandBadge: "♾️ META",
        captionTag: "META OFFICIAL WIRE",
        cat: "OPEN SOURCE AI & INFRASTRUCTURE",
        date: "Meta Newsroom (Live Wire)",
        title: "Announcing Petal, a First-of-its-Kind Transoceanic Subsea Cable",
        summary: "Meta announces Petal, an ultra-high capacity transoceanic subsea fiber optic infrastructure linking global cloud regions to support distributed AI training and inference.",
        source: "Meta Newsroom",
        link: "https://about.fb.com/news/2026/09/announcing-petal-meta-petabit-transoceanic-cable/",
        img: withCacheBuster("https://about.fb.com/wp-content/uploads/2026/09/Announcing-Petal-a-First-of-its-Kind-Transoceanic-Subsea-Cable_Header.jpg", Date.now()),
        caption: "📷 Announcing Petal, a First-of-its-Kind Transoceanic Subsea Cable",
      },
      openai: {
        id: "openai",
        brandBadge: "🤖 OPENAI",
        captionTag: "OPENAI OFFICIAL WIRE",
        cat: "GENERATIVE AI & REASONING",
        date: "OpenAI Newsroom (Live Wire)",
        title: "Advisory Group on Mathematics and Artificial Intelligence",
        summary: "OpenAI announces the formation of an external Advisory Group on Mathematics and Artificial Intelligence to evaluate automated theorem proving and frontier reasoning.",
        source: "OpenAI Newsroom",
        link: "https://openai.com/index/advisory-group-on-mathematics-and-artificial-intelligence/",
        img: withCacheBuster("https://images.ctfassets.net/kftzwdyauwt9/11yqmSO7D1dfYveBnOdmJt/e451277f37f82f51d6d20f2b86826590/advisory-group-on-mathematics-and-artificial-intelligence-seo.png?w=1600&h=900&fit=fill", Date.now()),
        caption: "📷 Advisory Group on Mathematics and Artificial Intelligence",
      },
      nvidia: {
        id: "nvidia",
        brandBadge: "⚡ NVIDIA",
        captionTag: "NVIDIA OFFICIAL WIRE",
        cat: "ACCELERATED COMPUTING & AI",
        date: "NVIDIA Official Blog (Live Wire)",
        title: "NVIDIA Launches DSX Ready to Qualify Power and Cooling Products for AI Factories",
        summary: "NVIDIA launches the DSX Ready qualification program to standardize power delivery and liquid cooling solutions for multi-gigawatt gigascale AI factories.",
        source: "NVIDIA Official Blog",
        link: "https://blogs.nvidia.com/blog/dsx-ready-ai-factories-power-cooling/",
        img: withCacheBuster("https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png", Date.now()),
        caption: "📷 NVIDIA Launches DSX Ready",
      },
      google: {
        id: "google",
        brandBadge: "🌐 GOOGLE",
        captionTag: "GOOGLE OFFICIAL WIRE",
        cat: "GOOGLE AI & DEVICES",
        date: "Google The Keyword (Live Wire)",
        title: "Expanding free AI training for educators",
        summary: "Google expands its generative AI training programs and interactive classroom curriculum tools for educators and academic institutions worldwide.",
        source: "Google The Keyword",
        link: "https://blog.google/products-and-platforms/products/education/digital-promise/",
        img: withCacheBuster("https://storage.googleapis.com/gweb-uniblog-publish-prod/images/28525___EDNA_Blog_header_01.max-600x600.format-webp.webp", Date.now()),
        caption: "📷 Expanding free AI training for educators",
      },
      anthropic: {
        id: "anthropic",
        brandBadge: "🧠 ANTHROPIC",
        captionTag: "ANTHROPIC OFFICIAL WIRE",
        cat: "FRONTIER AI & SCIENCE",
        date: "Anthropic Research (Live Wire)",
        title: "Introducing Claude Fable 5.1 and Claude Mythos 5.1",
        summary: "Anthropic announces Claude Fable 5.1 and Claude Mythos 5.1, setting new industry records in multi-agent orchestration, complex logic reasoning, and constitutional cybersecurity safeguards.",
        source: "Anthropic Research",
        link: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
        img: withCacheBuster("/uploads/live_news/anthropic_fable_mythos_hero.jpg", Date.now()),
        caption: "📷 Introducing Claude Fable 5.1 and Claude Mythos 5.1",
      },
      intel: {
        id: "intel",
        brandBadge: "🔷 INTEL",
        captionTag: "INTEL OFFICIAL WIRE",
        cat: "NEXT-GEN SILICON & SEMICONDUCTORS",
        date: "Intel Newsroom (Live Wire)",
        title: "Intel on-the-ground at the AI Infra Summit",
        summary: "Intel CEO Lip-Bu Tan emphasizes that the future of AI will be built through open, heterogeneous systems spanning silicon, software, and ecosystem partnerships during fireside chat at AI Infra Summit.",
        source: "Intel Newsroom",
        link: "https://www.intel.com/content/www/us/en/newsroom/news/artificial-intelligence/intel-on-the-ground-at-the-ai-infra-summit.html",
        img: withCacheBuster("/uploads/live_news/intel_ai_infra_summit_2026.jpg", Date.now()),
        caption: "📷 Intel on-the-ground at the AI Infra Summit",
      },
    };

    for (const bKey of ["apple", "microsoft", "meta", "openai", "nvidia", "google", "anthropic", "intel"]) {
      if (!brandWiresClean[bKey] && DEFAULT_BRAND_FALLBACKS[bKey]) {
        brandWiresClean[bKey] = DEFAULT_BRAND_FALLBACKS[bKey];
      }
    }

    return NextResponse.json(
      {
        status: "success",
        timestamp: new Date().toISOString(),
        count: breakingNews.length,
        breaking_news: breakingNews,
        brand_wires: brandWiresClean,
        regional_wires: regionalWiresClean,
        regional_items: regionalItems,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: any) {
    // Graceful fallback to disk cache if available
    try {
      const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");
      if (fs.existsSync(localCachePath)) {
        const raw = fs.readFileSync(localCachePath, "utf-8");
        const parsed = JSON.parse(raw);
        return NextResponse.json(parsed, {
          headers: { "Cache-Control": "no-cache" },
        });
      }
    } catch {}

    return NextResponse.json(
      { status: "error", message: error.message || "Failed to load live news" },
      { status: 500 }
    );
  }
}
