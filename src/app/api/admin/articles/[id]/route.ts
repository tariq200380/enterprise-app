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
      status,
      source_news,
    } = body;

    const res = await query(
      `UPDATE articles SET
        title = $1, category = $2, author = $3, read_time = $4,
        cover_photo_url = $5, video_embed_url = $6, audio_stream_url = $7,
        editor_note = $8, content = $9, pros = $10, cons = $11, specs = $12,
        status = COALESCE($13, status),
        source_news = COALESCE($14, source_news)
       WHERE id = $15 RETURNING *`,
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
        status || null,
        source_news !== undefined ? source_news : null,
        id,
      ]
    );

    return NextResponse.json({ success: true, article: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status, ...fields } = body;

    const setClauses: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (status !== undefined) {
      setClauses.push(`status = $${paramIndex++}`);
      values.push(status);
    }
    if (fields.title !== undefined) {
      setClauses.push(`title = $${paramIndex++}`);
      values.push(fields.title);
    }
    if (fields.category !== undefined) {
      setClauses.push(`category = $${paramIndex++}`);
      values.push(fields.category);
    }
    if (fields.author !== undefined) {
      setClauses.push(`author = $${paramIndex++}`);
      values.push(fields.author);
    }
    if (fields.read_time !== undefined) {
      setClauses.push(`read_time = $${paramIndex++}`);
      values.push(fields.read_time);
    }
    if (fields.cover_photo_url !== undefined) {
      setClauses.push(`cover_photo_url = $${paramIndex++}`);
      values.push(fields.cover_photo_url);
    }
    if (fields.video_embed_url !== undefined) {
      setClauses.push(`video_embed_url = $${paramIndex++}`);
      values.push(fields.video_embed_url);
    }
    if (fields.audio_stream_url !== undefined) {
      setClauses.push(`audio_stream_url = $${paramIndex++}`);
      values.push(fields.audio_stream_url);
    }
    if (fields.editor_note !== undefined) {
      setClauses.push(`editor_note = $${paramIndex++}`);
      values.push(fields.editor_note);
    }
    if (fields.content !== undefined) {
      setClauses.push(`content = $${paramIndex++}`);
      values.push(fields.content);
    }
    if (fields.pros !== undefined) {
      setClauses.push(`pros = $${paramIndex++}`);
      values.push(JSON.stringify(fields.pros));
    }
    if (fields.cons !== undefined) {
      setClauses.push(`cons = $${paramIndex++}`);
      values.push(JSON.stringify(fields.cons));
    }
    if (fields.specs !== undefined) {
      setClauses.push(`specs = $${paramIndex++}`);
      values.push(JSON.stringify(fields.specs));
    }
    if (fields.source_news !== undefined) {
      setClauses.push(`source_news = $${paramIndex++}`);
      values.push(fields.source_news);
    }

    if (setClauses.length === 0) {
      return NextResponse.json({ success: false, error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    const queryText = `UPDATE articles SET ${setClauses.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    const res = await query(queryText, values);

    return NextResponse.json({ success: true, article: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
