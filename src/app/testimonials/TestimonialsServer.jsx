import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";
import TestimonialsClient from "./TestimonialsClient";

export default async function TestimonialsServer({ pageSlug="home" }) {
  await connectDB();

  const page = await Page.findOne({ slug: pageSlug }).lean();
  if (!page?.sections) return null;

  const section = page.sections.find(s => s.type === "Reviews");
  if (!section?.data) return null;

  const safeData = JSON.parse(JSON.stringify(section.data));

  return <TestimonialsClient data={safeData} />;
}
