import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM job_openings ORDER BY id DESC");
    return NextResponse.json({ success: true, jobs: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, department, location, status, description, tags } = body;
    const res = await query(
      `INSERT INTO job_openings (title, department, location, status, description, tags)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        title || "Senior Software Engineer",
        department || "Cloud Architecture",
        location || "Remote / Global",
        status || "ACTIVE",
        description || "Architect and scale distributed enterprise systems.",
        JSON.stringify(tags || ["TypeScript", "Next.js", "PostgreSQL"]),
      ]
    );
    return NextResponse.json({ success: true, job: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const res = await query(
      "UPDATE job_openings SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return NextResponse.json({ success: true, job: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing job id" }, { status: 400 });
    }
    await query("DELETE FROM job_openings WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Job ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
