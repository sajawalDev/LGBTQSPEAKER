import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Navbar from "@/models/Navbar";
import { getServerSession } from "@/lib/auth";

export async function PUT(req) {
  try {
    const session = await getServerSession();

    if (!session || !session.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await req.json();

    const navbar = await Navbar.findOneAndUpdate(
      {},
      {
        logo: data.logo,
        menuItems: data.menuItems,
        button: data.button,
        socials: data.socials,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(navbar);
  } catch {
    return NextResponse.json(
      { error: "Failed to update navbar" },
      { status: 500 }
    );
  }
}
