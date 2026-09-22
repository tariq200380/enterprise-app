import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawName = body.client_name || body.name;
    const rawRole = body.role;
    const rawCompany = body.company || body.location;
    const rawQuote = body.quote || body.details || body.review;
    const rawRating = body.rating;
    const rawAvatar = body.avatar;

    const trimmedName = typeof rawName === "string" ? rawName.trim() : "";
    const trimmedQuote = typeof rawQuote === "string" ? rawQuote.trim() : "";

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Your name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!trimmedQuote || trimmedQuote.length < 5) {
      return NextResponse.json(
        { success: false, error: "Review quote/feedback is required (minimum 5 characters)." },
        { status: 400 }
      );
    }

    const role =
      typeof rawRole === "string" && rawRole.trim().length > 0
        ? rawRole.trim().slice(0, 100)
        : "Enterprise Client";

    const company =
      typeof rawCompany === "string" && rawCompany.trim().length > 0
        ? rawCompany.trim().slice(0, 100)
        : "Global Enterprise";

    let rating = 5;
    const parsedRating = Number(rawRating);
    if (!isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 5) {
      rating = Math.round(parsedRating);
    }

    const avatar =
      typeof rawAvatar === "string" && rawAvatar.startsWith("http")
        ? rawAvatar.trim().slice(0, 500)
        : "";

    const res = await query(
      `INSERT INTO testimonials (client_name, role, company, avatar, rating, quote, verified, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, false, NOW())
       RETURNING id`,
      [
        trimmedName.slice(0, 255),
        role,
        company,
        avatar,
        rating,
        trimmedQuote.slice(0, 3000),
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Thank you for your review! It has been submitted and will appear on the site once verified.",
      testimonialId: res.rows[0]?.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit review at this time. Please try again later.",
      },
      { status: 500 }
    );
  }
}
