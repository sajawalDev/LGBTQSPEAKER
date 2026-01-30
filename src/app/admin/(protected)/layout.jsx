import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 🔥 IMPORTANT (explained below)

export default async function AdminLayout({ children }) {
  const session = await getServerSession();

  if (!session || !session.isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        <aside className="col-12 col-md-3 col-lg-2 bg-dark text-white p-0">
          <div className="d-flex flex-column h-100">
            <div className="p-3 border-bottom">
              <h4 className="fw-bold mb-0">Admin Panel</h4>
            </div>

            <ul className="nav nav-pills flex-column gap-1 p-3">
              <li className="nav-item">
                <Link href="/admin" className="nav-link text-white">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/navbar" className="nav-link text-white">Navbar</Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/pages" className="nav-link text-white">Pages</Link>
              </li>
            </ul>

            <div className="mt-auto p-3 border-top small text-muted">
              Logged in as<br />
              <span className="text-white">{session.email}</span>
            </div>
          </div>
        </aside>

        <main className="col-12 col-md-9 col-lg-10 bg-light p-4">
          {children}
        </main>

      </div>
    </div>
  );
}
