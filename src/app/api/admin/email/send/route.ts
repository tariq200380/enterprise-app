import { NextResponse } from "next/server";
import { sendEmail, getSmtpConfig } from "@/lib/mailer";
import { query } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { getEmailProfiles, generateEmailHtml, EmailDepartmentProfile } from "@/lib/email-profiles";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    const {
      inquiryId,
      to,
      subject,
      message,
      updateStatus = true,
      profileId,
      fromEmail,
      fromName,
      clientName,
      service,
      referenceBadge,
      showReferenceBadge,
    } = body;

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

    // Resolve Department Profile for branded layout
    const allProfiles = await getEmailProfiles();
    let selectedProfile: EmailDepartmentProfile | undefined = allProfiles.find(
      (p) => p.id === profileId || p.email.toLowerCase() === (fromEmail || "").toLowerCase()
    );

    if (!selectedProfile) {
      selectedProfile = allProfiles.find((p) => p.isDefault) || allProfiles[0] || {
        id: "default",
        name: fromName || config.from_name || "Creed Tech Enterprise",
        email: fromEmail || config.from_email || "contact@creed-tech.com",
        department: "Enterprise Solutions",
        accentColor: "#FF6B00",
      };
    }

    // Override profile sender if custom fromEmail / fromName explicitly supplied
    if (fromEmail) {
      selectedProfile = {
        ...selectedProfile,
        email: fromEmail,
        name: fromName || selectedProfile.name,
      };
    }

    let emailSent = false;
    let sendResult: any = null;

    if (isConfigured) {
      // Generate rich responsive HTML with department branding, address, video card and footer
      const formattedHtml = generateEmailHtml(selectedProfile, {
        clientName: clientName || "Valued Client",
        message,
        subject,
        inquiryId,
        service,
        referenceBadge,
        showReferenceBadge,
      });

      sendResult = await sendEmail({
        to,
        subject,
        html: formattedHtml,
        text: message,
        fromEmail: selectedProfile.email,
        fromName: selectedProfile.name,
        replyTo: selectedProfile.email,
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
