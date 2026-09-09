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

    const trimmedName = typeof client_name === "string" ? client_name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedDetails = typeof project_details === "string" ? project_details.trim() : "";

    if (!trimmedName) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { success: false, error: "Work email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    const trimmedService = typeof service === "string" ? service.trim() : "Enterprise Architecture & Engineering";
    const trimmedCompany = typeof company === "string" ? company.trim() : "Confidential Enterprise";
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";

    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    const createdAt = `${dateFormatted}, ${timeFormatted}`;

    const res = await query(
      `INSERT INTO contact_inquiries (client_name, service, company, phone, email, project_details, need_nda, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        trimmedName.slice(0, 255),
        trimmedService.slice(0, 255) || "Enterprise Architecture & Engineering",
        trimmedCompany.slice(0, 255) || "Confidential Enterprise",
        trimmedPhone.slice(0, 100),
        trimmedEmail.slice(0, 255),
        trimmedDetails.slice(0, 5000) || "General consultation requested via website.",
        need_nda !== undefined ? Boolean(need_nda) : true,
        "NEW",
        createdAt,
      ]
    );

    return NextResponse.json({ success: true, inquiry: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to process inquiry" }, { status: 500 });
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
