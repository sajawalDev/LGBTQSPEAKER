export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "@/lib/cloudinary";

/**
 * POST → Upload image
 */
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await uploadBufferToCloudinary(
      buffer,
      "blog-images"
    );

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

/**
 * DELETE → Delete image by publicId
 */
export async function DELETE(req) {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "publicId required" },
        { status: 400 }
      );
    }

    await deleteFromCloudinary(publicId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
