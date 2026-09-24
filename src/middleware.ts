import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminUiRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminApiRoute = createRouteMatcher(["/api/admin/(.*)"]);
const isSetup2faRoute = createRouteMatcher(["/setup-2fa(.*)"]);

// Public endpoints under /api/admin that must remain accessible for public intake forms
const isPublicSubmission = (req: Request) => {
  const { pathname } = new URL(req.url);
  const method = req.method;

  if (method === "POST") {
    if (pathname === "/api/admin/inquiries") return true;
    if (pathname === "/api/admin/candidates") return true;
    if (pathname === "/api/admin/security-reports") return true;
  }
  return false;
};

export default clerkMiddleware(async (auth, req) => {
  // 1. Allow public form submissions unconditionally
  if (isPublicSubmission(req)) {
    return NextResponse.next();
  }

  // 2. Protect Admin APIs: return 401 JSON for unauthenticated API requests
  if (isAdminApiRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }
  }

  // 3. /setup-2fa handles its own auth state: shows <SignIn /> when signed out and <UserProfile /> when signed in
  if (isSetup2faRoute(req)) {
    return NextResponse.next();
  }

  // 4. Protect Admin UI Page: enforce Clerk authentication and mandatory 2FA
  if (isAdminUiRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      await auth.protect();
    } else {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const is2FAEnabled = Boolean(user.twoFactorEnabled || user.totpEnabled);
        if (!is2FAEnabled) {
          const setupUrl = new URL("/setup-2fa", req.url);
          return NextResponse.redirect(setupUrl);
        }
      } catch (err) {
        console.error("Middleware 2FA check error:", err);
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
