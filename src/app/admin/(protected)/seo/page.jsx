// app/admin/seo/page.jsx
import AdminSEOClient from "./AdminSEOClient";

export const dynamic = "force-dynamic";

export default function AdminSEOPage() {
  return (
    <div>
      <h2 className="fw-bold mb-4">SEO Management</h2>
      <AdminSEOClient />
    </div>
  );
}
