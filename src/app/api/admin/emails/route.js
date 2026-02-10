// pages/api/admin/emails.js
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const emails = await Email.find().lean();
    return res.status(200).json(emails);
  }

  res.status(405).json({ error: "Method not allowed" });
}
