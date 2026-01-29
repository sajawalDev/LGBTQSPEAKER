import Navbar from "@/models/Navbar";
import { connectDB } from "@/lib/mongodb";
import NavbarAdminPage from "./NavbarAdminClient";

export default async function Page() {
  await connectDB();

  const navbar =
    (await Navbar.findOne().lean()) || {
      logo: {},
      menuItems: [],
      button: {},
      socials: {},
    };

  return <NavbarAdminPage initialNavbar={JSON.parse(JSON.stringify(navbar))} />;
}
