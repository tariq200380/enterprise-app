import { NextResponse } from "next/server";
import { writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "live_news");

export async function GET() {
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
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `custom_${timestamp}_${safeName}`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/live_news/${fileName}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: fileName,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
