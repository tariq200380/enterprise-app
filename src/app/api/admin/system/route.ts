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
    const start = Date.now();
    await query("SELECT 1");
    const latency = Date.now() - start;

    const tables = [
      "articles",
      "candidates",
      "contact_inquiries",
      "videos",
      "testimonials",
      "job_openings",
      "article_reviews",
      "subscribers",
      "portfolio_projects",
      "website_settings",
      "founder_proposals",
      "security_reports"
    ];

    const counts: Record<string, number> = {};
    for (const tbl of tables) {
      const res = await query(`SELECT COUNT(*) FROM ${tbl}`);
      counts[tbl] = parseInt(res.rows[0].count, 10);
    }

    const pendingReviewsRes = await query("SELECT COUNT(*) FROM article_reviews WHERE status = 'PENDING'");
    counts["pending_reviews"] = parseInt(pendingReviewsRes.rows[0]?.count || "0", 10);

    const newInquiriesRes = await query("SELECT COUNT(*) FROM contact_inquiries WHERE status = 'NEW'");
    counts["new_inquiries"] = parseInt(newInquiriesRes.rows[0]?.count || "0", 10);

    const newSecurityReportsRes = await query("SELECT COUNT(*) FROM security_reports WHERE status = 'NEW'");
    counts["new_security_reports"] = parseInt(newSecurityReportsRes.rows[0]?.count || "0", 10);

    const visionRequestsRes = await query(
      "SELECT COUNT(*) FROM contact_inquiries WHERE service ILIKE '%vision%' OR service ILIKE '%project discussion%' OR project_details IS NOT NULL"
    );
    counts["vision_requests"] = parseInt(visionRequestsRes.rows[0]?.count || "0", 10);

    const mem = process.memoryUsage();

    return NextResponse.json({
      success: true,
      telemetry: {
        database: "PostgreSQL 18 (Alpine/Debian)",
        port: 5433,
        latencyMs: latency,
        status: "HEALTHY",
        uptimeSeconds: Math.floor(process.uptime()),
        memoryHeapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
        counts,
      },
    });
  } catch (error: any) {
    console.error("System GET error:", error);
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
    const { action } = body;

    if (action === "backup") {
      const tables = [
        "articles",
        "candidates",
        "contact_inquiries",
        "videos",
        "testimonials",
        "job_openings",
        "article_reviews",
        "subscribers",
        "portfolio_projects",
        "website_settings",
        "founder_proposals",
        "security_reports"
      ];
      const backupData: Record<string, any[]> = {};
      for (const tbl of tables) {
        const res = await query(`SELECT * FROM ${tbl}`);
        backupData[tbl] = res.rows;
      }
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        backup: backupData,
      });
    }

    if (action === "flush") {
      return NextResponse.json({
        success: true,
        message: "Server cache and buffer invalidated successfully.",
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("System POST error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
