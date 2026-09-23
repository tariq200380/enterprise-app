import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Admin check temporarily disabled as requested
  const session = getAdminSessionFromRequest(req);
  return NextResponse.json({
    authenticated: true,
    user: {
      email: session?.email || "admin@creed-tech.com",
      role: session?.role || "SUPER_ADMIN",
    },
  });
}
