"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FullScreenSpinner from "@/components/FullScreenSpinner";
export default function PageEditor() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/admin/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
        setTitle(data.title);
      });
  }, [slug]);

  async function updatePageTitle() {
    setSaving(true);

    await fetch(`/api/admin/pages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setSaving(false);
    alert("Page updated");
  }

  if (!page) return <FullScreenSpinner/>;

  return (
    <div className="container py-4">
      {/* PAGE META */}
      <div className="card p-3 mb-4">
        <h4>Page Settings</h4>

        <input
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={updatePageTitle}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Page"}
        </button>
      </div>

      {/* SECTIONS */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Sections</h4>

        <Link
          href={`/admin/pages/${slug}/sections/new`}
          className="btn btn-primary"
        >
          + Add Section
        </Link>
      </div>

      {page.sections.length === 0 ? (
        <p>No sections yet.</p>
      ) : (
        <ul className="list-group">
          {page.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              // Determine custom edit link for special types
              let editHref = `/admin/pages/${slug}/sections/${section._id}`;
              if (section.type === "FAQs") editHref = "/admin/faq";
              if (section.type === "Newsletter Subscribe") editHref = "/admin/newsletter";

              return (
                <li
                  key={section._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <strong>{section.type}</strong>

                  <Link href={editHref} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
