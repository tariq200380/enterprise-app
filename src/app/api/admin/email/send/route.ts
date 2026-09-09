import { NextResponse } from "next/server";
import { sendEmail, getSmtpConfig } from "@/lib/mailer";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { inquiryId, to, subject, message, updateStatus = true } = body;

    if (!to || !to.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid recipient email is required." },
        { status: 400 }
      );
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Email subject is required." },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Email message cannot be empty." },
        { status: 400 }
      );
    }

    const config = await getSmtpConfig();
    const isConfigured = Boolean(config.user && config.pass);

    let emailSent = false;
    let sendResult: any = null;

    if (isConfigured) {
      // Send real email via SMTP
      const formattedHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
          <div style="background: #0b1120; padding: 20px; border-radius: 8px 8px 0 0; text-align: left;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 800; letter-spacing: 0.05em;">CREED TECH</h2>
            <span style="color: #94a3b8; font-size: 12px;">Enterprise Systems & Architecture Engineering</span>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            ${message.replace(/\n/g, "<br/>")}
            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0 16px;" />
            <div style="font-size: 11px; color: #64748b;">
              <strong>Creed Tech Enterprise Systems</strong><br />
              Direct Support & Scoping Desk<br />
              <a href="https://creed-tech.com" style="color: #0052ff; text-decoration: none;">https://creed-tech.com</a>
            </div>
          </div>
        </div>
      `;

      sendResult = await sendEmail({
        to,
        subject,
        html: formattedHtml,
        text: message,
      });

      emailSent = sendResult.success;
    }

    // Automatically update inquiry status to 'RESPONDED' if requested
    if (inquiryId && updateStatus) {
      await query("UPDATE contact_inquiries SET status = 'RESPONDED' WHERE id = $1", [inquiryId]);
    }

    if (emailSent) {
      return NextResponse.json({
        success: true,
        delivered: true,
        message: sendResult.message,
      });
    } else {
      return NextResponse.json({
        success: true,
        delivered: false,
        needConfig: !isConfigured,
        message: !isConfigured
          ? "Inquiry marked as RESPONDED. (To send live emails directly from server, configure SMTP credentials in Email Settings or use 1-Click Gmail Web Compose.)"
          : sendResult?.message || "Could not deliver through SMTP server.",
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
