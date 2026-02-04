import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Footer from "@/models/Footer";
import {
  uploadToCloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "@/lib/cloudinary";

/**
 * GET – fetch footer data
 */
export async function GET() {
  await connectDB();
  const footer = await Footer.findOne();
  return NextResponse.json(footer);
}

/**
 * POST – create footer (first time)
 */
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  let footer = await Footer.findOne();
  if (footer) {
    return NextResponse.json(
      { error: "Footer already exists" },
      { status: 400 }
    );
  }

  footer = await Footer.create(body);
  return NextResponse.json(footer);
}

/**
 * PUT – update footer (logo / sections / items / contact)
 */
export async function PUT(req) {
  await connectDB();

  const contentType = req.headers.get("content-type");
  const footer = await Footer.findOne();

  if (!footer) {
    return NextResponse.json(
      { error: "Footer not found" },
      { status: 404 }
    );
  }

  /**
   * LOGO UPLOAD (FormData)
   */
  if (contentType?.includes("multipart/form-data")) {
    const formData = await req.formData();
    const file = formData.get("logo");

    if (!file) {
      return NextResponse.json(
        { error: "Logo file missing" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // delete old logo
    if (footer.logoPublicId) {
      await deleteFromCloudinary(footer.logoPublicId);
    }

    const uploaded = await uploadBufferToCloudinary(
      buffer,
      "footer-logo"
    );

    footer.logoUrl = uploaded.secure_url;
    footer.logoPublicId = uploaded.public_id;

    await footer.save();
    return NextResponse.json(footer);
  }

  /**
   * JSON updates (sections, items, description, contact)
   */
  const body = await req.json();

  if (body.description !== undefined) {
    footer.description = body.description;
  }

  if (body.sections) {
    footer.sections = body.sections;
  }

  await footer.save();
  return NextResponse.json(footer);
}

/**
 * DELETE – logo / section / item
 */
export async function DELETE(req) {
  await connectDB();
  const { type, sectionIndex, itemIndex } = await req.json();
  const footer = await Footer.findOne();

  if (!footer) {
    return NextResponse.json(
      { error: "Footer not found" },
      { status: 404 }
    );
  }

  /**
   * DELETE LOGO
   */
  if (type === "logo") {
    if (footer.logoPublicId) {
      await deleteFromCloudinary(footer.logoPublicId);
    }
    footer.logoUrl = "";
    footer.logoPublicId = "";
  }

  /**
   * DELETE SECTION
   */
  if (type === "section") {
    footer.sections.splice(sectionIndex, 1);
  }

  /**
   * DELETE ITEM
   */
  if (type === "item") {
    footer.sections[sectionIndex].items.splice(itemIndex, 1);
  }

  await footer.save();
  return NextResponse.json({ success: true });
}
