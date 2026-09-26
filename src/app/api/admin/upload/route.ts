import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { withCacheBuster } from "@/lib/cacheBuster";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) return auth.response!;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const ext = path.extname(file.name).toLowerCase().replace(".", "");

    if (!allowedExtensions.includes(ext) || !allowedMimeTypes.includes(file.type?.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPG, JPEG, PNG, WebP, and GIF files are allowed." },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds the 5MB limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists in public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Generate unique, collision-proof filename
    const timestamp = Date.now();
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}_${uniqueId}_${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const publicUrl = withCacheBuster(`/uploads/${fileName}`, timestamp);
    return NextResponse.json({ success: true, url: publicUrl, filename: fileName });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
