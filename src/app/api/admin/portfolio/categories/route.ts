import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { DEFAULT_CATEGORY_GROUPS, CategoryGroup } from "@/lib/portfolio-types";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const res = await query(
      "SELECT value FROM website_settings WHERE key = 'portfolio_category_groups' LIMIT 1"
    );
    let categories: CategoryGroup[] = DEFAULT_CATEGORY_GROUPS;
    if (res.rows.length > 0 && res.rows[0].value) {
      const val =
        typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value;
      if (Array.isArray(val) && val.length > 0) {
        categories = val;
      }
    }
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error("Portfolio Categories GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load categories" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    const categories: CategoryGroup[] = body.categories;
    if (!Array.isArray(categories)) {
      return NextResponse.json(
        { success: false, error: "Categories must be an array" },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO website_settings (key, value, updated_at)
       VALUES ('portfolio_category_groups', $1, NOW())
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [JSON.stringify(categories)]
    );

    try {
      revalidatePath("/portfolio");
    } catch {}

    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error("Portfolio Categories PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save categories" },
      { status: 500 }
    );
  }
}
