import "server-only";
import { connectDB } from "@/lib/mongodb";
import Navbar from "@/models/Navbar";

export async function getNavbar() {
  await connectDB();
  const navbar = await Navbar.findOne().lean();

  return JSON.parse(JSON.stringify(navbar || {}));
}
