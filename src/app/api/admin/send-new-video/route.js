import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { videoTitle, videoUrl } = body;

    await connectDB();

    const emailsData = await Email.find().lean();
    const emails = emailsData.map((e) => e.email);

    if (!emails.length) {
      return new Response(JSON.stringify({ message: "No subscribers to send emails" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const results = [];
    for (const email of emails) {
      try {
        await resend.emails.send({
          from: "Whittington Consulting Updates <updates@whittingtonconsulting.com>",
          to: email,
          subject: `New Video Uploaded: ${videoTitle}`,
          html: `
  <p>Hello,</p>

  <p>This is to inform you that a new video has been added to your account.</p>

  <p><strong>Title:</strong> ${videoTitle}</p>

  <p>You can access the video using the link below:</p>

  <p>${videoUrl}</p>

  <p>If you did not expect this update, no action is required.</p>

  <p>Regards,<br/>
  Whittington Consulting</p>
`
        });
        results.push({ email, status: "sent" });
      } catch (err) {
        results.push({ email, status: "failed", error: err.message });
      }
    }

    return new Response(JSON.stringify({ message: "Emails processed", results }), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (err) {
    console.error("Send email error:", err);
    return new Response(JSON.stringify({ error: "Failed to send emails", details: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
