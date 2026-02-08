import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";
import { getServerSession } from "@/lib/auth";

/* ---------------- GET SEO BY PAGE ---------------- */
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");

    if (!page) {
      return NextResponse.json(null);
    }

    const seo = await Seo.findOne({ page }).lean();
    return NextResponse.json(seo || null);
  } catch (error) {
    console.error("SEO GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch SEO" },
      { status: 500 }
    );
  }
}

/* ---------------- CREATE / UPDATE SEO ---------------- */
export async function POST(req) {
  try {
    const session = await getServerSession();

    // 🔐 Admin protection
    if (!session || !session.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await req.json();

    if (!data.page) {
      return NextResponse.json(
        { error: "Page is required" },
        { status: 400 }
      );
    }

    const seo = await Seo.findOneAndUpdate(
      { page: data.page },
      { ...data },
      { new: true, upsert: true }
    );

    return NextResponse.json(seo);
  } catch (error) {
    console.error("SEO POST error:", error);
    return NextResponse.json(
      { error: "Failed to save SEO" },
      { status: 500 }
    );
  }
}
