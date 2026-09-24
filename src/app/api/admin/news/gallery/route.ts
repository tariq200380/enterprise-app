import { NextResponse } from "next/server";
import { writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { withCacheBuster } from "@/lib/cacheBuster";
import { verifyAdminAuth } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "live_news");

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      return NextResponse.json({ success: true, images: [] });
    }
    const files = await readdir(UPLOADS_DIR);
    const images = files
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
    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await mkdir(UPLOADS_DIR, { recursive: true });

    const timestamp = Date.now();
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `custom_${timestamp}_${uniqueId}_${safeName}`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    await writeFile(filePath, buffer);

    const rawUrl = `/uploads/live_news/${fileName}`;
    const publicUrl = withCacheBuster(rawUrl, timestamp);
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: fileName,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
