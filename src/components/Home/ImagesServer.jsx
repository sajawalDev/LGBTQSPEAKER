import { connectDB } from "@/lib/mongodb";
import ImageModel from "@/models/Image";
import ImagesClient from "./ImagesClient";

export default async function ImagesServer() {
  await connectDB();

  const images = await ImageModel.find().sort({ createdAt: -1 }).lean();

  const safeImages = images.map((img) => ({
    _id: img._id.toString(), 
    url: img.url,
    publicId: img.publicId,
  }));

  return <ImagesClient images={safeImages} />;
}
