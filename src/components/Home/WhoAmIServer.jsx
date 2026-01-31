import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";
import WhoIamClient from "./WhoAmIClient";

export default async function WhoIamServer({ pageSlug }) {
  await connectDB();

  const page = await Page.findOne({ slug: pageSlug }).lean();
  if (!page?.sections) return null;

  const section = page.sections.find(s => s.type === "Who I Am");
  if (!section || !section.data) return null;

  const safeData = JSON.parse(JSON.stringify(section.data));

  return <WhoIamClient data={safeData} />;
}
