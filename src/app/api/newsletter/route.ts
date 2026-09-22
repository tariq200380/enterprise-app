import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = body.email;
    const rawSource = body.source;

    if (!rawEmail || typeof rawEmail !== "string") {
      return NextResponse.json(
        { success: false, error: "Work email address is required." },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || email.length > 255) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    const source =
      typeof rawSource === "string" && rawSource.trim().length > 0
        ? rawSource.trim().slice(0, 100)
        : "Website Enterprise Insights Newsletter";

    await query(
      `INSERT INTO subscribers (email, source, status)
       VALUES ($1, $2, 'ACTIVE')
       ON CONFLICT (email) DO UPDATE SET status = 'ACTIVE'`,
      [email, source]
    );

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Quarterly enterprise insights will be delivered to your inbox.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process subscription at this time. Please try again later.",
      },
      { status: 500 }
    );
  }
}
