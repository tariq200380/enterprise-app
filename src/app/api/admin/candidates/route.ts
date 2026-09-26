import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { checkRateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const res = await query("SELECT * FROM candidates ORDER BY id DESC");
    return NextResponse.json({ success: true, candidates: res.rows });
  } catch (error: any) {
    console.error("Candidates GET error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

// PUBLIC SUBMISSION ENDPOINT: Preserved for public career applications
export async function POST(req: Request) {
  const rateLimitError = checkRateLimit(req);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await req.json();
    const { candidate_name, domain_specialty, email, portfolio_github } = body;

    if (!candidate_name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
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
      `INSERT INTO candidates (candidate_name, domain_specialty, email, portfolio_github, created_at, status)
       VALUES ($1, $2, $3, $4, $5, 'PENDING')
       RETURNING *`,
      [
        candidate_name.trim(),
        (domain_specialty || "General Engineering").trim(),
        email.trim(),
        (portfolio_github || "").trim(),
        formattedDate,
      ]
    );

    return NextResponse.json({ success: true, candidate: res.rows[0] });
  } catch (error: any) {
    console.error("Candidates POST error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
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
    const res = await query(
      "UPDATE candidates SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return NextResponse.json({ success: true, candidate: res.rows[0] });
  } catch (error: any) {
    console.error("Candidates PATCH error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
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
      return NextResponse.json({ success: false, error: "Missing candidate id" }, { status: 400 });
    }
    await query("DELETE FROM candidates WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Candidate ${id} deleted` });
  } catch (error: any) {
    console.error("Candidates DELETE error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
