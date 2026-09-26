import { NextResponse } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

/**
 * In-memory IP-based rate limiter.
 * Default: 5 requests per IP per 10 minutes (600,000 ms).
 */
export function checkRateLimit(
  req: Request,
  maxRequests: number = 5,
  windowMs: number = 10 * 60 * 1000
): NextResponse | null {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : req.headers.get("x-real-ip") || "127.0.0.1";

  const now = Date.now();
  const record = ipMap.get(ip);

  // Periodic cleanup if map grows large
  if (ipMap.size > 5000) {
    for (const [key, val] of ipMap.entries()) {
      if (now > val.resetTime) {
        ipMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    ipMap.set(ip, { count: 1, resetTime: now + windowMs });
    return null;
  }

  if (record.count >= maxRequests) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait a few minutes before submitting again.",
      },
      { status: 429 }
    );
  }

  record.count += 1;
  return null;
}
