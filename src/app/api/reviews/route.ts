import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("article_id");

    let res;
    if (articleId) {
      res = await query(
        "SELECT * FROM article_reviews WHERE article_id = $1 AND status = 'APPROVED' ORDER BY id DESC",
        [parseInt(articleId, 10)]
      );
    } else {
      res = await query(
        "SELECT * FROM article_reviews WHERE status = 'APPROVED' ORDER BY id DESC LIMIT 50"
      );
    }

    return NextResponse.json({ success: true, reviews: res.rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      article_id,
      article_title,
      reviewer_name,
      organization,
      rating,
      review_title,
      details,
      avatar,
    } = body;

    if (!reviewer_name?.trim() || !details?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and Review details are required." },
        { status: 400 }
      );
    }

    const res = await query(
      `INSERT INTO article_reviews 
       (article_id, article_title, reviewer_name, organization, rating, review_title, details, avatar, status, helpful, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'APPROVED', 1, NOW())
       RETURNING *`,
      [
        article_id ? parseInt(article_id, 10) : 1,
        article_title?.trim() || "Knowledge Article",
        reviewer_name.trim(),
        organization?.trim() || "Enterprise Reader",
        typeof rating === "number" ? Math.max(1, Math.min(5, rating)) : 5,
        review_title?.trim() || "Verified Review",
        details.trim(),
        avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully and published.",
      review: res.rows[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit review" },
      { status: 500 }
    );
  }
}
