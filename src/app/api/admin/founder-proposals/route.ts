import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM founder_proposals ORDER BY id DESC");
    return NextResponse.json({ success: true, proposals: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { candidate_name, email, specialty_proposal, portfolio_link, proposal_pitch } = body;

    if (!candidate_name || !email || !specialty_proposal) {
      return NextResponse.json(
        { success: false, error: "Name, email, and specialty proposal are required" },
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
      `INSERT INTO founder_proposals (candidate_name, email, specialty_proposal, portfolio_link, proposal_pitch, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'NEW', $6)
       RETURNING *`,
      [
        candidate_name.trim(),
        email.trim(),
        specialty_proposal.trim(),
        (portfolio_link || "").trim(),
        (proposal_pitch || "").trim(),
        formattedDate,
      ]
    );

    return NextResponse.json({ success: true, proposal: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const res = await query(
      "UPDATE founder_proposals SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return NextResponse.json({ success: true, proposal: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing proposal id" }, { status: 400 });
    }
    await query("DELETE FROM founder_proposals WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Proposal ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
