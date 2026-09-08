import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM articles ORDER BY id DESC");
    return NextResponse.json({ success: true, articles: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      author,
      read_time,
      cover_photo_url,
      video_embed_url,
      audio_stream_url,
      editor_note,
      content,
      pros,
      cons,
      specs,
    } = body;

    const res = await query(
      `INSERT INTO articles 
       (title, category, author, read_time, cover_photo_url, video_embed_url, audio_stream_url, editor_note, content, pros, cons, specs)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        title || "Untitled Article",
        category || "GENERAL",
        author || "Editorial Staff",
        read_time || "5 min read",
        cover_photo_url || "",
        video_embed_url || "",
        audio_stream_url || "",
        editor_note || "",
        content || "",
        JSON.stringify(pros || []),
        JSON.stringify(cons || []),
        JSON.stringify(specs || []),
      ]
    );

    return NextResponse.json({ success: true, article: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
