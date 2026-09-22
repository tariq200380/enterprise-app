import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { withCacheBuster } from "@/lib/cacheBuster";

// Step 2: Long cache for public published articles (7 days / 1 week)
export const revalidate = 604800;

export async function GET() {
  try {
    const res = await query(
      "SELECT id, title, category, author, read_time, cover_photo_url, video_embed_url, audio_stream_url, editor_note, content, pros, cons, specs, views, status, created_at FROM articles WHERE status = 'PUBLISHED' OR status IS NULL ORDER BY id DESC"
    );

    const articles = res.rows.map((row: any) => ({
      ...row,
      cover_photo_url: row.cover_photo_url
        ? withCacheBuster(row.cover_photo_url, row.created_at || row.id)
        : row.cover_photo_url,
    }));

    return NextResponse.json(
      { success: true, articles },
      {
        headers: {
          "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
