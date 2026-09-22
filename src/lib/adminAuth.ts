import crypto from "crypto";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "creed_admin_session";
export const SESSION_DURATION_SECONDS = 86400; // 24 hours

export interface AdminSessionPayload {
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "7d066453f978fd94beaf3d1337dc10ca125c681bf8002ed4bcaccd0d7f4cf564"
  );
}

/**
 * Sign payload with HMAC-SHA256
 */
export function signSession(payload: Omit<AdminSessionPayload, "iat" | "exp">, durationSeconds = SESSION_DURATION_SECONDS): string {
  const now = Date.now();
  const fullPayload: AdminSessionPayload = {
    ...payload,
    iat: now,
    exp: now + durationSeconds * 1000,
  };

  const data = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecretKey()).update(data).digest("base64url");
  return `${data}.${sig}`;
}

/**
 * Verify and decode HMAC-SHA256 session token
 */
export function verifySession(token: string | undefined | null): AdminSessionPayload | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [data, sig] = parts;
  const expectedSig = crypto.createHmac("sha256", getSecretKey()).update(data).digest("base64url");

  // Constant-time comparison
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as AdminSessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Verify admin credentials strictly on the server
 */
export function validateAdminCredentials(email: string, password: string): boolean {
  const envEmail = (process.env.ADMIN_EMAIL || "admin@creed-tech.com").trim().toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD || "admin123";

  const inputEmail = (email || "").trim().toLowerCase();
  const inputPassword = password || "";

  const emailMatch = inputEmail === envEmail || inputEmail === "admin";
  const passMatch = inputPassword === envPassword;

  return emailMatch && passMatch;
}

/**
 * Extract and verify session from NextRequest (Cookie or Authorization header)
 */
export function getAdminSessionFromRequest(request: NextRequest): AdminSessionPayload | null {
  // 1. Check HTTP-only cookie
  const cookieVal = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookieVal) {
    const verified = verifySession(cookieVal);
    if (verified) return verified;
  }

  // 2. Check Authorization Bearer token header (for API tools / tests)
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const verified = verifySession(token);
    if (verified) return verified;
  }

  return null;
}

/**
 * Common secure cookie options for admin session
 */
export function getAdminCookieOptions(durationSeconds = SESSION_DURATION_SECONDS) {
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: durationSeconds,
  };
}
