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

    const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
    const imageMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    const videoExtensions = ["mp4", "webm", "mov", "m4v", "ogg"];
    const videoMimeTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v", "video/ogg"];

    const ext = path.extname(file.name).toLowerCase().replace(".", "");
    const mime = (file.type || "").toLowerCase();

    const isImage = imageExtensions.includes(ext) || imageMimeTypes.includes(mime);
    const isVideo = videoExtensions.includes(ext) || videoMimeTypes.includes(mime);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF, SVG, MP4, WebM, MOV." },
        { status: 400 }
      );
    }

    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
    const maxAllowed = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

    if (file.size > maxAllowed) {
      return NextResponse.json(
        {
          success: false,
          error: isVideo
            ? "Video file size exceeds the 50MB limit."
            : "Image file size exceeds the 10MB limit.",
        },
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
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: fileName,
      mediaType: isVideo ? "video" : "image",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
