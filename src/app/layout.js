import "./globals.css";

import Navbar from "@/components/navbar/Navbar.server";
import Footer from "@/components/Home/Footer";
import LayoutClient from "@/components/LayoutClient";
import BootstrapClient from "@/components/BootstrapClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Client wrapper decides what to show */}
        <LayoutClient
          navbar={<Navbar />}
          footer={<Footer />}
        >
          {children}
        </LayoutClient>

        <BootstrapClient />
      </body>
    </html>
  );
}
