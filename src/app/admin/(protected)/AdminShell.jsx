"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/adminLayout.module.css"

export default function AdminShell({ children, session }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  const menu = [
    { name: "Dashboard", href: "/admin" },
    { name: "Navbar", href: "/admin/navbar" },
    { name: "Footer", href: "/admin/footer" },
    { name: "Pages", href: "/admin/pages" },
    { name: "FAQs", href: "/admin/faq" },
    { name: "NewsLetter", href: "/admin/newsletter" },
    { name: "Emails", href: "/admin/emails" },
    { name: "Contact", href: "/admin/contact" },
    { name: "SEO", href: "/admin/seo" },
    { name: "Bookings", href: "/admin/booking" },
    {name:"Change Email & password",href:"/admin/change-login-credentials"}
  ];

  return (
    <div className={styles.wrapper}>
      
      {/* Mobile Top Bar */}
      <header className={styles.mobileHeader}>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <span className={styles.title}>Admin Panel</span>
      </header>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <h4 className={styles.logo}>Admin Panel</h4>

        <nav>
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`${styles.link} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={styles.user}>
          Logged in as
          <span>{session.email}</span>
        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {open && <div className={styles.overlay} onClick={closeMenu} />}

      {/* Main Content */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
