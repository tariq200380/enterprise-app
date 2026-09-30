import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface AdminAuthResult {
  isAuthorized: boolean;
  requires2FA?: boolean;
  status?: number;
  userId?: string;
  email?: string;
  role?: string;
  response?: NextResponse;
}

// In-memory user cache to avoid remote network roundtrips to Clerk on repeated API calls
interface CachedUserRecord {
  email?: string;
  role?: string;
  twoFactorEnabled: boolean;
  cachedAt: number;
}
const userCache = new Map<string, CachedUserRecord>();
const USER_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Server-side verification for Admin API routes.
 * 1. Inspects local session claims for instant verification without external network roundtrips.
 * 2. Unauthenticated -> 401 Unauthorized
 * 3. Authenticated without admin/super_admin role -> 403 Forbidden
 * 4. Authenticated admin without 2FA (TOTP) -> 403 Forbidden (requires2FA: true)
 * 5. Authorized admin with 2FA -> { isAuthorized: true, userId, email, role }
 */
export async function verifyAdminAuth(): Promise<AdminAuthResult> {
  try {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return {
        isAuthorized: false,
        status: 401,
        response: NextResponse.json(
          { success: false, error: "Unauthorized: Admin authentication required" },
          { status: 401 }
        ),
      };
    }

    const claims = (sessionClaims || {}) as any;

    // 1. Extract role from session claims (metadata, organization role, or claims)
    let role =
      claims?.metadata?.role ||
      claims?.publicMetadata?.role ||
      claims?.role ||
      claims?.o?.rol ||
      (claims?.org_role === "org:admin" || claims?.orgRole === "admin" || claims?.orgRole === "org:admin" ? "admin" : undefined);

    // 2. Extract email from session claims
    let email =
      claims?.email ||
      claims?.primary_email ||
      claims?.email_address ||
      claims?.sub_email;

    if (!email && typeof claims?.sub === "string" && claims.sub.includes("@")) {
      email = claims.sub;
    }

    // 3. Extract 2FA status from session claims
    let is2FAEnabled = Boolean(
      claims?.two_factor_enabled ||
      claims?.totp_enabled ||
      claims?.metadata?.twoFactorEnabled ||
      claims?.publicMetadata?.twoFactorEnabled ||
      claims?.f2a
    );

    // 4. If any essential attribute is missing from session claims, consult the in-memory cache or fallback to currentUser() once
    const cached = userCache.get(userId);
    const hasValidCache = cached && (Date.now() - cached.cachedAt < USER_CACHE_TTL_MS);

    if (hasValidCache) {
      if (!role && cached.role) role = cached.role;
      if (!email && cached.email) email = cached.email;
      if (!is2FAEnabled && cached.twoFactorEnabled) is2FAEnabled = cached.twoFactorEnabled;
    } else if (!role || !email || !is2FAEnabled) {
      try {
        const user = await currentUser();
        if (user) {
          const userRole = (user.publicMetadata?.role as string) || (user.privateMetadata?.role as string);
          const userEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
          const user2FA = Boolean(user.twoFactorEnabled || user.totpEnabled);

          if (!role && userRole) role = userRole;
          if (!email && userEmail) email = userEmail;
          if (!is2FAEnabled && user2FA) is2FAEnabled = user2FA;

          userCache.set(userId, {
            email: userEmail,
            role: userRole,
            twoFactorEnabled: user2FA,
            cachedAt: Date.now(),
          });
        }
      } catch (err) {
        console.warn("Clerk currentUser fallback warning:", err);
      }
    }

    // Default email fallback if still undefined
    if (!email) {
      email = "admin";
    }

    const isConfiguredAdminEmail = Boolean(
      process.env.ADMIN_EMAIL &&
      email &&
      email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()
    );

    const isAdmin = role === "admin" || role === "super_admin" || isConfiguredAdminEmail;
    if (isConfiguredAdminEmail && !role) {
      role = "admin";
    }

    if (!isAdmin) {
      return {
        isAuthorized: false,
        status: 403,
        userId,
        email,
        role: role || "user",
        response: NextResponse.json(
          {
            success: false,
            error: "Forbidden: Admin authorization required. Current account lacks admin privileges.",
          },
          { status: 403 }
        ),
      };
    }

    // Enforce 2FA (Two-Factor Authentication / TOTP)
    if (!is2FAEnabled) {
      return {
        isAuthorized: false,
        requires2FA: true,
        status: 403,
        userId,
        email,
        role,
        response: NextResponse.json(
          {
            success: false,
            requires2FA: true,
            error: "Two-factor authentication (2FA) is mandatory for admin accounts. Please enable 2FA at /setup-2fa.",
          },
          { status: 403 }
        ),
      };
    }

    return {
      isAuthorized: true,
      userId,
      email,
      role: role || "admin",
    };
  } catch (error: any) {
    console.error("Admin authentication check error:", error);
    return {
      isAuthorized: false,
      status: 401,
      response: NextResponse.json(
        { success: false, error: "Unauthorized: Session verification failed" },
        { status: 401 }
      ),
    };
  }
}
