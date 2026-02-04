import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import About from "@/models/About";
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "@/lib/cloudinary";

export async function GET() {
  await connectDB();

  const about = await About.findOne().lean();

  return NextResponse.json(about || null);
}

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("image");
  const rawData = JSON.parse(formData.get("data"));

  let imageData = null;

  const existing = await About.findOne();

  // Upload new image if provided
  if (file && typeof file === "object") {
    const buffer = Buffer.from(await file.arrayBuffer());

    // delete old image
    if (existing?.image?.publicId) {
      await deleteFromCloudinary(existing.image.publicId);
    }

    const uploaded = await uploadBufferToCloudinary(
      buffer,
      "about-page"
    );

    imageData = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    };
  }

  const payload = {
    ...rawData,
    ...(imageData && { image: imageData }),
  };

  const about = await About.findOneAndUpdate(
    {},
    payload,
    { upsert: true, new: true }
  );

  return NextResponse.json({
    success: true,
    about,
  });
}
export async function DELETE() {
  await connectDB();

  const about = await About.findOne();

  if (!about) {
    return NextResponse.json({ success: false });
  }

  if (about.image?.publicId) {
    await deleteFromCloudinary(about.image.publicId);
  }

  await About.deleteOne({ _id: about._id });

  return NextResponse.json({ success: true });
}
