import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";
import ReviewsClient from "./ReviewsClient";

export default async function ReviewsServer({ pageSlug }) {
  await connectDB();

  const page = await Page.findOne({ slug: pageSlug }).lean();
  if (!page?.sections) return null;

  const section = page.sections.find(s => s.type === "Reviews");
  if (!section?.data) return null;

  const safeData = JSON.parse(JSON.stringify(section.data));

  return <ReviewsClient data={safeData} />;
}
