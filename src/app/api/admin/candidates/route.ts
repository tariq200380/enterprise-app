import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM candidates ORDER BY id DESC");
    return NextResponse.json({ success: true, candidates: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const res = await query(
      "UPDATE candidates SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return NextResponse.json({ success: true, candidate: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing candidate id" }, { status: 400 });
    }
    await query("DELETE FROM candidates WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Candidate ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
