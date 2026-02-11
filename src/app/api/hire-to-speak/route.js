import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb";
import HireToSpeak from "@/models/HireToSpeak";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    await connectDB();

    const newRequest = await HireToSpeak.create(body);

    const {
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      eventLocation,
      audienceSize,
      eventTopic,
      additionalInfo,
    } = body;

    // 2️⃣ Email to User (Professional LGBTQ Speaker Template)


    await resend.emails.send({
      from: "Whittington Consulting <updates@whittingtonconsulting.com>",
      to: email,
      subject: "Thank You for Your Speaker Request",
      html: `
      <div style="font-family:Arial;padding:30px;max-width:600px;margin:auto;">
        <h2 style="color:#6c2bd9;">Thank You, ${firstName}!</h2>
        <p>
        We have received your request to book Dr. Whittington for your event.
        </p>
        <p>
        Our team will carefully review your event details and respond within
        24–48 hours to discuss availability and next steps.
        </p>

        <hr/>

        <h4>Your Submission Details:</h4>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
        <p><strong>Audience Size:</strong> ${audienceSize}</p>
        <p><strong>Topic:</strong> ${eventTopic}</p>

        <p style="margin-top:20px;">
        We appreciate the opportunity to support your audience with impactful,
        inclusive, and empowering dialogue.
        </p>

        <p>
        Warm regards,<br/>
        <strong>Whittington Consulting Team</strong>
        </p>
      </div>
      `,
    });

    // 1️⃣ Email to Company
    await resend.emails.send({
      from: "Whittington Consulting <noreply@whittingtonconsulting.com>",
      to:"hello@whittingtonconsulting.com",
      subject: "New Hire to Speak Request",
      html: `
      <div style="font-family:Arial;padding:20px;">
        <h2>New Speaker Booking Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
        <p><strong>Audience Size:</strong> ${audienceSize}</p>
        <p><strong>Event Topic:</strong> ${eventTopic}</p>
        <p><strong>Additional Info:</strong><br/> ${additionalInfo}</p>
      </div>
      `,
    });


    

    return NextResponse.json({ success: true });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
