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

/**
 * Server-side verification for Admin API routes.
 * 1. Unauthenticated -> 401 Unauthorized
 * 2. Authenticated without admin/super_admin role -> 403 Forbidden
 * 3. Authenticated admin without 2FA (TOTP) -> 403 Forbidden (requires2FA: true)
 * 4. Authorized admin with 2FA -> { isAuthorized: true, userId, email, role }
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

    const user = await currentUser();
    if (!user) {
      return {
        isAuthorized: false,
        status: 401,
        response: NextResponse.json(
          { success: false, error: "Unauthorized: User session not found" },
          { status: 401 }
        ),
      };
    }

    // Check role in sessionClaims metadata, organization role, or user metadata
    let role =
      (sessionClaims?.metadata as any)?.role ||
      (sessionClaims?.publicMetadata as any)?.role ||
      (sessionClaims as any)?.role ||
      (sessionClaims as any)?.o?.rol ||
      ((sessionClaims as any)?.org_role === "org:admin" ? "admin" : undefined) ||
      (user.publicMetadata?.role as string) ||
      (user.privateMetadata?.role as string);

    let email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress ||
      (sessionClaims?.email as string) ||
      "admin";

    const isAdmin = role === "admin" || role === "super_admin";

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
    const is2FAEnabled = Boolean(user.twoFactorEnabled || user.totpEnabled);
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
