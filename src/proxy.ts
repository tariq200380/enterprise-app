import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login, logout, and check endpoints without existing session
  if (pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // Admin session check temporarily disabled as requested
  // if (pathname.startsWith("/api/admin")) {
  //   const session = getAdminSessionFromRequest(request);
  //   if (!session) {
  //     return NextResponse.json(
  //       {
  //         success: false,
  //         error: "Unauthorized: Valid admin session required",
  //       },
  //       { status: 401 }
  //     );
  //   }
  // }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/api/admin/:path*"],
};
