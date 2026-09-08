import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await query("DELETE FROM articles WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Article ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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
      `UPDATE articles SET
        title = $1, category = $2, author = $3, read_time = $4,
        cover_photo_url = $5, video_embed_url = $6, audio_stream_url = $7,
        editor_note = $8, content = $9, pros = $10, cons = $11, specs = $12
       WHERE id = $13 RETURNING *`,
      [
        title,
        category,
        author,
        read_time,
        cover_photo_url || "",
        video_embed_url || "",
        audio_stream_url || "",
        editor_note || "",
        content || "",
        JSON.stringify(pros || []),
        JSON.stringify(cons || []),
        JSON.stringify(specs || []),
        id,
      ]
    );

    return NextResponse.json({ success: true, article: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
