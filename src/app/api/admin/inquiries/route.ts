import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await query("SELECT * FROM contact_inquiries ORDER BY id DESC");
    return NextResponse.json({ success: true, inquiries: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      client_name,
      service,
      company,
      phone,
      email,
      project_details,
      need_nda,
    } = body;

    const timeStr = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const createdAt = `Today, ${timeStr}`;

    const res = await query(
      `INSERT INTO contact_inquiries (client_name, service, company, phone, email, project_details, need_nda, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        client_name || "Enterprise Client",
        service || "Enterprise Architecture & Engineering",
        company || "Confidential Enterprise",
        phone || "",
        email || "",
        project_details || "General consultation requested via website.",
        need_nda !== undefined ? need_nda : true,
        "NEW",
        createdAt,
      ]
    );

    return NextResponse.json({ success: true, inquiry: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const res = await query(
      "UPDATE contact_inquiries SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return NextResponse.json({ success: true, inquiry: res.rows[0] });
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
    return NextResponse.json({ success: true, message: `Inquiry ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
