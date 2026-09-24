import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const res = await query("SELECT * FROM security_reports ORDER BY id DESC");
    return NextResponse.json({ success: true, reports: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUBLIC SUBMISSION ENDPOINT: Preserved for public security vulnerability reports
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      reporter_name,
      email,
      category,
      severity,
      subject,
      description,
    } = body;

    const trimmedName = typeof reporter_name === "string" ? reporter_name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedCategory = typeof category === "string" ? category.trim() : "Security Complaint";
    const trimmedSeverity = typeof severity === "string" ? severity.trim() : "Medium";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "Security Inquiry";
    const trimmedDesc = typeof description === "string" ? description.trim() : "";

    if (!trimmedName) {
      return NextResponse.json(
        { success: false, error: "Reporter name is required." },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { success: false, error: "Contact email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!trimmedDesc) {
      return NextResponse.json(
        { success: false, error: "Description or details of the security question/complaint is required." },
        { status: 400 }
      );
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const res = await query(
      `INSERT INTO security_reports (reporter_name, email, category, severity, subject, description, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'NEW', $7)
       RETURNING *`,
      [
        trimmedName.slice(0, 255),
        trimmedEmail.slice(0, 255),
        trimmedCategory.slice(0, 100),
        trimmedSeverity.slice(0, 50),
        trimmedSubject.slice(0, 255),
        trimmedDesc.slice(0, 10000),
        formattedDate,
      ]
    );

    return NextResponse.json({ success: true, report: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process security report" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }
    const res = await query(
      "UPDATE security_reports SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return NextResponse.json({ success: true, report: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing report id" }, { status: 400 });
    }
    await query("DELETE FROM security_reports WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Security report ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
