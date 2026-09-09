import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const localCachePath = path.join(process.cwd(), "public", "data", "live_news_cache.json");
    const externalCachePath = "/home/tariq/Desktop/procreedtech/public_html/data/live_news_cache.json";
    const externalUploadsDir = "/home/tariq/Desktop/procreedtech/public_html/uploads/live_news";
    const localUploadsDir = path.join(process.cwd(), "public", "uploads", "live_news");
    const phpCron = "/home/tariq/Desktop/procreedtech/public_html/cron/import_news.php";

    // Ensure uploads directory exists
    if (!fs.existsSync(localUploadsDir)) {
      fs.mkdirSync(localUploadsDir, { recursive: true });
    }

    // 1. Run live crawler if cron script exists
    if (fs.existsSync(phpCron)) {
      try {
        await execAsync(
          `php ${phpCron} && cp -ru ${externalUploadsDir}/* ${localUploadsDir}/ 2>/dev/null || true && cp ${externalCachePath} ${localCachePath} 2>/dev/null || true`
        );
      } catch (cronErr: any) {
        console.warn("Cron execution note:", cronErr.message);
      }
    } else if (fs.existsSync(externalCachePath)) {
      fs.copyFileSync(externalCachePath, localCachePath);
    }

    // 2. Read refreshed cache
    let count = 0;
    if (fs.existsSync(localCachePath)) {
      const data = JSON.parse(fs.readFileSync(localCachePath, "utf-8"));
      count = (data.breaking_news?.length || 0) + Object.keys(data.brand_wires || {}).length + Object.keys(data.regional_wires || {}).length;
    }

    return NextResponse.json({
      success: true,
      message: `Refreshed live news cache successfully (${count} stories active).`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
