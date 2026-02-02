import GalleryClient from "./GalleryClient";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export default async function GalleryServer() {
  // 1️⃣ Connect to MongoDB
  await connectDB();

  // 2️⃣ Fetch the first gallery from DB
  let gallery = await Gallery.findOne().lean(); // lean() ensures plain JS object

  if (!gallery) return null; // return nothing if no gallery exists

  // 3️⃣ Convert all _id fields and dates to plain strings for Client Component
  gallery._id = gallery._id.toString();
  gallery.createdAt = gallery.createdAt?.toISOString();
  gallery.updatedAt = gallery.updatedAt?.toISOString();

  gallery.images = gallery.images.map((img) => ({
    ...img,
    _id: img._id.toString(),
    createdAt: img.createdAt?.toISOString(),
    updatedAt: img.updatedAt?.toISOString(),
  }));

  // 4️⃣ Pass fully serializable gallery data to Client Component
  return <GalleryClient gallery={gallery} />;
}
