import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdminAuth } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

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
    cat: "ENTERPRISE AI & CLOUD",
    date: "Microsoft Source (Live Wire)",
    title: "Microsoft and Quantinuum achieve breakthrough in commercial quantum computing",
    summary: "Microsoft and Quantinuum demonstrated reliable logical qubits with an error rate 800 times lower than physical qubits, marking a crucial milestone toward commercial hybrid supercomputing.",
    source: "Microsoft Source",
    link: "https://blogs.microsoft.com/blog/2026/09/22/reliable-quantum-computing-logical-qubits/",
    img: "/uploads/live_news/microsoft_copilot_hero.jpg",
    caption: "📷 Microsoft Quantum Lab",
  },
  meta: {
    id: "meta",
    brandBadge: "♾️ META",
    captionTag: "META AI & OPEN SCIENCE",
    cat: "OPEN-SOURCE LLMS",
    date: "Meta AI Research (Live Wire)",
    title: "Meta releases Llama 3.3 multimodal models with native video reasoning",
    summary: "Meta announced the global availability of Llama 3.3 models with synchronized video and audio understanding, optimized for distributed edge execution.",
    source: "Meta AI Blog",
    link: "https://ai.meta.com/blog/",
    img: "/uploads/live_news/meta_muse_hero.jpg",
    caption: "📷 Meta AI Innovation Campus",
  },
  openai: {
    id: "openai",
    brandBadge: "⚡ OPENAI",
    captionTag: "OPENAI FOUNDATION WIRE",
    cat: "FRONTIER INTELLIGENCE",
    date: "OpenAI News (Live Wire)",
    title: "OpenAI introduces o3-mini reasoning model for STEM and deep coding workflows",
    summary: "OpenAI announced o3-mini, delivering frontier STEM reasoning performance with sub-second response latencies and 60% lower token cost for enterprise production environments.",
    source: "OpenAI Research",
    link: "https://openai.com/index/hello-gpt-4o/",
    img: "/uploads/live_news/openai_gpt4o_official.png",
    caption: "📷 OpenAI Research Headquarter",
  },
  nvidia: {
    id: "nvidia",
    brandBadge: "🟩 NVIDIA",
    captionTag: "NVIDIA ACCELERATED COMPUTING",
    cat: "GPU & DATA CENTERS",
    date: "NVIDIA Blog (Live Wire)",
    title: "NVIDIA announces Blackwell Ultra NVL72 architecture for million-GPU clusters",
    summary: "NVIDIA unveiled Blackwell Ultra NVL72 rack systems featuring fifth-generation NVLink interconnects and FP4 tensor core engines designed for next-generation frontier model pre-training.",
    source: "NVIDIA Newsroom",
    link: "https://blogs.nvidia.com/",
    img: "/uploads/live_news/nvidia_skild_ai.jpg",
    caption: "📷 NVIDIA Blackwell NVL72 Superpod",
  },
  google: {
    id: "google",
    brandBadge: "🌐 GOOGLE",
    captionTag: "GOOGLE DEEPMIND INTELLIGENCE",
    cat: "AI FOUNDATIONS",
    date: "Google DeepMind (Live Wire)",
    title: "Google DeepMind unveils Gemini 2.0 Flash with native tool-calling autonomy",
    summary: "Google introduced Gemini 2.0 Flash, delivering exceptional speed, 2M token context windows, and native real-time audio and vision stream processing.",
    source: "Google DeepMind",
    link: "https://deepmind.google/technologies/gemini/",
    img: "/uploads/live_news/google_venice_film_fest.png",
    caption: "📷 Google DeepMind Global AI Lab",
  },
  anthropic: {
    id: "anthropic",
    brandBadge: "🟧 ANTHROPIC",
    captionTag: "ANTHROPIC CONSTITUTIONAL WIRE",
    cat: "ALIGNMENT & SAFETY",
    date: "Anthropic News (Live Wire)",
    title: "Anthropic expands Claude 3.5 Sonnet computer-use API for enterprise automation",
    summary: "Anthropic introduced public computer-use capabilities for Claude 3.5 Sonnet, allowing software agents to interpret user interfaces and execute complex engineering workflows autonomously.",
    source: "Anthropic Research",
    link: "https://www.anthropic.com/news",
    img: "/uploads/live_news/anthropic_fable_mythos_hero.jpg",
    caption: "📷 Anthropic Alignment Research Center",
  },
  intel: {
    id: "intel",
    brandBadge: "🔷 INTEL",
    captionTag: "INTEL SILICON FOUNDRY",
    cat: "SEMICONDUCTORS & LITHOGRAPHY",
    date: "Intel Newsroom (Live Wire)",
    title: "Intel Foundry powers next-generation 18A process node with High-NA EUV lithography",
    summary: "Intel announced volume production milestones on its 18A process node featuring RibbonFET gate-all-around transistors and PowerVia backside power delivery.",
    source: "Intel Newsroom",
    link: "https://www.intel.com/content/www/us/en/newsroom/home.html",
    img: "/uploads/live_news/intel_ai_infra_summit_2026.jpg",
    caption: "📷 Intel on-the-ground at the AI Infra Summit",
  },
};

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const cache = readCache();
    const gallery = getGalleryImages();

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
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    const cache = readCache();

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
