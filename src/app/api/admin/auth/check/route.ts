import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authResult = await verifyAdminAuth();
  if (!authResult.isAuthorized) {
    return authResult.response!;
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    user: {
      email: authResult.email,
      role: authResult.role,
    },
  });
}
