import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminUiRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminApiRoute = createRouteMatcher(["/api/admin/(.*)"]);
const isSetup2faRoute = createRouteMatcher(["/setup-2fa(.*)"]);

// Helper to extract admin role from session claims (metadata, organization role, or claims)
const extractAdminRole = (claims: any): string | undefined => {
  if (claims?.metadata?.role) return claims.metadata.role;
  if (claims?.o?.rol === "admin") return "admin";
  if (claims?.org_role === "org:admin" || claims?.orgRole === "admin" || claims?.orgRole === "org:admin") return "admin";
  return undefined;
};

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

  // 2. Protect Admin APIs: return 401 JSON for unauthenticated, 403 for unauthorized requests, enforce reverification
  if (isAdminApiRoute(req)) {
    // Enforce Clerk step-up reverification (30 min idle factor age)
    const { userId, sessionClaims } = await auth.protect({
      reverification: { level: "second_factor", afterMinutes: 30 },
    });

    // Issue 1: Verify admin role from session claims
    const role = extractAdminRole(sessionClaims);
    if (role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Forbidden: Admin authorization required" },
        { status: 403 }
      );
    }
  }

  // 3. /setup-2fa handles its own auth state: shows <SignIn /> when signed out and <UserProfile /> when signed in
  if (isSetup2faRoute(req)) {
    return NextResponse.next();
  }

  // 4. Protect Admin UI Page: enforce Clerk authentication, admin role, step-up reverification, and mandatory 2FA
  if (isAdminUiRoute(req)) {
    // Enforce Clerk step-up reverification (30 min idle factor age)
    const { userId, sessionClaims } = await auth.protect({
      reverification: { level: "second_factor", afterMinutes: 30 },
    });

    // Issue 1: Verify admin role from session claims
    const role = extractAdminRole(sessionClaims);
    if (role !== "admin") {
      // Deny access: redirect unauthorized non-admin user to home with error parameter
      return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
    }

    // Issue 2: 2FA check with fail-closed pattern
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const is2FAEnabled = Boolean(user.twoFactorEnabled || user.totpEnabled);
      if (!is2FAEnabled) {
        const setupUrl = new URL("/setup-2fa", req.url);
        return NextResponse.redirect(setupUrl);
      }
    } catch (err) {
      console.error("Middleware 2FA check error (fail-closed):", err);
      // Issue 2: Fail-closed: Deny access on error instead of allowing fallthrough
      const setupUrl = new URL("/setup-2fa?error=verification_failed", req.url);
      return NextResponse.redirect(setupUrl);
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
