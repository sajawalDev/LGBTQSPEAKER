import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { getServerSession } from "@/lib/auth";

export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = req.headers.get("email");
    const password = req.headers.get("password");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session || !session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newEmail, newPassword } = await req.json();

    if (!newEmail || !newPassword) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findById(session.id);
    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    admin.email = newEmail.toLowerCase();
    admin.password = newPassword; // hashed by schema
    await admin.save();

    // ✅ Remove old token (force logout)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "", { maxAge: 0 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
