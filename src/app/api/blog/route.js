export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

/**
 * GET → Fetch the single blog
 */
export async function GET() {
  await connectDB();

  const blog = await Blog.findOne({ slug: "main-blog" }).lean();
  return NextResponse.json(blog);
}

/**
 * POST → Create or Update the single blog
 */
export async function POST(req) {
  await connectDB();

  const data = await req.json();

  const blog = await Blog.findOneAndUpdate(
    { slug: "main-blog" },          // always one blog
    {
      ...data,
      slug: "main-blog",
    },
    {
      upsert: true,                 // create if not exists
      new: true,
    }
  );

  return NextResponse.json(blog);
}
