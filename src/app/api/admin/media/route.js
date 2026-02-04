import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MediaSection from "@/models/MediaSection";
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "@/lib/cloudinary";

/* ===================== GET ===================== */
export async function GET() {
  await connectDB();
  const sections = await MediaSection.find().sort({ order: 1 }).lean();
  return NextResponse.json(sections);
}

/* ===================== POST ===================== */
export async function POST(req) {
  await connectDB();
  const formData = await req.formData();

  const file = formData.get("image");
  const heading = formData.get("heading");
  const content = formData.get("content");
  const buttonText = formData.get("buttonText");
  const buttonSlug = formData.get("buttonSlug");

  let imageData = null;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await uploadBufferToCloudinary(buffer, "media-page");
    imageData = {
      url: upload.secure_url,
      publicId: upload.public_id,
    };
  }

  const section = await MediaSection.create({
    image: imageData,
    heading,
    content,
    buttonText,
    buttonSlug,
  });

  return NextResponse.json(section);
}

/* ===================== PUT ===================== */
export async function PUT(req) {
  await connectDB();
  const formData = await req.formData();
  const id = formData.get("id");

  const section = await MediaSection.findById(id);
  if (!section) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  section.heading = formData.get("heading");
  section.content = formData.get("content");
  section.buttonText = formData.get("buttonText");
  section.buttonSlug = formData.get("buttonSlug");

  const file = formData.get("image");
  if (file && file.size > 0) {
    if (section.image?.publicId) {
      await deleteFromCloudinary(section.image.publicId);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await uploadBufferToCloudinary(buffer, "media-page");

    section.image = {
      url: upload.secure_url,
      publicId: upload.public_id,
    };
  }

  await section.save();
  return NextResponse.json(section);
}

/* ===================== DELETE ===================== */
export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();

  const section = await MediaSection.findById(id);
  if (!section) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (section.image?.publicId) {
    await deleteFromCloudinary(section.image.publicId);
  }

  await section.deleteOne();
  return NextResponse.json({ success: true });
}
