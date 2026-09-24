import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Legacy custom login is deprecated. Please authenticate through Clerk.",
    },
    { status: 410 }
  );
}
