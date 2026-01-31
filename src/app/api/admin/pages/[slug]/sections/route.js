import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";

export async function POST(request, { params }) {
  await connectDB();

  const { slug } = await params;
  const { type } = await request.json();

  const page = await Page.findOne({ slug });
  if (!page) {
    return NextResponse.json(
      { message: "Page not found" },
      { status: 404 }
    );
  }

  const newSection = {
    type,
    order: page.sections.length + 1,
    data: {},
  };

  page.sections.push(newSection);
  await page.save();

  return NextResponse.json(newSection, { status: 201 });
}
