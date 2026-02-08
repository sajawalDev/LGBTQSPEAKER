import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { uploadBufferToCloudinary,deleteFromCloudinary } from "@/lib/cloudinary";
export async function GET() {
  await connectDB();
  const services = await Service.find().lean();
  return NextResponse.json(services);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const service = await Service.create(body);
  return NextResponse.json(service);
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const updated = await Service.findByIdAndUpdate(body._id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();

  const service = await Service.findById(id);
  if (!service) return NextResponse.json({ success: false });

  // delete images
  service.blocks.forEach(async (b) => {
    if (b.image?.publicId) {
      await deleteFromCloudinary(b.image.publicId);
    }
  });

  await Service.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
