import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FreeVideo from "@/models/FreeVideo";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * GET: fetch all videos
 */
export async function GET() {
  try {
    await connectDB();

    const videos = await FreeVideo.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(videos);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

/**
 * POST: save video metadata (Cloudinary upload already done on frontend)
 */
export async function POST(req) {
  try {
    await connectDB();

    const { title, videoUrl, publicId, duration } = await req.json();

    if (!title || !videoUrl || !publicId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const video = await FreeVideo.create({
      title,
      videoUrl,
      publicId,
      duration,
    });

    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Save failed", error: err.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE: remove video (Cloudinary + DB)
 */
export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Video ID required" },
        { status: 400 }
      );
    }

    const video = await FreeVideo.findById(id);
    if (!video) {
      return NextResponse.json(
        { message: "Video not found" },
        { status: 404 }
      );
    }

    // delete from Cloudinary (video)
    await deleteFromCloudinary(video.publicId, "video");

    // delete from DB
    await video.deleteOne();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { message: "Delete failed", error: err.message },
      { status: 500 }
    );
  }
}
