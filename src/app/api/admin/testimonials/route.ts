import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query("SELECT * FROM testimonials ORDER BY id DESC");
    return NextResponse.json({ success: true, testimonials: res.rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { client_name, role, company, avatar, rating, quote, verified } = body;
    const res = await query(
      `INSERT INTO testimonials (client_name, role, company, avatar, rating, quote, verified)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        client_name || "Enterprise Leader",
        role || "VP of Engineering",
        company || "Global Enterprise Corp",
        avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        rating || 5,
        quote || "Creed Tech delivered world-class architecture on time and at enterprise scale.",
        verified !== undefined ? verified : true,
      ]
    );
    return NextResponse.json({ success: true, testimonial: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, verified } = body;
    const res = await query(
      "UPDATE testimonials SET verified = $1 WHERE id = $2 RETURNING *",
      [verified, id]
    );
    return NextResponse.json({ success: true, testimonial: res.rows[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing testimonial id" }, { status: 400 });
    }
    await query("DELETE FROM testimonials WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: `Testimonial ${id} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
