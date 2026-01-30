"use client"; // because we have interactive form

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    // Replace this with your actual API call
    console.log("Saving new page:", { title, slug, description });

    // After saving, redirect to pages list
    router.push("/admin/pages");
  };

  return (
    <div>
      <h2 className="fw-bold mb-4">Create New Page</h2>

      {/* Page Title */}
      <div className="mb-3">
        <label className="form-label">Page Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Page Slug */}
      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input
          type="text"
          className="form-control"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g., home, about, contact"
        />
      </div>

      {/* Page Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleSave}>
        Save Page
      </button>
    </div>
  );
}
