import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM portfolio_projects ORDER BY id DESC");
    return NextResponse.json({ success: true, projects: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, client, summary, stack, live_url, github_url, image_url } = body;
    const res = await query(
      `INSERT INTO portfolio_projects (title, category, client, summary, stack, live_url, github_url, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        title || "Enterprise Scalable Platform",
        category || "CLOUD & ENTERPRISE",
        client || "Global Fortune 500",
        summary || "High-performance microservices architecture with zero downtime deployment.",
        JSON.stringify(stack || ["Next.js", "PostgreSQL", "Docker", "Kubernetes"]),
        live_url || "",
        github_url || "",
        image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      ]
    );
    return NextResponse.json({ success: true, project: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing project id" }, { status: 400 });
    }
    await query("DELETE FROM portfolio_projects WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Project ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
