import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (session) {
    return NextResponse.json({
      authenticated: true,
      user: {
        email: session.email,
        role: session.role,
      },
    });
  }

  return NextResponse.json({
    authenticated: false,
    user: null,
  });
}
