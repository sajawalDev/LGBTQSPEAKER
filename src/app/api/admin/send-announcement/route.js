import { NextResponse } from "next/server";
import Email from "@/models/Email";
import {Resend} from "resend";
import { connectDB } from "@/lib/mongodb";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Connect to DB first
    await connectDB();

    const { heading, content, ctaText, ctaSlug } = await req.json();

    const subscribers = await Email.find({});
    const emails = subscribers.map(sub => sub.email);

    const emailHtml = `
      <h1 style="color:#111827;">${heading}</h1>
      <p style="color:#374151;">${content}</p>
      ${
        ctaText && ctaSlug
          ? `<a href="${ctaSlug}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:white;border-radius:8px;text-decoration:none;margin-top:10px;">${ctaText}</a>`
          : ""
      }
    `;

    await Promise.all(
      emails.map(email =>
        resend.emails.send({
          from: "Whittington Consulting Updates <updates@whittingtonconsulting.com>",
          to: email,
          subject: heading,
          html: emailHtml,
        })
      )
    );

    return NextResponse.json({ message: "Announcement sent successfully to all subscribers" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send announcement" }, { status: 500 });
  }
}
