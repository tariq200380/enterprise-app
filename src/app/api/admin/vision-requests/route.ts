import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await query(
      "SELECT * FROM contact_inquiries WHERE service ILIKE '%vision%' OR project_details IS NOT NULL ORDER BY id DESC"
    );
    return NextResponse.json({ success: true, inquiries: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing inquiry id" }, { status: 400 });
    }
    await query("DELETE FROM contact_inquiries WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Vision request #${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
