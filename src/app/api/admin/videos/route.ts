import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM videos ORDER BY id DESC");
    return NextResponse.json({ success: true, videos: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, duration, embed_url, thumbnail_url } = body;
    const res = await query(
      `INSERT INTO videos (title, category, duration, embed_url, thumbnail_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        title || "Untitled Video",
        category || "Cloud Engineering",
        duration || "10:00",
        embed_url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      ]
    );
    return NextResponse.json({ success: true, video: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing video id" }, { status: 400 });
    }
    await query("DELETE FROM videos WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Video ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
