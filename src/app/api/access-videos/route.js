// pages/api/access-videos.js
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Save email to database if not already present
    const existing = await Email.findOne({ email });
    if (!existing) {
      await Email.create({ email });
    }

    // 3️⃣ Generate JWT (no expiry)
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    // 4️⃣ Send access email via Resend
    await resend.emails.send({
      from: "Whittington Consulting <noreply@whittingtonconsulting.com>",
      to: email,
      subject: "Access Granted – Welcome!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>You're in!</h2>
          <p>Thanks for requesting access to our exclusive videos.</p>
          <p>You now have full access, and we’ll notify you whenever new videos are added.</p>
          <br />
          <strong>Enjoy watching!</strong>
        </div>
      `,
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Resend or DB error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
