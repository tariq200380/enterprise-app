import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOCAL_CACHE_PATH = path.join(process.cwd(), "public", "data", "live_news_cache.json");
const EXTERNAL_CACHE_PATH = "/home/tariq/Desktop/procreedtech/public_html/data/live_news_cache.json";
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
  try {
    if (fs.existsSync(path.dirname(EXTERNAL_CACHE_PATH))) {
      fs.writeFileSync(EXTERNAL_CACHE_PATH, jsonStr, "utf-8");
    }
  } catch {}
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

export async function GET() {
  try {
    const cache = readCache();
    const gallery = getGalleryImages();
    return NextResponse.json({
      success: true,
      breaking_news: cache.breaking_news || [],
      brand_wires: cache.brand_wires || {},
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
