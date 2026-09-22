import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOCAL_CACHE_PATH = path.join(process.cwd(), "public", "data", "live_news_cache.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "live_news");

function readCache() {
  if (!fs.existsSync(LOCAL_CACHE_PATH)) {
    return {
      status: "success",
      timestamp: new Date().toISOString(),
      breaking_news: [],
      brand_wires: {},
      regional_wires: {},
    };
  }
  const raw = fs.readFileSync(LOCAL_CACHE_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeCache(data: any) {
  data.timestamp = new Date().toISOString();
  const jsonStr = JSON.stringify(data, null, 2);
  fs.writeFileSync(LOCAL_CACHE_PATH, jsonStr, "utf-8");
}

function getGalleryImages() {
  if (!fs.existsSync(UPLOADS_DIR)) return [];
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    return files
      .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
      .map((f) => ({
        filename: f,
        url: `/uploads/live_news/${f}`,
        name: f
          .replace(/[-_]/g, " ")
          .replace(/\.(jpg|jpeg|png|webp|avif)$/i, "")
          .replace(/[a-f0-9]{8,}$/i, "")
          .trim(),
      }));
  } catch {
    return [];
  }
}

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
    img: "https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg",
    caption: "📷 Apple opens Apple Music Hall",
  },
  microsoft: {
    id: "microsoft",
    brandBadge: "🪟 MICROSOFT",
    captionTag: "MICROSOFT OFFICIAL WIRE",
    cat: "ENTERPRISE CLOUD & AI",
    date: "Thu, 17 Sep 2026 14:00:05 +0000",
    title: "What we’ve learned from Microsoft’s own AI transformation",
    summary: "AI is reshaping work faster than any organization has fully mastered. Across industries, the conversation has shifted from what AI can do to how companies can use AI to create business value and expand what people are able to achieve.",
    source: "Microsoft",
    link: "https://blogs.microsoft.com/blog/2026/09/17/what-weve-learned-from-microsofts-own-ai-transformation/",
    img: "https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Hero-FINAL-9_17-1024x683.jpg?v=1789653605000",
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
    img: "https://about.fb.com/wp-content/uploads/2026/09/Announcing-Petal-a-First-of-its-Kind-Transoceanic-Subsea-Cable_Header.jpg",
    caption: "📷 Announcing Petal, a First-of-its-Kind Transoceanic Subsea Cable",
  },
  openai: {
    id: "openai",
    brandBadge: "🤖 OPENAI",
    captionTag: "OPENAI OFFICIAL WIRE",
    cat: "GENERATIVE AI & REASONING",
    date: "Mon, 21 Sep 2026 12:00:00 GMT",
    title: "Advisory Group on Mathematics and Artificial Intelligence",
    summary: "OpenAI is working with an independent Advisory Group on Mathematics and Artificial Intelligence to guide the review and communication of emerging AI results.",
    source: "OpenAI",
    link: "https://openai.com/index/advisory-group-on-mathematics-and-ai",
    img: "https://images.ctfassets.net/kftzwdyauwt9/11yqmSO7D1dfYveBnOdmJt/e451277f37f82f51d6d20f2b86826590/advisory-group-on-mathematics-and-artificial-intelligence-seo.png?w=1600&h=900&fit=fill",
    caption: "📷 Advisory Group on Mathematics and Artificial Intelligence",
  },
  nvidia: {
    id: "nvidia",
    brandBadge: "⚡ NVIDIA",
    captionTag: "NVIDIA OFFICIAL WIRE",
    cat: "ACCELERATED COMPUTING & AI",
    date: "Mon, 21 Sep 2026 18:00:07 +0000",
    title: "NVIDIA Launches DSX Ready to Qualify Power and Cooling Products for AI Factories",
    summary: "Every AI factory needs power and cooling that fit its computing architecture. As AI infrastructure expands, power, cooling, water, site and grid constraints are shaping what builders can deploy.",
    source: "NVIDIA",
    link: "https://blogs.nvidia.com/blog/dsx-ready-ai-factories-power-cooling/",
    img: "https://blogs.nvidia.com/wp-content/uploads/2026/09/end-to-end-press-dsx-ready-kv-1920x1080-1.png?v=1790013607000",
    caption: "📷 NVIDIA Launches DSX Ready to Qualify Power and Cooling Products for AI Factories",
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
    img: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/28525___EDNA_Blog_header_01.max-600x600.format-webp.webp",
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
    img: "/uploads/live_news/anthropic_fable_mythos_hero.jpg",
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
    img: "/uploads/live_news/intel_ai_infra_summit_2026.jpg",
    caption: "📷 Intel on-the-ground at the AI Infra Summit",
  },
};

export async function GET() {
  try {
    const cache = readCache();
    const gallery = getGalleryImages();

    // Ensure all 8 global brand wires are always available and never dropped
    const mergedBrandWires: Record<string, any> = {};
    const brandKeys = ["apple", "microsoft", "meta", "openai", "nvidia", "google", "anthropic", "intel"];

    for (const key of brandKeys) {
      const existing = cache.brand_wires?.[key];
      const fallback = DEFAULT_BRAND_FALLBACKS[key];
      if (existing) {
        let cleanImg = (existing.img || existing.image || fallback.img || "").replace(/&amp;/g, "&");
        mergedBrandWires[key] = {
          ...fallback,
          ...existing,
          img: cleanImg,
          image: cleanImg,
        };
      } else {
        mergedBrandWires[key] = fallback;
      }
    }

    return NextResponse.json({
      success: true,
      breaking_news: (cache.breaking_news || []).slice(0, 28),
      brand_wires: mergedBrandWires,
      regional_wires: cache.regional_wires || {},
      gallery_images: gallery,
      timestamp: cache.timestamp,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load admin news" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const cache = readCache();

    // 1. Handle single story update
    if (body.section && body.id && body.data) {
      const { section, id, data } = body;

      if (section === "breaking") {
        if (!Array.isArray(cache.breaking_news)) cache.breaking_news = [];
        const idx = cache.breaking_news.findIndex(
          (item: any) => item.external_id === id || item.id === id || item.provider === id
        );
        if (idx !== -1) {
          cache.breaking_news[idx] = { ...cache.breaking_news[idx], ...data };
        } else {
          cache.breaking_news.unshift(data);
        }
      } else if (section === "brand") {
        if (!cache.brand_wires) cache.brand_wires = {};
        cache.brand_wires[id] = { ...(cache.brand_wires[id] || {}), ...data };
      } else if (section === "regional") {
        if (!cache.regional_wires) cache.regional_wires = {};
        cache.regional_wires[id] = { ...(cache.regional_wires[id] || {}), ...data };
      }
      writeCache(cache);
      return NextResponse.json({ success: true, message: "Story updated successfully", cache });
    }

    // 2. Handle bulk update
    if (body.breaking_news || body.brand_wires || body.regional_wires) {
      if (body.breaking_news) cache.breaking_news = body.breaking_news;
      if (body.brand_wires) cache.brand_wires = body.brand_wires;
      if (body.regional_wires) cache.regional_wires = body.regional_wires;
      writeCache(cache);
      return NextResponse.json({ success: true, message: "News cache synchronized", cache });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload: must provide section & data or full cache" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
