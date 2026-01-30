// components/navbar/Navbar.server.jsx
import NavbarClient from "./Navbar.client";
import { getNavbar } from "@/lib/navbar";

export default async function Navbar() {
  const navbar = await getNavbar();
  return <NavbarClient navbar={navbar} />;
}
