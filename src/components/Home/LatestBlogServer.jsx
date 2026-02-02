import LatestBlogClient from "./LatestBlogClient";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function LatestBlogServer() {
  await connectDB();

  // Fetch latest blogs (you can limit)
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .select("title slug coverImage author createdAt")
    .lean();

  // Convert Mongo ObjectId → string
  const serializedBlogs = blogs.map(blog => ({
    ...blog,
    _id: blog._id.toString(),
  }));

  return <LatestBlogClient blogs={serializedBlogs} />;
}
