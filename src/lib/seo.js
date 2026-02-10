import { cache } from "react";
import { connectDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";

/**
 * Get SEO data by page slug
 * Cached to avoid multiple DB calls in dev & prod
 */
export const getSeoByPage = cache(async (page) => {
  console.log("SEO: start");

  await connectDB();
  console.log("SEO: db connected");

  const seo = await Seo.findOne({ page }).lean();
  console.log("SEO: query done");

  return seo;
});

