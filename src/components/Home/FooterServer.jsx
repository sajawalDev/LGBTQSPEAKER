import FooterClient from "./FooterClient";
import { connectDB } from "@/lib/mongodb";
import Footer from "@/models/Footer";

export default async function FooterServer() {
  await connectDB();

  // Fetch footer directly from MongoDB
  const footerDoc = await Footer.findOne().lean();

  // 🚨 Ensure plain JSON for Client Component
  const footer = footerDoc
    ? JSON.parse(JSON.stringify(footerDoc))
    : null;

  return <FooterClient footer={footer} />;
}
