"use client";
import Link from "next/link";

const pages = [
  { name: "Home", slug: "home" },
  { name: "About", slug: "about" },
  { name: "Media", slug: "media" },
  { name: "Services", slug: "services" },
  { name: "Contact", slug: "contact" },
];

export default function AdminPages() {
  return (
    <div>
      {/* Header with Add New Page button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Pages</h2>
       
      </div>

      {/* Pages table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Page Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, idx) => (
              <tr key={page.slug}>
                <td>{idx + 1}</td>
                <td>{page.name}</td>
                <td>{page.slug}</td>
                <td>
                  {/* Edit button links to dynamic page based on slug */}
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
