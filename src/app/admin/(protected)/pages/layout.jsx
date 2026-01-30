"use client";
import React from "react";
import Link from "next/link";

export default function AdminPagesLayout({ children }) {
  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3 className="fw-bold">Manage Pages</h3>
        <Link href="/admin/pages/new" className="btn btn-primary">
          Add New Page
        </Link>
      </div>

      {/* Render the child page */}
      <div>{children}</div>
    </div>
  );
}
