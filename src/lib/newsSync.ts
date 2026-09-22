import fs from "fs";
import path from "path";
import dns from "dns";
import { unstable_cache, revalidateTag } from "next/cache";
import { withCacheBuster } from "./cacheBuster";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch {}

try {
  // @ts-ignore
  const undici = typeof require !== "undefined" ? require("undici") : null;
  if (undici?.Agent && undici?.setGlobalDispatcher) {
    undici.setGlobalDispatcher(
      new undici.Agent({
        connect: {
          family: 4,
        },
      })
    );
  }
} catch {}

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
    defaultImage: "/uploads/live_news/openai_gpt4o_official.png",
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
    defaultImage: "/uploads/live_news/microsoft_copilot_hero.jpg",
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
    defaultImage: "/uploads/live_news/intel_ai_infra_summit_2026.jpg",
    rssUrl: "https://news.google.com/rss/search?q=site:intel.com/content/www/us/en/newsroom/+when:30d&hl=en-US&gl=US&ceid=US:en",
    type: "international",
  },
  {
    key: "dawn",
    name: "Dawn Sci-Tech",
    icon: "🇵🇰",
    brandBadge: "🇵🇰 DAWN TECH",
    category: "PAKISTAN TECH & SCIENCE",
    sourceName: "Dawn Sci-Tech",
    defaultImage: "https://i.dawn.com/large/2026/09/21112713801fded.webp",
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
    defaultImage: "https://i.brecorder.com/large/2026/09/220759353d42770.webp",
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
    defaultImage: "https://propakistani.pk/wp-content/uploads/2026/09/Vivo-X500-2.jpg",
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
    defaultImage: "https://i.tribune.com.pk/media/images/silent-hill-f-11759313708-0/silent-hill-f-11759313708-0.png",
    rssUrl: "https://tribune.com.pk/feed/technology",
    type: "regional",
  },
];

export interface ParsedRssItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  desc: string;
  img?: string | null;
}

export interface AggregatedArticle {
  id: string;
  source: string;
  provider: string;
  providerLabel: string;
  title: string;
  desc: string;
  link: string;
  image: string;
  img: string;
  date: string;
  timestamp: string;
  tag: string;
  type: "international" | "regional";
}

export function cleanText(str: string): string {
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

function isGenericPlaceholderImage(url: string | null | undefined): boolean {
  if (!url) return true;
  const lower = url.toLowerCase();
  if (
    lower.includes("googleusercontent.com") ||
    lower.includes("printlogo") ||
    lower.includes("blank.gif") ||
    lower.includes("spacer.gif") ||
    lower.includes("favicon") ||
    lower.includes("placeholder")
  ) {
    return true;
  }
  return false;
}

function extractImageFromXml(itemXml: string): string | null {
  let matchedUrl: string | null = null;

  // 1. Direct enclosure tag (<enclosure url="...">)
  const encMatch = itemXml.match(/<enclosure[^>]*url=["']([^"']+)["']/i);
  if (encMatch?.[1]) matchedUrl = encMatch[1];

  // 2. Atom link enclosure tag (used by Apple Newsroom: <link rel="enclosure" href="..." /> or <link href="..." rel="enclosure" />)
  if (!matchedUrl) {
    const atomEncMatch =
      itemXml.match(/<link[^>]+rel=["']enclosure["'][^>]+href=["']([^"']+)["']/i) ||
      itemXml.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']enclosure["']/i);
    if (atomEncMatch?.[1]) matchedUrl = atomEncMatch[1] || atomEncMatch[2];
  }

  // 3. Media content tag (<media:content url="...">)
  if (!matchedUrl) {
    const mediaContentMatch = itemXml.match(/<media:content[^>]*url=["']([^"']+)["']/i);
    if (mediaContentMatch?.[1]) matchedUrl = mediaContentMatch[1];
  }

  // 4. Media thumbnail tag (<media:thumbnail url="...">)
  if (!matchedUrl) {
    const mediaThumbMatch = itemXml.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i);
    if (mediaThumbMatch?.[1]) matchedUrl = mediaThumbMatch[1];
  }

  // 5. HTML img tag in itemXml or embedded CDATA (both standard and encoded &lt;img)
  if (!matchedUrl) {
    const imgTagMatch =
      itemXml.match(/<img[^>]+src=["'](https?:\/\/[^"'\s>]+)["']/i) ||
      itemXml.match(/&lt;img[^>]+src=&quot;(https?:\/\/[^&"\s>]+)&quot;/i);
    if (imgTagMatch?.[1]) matchedUrl = imgTagMatch[1];
  }

  if (matchedUrl && !isGenericPlaceholderImage(matchedUrl)) {
    return matchedUrl;
  }

  return null;
}

export function parseRssXml(xml: string): ParsedRssItem[] {
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
    const guidMatch =
      itemXml.match(/<guid[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/guid>/i) ||
      itemXml.match(/<id[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/id>/i);

    let title = titleMatch ? cleanText(titleMatch[1]) : "";
    if (title.includes(" - ")) {
      const parts = title.split(" - ");
      if (parts.length > 1 && parts[parts.length - 1].length < 35) {
        const candidate = parts.slice(0, -1).join(" - ").trim();
        if (candidate.length > 0) {
          title = candidate;
        }
      }
    }
    title = title.replace(/^[\s\-–—:]+/, "").trim();

    let link = linkMatch ? (linkMatch[1] || "").trim() : "";
    if (link.startsWith("<![CDATA[")) {
      link = link.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
    }

    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
    const sourceName = sourceMatch ? cleanText(sourceMatch[1]) : "";

    let rawDesc = descMatch ? cleanText(descMatch[1]) : "";
    let desc = rawDesc;
    if (sourceName && desc.endsWith(` ${sourceName}`)) {
      desc = desc.substring(0, desc.length - sourceName.length - 1).trim();
    }
    if (desc === title || desc.toLowerCase() === title.toLowerCase()) {
      desc = `${title}. Real-time intelligence and verified enterprise developments${sourceName ? ` reported via ${sourceName}` : ""}.`;
    } else if (
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

    // Extract authentic article image from feed enclosure / media / img tag
    let rawImg = extractImageFromXml(itemXml);
    let img: string | null = null;
    if (rawImg) {
      rawImg = rawImg.replace(/&amp;/g, "&").trim();
      if (!rawImg.endsWith(".mp4") && !rawImg.endsWith(".webm") && !rawImg.includes(".mp4?") && !rawImg.includes(".webm?")) {
        img = rawImg;
      }
    }

    // Determine deterministic unique id for the item
    let id = guidMatch ? cleanText(guidMatch[1]) : "";
    if (!id && link) {
      id = Buffer.from(link).toString("base64url").slice(0, 18);
    }
    if (!id && title) {
      id = Buffer.from(title).toString("base64url").slice(0, 18);
    }
    if (!id) {
      id = `item-${items.length}`;
    }

    const cleanedTitle = title.trim();
    const isValidTitle =
      cleanedTitle.length >= 10 &&
      !cleanedTitle.startsWith("-") &&
      !/^-\s+/i.test(cleanedTitle) &&
      !["intel", "google news", "newsroom", "community"].includes(cleanedTitle.toLowerCase());

    if (isValidTitle && link) {
      items.push({ id, title: cleanedTitle, link, pubDate, desc, img });
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
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssXml(xml);
  } catch (err: any) {
    return [];
  }
}

const ogImageCache = new Map<string, string>();

async function fetchOgImage(link: string): Promise<string | null> {
  if (!link || !link.startsWith("http")) return null;
  if (ogImageCache.has(link)) return ogImageCache.get(link)!;

  try {
    const res = await fetch(link, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);

    if (ogMatch?.[1]) {
      const imgUrl = ogMatch[1].trim();
      if (imgUrl.startsWith("http") && !isGenericPlaceholderImage(imgUrl)) {
        ogImageCache.set(link, imgUrl);
        return imgUrl;
      }
    }

    // For Intel Newsroom pages, extract article content image
    const contentDamMatch = html.match(/src=["'](\/content\/dam\/[^"']+\.(?:jpg|jpeg|png|webp))["']/i);
    if (contentDamMatch?.[1]) {
      const fullUrl = `https://www.intel.com${contentDamMatch[1]}`;
      ogImageCache.set(link, fullUrl);
      return fullUrl;
    }
  } catch {}
  return null;
}

/**
 * Cache each source separately under its own tag with a short 2-minute duration.
 * This guarantees no source overwrites another source's cache slot.
 */
export const getCachedFeedForSource = (provider: FeedProviderConfig) => {
  return unstable_cache(
    async (): Promise<AggregatedArticle[]> => {
      const rawItems = await fetchFeedItems(provider);

      // Enrich top items that lack an authentic image from RSS with their real page og:image
      const enrichedItems = await Promise.all(
        rawItems.slice(0, 8).map(async (item) => {
          if (!item.img && item.link) {
            const ogImg = await fetchOgImage(item.link);
            if (ogImg) {
              return { ...item, img: ogImg };
            }
          }
          return item;
        })
      );
      const allItems = [...enrichedItems, ...rawItems.slice(8)];

      return allItems.map((item) => {
        // Authentic image attached to article; fallback only to that source's default image
        const rawArticleImage = item.img && item.img.trim().length > 0 ? item.img.trim() : provider.defaultImage;
        const versionKey = item.pubDate || item.id || Date.now();
        const articleImage = withCacheBuster(rawArticleImage, versionKey);

        return {
          id: `${provider.name}-${item.id}`,
          source: provider.name,
          provider: provider.key,
          providerLabel: provider.brandBadge,
          title: item.title,
          desc: item.desc,
          link: item.link,
          image: articleImage,
          img: articleImage,
          date: item.pubDate,
          timestamp: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
          tag: provider.category,
          type: provider.type,
        };
      });
    },
    [`news-feed-${provider.key}`],
    {
      revalidate: 120, // 2 minutes short cache per source
      tags: [`news-${provider.key}`, "news-all"],
    }
  );
};

/**
 * Core Refactored Fetcher:
 * Combines all sources using Promise.all(.map).
 * Every article is a single object carrying its own id, source, title, and image together.
 * Never re-matched by array index or keywords.
 */
export async function fetchAllAggregatedNews(): Promise<AggregatedArticle[]> {
  const results = await Promise.all(
    PROVIDER_CONFIGS.map(async (source) => {
      try {
        const fetchFrom = getCachedFeedForSource(source);
        const data = await fetchFrom();
        return data.map((item) => ({
          id: item.id,
          source: source.name,
          provider: source.key,
          providerLabel: source.brandBadge,
          title: item.title,
          desc: item.desc,
          link: item.link,
          image: item.image,
          img: item.img,
          date: item.date,
          timestamp: item.timestamp,
          tag: source.category,
          type: source.type,
        }));
      } catch (err: any) {
        console.error(`Error fetching source ${source.name}:`, err.message);
        return [];
      }
    })
  );

  const allNews = results.flat();

  // Sort chronologically (newest first)
  allNews.sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return tb - ta;
  });

  return allNews;
}

/**
 * Trigger immediate refresh across all news sources via Next.js cache tags
 */
export function revalidateAllNews() {
  for (const p of PROVIDER_CONFIGS) {
    try {
      revalidateTag(`news-${p.key}`, "default");
    } catch {}
  }
  try {
    revalidateTag("news-all", "default");
  } catch {}
}

export function revalidateNewsSource(sourceKey: string) {
  try {
    revalidateTag(`news-${sourceKey}`, "default");
  } catch {}
}

/**
 * Synchronize local JSON files for backwards compatibility and offline fallback
 */
export async function syncAllNewsFeeds(): Promise<{ count: number; timestamp: string }> {
  const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");

  // Revalidate cache tags for immediate freshness
  revalidateAllNews();

  const allNews = await fetchAllAggregatedNews();

  const brandWires: Record<string, any> = {};
  const regionalWires: Record<string, any> = {};

  for (const item of allNews) {
    if (item.type === "international") {
      if (!brandWires[item.provider]) {
        brandWires[item.provider] = {
          brandBadge: item.providerLabel,
          captionTag: `${item.provider.toUpperCase()} OFFICIAL WIRE`,
          cat: item.tag,
          date: item.date || `${item.source} (Live RSS)`,
          title: item.title,
          summary: item.desc,
          source: item.source,
          link: item.link,
          img: item.image,
          caption: `📷 ${item.title}`,
          provider_published_at: item.timestamp,
        };
      }
    } else {
      if (!regionalWires[item.provider]) {
        regionalWires[item.provider] = {
          id: item.provider,
          name: item.source,
          brandBadge: item.providerLabel,
          category: item.tag,
          date: item.date || `${item.source} (Live RSS)`,
          title: item.title,
          summary: item.desc,
          sourceName: item.source,
          sourceUrl: item.link,
          link: item.link,
          image: item.image,
          img: item.image,
          provider_published_at: item.timestamp,
        };
      }
    }
  }

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
    if (!regionalWires[rKey] && DEFAULT_REGIONAL_FALLBACKS[rKey]) {
      regionalWires[rKey] = DEFAULT_REGIONAL_FALLBACKS[rKey];
    }
  }

  const finalData = {
    status: "success",
    timestamp: new Date().toISOString(),
    gate_status: "CENTRAL_GATE_ACTIVE",
    provider_statuses: {},
    counts: {
      pakistani_articles: Object.keys(regionalWires).length,
      international_articles: allNews.length,
      providers: PROVIDER_CONFIGS.reduce((acc: any, p) => {
        acc[p.key] = 1;
        return acc;
      }, {}),
    },
    brand_wires: brandWires,
    regional_wires: regionalWires,
    regional_items: Object.values(regionalWires),
    breaking_news: allNews,
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
    count: allNews.length,
    timestamp: finalData.timestamp,
  };
}
