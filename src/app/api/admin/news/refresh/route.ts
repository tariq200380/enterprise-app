import { NextResponse } from "next/server";
import { syncAllNewsFeeds } from "@/lib/newsSync";
import { verifyAdminAuth } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) return auth.response!;

  try {
    const result = await syncAllNewsFeeds();

    return NextResponse.json({
      success: true,
      message: `Refreshed live news cache successfully (${result.count} stories active).`,
      timestamp: result.timestamp,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to refresh news" }, { status: 500 });
  }
}
