import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const CHROME_PATH = "/usr/bin/google-chrome";
const SCREENSHOT_DIR = path.join(process.cwd(), "public", "images", "news-screenshots");

/**
 * Checks if an image is authentic (not null, not empty, not a generic fallback placeholder).
 */
export function hasAuthenticImage(img: string | null | undefined): boolean {
  if (!img) return false;
  const trimmed = img.trim().toLowerCase();
  if (trimmed.length === 0) return false;
  if (trimmed === "/images/kc-news.webp" || trimmed.includes("kc-news.webp")) return false;
  if (trimmed.includes("blank.gif") || trimmed.includes("spacer.gif") || trimmed.includes("favicon")) return false;
  if (trimmed.includes("25a7c99743ebfb3b") || trimmed.includes("omb-home-final")) return false;
  return true;
}

/**
 * Sanitizes an article ID so it can be safely used as a filename.
 */
function sanitizeFileName(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50);
}

/**
 * Resolves redirect URLs (like Google News redirect links) to the actual article page.
 */
async function resolveDestinationUrl(url: string): Promise<string> {
  if (!url || !url.startsWith("http")) return url;

  // If not a redirect aggregator link, use as-is
  if (!url.includes("news.google.com")) return url;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok && res.url && !res.url.includes("news.google.com")) {
      return res.url;
    }
  } catch {}

  return url;
}

/**
 * Captures a crisp, high-resolution webpage screenshot for any news article lacking an image.
 * Uses the system's Google Chrome in headless mode and caches the output to disk.
 *
 * @param articleUrl Destination link of the article
 * @param articleId  Unique identifier for cache naming
 * @returns Web-accessible path (e.g. "/images/news-screenshots/xyz.webp") or null on failure
 */
export async function captureNewsScreenshot(
  articleUrl: string,
  articleId: string
): Promise<string | null> {
  if (!articleUrl || !articleUrl.startsWith("http")) return null;

  try {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }

    const safeId = sanitizeFileName(articleId);
    const fileName = `${safeId}.webp`;
    const targetFilePath = path.join(SCREENSHOT_DIR, fileName);
    const publicPath = `/images/news-screenshots/${fileName}`;

    // Return cached screenshot if already generated and valid (> 10KB)
    if (fs.existsSync(targetFilePath)) {
      const stats = fs.statSync(targetFilePath);
      if (stats.size > 10000) {
        return publicPath;
      } else {
        try { fs.unlinkSync(targetFilePath); } catch {}
      }
    }

    // Resolve final destination URL for aggregator links
    const targetUrl = await resolveDestinationUrl(articleUrl);

    // Capture screenshot using headless chrome with virtual-time-budget to allow JS rendering
    const cmd = `${CHROME_PATH} --headless --no-sandbox --disable-gpu --virtual-time-budget=4000 --screenshot="${targetFilePath}" --window-size=1280,720 --hide-scrollbars "${targetUrl}"`;

    await execAsync(cmd, { timeout: 10000 });

    if (fs.existsSync(targetFilePath) && fs.statSync(targetFilePath).size > 10000) {
      console.log(`[Screenshot Engine] Captured valid screenshot for article: ${safeId} (${fs.statSync(targetFilePath).size} bytes)`);
      return publicPath;
    }
  } catch (err: any) {
    console.warn(`[Screenshot Engine] Could not capture screenshot for ${articleId}:`, err?.message || err);
  }

  return null;
}
