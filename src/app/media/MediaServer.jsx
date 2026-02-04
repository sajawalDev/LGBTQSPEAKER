import { connectDB } from "@/lib/mongodb";
import MediaSection from "@/models/MediaSection";
import MediaClient from "./MediaClient";

export default async function MediaServer() {
  await connectDB();

  const sections = await MediaSection.find()
    .sort({ order: 1 })
    .lean();

  // Convert _id to string (VERY IMPORTANT)
  const plainSections = sections.map((sec) => ({
    ...sec,
    _id: sec._id.toString(),
  }));

  return <MediaClient sections={plainSections} />;
}
