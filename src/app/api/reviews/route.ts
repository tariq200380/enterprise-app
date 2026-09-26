import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { checkRateLimit } from "@/lib/rateLimit";

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
    console.error("Reviews GET error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const rateLimitError = checkRateLimit(req);
  if (rateLimitError) return rateLimitError;

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
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'PENDING', 1, NOW())
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
      message: "Review submitted successfully. It will be published live once approved by an administrator.",
      review: res.rows[0],
    });
  } catch (error: any) {
    console.error("Reviews POST error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
