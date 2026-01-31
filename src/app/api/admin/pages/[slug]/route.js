import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // ✅ FIX: params is a Promise
    const { slug } = await params;

    const deletedPage = await Page.findOneAndDelete({ slug });

    if (!deletedPage) {
      return NextResponse.json(
        { message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Page deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/admin/pages/[slug] error:", error);
    return NextResponse.json(
      { message: "Failed to delete page" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  await connectDB();

  // ✅ SAME FIX HERE
  const { slug } = await params;

  const page = await Page.findOne({ slug }).lean();

  if (!page) {
    return NextResponse.json(
      { message: "Page not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(page);
}

export async function PUT(request, { params }) {
  await connectDB();

  const { slug } = await params;
  const { title } = await request.json();

  const page = await Page.findOneAndUpdate(
    { slug },
    { title },
    { new: true }
  );

  if (!page) {
    return NextResponse.json(
      { message: "Page not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(page);
}
