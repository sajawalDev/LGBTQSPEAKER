import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ContactPage from "@/models/ContactPage";

/* ================= GET ================= */
export async function GET() {
  await connectDB();

  let data = await ContactPage.findOne().lean();

  if (!data) {
    data = await ContactPage.create({
      heroHeading: "Get In Touch",
      heroSubHeading: "Reach Out To Us Anytime",
      inputs: [
        { label: "Your Name", type: "text", placeholder: "Your Name" },
        { label: "Your Email", type: "email", placeholder: "Your Email" },
        { label: "Your Message", type: "textarea", placeholder: "Your Message" },
      ],
      buttonText: "Send Message",
    });
  }

  return NextResponse.json({ ...data, _id: data._id.toString() });
}

/* ================= PUT ================= */
export async function PUT(req) {
  await connectDB();
  const body = await req.json();

  const updated = await ContactPage.findOneAndUpdate(
    {},
    body,
    { new: true, upsert: true }
  ).lean();

  return NextResponse.json({ ...updated, _id: updated._id.toString() });
}

/* ================= DELETE ================= */
export async function DELETE() {
  await connectDB();
  await ContactPage.deleteMany();
  return NextResponse.json({ success: true });
}
