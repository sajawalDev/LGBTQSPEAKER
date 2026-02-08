import { connectDB } from "@/lib/mongodb";
import FreeVideo from "@/models/FreeVideo";
import AccessVideosClient from "./AccessVideosClient";

export default async function AccessVideosServer() {
  await connectDB();

  const videos = await FreeVideo.find({})
    .sort({ createdAt: -1 })
    .lean();

  // Ensure plain JSON
  const plainVideos = videos.map((v) => ({
    _id: v._id.toString(),
    title: v.title,
    videoUrl: v.videoUrl,
  }));

  return <AccessVideosClient videos={plainVideos} />;
}
