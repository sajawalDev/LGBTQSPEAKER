import "./globals.css";

import BootstrapClient from "@/components/BootstrapClient";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
        <BootstrapClient/>
      </body>
    </html>
  );
}
