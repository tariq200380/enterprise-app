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
    const res = await query("SELECT * FROM portfolio_projects ORDER BY id DESC");
    return NextResponse.json({ success: true, projects: res.rows, portfolio: res.rows });
  } catch (error: any) {
    console.error("Portfolio GET error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

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
    console.error("Portfolio POST error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    const { id, title, category, client, summary, stack, live_url, github_url, image_url } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing project id" }, { status: 400 });
    }
    const res = await query(
      `UPDATE portfolio_projects
       SET title = $1, category = $2, client = $3, summary = $4, stack = $5, live_url = $6, github_url = $7, image_url = $8
       WHERE id = $9 RETURNING *`,
      [
        title || "Enterprise Scalable Platform",
        category || "CLOUD & ENTERPRISE",
        client || "Global Fortune 500",
        summary || "High-performance microservices architecture with zero downtime deployment.",
        JSON.stringify(stack || ["Next.js", "PostgreSQL", "Docker", "Kubernetes"]),
        live_url || "",
        github_url || "",
        image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        id,
      ]
    );
    if (res.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project: res.rows[0] });
  } catch (error: any) {
    console.error("Portfolio PUT error:", error);
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
      return NextResponse.json({ success: false, error: "Missing project id" }, { status: 400 });
    }
    await query("DELETE FROM portfolio_projects WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Project ${id} deleted` });
  } catch (error: any) {
    console.error("Portfolio DELETE error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
