import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";
import Contact from "@/models/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: "Email and message are required" }),
        { status: 400 }
      );
    }

    await connectDB();

    // Save email in Email.js (if not already subscribed)
    const exists = await Email.findOne({ email });
    if (!exists) {
      await Email.create({ email });
    }

    // Save contact info in Contact.js
    await Contact.create({ name, email, message });

    // Email to USER
    await resend.emails.send({
      from: "Whittington Consulting <updates@whittingtonconsulting.com>",
      to: email,
      subject: "Thanks for contacting Whittington Consulting",
      html: `
        <p>Hello ${name || ""},</p>
        <p>Thank you for reaching out to Whittington Consulting.</p>
        <p>We have received your message and will get in touch with you shortly.</p>
        <p>Kind regards,<br/>Whittington Consulting</p>
      `,
    });

    // Email to COMPANY
    await resend.emails.send({
      from: "Website Notifications <updates@whittingtonconsulting.com>",
      to: "hello@whittingtonconsulting.com",
      subject: "New contact request received",
      html: `
        <p>A new person has contacted you via the website:</p>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("Contact error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to submit contact form" }),
      { status: 500 }
    );
  }
}
