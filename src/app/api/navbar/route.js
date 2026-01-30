// app/api/navbar/route.js
import { NextResponse } from "next/server";
import { getNavbar } from "@/lib/navbar";

export const revalidate = 60;

export async function GET() {
  try {
    return NextResponse.json(await getNavbar());
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch navbar" },
      { status: 500 }
    );
  }
}
