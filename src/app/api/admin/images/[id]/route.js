import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(req, context) {
  // await params because App Router now provides a promise
  const params = await context.params; 
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  await connectDB();

  const image = await Image.findById(id);

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  // delete from Cloudinary
  await deleteFromCloudinary(image.publicId);

  // delete from MongoDB
  await Image.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
