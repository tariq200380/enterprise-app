import fs from "fs";
import path from "path";

export interface FeedProviderConfig {
  key: string;
  name: string;
  icon: string;
  brandBadge: string;
  category: string;
  sourceName: string;
  defaultImage: string;
  rssUrl: string;
  type: "international" | "regional";
}

export const PROVIDER_CONFIGS: FeedProviderConfig[] = [
  {
    key: "apple",
    name: "Apple",
    icon: "🍎",
    brandBadge: "🍎 APPLE",
    category: "HARDWARE & SILICON",
    sourceName: "Apple Newsroom",
    defaultImage: "/uploads/live_news/apple_ineup-and-airpods-5_88773506c08c.jpg",
    rssUrl: "https://www.apple.com/newsroom/rss-feed.rss",
    type: "international",
  },
  {
    key: "google",
    name: "Google",
    icon: "🌐",
    brandBadge: "🌐 GOOGLE",
    category: "GOOGLE AI & DEVICES",
    sourceName: "Google The Keyword",
    defaultImage: "/uploads/live_news/google_venice_film_fest.png",
    rssUrl: "https://blog.google/rss/",
    type: "international",
  },
  {
    key: "nvidia",
    name: "NVIDIA",
    icon: "⚡",
    brandBadge: "⚡ NVIDIA",
    category: "ACCELERATED COMPUTING & AI",
    sourceName: "NVIDIA Official Blog",
    defaultImage: "/uploads/live_news/nvidia_skild_ai.jpg",
    rssUrl: "https://blogs.nvidia.com/feed/",
    type: "international",
  },
  {
    key: "openai",
    name: "OpenAI",
    icon: "🤖",
    brandBadge: "🤖 OPENAI",
    category: "GENERATIVE AI & REASONING",
    sourceName: "OpenAI Newsroom",
    defaultImage: "/uploads/live_news/openai_perplexity_aravind_hero.jpg",
    rssUrl: "https://openai.com/news/rss.xml",
    type: "international",
  },
  {
    key: "meta",
    name: "Meta",
    icon: "♾️",
    brandBadge: "♾️ META",
    category: "OPEN SOURCE AI & INFRASTRUCTURE",
    sourceName: "Meta Newsroom",
    defaultImage: "/uploads/live_news/meta_muse_hero.jpg",
    rssUrl: "https://about.fb.com/news/feed/",
    type: "international",
  },
  {
    key: "microsoft",
    name: "Microsoft",
    icon: "🪟",
    brandBadge: "🪟 MICROSOFT",
    category: "ENTERPRISE CLOUD & AI",
    sourceName: "Microsoft News Center",
    defaultImage: "/uploads/live_news/microsoft_semicon_hero.png",
    rssUrl: "https://blogs.microsoft.com/feed/",
    type: "international",
  },
  {
    key: "anthropic",
    name: "Anthropic",
    icon: "🧠",
    brandBadge: "🧠 ANTHROPIC",
    category: "FRONTIER AI & SCIENCE",
    sourceName: "Anthropic Research",
    defaultImage: "/uploads/live_news/anthropic_fable_mythos_hero.jpg",
    rssUrl: "https://news.google.com/rss/search?q=site:anthropic.com/news+OR+site:anthropic.com/research&hl=en-US&gl=US&ceid=US:en",
    type: "international",
  },
  {
    key: "intel",
    name: "Intel",
    icon: "🔷",
    brandBadge: "🔷 INTEL",
    category: "NEXT-GEN SILICON & SEMICONDUCTORS",
    sourceName: "Intel Newsroom",
    defaultImage: "/uploads/live_news/intel_high_na_euv_cleanroom.png",
    rssUrl: "https://news.google.com/rss/search?q=site:intel.com/content/www/us/en/newsroom/news&hl=en-US&gl=US&ceid=US:en",
    type: "international",
  },
  {
    key: "dawn",
    name: "Dawn Sci-Tech",
    icon: "🇵🇰",
    brandBadge: "🇵🇰 DAWN TECH",
    category: "PAKISTAN TECH & SCIENCE",
    sourceName: "Dawn Sci-Tech",
    defaultImage: "/uploads/live_news/dawn_anthropic_slowdown.webp",
    rssUrl: "https://www.dawn.com/feeds/tech/",
    type: "regional",
  },
  {
    key: "brecorder",
    name: "Business Recorder",
    icon: "📈",
    brandBadge: "🇵🇰 B-RECORDER",
    category: "PAKISTAN FINTECH & BUSINESS",
    sourceName: "Business Recorder",
    defaultImage: "/uploads/live_news/brecorder_anthropic_slowdown.webp",
    rssUrl: "https://www.brecorder.com/feeds/technology/",
    type: "regional",
  },
  {
    key: "propakistani",
    name: "ProPakistani",
    icon: "📱",
    brandBadge: "🇵🇰 PROPAKISTANI",
    category: "PAKISTAN DIGITAL ECOSYSTEM",
    sourceName: "ProPakistani",
    defaultImage: "/uploads/live_news/propakistani_iphone_duo.jpg",
    rssUrl: "https://propakistani.pk/category/tech-and-telecom/feed/",
    type: "regional",
  },
  {
    key: "tribune",
    name: "The Express Tribune",
    icon: "🚀",
    brandBadge: "🇵🇰 TRIBUNE",
    category: "PAKISTAN AEROSPACE & TECH",
    sourceName: "The Express Tribune",
    defaultImage: "/uploads/live_news/tribune_anthropic_spying.jpg",
    rssUrl: "https://tribune.com.pk/feed/technology",
    type: "regional",
  },
];

interface ParsedRssItem {
  title: string;
  link: string;
  pubDate: string;
  desc: string;
  img?: string | null;
}

function cleanText(str: string): string {
  if (!str) return "";
  let result = str;
  for (let i = 0; i < 3; i++) {
    result = result
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&apos;/gi, "'")
      .replace(/&nbsp;/gi, " ");
  }
  result = result.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (result.includes("<") || result.includes(">") || result.includes("href=") || result.includes("&lt;")) {
    result = result.replace(/&lt;.*?&gt;/gi, "").replace(/<.*?>/gi, "").replace(/href="[^"]*"/gi, "").trim();
  }
  return result;
}

function parseRssXml(xml: string): ParsedRssItem[] {
  const items: ParsedRssItem[] = [];
  const itemMatches = xml.match(/<(?:item|entry)[\s\S]*?<\/(?:item|entry)>/gi) || [];

  for (const itemXml of itemMatches) {
    const titleMatch = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkMatch =
      itemXml.match(/<link[^>]*href=["']([^"']+)["']/i) ||
      itemXml.match(/<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
    const pubDateMatch =
      itemXml.match(/<pubDate[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i) ||
      itemXml.match(/<published[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/published>/i) ||
      itemXml.match(/<updated[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/updated>/i);
    const descMatch =
      itemXml.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i) ||
      itemXml.match(/<content[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content>/i) ||
      itemXml.match(/<summary[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/summary>/i);
    const sourceMatch = itemXml.match(/<source[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/source>/i);

    const encMatch =
      itemXml.match(/<enclosure[^>]*url=["']([^"']+)["']/i) ||
      itemXml.match(/<media:content[^>]*url=["']([^"']+)["']/i) ||
      itemXml.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i) ||
      itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);

    let title = titleMatch ? cleanText(titleMatch[1]) : "";
    if (title.includes(" - ")) {
      const parts = title.split(" - ");
      if (parts.length > 1 && parts[parts.length - 1].length < 35) {
        title = parts.slice(0, -1).join(" - ").trim();
      }
    }

    let link = linkMatch ? (linkMatch[1] || "").trim() : "";
    if (link.startsWith("<![CDATA[")) {
      link = link.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
    }

    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
    const sourceName = sourceMatch ? cleanText(sourceMatch[1]) : "";

    let rawDesc = descMatch ? cleanText(descMatch[1]) : "";
    let desc = rawDesc;
    if (
      !desc ||
      desc.length < 30 ||
      desc.includes("news.google.com") ||
      desc.includes("http") ||
      desc.includes("href=") ||
      desc.includes("<a") ||
      desc.includes("&lt;")
    ) {
      desc = `${title}. Real-time intelligence and verified enterprise developments${sourceName ? ` reported via ${sourceName}` : ""}.`;
    } else if (desc.length > 240) {
      desc = desc.substring(0, 237) + "...";
    }

    let img = encMatch ? encMatch[1] : null;
    if (img && (img.endsWith(".mp4") || img.endsWith(".webm") || img.includes(".mp4?") || img.includes(".webm?"))) {
      img = null;
    }

    if (title && link) {
      items.push({ title, link, pubDate, desc, img });
    }
  }

  return items;
}

export async function fetchFeedItems(provider: FeedProviderConfig): Promise<ParsedRssItem[]> {
  try {
    const res = await fetch(provider.rssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssXml(xml);
  } catch {
    return [];
  }
}

function matchArticleImage(providerKey: string, title: string, rssImg?: string | null): string {
  const t = (title || "").toLowerCase();

  if (t.includes("skild") || (providerKey === "nvidia" && t.includes("robot"))) {
    return "/uploads/live_news/nvidia_skild_ai.jpg";
  }
  if (t.includes("hugging face") || t.includes("huggingface")) {
    return "/uploads/live_news/nvidia_huggingface_hero.png";
  }
  if (t.includes("venice") || t.includes("film festival") || (providerKey === "google" && (t.includes("xr") || t.includes("premiere")))) {
    return "/uploads/live_news/google_venice_film_fest.png";
  }
  if (t.includes("io 2026") || t.includes("agentic gemini")) {
    return "/uploads/live_news/google_agentic_io2026_hero.jpg";
  }
  if (providerKey === "dawn" && (t.includes("anthropic") || t.includes("slowdown") || t.includes("amodei") || t.includes("altman"))) {
    return "/uploads/live_news/dawn_anthropic_slowdown.webp";
  }
  if (providerKey === "brecorder" && (t.includes("anthropic") || t.includes("slowdown") || t.includes("misuse") || t.includes("amodei"))) {
    return "/uploads/live_news/brecorder_anthropic_slowdown.webp";
  }
  if (providerKey === "propakistani" && (t.includes("duo") || t.includes("iphone") || t.includes("foldable"))) {
    return "/uploads/live_news/propakistani_iphone_duo.jpg";
  }
  if (providerKey === "tribune" && (t.includes("spying") || t.includes("anthropic") || t.includes("iran"))) {
    return "/uploads/live_news/tribune_anthropic_spying.jpg";
  }
  if (providerKey === "microsoft" && (t.includes("yield") || t.includes("semicon") || t.includes("maia"))) {
    return "/uploads/live_news/microsoft_semicon_hero.png";
  }
  if (providerKey === "meta" && (t.includes("muse") || t.includes("agent"))) {
    return "/uploads/live_news/meta_muse_hero.jpg";
  }
  if (providerKey === "apple" && (t.includes("iphone 18") || t.includes("watch") || t.includes("airpods"))) {
    return "/uploads/live_news/apple_ineup-and-airpods-5_88773506c08c.jpg";
  }
  if (providerKey === "openai" && (t.includes("astra") || t.includes("perplexity"))) {
    return "/uploads/live_news/openai_perplexity_aravind_hero.jpg";
  }
  if (providerKey === "intel" && (t.includes("asml") || t.includes("euv") || t.includes("high-na"))) {
    return "/uploads/live_news/intel_high_na_euv_cleanroom.png";
  }

  if (rssImg && typeof rssImg === "string" && rssImg.trim().length > 0) {
    const trimmed = rssImg.trim();
    if (!trimmed.endsWith(".mp4") && !trimmed.endsWith(".webm") && !trimmed.includes(".mp4?") && !trimmed.includes(".webm?")) {
      return trimmed;
    }
  }

  return "";
}

export async function syncAllNewsFeeds(): Promise<{ count: number; timestamp: string }> {
  const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");

  let existingCache: any = {
    status: "success",
    timestamp: new Date().toISOString(),
    breaking_news: [],
    brand_wires: {},
    regional_wires: {},
  };

  if (fs.existsSync(localCachePath)) {
    try {
      const raw = fs.readFileSync(localCachePath, "utf-8");
      existingCache = JSON.parse(raw);
    } catch {}
  }

  const brandWires = { ...(existingCache.brand_wires || {}) };
  const regionalWires = { ...(existingCache.regional_wires || {}) };
  const breakingNewsMap: Record<string, any> = {};

  if (Array.isArray(existingCache.breaking_news)) {
    for (const item of existingCache.breaking_news) {
      if (item.provider) breakingNewsMap[item.provider] = item;
    }
  }

  const results = await Promise.allSettled(
    PROVIDER_CONFIGS.map(async (provider) => {
      const items = await fetchFeedItems(provider);
      return { provider, items };
    })
  );

  let updatedCount = 0;

  for (const res of results) {
    if (res.status !== "fulfilled" || res.value.items.length === 0) continue;

    const { provider, items } = res.value;
    const newest = items[0];
    if (!newest || !newest.title) continue;

    const existingWire = brandWires[provider.key];
    const existingBreaking = breakingNewsMap[provider.key];

    // Authentic image resolution - never retain mismatched image from previous article
    const matchedImg = matchArticleImage(provider.key, newest.title, newest.img);
    let imagePath = matchedImg;
    if (!imagePath) {
      if (existingWire?.title === newest.title && existingWire?.img) {
        imagePath = existingWire.img;
      } else {
        imagePath = provider.defaultImage;
      }
    }

    const pubIso = newest.pubDate ? new Date(newest.pubDate).toISOString() : new Date().toISOString();

    // Preserve direct official links over Google News redirects
    let articleLink = newest.link;
    if (articleLink.includes("news.google.com") && existingWire?.link && !existingWire.link.includes("news.google.com")) {
      articleLink = existingWire.link;
    }

    let articleDesc = newest.desc || (existingWire?.summary || existingWire?.desc || "");

    if (provider.type === "international") {
      brandWires[provider.key] = {
        brandBadge: provider.brandBadge,
        captionTag: `${provider.key.toUpperCase()} OFFICIAL WIRE`,
        cat: provider.category,
        date: `${provider.sourceName} (Live RSS)`,
        title: newest.title || existingWire?.title || provider.name,
        summary: articleDesc,
        source: provider.sourceName,
        link: articleLink,
        source_image_url: newest.img || null,
        img: imagePath,
        caption: `📷 ${newest.title || provider.name}`,
        provider_published_at: pubIso,
      };

      breakingNewsMap[provider.key] = {
        id: `${provider.key}-${Date.now()}`,
        provider: provider.key,
        tag: provider.category,
        providerLabel: provider.brandBadge,
        date: `${provider.sourceName} (Live RSS)`,
        source: provider.sourceName,
        title: newest.title || existingBreaking?.title || provider.name,
        desc: articleDesc,
        link: articleLink,
        source_image_url: newest.img || null,
        img: imagePath,
        provider_published_at: pubIso,
      };
      updatedCount++;
    } else {
      const existingReg = regionalWires[provider.key];
      const regMatchedImg = matchArticleImage(provider.key, newest.title, newest.img);
      let regImage = regMatchedImg;
      if (!regImage) {
        if (existingReg?.title === newest.title && (existingReg?.image || existingReg?.img)) {
          regImage = existingReg.image || existingReg.img;
        } else {
          regImage = provider.defaultImage;
        }
      }

      let regLink = newest.link;
      if (regLink.includes("news.google.com") && existingReg?.sourceUrl && !existingReg.sourceUrl.includes("news.google.com")) {
        regLink = existingReg.sourceUrl;
      }

      regionalWires[provider.key] = {
        id: provider.key,
        name: provider.name,
        icon: provider.icon,
        brandBadge: provider.brandBadge,
        category: provider.category,
        date: `${provider.sourceName} (Live RSS)`,
        title: newest.title || existingReg?.title || provider.name,
        summary: newest.desc || existingReg?.summary || "",
        sourceName: provider.sourceName,
        sourceUrl: regLink,
        link: regLink,
        image: regImage,
        img: regImage,
        provider_published_at: pubIso,
      };

      breakingNewsMap[provider.key] = {
        id: `${provider.key}-${Date.now()}`,
        provider: provider.key,
        tag: provider.category,
        providerLabel: provider.brandBadge,
        date: `${provider.sourceName} (Live RSS)`,
        source: provider.sourceName,
        title: newest.title || existingReg?.title || provider.name,
        desc: newest.desc || existingReg?.summary || "",
        link: regLink,
        source_image_url: newest.img || null,
        img: regImage,
        provider_published_at: pubIso,
      };
      updatedCount++;
    }
  }

  const breakingNewsList = Object.values(breakingNewsMap);
  breakingNewsList.sort((a, b) => {
    const ta = a.provider_published_at ? new Date(a.provider_published_at).getTime() : 0;
    const tb = b.provider_published_at ? new Date(b.provider_published_at).getTime() : 0;
    return tb - ta;
  });

  const finalData = {
    status: "success",
    timestamp: new Date().toISOString(),
    gate_status: "CENTRAL_GATE_ACTIVE",
    provider_statuses: {},
    counts: {
      pakistani_articles: Object.keys(regionalWires).length,
      international_articles: breakingNewsList.length,
      providers: Object.keys(brandWires).reduce((acc: any, k) => {
        acc[k] = 1;
        return acc;
      }, {}),
    },
    brand_wires: brandWires,
    regional_wires: regionalWires,
    regional_items: Object.values(regionalWires),
    breaking_news: breakingNewsList,
  };

  const dir = path.dirname(localCachePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(localCachePath, JSON.stringify(finalData, null, 2), "utf-8");
  try {
    const backupPath = path.join(process.cwd(), "public", "data", "live_news_cache.backup.json");
    fs.writeFileSync(backupPath, JSON.stringify(finalData, null, 2), "utf-8");
  } catch {}

  return {
    count: breakingNewsList.length + Object.keys(regionalWires).length,
    timestamp: finalData.timestamp,
  };
}
