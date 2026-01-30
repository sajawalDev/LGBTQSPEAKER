import { unstable_noStore as noStore } from "next/cache";
import NavbarClient from "./Navbar.client";
import { getNavbar } from "@/lib/navbar";

export default async function Navbar() {
  noStore(); // 🔥 disables prerender + cache
  const navbar = await getNavbar();
  return <NavbarClient navbar={navbar} />;
}
