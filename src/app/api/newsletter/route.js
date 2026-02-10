import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, firstName, lastName } = await req.json();

    // Email is required
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    await connectDB();

    // Optional: prevent duplicate subscriptions
    const exists = await Email.findOne({ email });
    if (exists) {
      return new Response(
        JSON.stringify({ message: "Already subscribed" }),
        { status: 200 }
      );
    }

    // ✅ Save ONLY email
    await Email.create({ email });

    /* -------------------------
       Email to USER
    -------------------------- */
    await resend.emails.send({
      from: "Whittington Consulting <updates@whittingtonconsulting.com>",
      to: email,
      subject: "Subscription confirmed",
      html: `
        <p>Hello,</p>

        <p>Thank you for subscribing to our newsletter.</p>

        <p>
          You will receive updates about upcoming events,
          professional announcements, and relevant news.
        </p>

        <p>
          Kind regards,<br/>
          Whittington Consulting
        </p>
      `,
    });

    /* -------------------------
       Email to COMPANY
    -------------------------- */
    await resend.emails.send({
      from: "Website Notifications <updates@whittingtonconsulting.com>",
      to: "hello@whittingtonconsulting.com",
      subject: "New newsletter subscription",
      html: `
        <p>A new user has subscribed to the newsletter.</p>

        <p><strong>Email:</strong> ${email}</p>
        <p><strong>First name:</strong> ${firstName || "Not provided"}</p>
        <p><strong>Last name:</strong> ${lastName || "Not provided"}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (err) {
    console.error("Newsletter error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to subscribe" }),
      { status: 500 }
    );
  }
}
