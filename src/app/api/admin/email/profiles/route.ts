import { NextResponse } from "next/server";
import { getEmailProfiles, saveEmailProfiles, EmailDepartmentProfile } from "@/lib/email-profiles";
import { verifyAdminAuth } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const profiles = await getEmailProfiles();
    return NextResponse.json({
      success: true,
      profiles,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    const { profiles } = body;

    if (!Array.isArray(profiles)) {
      return NextResponse.json(
        { success: false, error: "Invalid profiles payload. Array expected." },
        { status: 400 }
      );
    }

    // Validation and duplicate detection
    const seenEmails = new Set<string>();
    const seenIds = new Set<string>();
    const validProfiles: EmailDepartmentProfile[] = [];

    for (const p of profiles) {
      if (!p.id || !p.email || !p.name) {
        return NextResponse.json(
          { success: false, error: "Each profile must have an id, name, and email address." },
          { status: 400 }
        );
      }
      const emailLower = p.email.trim().toLowerCase();
      if (seenEmails.has(emailLower)) {
        return NextResponse.json(
          { success: false, error: `Duplicate business email: "${p.email}" is already in use by another profile. Each profile must have a unique email address.` },
          { status: 400 }
        );
      }
      if (seenIds.has(p.id)) {
        return NextResponse.json(
          { success: false, error: `Duplicate profile ID: "${p.id}". Each profile must have a unique ID.` },
          { status: 400 }
        );
      }
      seenEmails.add(emailLower);
      seenIds.add(p.id);
      validProfiles.push(p);
    }

    await saveEmailProfiles(validProfiles);
    const updated = await getEmailProfiles();

    return NextResponse.json({
      success: true,
      message: "Email profiles updated successfully!",
      profiles: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
