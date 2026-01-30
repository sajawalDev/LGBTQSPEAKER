"use client";

import { usePathname } from "next/navigation";

export default function LayoutClient({ children, navbar, footer }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && navbar}
      {children}
      {!isAdminRoute && footer}
    </>
  );
}
