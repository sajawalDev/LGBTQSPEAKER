export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";

export async function PUT(req, context) {
  try {
    await connectDB();

    // ✅ params IS A PROMISE
    const { slug, sectionId } = await context.params;

    const body = await req.json(); // { slides: [...] }

    const page = await Page.findOne({ slug });
    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    const section = page.sections.id(sectionId);
    if (!section) {
      return NextResponse.json(
        { message: "Section not found" },
        { status: 404 }
      );
    }

    section.data = body;

    // 🔥 REQUIRED for nested arrays
    page.markModified("sections");
    await page.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT section error:", err);
    return NextResponse.json(
      { message: "Failed to update section" },
      { status: 500 }
    );
  }
}

export async function GET(req, context) {
  try {
    await connectDB();

    const { slug, sectionId } = await context.params;

    const page = await Page.findOne({ slug });
    if (!page) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }

    const section = page.sections.id(sectionId);
    if (!section) {
      return NextResponse.json(
        { message: "Section not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(section);
  } catch (err) {
    console.error("GET section error:", err);
    return NextResponse.json(
      { message: "Failed to fetch section" },
      { status: 500 }
    );
  }
}
