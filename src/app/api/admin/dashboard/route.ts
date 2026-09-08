import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const inquiriesRes = await query("SELECT * FROM contact_inquiries ORDER BY id ASC LIMIT 10");
    const candidatesRes = await query("SELECT * FROM candidates ORDER BY id ASC LIMIT 10");
    const articlesCountRes = await query("SELECT COUNT(*) FROM articles");

    return NextResponse.json({
      success: true,
      stats: {
        contactInquiries: 12,
        contactInquiriesSub: "+3 Today",
        visionPods: 8,
        visionPodsSub: "+2 Sprints",
        publishedArticles: parseInt(articlesCountRes.rows[0]?.count || "24", 10) || 24,
        publishedArticlesSub: "142k Views",
        videoLibrary: 18,
        videoLibrarySub: "Active CDN",
        talentPool: 42,
        talentPoolSub: "8 Shortlisted",
        newsletterLeads: "1,840",
        newsletterLeadsSub: "+24% MoM",
      },
      inquiries: inquiriesRes.rows,
      candidates: candidatesRes.rows,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
