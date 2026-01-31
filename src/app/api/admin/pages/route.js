import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";

export async function GET() {
  try {
    await connectDB();

    const pages = await Page.find({})
      .select("title slug")
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json(pages);
  } catch (error) {
    console.error("GET /admin/pages error:", error);
    return NextResponse.json(
      { message: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { title, slug } = await req.json();

    if (!title || !slug) {
      return NextResponse.json(
        { message: "Title and slug are required" },
        { status: 400 }
      );
    }

    const exists = await Page.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    const page = await Page.create({
      title,
      slug,
      sections: [],
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("POST /admin/pages error:", error);
    return NextResponse.json(
      { message: "Failed to create page" },
      { status: 500 }
    );
  }
}
