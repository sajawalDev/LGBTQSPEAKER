import { connectDB } from "@/lib/mongodb";
import About from "@/models/About";
import AboutClient from "./AboutClient";

export default async function AboutServer() {
  await connectDB();

  const about = await About.findOne().lean();

  // Always pass plain JSON
  const safeData = about
    ? JSON.parse(JSON.stringify(about))
    : null;

  return <AboutClient about={safeData} />;
}
