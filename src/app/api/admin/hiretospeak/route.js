import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HireToSpeak from "@/models/HireToSpeak";

// ✅ GET all bookings
export async function GET() {
  try {
    await connectDB();

    const bookings = await HireToSpeak.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// ✅ UPDATE status
export async function PUT(req) {
  try {
    const { id } = await req.json();

    await connectDB();

    const updated = await HireToSpeak.findByIdAndUpdate(
      id,
      { status: "done" },
      { new: true }
    );

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
