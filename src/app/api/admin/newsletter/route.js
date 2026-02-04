export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

// GET
export async function GET() {
  await connectDB();
  const data = await Newsletter.find().lean();
  return NextResponse.json(data);
}

// POST
export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const created = await Newsletter.create(body);
  return NextResponse.json(created);
}

// PUT
export async function PUT(req) {
  await connectDB();
  const { _id, ...rest } = await req.json();

  const updated = await Newsletter.findByIdAndUpdate(_id, rest, {
    new: true,
  });

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Newsletter.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
