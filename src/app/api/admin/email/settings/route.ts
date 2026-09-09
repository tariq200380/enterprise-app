import { NextResponse } from "next/server";
import { getSmtpConfig, saveSmtpConfig, sendEmail } from "@/lib/mailer";

export async function GET() {
  try {
    const config = await getSmtpConfig();
    return NextResponse.json({
      success: true,
      config: {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.user,
        pass: config.pass ? "••••••••" : "",
        from_email: config.from_email,
        from_name: config.from_name,
        isConfigured: Boolean(config.user && config.pass),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await saveSmtpConfig(body);
    const updated = await getSmtpConfig();
    return NextResponse.json({
      success: true,
      message: "SMTP settings saved successfully!",
      isConfigured: Boolean(updated.user && updated.pass),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const testTo = body.test_email || body.user;
    if (!testTo) {
      return NextResponse.json({ success: false, error: "Test email address is required" }, { status: 400 });
    }

    // Temporarily save to test with these settings
    await saveSmtpConfig(body);

    const testRes = await sendEmail({
      to: testTo,
      subject: "Test Email from Creed Tech Admin Panel",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
          <h2>✓ Creed Tech SMTP Connection Successful</h2>
          <p>Your email credentials have been verified and connected to the Creed Tech Admin Panel.</p>
          <p style="font-size: 12px; color: #64748B;">Delivered via SMTP port ${body.port || 465}.</p>
        </div>
      `,
      text: "Creed Tech SMTP connection test successful!",
    });

    return NextResponse.json(testRes);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
