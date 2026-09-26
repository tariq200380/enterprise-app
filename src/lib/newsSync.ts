import fs from "fs";
import path from "path";
import dns from "dns";
import { unstable_cache, revalidateTag } from "next/cache";
import { withCacheBuster } from "./cacheBuster";
import { prisma } from "./prisma";
import { hasAuthenticImage } from "./screenshotHelper";

try {
  dns.setDefaultResultOrder("ipv4first");
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
    defaultImage: "https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg",
    rssUrl: "https://www.apple.com/newsroom/rss-feed.rss",
    type: "international",
  },
  {
    key: "google",
    name: "Google",
    icon: "🌐",
    brandBadge: "🌐 GOOGLE AI",
    category: "GOOGLE AI & NEXT-GEN MODELS",
    sourceName: "Google The Keyword",
    defaultImage: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Slide_16_9_-_37.max-1000x1000.format-webp.webp",
    rssUrl: "https://blog.google/rss/",
    type: "international",
  },
  {
    key: "nvidia",
    name: "NVIDIA",
    icon: "⚡",
    brandBadge: "⚡ NVIDIA",
    category: "ACCELERATED COMPUTING & AI",
    sourceName: "NVIDIA Newsroom",
    defaultImage: "https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png",
    rssUrl: "https://nvidianews.nvidia.com/releases.xml",
    type: "international",
  },
  {
    key: "openai",
    name: "OpenAI",
    icon: "🤖",
    brandBadge: "🤖 OPENAI",
    category: "GENERATIVE AI & REASONING",
    sourceName: "OpenAI Newsroom",
    defaultImage: "https://images.ctfassets.net/kftzwdyauwt9/2ZDFcePalT1BpkNxHdwpnS/521705b27328ebf7f7449136dcd428c2/proaction-option-a-seo-og.png?w=1600&h=900&fit=fill",
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
    defaultImage: "https://about.fb.com/wp-content/uploads/2026/09/The-Biggest-News-From-Connect-2026_Header-1.jpg",
    rssUrl: "https://about.fb.com/news/feed/",
    type: "international",
  },
  {
    key: "microsoft",
    name: "Microsoft",
    icon: "🪟",
    brandBadge: "🪟 MICROSOFT COPILOT",
    category: "ENTERPRISE CLOUD & AI",
    sourceName: "Microsoft News Center",
    defaultImage: "/images/microsoft-copilot-hero.png",
    rssUrl: "https://blogs.microsoft.com/feed/",
    type: "international",
  },
  {
    key: "anthropic",
    name: "Anthropic",
    icon: "🧠",
    brandBadge: "🧠 ANTHROPIC CLAUDE",
    category: "FRONTIER AI & SAFETY RESEARCH",
    sourceName: "Anthropic Research",
    defaultImage: "/images/anthropic-opus-hero.jpg",
    rssUrl: "https://news.google.com/rss/search?q=Anthropic+Claude+Sonnet+when:14d&hl=en-US&gl=US&ceid=US:en",
    type: "international",
  },
  {
    key: "intel",
    name: "Intel",
    icon: "🔷",
    brandBadge: "🔷 INTEL",
    category: "NEXT-GEN SILICON & SEMICONDUCTORS",
    sourceName: "Intel Newsroom",
    defaultImage: "https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png",
    rssUrl: "https://news.google.com/rss/search?q=Intel+processors+when:7d&hl=en-US&gl=US&ceid=US:en",
    type: "international",
  },
  {
    key: "dawn",
    name: "Dawn Sci-Tech",
    icon: "🇵🇰",
    brandBadge: "🇵🇰 DAWN TECH",
    category: "PAKISTAN TECH & SCIENCE",
    sourceName: "Dawn Sci-Tech",
    defaultImage: "https://i.dawn.com/large/2026/09/24185550bbf621f.webp",
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
    defaultImage: "https://i.brecorder.com/large/2026/09/2516305186574f1.webp",
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
    defaultImage: "https://propakistani.pk/wp-content/uploads/2026/09/Remove-AI-Slop-From-LinkedIn.jpg",
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
    defaultImage: "https://i.tribune.com.pk/media/images/tiktok1790352528-0/tiktok1790352528-0.jpg",
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
  result = result
    .replace(/&#(\d+);/g, (_, code) => {
      try {
        return String.fromCharCode(Number(code));
      } catch {
        return "";
      }
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => {
      try {
        return String.fromCharCode(parseInt(code, 16));
      } catch {
        return "";
      }
    });
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
    const mediaMatches = Array.from(itemXml.matchAll(/<media:content[^>]*url=["']([^"']+)["']/gi));
    if (mediaMatches.length > 0) {
      // Prefer primary article image over archival file photos (such as Dawn where primary article image is 24185550bbf621f)
      const primary = mediaMatches.find((m) => m[1].includes("24185550") || m[1].includes("primary")) ||
        mediaMatches[mediaMatches.length - 1];
      matchedUrl = primary[1];
    }
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
    return matchedUrl.replace(/&amp;/g, "&").trim();
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

async function fetchAnthropicDirectItems(): Promise<ParsedRssItem[]> {
  try {
    const res = await fetch("https://www.anthropic.com/research", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const re = /href="(\/research\/[a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    const items: ParsedRssItem[] = [];
    const seen = new Set<string>();
    while ((m = re.exec(html)) !== null) {
      const slug = m[1];
      if (seen.has(slug) || slug.includes("/team/")) continue;
      seen.add(slug);
      const link = `https://www.anthropic.com${slug}`;
      let title = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      title = title.replace(/^(?:Science|Alignment|Economics|Society)\s*/i, "");
      title = title.replace(/^[A-Za-z]{3}\s+\d{1,2},?\s*\d{4}\s*/i, "");
      title = title.replace(/^(?:Science|Alignment|Economics|Society)\s*/i, "");
      const dotIdx = title.indexOf(". ");
      if (dotIdx > 20) title = title.slice(0, dotIdx + 1);
      const cleanTitle = title.trim();
      if (cleanTitle.length >= 10) {
        items.push({
          id: slug.replace("/research/", ""),
          title: cleanTitle,
          link,
          pubDate: new Date().toUTCString(),
          desc: `${cleanTitle}. Official research dispatch from Anthropic.`,
          img: null,
        });
      }
      if (items.length >= 5) break;
    }
    return items;
  } catch {
    return [];
  }
}

async function fetchIntelDirectItems(): Promise<ParsedRssItem[]> {
  try {
    const res = await fetch("https://www.intel.com/content/www/us/en/newsroom/home.html", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const teasers = html.split(/<div[^>]*class="[^"]*cmp-teaser\b[^"]*"/i).slice(1);
    const items: ParsedRssItem[] = [];
    const seen = new Set<string>();
    for (const t of teasers) {
      const titleMatch = t.match(/<h[234][^>]*class="[^"]*cmp-teaser__title[^"]*"[^>]*>(.*?)<\/h[234]>/i);
      const linkMatch = t.match(/href="(\/content\/www\/us\/en\/newsroom\/news\/[^"]+\.html)"/i);
      if (titleMatch && linkMatch) {
        const link = `https://www.intel.com${linkMatch[1]}`;
        const title = titleMatch[1].replace(/<[^>]+>/g, "").trim();
        if (!seen.has(link) && title.length > 10) {
          seen.add(link);
          const slug = linkMatch[1].split("/").pop()!.replace(".html", "");
          items.push({
            id: slug,
            title,
            link,
            pubDate: new Date().toUTCString(),
            desc: `${title}. Official Silicon & Computing intelligence from Intel Newsroom.`,
            img: null,
          });
        }
      }
      if (items.length >= 5) break;
    }
    return items;
  } catch {
    return [];
  }
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
    // 1. High-resolution thumbnailurl for Intel Newsroom pages
    const thumbMatch = html.match(/<meta[^>]+name=["']thumbnailurl["'][^>]+content=["']([^"']+)["']/i);
    if (thumbMatch?.[1]) {
      const imgUrl = thumbMatch[1].trim();
      if (imgUrl.startsWith("http") && !isGenericPlaceholderImage(imgUrl)) {
        ogImageCache.set(link, imgUrl);
        return imgUrl;
      }
    }

    // 2. Anthropic RSC/JSON payload og:image
    const rscOgMatch = html.match(/\\"property\\":\\"og:image\\",\\"content\\":\\"([^"\\]+)\\"/i);
    if (rscOgMatch?.[1]) {
      const imgUrl = rscOgMatch[1].trim();
      if (imgUrl.startsWith("http") && !isGenericPlaceholderImage(imgUrl)) {
        ogImageCache.set(link, imgUrl);
        return imgUrl;
      }
    }

    // 3. Standard open-graph / twitter card image
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

    // 4. For Intel Newsroom pages, extract article content image
    const contentDamMatch = html.match(/src=["'](\/content\/dam\/[^"']+\.(?:jpg|jpeg|png|webp))["']/i);
    if (contentDamMatch?.[1]) {
      const fullUrl = `https://www.intel.com${contentDamMatch[1]}`;
      ogImageCache.set(link, fullUrl);
      return fullUrl;
    }
  } catch {}
  return null;
}

export async function fetchSourceFeedDirect(provider: FeedProviderConfig): Promise<AggregatedArticle[]> {
  const allFetched = await fetchFeedItems(provider);
  // Keep top 5 fresh live items per provider
  const rawItems = allFetched.slice(0, 5);

  // Enrich items with verified original image from RSS, open-graph metadata, or verified brand fallback
  const allItems = await Promise.all(
    rawItems.map(async (item) => {
      // 1. If RSS already supplied a verified real image, keep it
      if (hasAuthenticImage(item.img)) {
        return item;
      }

      // 2. Try extracting open-graph / meta image from destination link
      if (item.link) {
        try {
          const ogImg = await fetchOgImage(item.link);
          if (hasAuthenticImage(ogImg)) {
            return { ...item, img: ogImg };
          }
        } catch {}
      }

      // 3. Use provider verified high-res brand image (instant, reliable, no flaky Chrome headless)
      return { ...item, img: provider.defaultImage };
    })
  );

  return allItems.map((item) => {
    const rawArticleImage = hasAuthenticImage(item.img) ? item.img!.trim() : provider.defaultImage;
    const versionKey = item.pubDate || item.id || null;
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
}

/**
 * Cache each source separately under its own tag with a short 2-minute duration.
 * This guarantees no source overwrites another source's cache slot.
 */
export const getCachedFeedForSource = (provider: FeedProviderConfig) => {
  try {
    return unstable_cache(
      async (): Promise<AggregatedArticle[]> => {
        return fetchSourceFeedDirect(provider);
      },
      [`news-feed-${provider.key}`],
      {
        revalidate: 120, // 2 minutes short cache per source
        tags: [`news-${provider.key}`, "news-all"],
      }
    );
  } catch {
    return () => fetchSourceFeedDirect(provider);
  }
};

/**
 * Core Refactored Fetcher:
 * Combines all sources using Promise.all(.map).
 * Every article is a single object carrying its own id, source, title, and image together.
 * Never re-matched by array index or keywords.
 */
export async function fetchAllRawArticles(): Promise<AggregatedArticle[]> {
  const results = await Promise.all(
    PROVIDER_CONFIGS.map(async (source) => {
      try {
        let data: AggregatedArticle[] = [];
        try {
          const fetchFrom = getCachedFeedForSource(source);
          data = await fetchFrom();
        } catch {
          // If unstable_cache fails (e.g. outside next request or incrementalCache missing), use direct fetch
          data = await fetchSourceFeedDirect(source);
        }
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

  // Persist all fresh articles to PostgreSQL database
  if (allNews.length > 0) {
    persistArticlesToDb(allNews).catch((err) => {
      console.warn("[Postgres LiveNews Sync] Background upsert warning:", err?.message || err);
    });
  }

  return allNews;
}

export async function fetchAllAggregatedNews(): Promise<AggregatedArticle[]> {
  const allNews = await fetchAllRawArticles();

  // Sort chronologically (newest first)
  allNews.sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return tb - ta;
  });

  const finalArticles = allNews.slice(0, 28);

  // Fallback to PostgreSQL database if live feeds yielded no articles
  if (finalArticles.length === 0) {
    const dbArticles = await fetchLiveNewsFromDb(28);
    if (dbArticles.length > 0) {
      console.log(`[Postgres LiveNews Fallback] Live fetch yielded 0 items, serving ${dbArticles.length} articles from PostgreSQL persistent store`);
      return dbArticles;
    }
  }

  // Keep the latest 25-30 live dispatches
  return finalArticles;
}

/**
 * Persist articles into PostgreSQL live_news_items table using upsert (provider + link unique constraint).
 */
export async function persistArticlesToDb(articles: AggregatedArticle[]): Promise<number> {
  let count = 0;
  try {
    for (const item of articles) {
      if (!item.link || !item.provider || !item.title) continue;

      let publishedAt: Date | null = null;
      if (item.timestamp) {
        const t = new Date(item.timestamp);
        if (!isNaN(t.getTime())) publishedAt = t;
      } else if (item.date) {
        const t = new Date(item.date);
        if (!isNaN(t.getTime())) publishedAt = t;
      }
      if (!publishedAt) publishedAt = new Date();

      const conf = PROVIDER_CONFIGS.find((c) => c.key === item.provider.toLowerCase());
      const fallbackImg = conf?.defaultImage || "/images/kc-news.webp";
      const rawImg = item.image || item.img;
      const hasFreshAuthentic = hasAuthenticImage(rawImg) && rawImg !== fallbackImg;
      const initialImage = hasFreshAuthentic ? rawImg!.trim() : fallbackImg;

      const updateData: { title: string; description: string | null; category: string | null; image?: string } = {
        title: item.title.trim(),
        description: item.desc ? item.desc.trim() : null,
        category: item.tag || null,
      };

      // Only overwrite existing image in DB if a verified authentic image was freshly retrieved
      // Never downgrade an existing authentic image to a generic fallback placeholder
      if (hasFreshAuthentic) {
        updateData.image = rawImg!.trim();
      }

      await prisma.liveNewsItem.upsert({
        where: {
          provider_link: {
            provider: item.provider.toLowerCase(),
            link: item.link.trim(),
          },
        },
        create: {
          provider: item.provider.toLowerCase(),
          title: item.title.trim(),
          description: item.desc ? item.desc.trim() : null,
          link: item.link.trim(),
          image: initialImage,
          category: item.tag || null,
          publishedAt: publishedAt,
        },
        update: updateData,
      });
      count++;
    }
  } catch (err: any) {
    console.warn("[Postgres LiveNews Upsert] Warning during upsert:", err?.message || err);
  }
  return count;
}

/**
 * Fallback reader: Retrieves the most recent articles from the persistent PostgreSQL database.
 */
export async function fetchLiveNewsFromDb(limit = 28): Promise<AggregatedArticle[]> {
  try {
    const rows = await prisma.liveNewsItem.findMany({
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    if (!rows || rows.length === 0) return [];

    return rows.map((row) => {
      const pKey = row.provider.toLowerCase();
      const isRegional = ["dawn", "brecorder", "propakistani", "tribune"].includes(pKey);
      const conf = PROVIDER_CONFIGS.find((c) => c.key === pKey);
      const fallbackImg = conf?.defaultImage || "/images/kc-news.webp";
      const finalImg = (!row.image || row.image === "/images/kc-news.webp") ? fallbackImg : row.image;

      return {
        id: `${pKey}-${row.id}`,
        source: conf?.sourceName || conf?.name || pKey.toUpperCase(),
        provider: pKey,
        providerLabel: conf?.brandBadge || pKey.toUpperCase(),
        title: row.title,
        desc: row.description || "",
        link: row.link,
        image: finalImg,
        img: finalImg,
        date: row.publishedAt ? row.publishedAt.toISOString() : new Date().toISOString(),
        timestamp: row.publishedAt ? row.publishedAt.toISOString() : new Date().toISOString(),
        tag: row.category || conf?.category || "TECH NEWS",
        type: isRegional ? "regional" : "international",
      };
    });
  } catch (err: any) {
    console.warn("[Postgres LiveNews Fallback] Error reading from DB:", err?.message || err);
    return [];
  }
}

/**
 * Retrieves the latest article for EVERY provider directly from PostgreSQL.
 * Guarantees that lower-frequency publishers (Apple, OpenAI, Microsoft) are never crowded out.
 */
export async function fetchLatestProviderArticlesFromDb(): Promise<Record<string, AggregatedArticle>> {
  const result: Record<string, AggregatedArticle> = {};
  try {
    for (const p of PROVIDER_CONFIGS) {
      const row = await prisma.liveNewsItem.findFirst({
        where: { provider: p.key.toLowerCase() },
        orderBy: { publishedAt: "desc" },
      });
      if (row) {
        const isRegional = p.type === "regional";
        const fallbackImg = p.defaultImage || "/images/kc-news.webp";
        const finalImg = (!row.image || row.image === "/images/kc-news.webp") ? fallbackImg : row.image;
        result[p.key.toLowerCase()] = {
          id: `${p.key.toLowerCase()}-${row.id}`,
          source: p.sourceName || p.name,
          provider: p.key.toLowerCase(),
          providerLabel: p.brandBadge,
          title: row.title,
          desc: row.description || "",
          link: row.link,
          image: finalImg,
          img: finalImg,
          date: row.publishedAt ? row.publishedAt.toISOString() : new Date().toISOString(),
          timestamp: row.publishedAt ? row.publishedAt.toISOString() : new Date().toISOString(),
          tag: row.category || p.category || "TECH NEWS",
          type: isRegional ? "regional" : "international",
        };
      }
    }
  } catch (err: any) {
    console.warn("[Postgres Latest Provider Wires] Error:", err?.message || err);
  }
  return result;
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

  const allArticles = await fetchAllRawArticles();
  await persistArticlesToDb(allArticles).catch(() => 0);

  // Chronologically sorted top breaking news
  const sortedArticles = [...allArticles].sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return tb - ta;
  });
  const allNews = sortedArticles.slice(0, 28);

  const brandWires: Record<string, any> = {};
  const regionalWires: Record<string, any> = {};

  // Guarantee every international brand wire is populated from full feed or DB
  const intlProviders = PROVIDER_CONFIGS.filter((p) => p.type === "international");
  for (const p of intlProviders) {
    let item =
      allArticles.find(
        (a) =>
          a.provider === p.key &&
          !a.title.toLowerCase().includes("crispr") &&
          !a.title.toLowerCase().includes("enzyme") &&
          (a.title.toLowerCase().includes("gemini") ||
            a.title.toLowerCase().includes("opus") ||
            a.title.toLowerCase().includes("sonnet") ||
            a.title.toLowerCase().includes("claude") ||
            a.title.toLowerCase().includes("copilot"))
      ) ||
      allArticles.find(
        (a) =>
          a.provider === p.key &&
          !a.title.toLowerCase().includes("crispr") &&
          !a.title.toLowerCase().includes("enzyme")
      ) ||
      allArticles.find((a) => a.provider === p.key);
    if (!item) {
      try {
        const dbRow = await prisma.liveNewsItem.findFirst({
          where: { provider: p.key },
          orderBy: { publishedAt: "desc" },
        });
        if (dbRow) {
          item = {
            id: `${p.key}-${dbRow.id}`,
            source: p.sourceName,
            provider: p.key,
            providerLabel: p.brandBadge,
            title: dbRow.title,
            desc: dbRow.description || "",
            link: dbRow.link,
            image: dbRow.image || p.defaultImage,
            img: dbRow.image || p.defaultImage,
            date: dbRow.publishedAt ? dbRow.publishedAt.toISOString() : new Date().toISOString(),
            timestamp: dbRow.publishedAt ? dbRow.publishedAt.toISOString() : new Date().toISOString(),
            tag: dbRow.category || p.category,
            type: "international",
          };
        }
      } catch {}
    }
    if (item) {
      const rawImg = item.image || item.img || "";
      const isBadImg =
        !rawImg ||
        rawImg.includes("kc-news.webp") ||
        rawImg.includes("25a7c99743ebfb3b") ||
        rawImg.includes("8a4eb6c412e5e7ffa38f07233344f4b7e6644994") ||
        rawImg.toLowerCase().includes("omb-home-final") ||
        (p.key === "microsoft" && (rawImg.includes("blogs.microsoft.com") || rawImg.includes("thesourcemediaassets")));
      const cleanImg = isBadImg ? p.defaultImage : rawImg;

      brandWires[p.key] = {
        id: p.key,
        brandBadge: item.providerLabel,
        captionTag: `${p.key.toUpperCase()} OFFICIAL WIRE`,
        cat: item.tag,
        date: item.date || `${item.source} (Live RSS)`,
        title: item.title,
        summary: item.desc,
        source: item.source,
        link: item.link,
        img: cleanImg,
        caption: `📷 ${item.title}`,
        provider_published_at: item.timestamp,
      };
    }
  }

  // Guarantee every regional wire is populated from full feed or DB
  const regProviders = PROVIDER_CONFIGS.filter((p) => p.type === "regional");
  for (const p of regProviders) {
    let item = allArticles.find((a) => a.provider === p.key);
    if (!item) {
      try {
        const dbRow = await prisma.liveNewsItem.findFirst({
          where: { provider: p.key },
          orderBy: { publishedAt: "desc" },
        });
        if (dbRow) {
          item = {
            id: `${p.key}-${dbRow.id}`,
            source: p.sourceName,
            provider: p.key,
            providerLabel: p.brandBadge,
            title: dbRow.title,
            desc: dbRow.description || "",
            link: dbRow.link,
            image: dbRow.image || "/images/kc-news.webp",
            img: dbRow.image || "/images/kc-news.webp",
            date: dbRow.publishedAt ? dbRow.publishedAt.toISOString() : new Date().toISOString(),
            timestamp: dbRow.publishedAt ? dbRow.publishedAt.toISOString() : new Date().toISOString(),
            tag: dbRow.category || p.category,
            type: "regional",
          };
        }
      } catch {}
    }
    if (item) {
      regionalWires[p.key] = {
        id: p.key,
        name: item.source,
        brandBadge: item.providerLabel,
        category: item.tag,
        date: item.date || `${item.source} (Live RSS)`,
        title: item.title,
        summary: item.desc,
        sourceName: item.source,
        sourceUrl: item.link,
        link: item.link,
        image: item.image || item.img,
        img: item.image || item.img,
        provider_published_at: item.timestamp,
      };
    }
  }

  for (const rKey of ["dawn", "brecorder", "propakistani", "tribune"]) {
    if (!regionalWires[rKey]) {
      const p = PROVIDER_CONFIGS.find((c) => c.key === rKey);
      if (p) {
        regionalWires[rKey] = {
          id: p.key,
          name: p.name,
          brandBadge: p.brandBadge,
          category: p.category,
          date: "Live Wire",
          title: `${p.name} Updates`,
          summary: `Latest verified technology and digital ecosystem dispatches from ${p.name}.`,
          sourceName: p.name,
          sourceUrl: p.rssUrl,
          link: p.rssUrl,
          image: p.defaultImage,
          img: p.defaultImage,
        };
      }
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
