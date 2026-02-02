import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/lib/cloudinary";

/* ===================== GET =====================
   Fetch gallery (Admin + Public)
============================================== */
export async function GET() {
  await connectDB();
  const gallery = await Gallery.findOne();
  return NextResponse.json(gallery);
}

/* ===================== POST =====================
   - Update section content
   - Upload image to Cloudinary
============================================== */
export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { sectionHeading, sectionSubHeading, sectionParagraph, imageBase64 } =
    body;

  let gallery = await Gallery.findOne();

  // Create gallery once
  if (!gallery) {
    gallery = await Gallery.create({
      sectionHeading: sectionHeading || "",
      sectionSubHeading: sectionSubHeading || "",
      sectionParagraph: sectionParagraph || "",
      images: [],
    });
  }

  // ✅ Update section text
  if (sectionHeading !== undefined) {
    gallery.sectionHeading = sectionHeading;
    gallery.sectionSubHeading = sectionSubHeading;
    gallery.sectionParagraph = sectionParagraph;
  }

  // ✅ Upload image
  if (imageBase64) {
    const upload = await uploadToCloudinary(imageBase64, "gallery");

    // NEW IMAGE FIRST
    gallery.images.unshift({
      imageUrl: upload.secure_url,
      publicId: upload.public_id,
    });
  }

  await gallery.save();
  return NextResponse.json(gallery);
}

/* ===================== DELETE =====================
   Delete specific image
============================================== */
export async function DELETE(req) {
  await connectDB();

  const { publicId } = await req.json();

  // Remove from Cloudinary
  await deleteFromCloudinary(publicId);

  // Remove from DB
  const gallery = await Gallery.findOne();
  gallery.images = gallery.images.filter(
    (img) => img.publicId !== publicId
  );

  await gallery.save();

  return NextResponse.json({ success: true });
}
