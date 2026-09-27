import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { getAllSeoSettings, PageSeoData } from "@/lib/seoHelper";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const seo = await getAllSeoSettings();
    return NextResponse.json({ success: true, seo });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch SEO settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body: PageSeoData = await req.json();

    if (!body || !body.page_key) {
      return NextResponse.json(
        { success: false, error: "Missing page_key" },
        { status: 400 }
      );
    }

    const {
      page_key,
      title = "",
      description = "",
      keywords = "",
      og_image = "",
      canonical_url = "",
      no_index = false,
      no_follow = false,
      meta_tags = {},
    } = body;

    await query(
      `INSERT INTO seo_settings (page_key, title, description, keywords, og_image, canonical_url, no_index, no_follow, meta_tags, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       ON CONFLICT (page_key) DO UPDATE SET
         title = EXCLUDED.title,
         description = EXCLUDED.description,
         keywords = EXCLUDED.keywords,
         og_image = EXCLUDED.og_image,
         canonical_url = EXCLUDED.canonical_url,
         no_index = EXCLUDED.no_index,
         no_follow = EXCLUDED.no_follow,
         meta_tags = EXCLUDED.meta_tags,
         updated_at = NOW()`,
      [
        page_key,
        title,
        description,
        keywords,
        og_image,
        canonical_url,
        Boolean(no_index),
        Boolean(no_follow),
        typeof meta_tags === "string" ? meta_tags : JSON.stringify(meta_tags),
      ]
    );

    // Revalidate paths for fast caching updates
    try {
      revalidatePath("/");
      revalidatePath("/services");
      revalidatePath("/portfolio");
      revalidatePath("/knowledge-center");
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/careers");
      revalidatePath("/sitemap.xml");
    } catch {
      // Revalidation non-fatal
    }

    return NextResponse.json({
      success: true,
      message: `SEO settings updated for ${page_key}`,
      page_key,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save SEO settings" },
      { status: 500 }
    );
  }
}
