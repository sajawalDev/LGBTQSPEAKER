import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";

export async function GET() {
  await connectDB();
  const page = await Page.findOne().lean();

  const wcu = page?.sections?.find(s => s.type === "whyChooseUs") || null;
  return NextResponse.json(wcu);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  let page = await Page.findOne();
  if (!page) {
    // Create a page if none exists
    page = await Page.create({
      title: "Home",
      slug: "home",
      sections: [{ type: "whyChooseUs", order: 1, data }],
    });
    return NextResponse.json(page);
  }

  const index = page.sections.findIndex(s => s.type === "whyChooseUs");

  if (index !== -1) {
    // Update existing
    page.sections[index].data = data;
  } else {
    // Add new
    page.sections.push({
      type: "whyChooseUs",
      order: page.sections.length + 1,
      data,
    });
  }

  await page.save();
  return NextResponse.json(page);
}

export async function DELETE() {
  await connectDB();
  const page = await Page.findOne();
  if (!page) return NextResponse.json({ success: false });

  page.sections = page.sections.filter(s => s.type !== "whyChooseUs");
  await page.save();

  return NextResponse.json({ success: true });
}
