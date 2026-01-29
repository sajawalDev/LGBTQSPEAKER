"use client";

import { usePathname } from "next/navigation"; // Next.js hook to get current path
import "./globals.css";

import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // gives current route, e.g., "/admin/login"

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body>
        {/* Only show Navbar if not admin route */}
        {!isAdminRoute && <Navbar />}

        {/* Page content */}
        {children}

        {/* Only show Footer if not admin route */}
        {!isAdminRoute && <Footer />}

        <BootstrapClient />
      </body>
    </html>
  );
}
