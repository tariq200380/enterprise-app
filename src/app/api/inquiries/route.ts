import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawName = body.client_name || body.name || body.fullName;
    const rawEmail = body.email;
    const rawService = body.service;
    const rawCompany = body.company;
    const rawPhone = body.phone;
    const rawDetails = body.project_details || body.details || body.message;
    const rawNda = body.need_nda !== undefined ? body.need_nda : body.nda;

    const trimmedName = typeof rawName === "string" ? rawName.trim() : "";
    const trimmedEmail = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 255) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }

    const service =
      typeof rawService === "string" && rawService.trim().length > 0
        ? rawService.trim().slice(0, 255)
        : "Software Development";

    const company =
      typeof rawCompany === "string" && rawCompany.trim().length > 0
        ? rawCompany.trim().slice(0, 255)
        : "Enterprise Organization";

    const phone =
      typeof rawPhone === "string" ? rawPhone.trim().slice(0, 100) : "";

    const details =
      typeof rawDetails === "string" ? rawDetails.trim().slice(0, 5000) : "";

    const needNda = Boolean(rawNda);

    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    const createdAt = `${dateFormatted}, ${timeFormatted}`;

    const res = await query(
      `INSERT INTO contact_inquiries (client_name, service, company, phone, email, project_details, need_nda, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'NEW', $8)
       RETURNING id`,
      [
        trimmedName.slice(0, 255),
        service,
        company,
        phone,
        trimmedEmail,
        details || "General consultation requested via website.",
        needNda,
        createdAt,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Your project inquiry has been received. Our engineering team will contact you shortly.",
      inquiryId: res.rows[0]?.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to submit project inquiry at this time. Please try again later.",
      },
      { status: 500 }
    );
  }
}
