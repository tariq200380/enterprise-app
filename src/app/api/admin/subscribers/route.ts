import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM subscribers ORDER BY id DESC");
    return NextResponse.json({ success: true, subscribers: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source } = body;
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }
    const res = await query(
      `INSERT INTO subscribers (email, source, status)
       VALUES ($1, $2, 'ACTIVE')
       ON CONFLICT (email) DO UPDATE SET status = 'ACTIVE' RETURNING *`,
      [email, source || "Admin Manual Entry"]
    );
    return NextResponse.json({ success: true, subscriber: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing subscriber id" }, { status: 400 });
    }
    await query("DELETE FROM subscribers WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Subscriber ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
