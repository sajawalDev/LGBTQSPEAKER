import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";
import ServicesClient from "./ServicesClient";

export default async function ServicesServer({ pageSlug }) {
  await connectDB();

  const page = await Page.findOne({ slug: pageSlug }).lean();
  if (!page?.sections) return null;

  const section = page.sections.find(s => s.type === "Services");
  if (!section?.data) return null;

  // ✅ PASS ONLY CLEAN DATA
  const safeData = JSON.parse(JSON.stringify(section.data));

  return <ServicesClient data={safeData} />;
}
