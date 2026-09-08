import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    if (res.rows.length === 0) {
      return NextResponse.json({ success: true, settings: null });
    }
    return NextResponse.json({ success: true, settings: res.rows[0].value });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await query(
      `INSERT INTO website_settings (key, value, updated_at)
       VALUES ('global_config', $1, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()
       RETURNING value`,
      [JSON.stringify(body)]
    );
    return NextResponse.json({ success: true, settings: res.rows[0].value });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
