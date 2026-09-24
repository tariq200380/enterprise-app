import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { query } from "@/lib/db";
import { verifyAdminAuth } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const res = await query("SELECT value FROM website_settings WHERE key = 'global_config'");
    const portRes = await query("SELECT * FROM portfolio_projects ORDER BY id DESC");

    let val =
      res.rows.length > 0 && res.rows[0].value
        ? typeof res.rows[0].value === "string"
          ? JSON.parse(res.rows[0].value)
          : res.rows[0].value
        : {};

    // Synchronize live portfolio projects
    if (portRes.rows.length > 0) {
      val.portfolioProjects = portRes.rows.map((p: any) => ({
        id: String(p.id),
        coverImageUrl: p.image_url || "",
        category: p.category || "Enterprise",
        clientNameLocation: p.client || "Global Client",
        imageBadgeTag: p.category || "Engineering",
        title: p.title || "",
        description: p.summary || "",
        challenge: "Architected high-concurrency cloud platform with zero single point of failure.",
        solution: "Engineered scalable microservices with automated CI/CD and immutable logging.",
        metric1Value: "99.99%",
        metric1Label: "Uptime SLA",
        metric2Value: "<12ms",
        metric2Label: "Latency",
        metric3Value: "100%",
        metric3Label: "Automated CI/CD",
        techStack: Array.isArray(p.stack) ? p.stack.join(", ") : (p.stack || ""),
      }));
    }

    return NextResponse.json({ success: true, settings: val });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await verifyAdminAuth();
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();

    // If portfolioProjects are provided in settings, synchronize them into portfolio_projects table
    if (Array.isArray(body.portfolioProjects) && body.portfolioProjects.length > 0) {
      for (const p of body.portfolioProjects) {
        if (!p.title) continue;
        const stackArr =
          typeof p.techStack === "string"
            ? p.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
            : Array.isArray(p.techStack)
            ? p.techStack
            : [];

        const idNum = parseInt(p.id, 10);
        if (!isNaN(idNum) && idNum > 0) {
          await query(
            `UPDATE portfolio_projects
             SET title = $1, category = $2, client = $3, summary = $4, stack = $5, image_url = $6
             WHERE id = $7`,
            [
              p.title,
              p.category || "Enterprise",
              p.clientNameLocation || "Global Client",
              p.description || "Executive architectural delivery summary.",
              JSON.stringify(stackArr),
              p.coverImageUrl || "",
              idNum,
            ]
          );
        } else {
          await query(
            `INSERT INTO portfolio_projects (title, category, client, summary, stack, live_url, github_url, image_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              p.title,
              p.category || "Enterprise",
              p.clientNameLocation || "Global Client",
              p.description || "Executive architectural delivery summary.",
              JSON.stringify(stackArr),
              p.liveUrl || "",
              p.githubUrl || "",
              p.coverImageUrl || "",
            ]
          );
        }
      }
    }

    const res = await query(
      `INSERT INTO website_settings (key, value, updated_at)
       VALUES ('global_config', $1, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()
       RETURNING value`,
      [JSON.stringify(body)]
    );

    // Refresh global layout and public page cache immediately
    revalidatePath("/", "layout");
    revalidatePath("/services");
    revalidatePath("/portfolio");
    revalidatePath("/about");
    revalidatePath("/contact");

    return NextResponse.json({ success: true, settings: res.rows[0].value });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
