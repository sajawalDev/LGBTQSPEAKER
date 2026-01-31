import { connectDB } from "@/lib/mongodb";
import Page from "@/models/Page";
import BannerClient from "./BannerClient";

export default async function Banner({ pageSlug }) {
  await connectDB();

  const page = await Page.findOne({ slug: pageSlug }).lean();
  if (!page) return null;

  const section = page.sections.find(
    (s) =>
      s.type?.toLowerCase() === "hero" ||
      s.type?.toLowerCase() === "carousel"
  );

  const slides =
    section?.data?.slides?.filter(slide => slide.image) || [];

  return <BannerClient slides={slides} />;
}
