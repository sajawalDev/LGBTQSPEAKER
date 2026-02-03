export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  await connectDB();
  const images = await Image.find().sort({ createdAt: -1 });
  return NextResponse.json(images);
}

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await uploadBufferToCloudinary(
    buffer,
    "website-images"
  );

  const image = await Image.create({
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  });

  return NextResponse.json(image);
}
