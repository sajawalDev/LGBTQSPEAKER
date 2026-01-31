"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddSectionPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [type, setType] = useState(""); // dropdown preset or custom
  const [customType, setCustomType] = useState(""); // typed by admin
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Use custom type if typed, else dropdown
    const sectionType = customType.trim() || type;

    if (!sectionType) return alert("Enter or select a section type");

    setSaving(true);

    await fetch(`/api/admin/pages/${slug}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: sectionType }),
    });

    router.push(`/admin/pages/${slug}`);
  }

  return (
    <div className="container py-4">
      <h2>Add Section</h2>

      <form onSubmit={handleSubmit} className="card p-4 mt-3">
        {/* Dropdown for common section types */}
        <label className="mb-2 fw-bold">Select a common section type (optional)</label>
        <select
          className="form-select mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">-- None --</option>
          <option value="Hero">Hero</option>
          <option value="Services">Services</option>
          <option value="Carousel">Carousel</option>
          <option value="Content">Content</option>
          <option value="Who I Am">Who I Am</option>
          <option value="Reviews">Reviews</option>
          <option value="Gallery">Gallery</option>
          <option value="Newsletter Subscribe">Newsletter Subscribe</option>
          <option value="Images">Images</option>
          <option value="FAQs">FAQs</option>
        </select>

        {/* Input for custom section name */}
        <label className="mb-2 fw-bold">Or type your own section name</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="E.g., 'Testimonials' or 'Team Members'"
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
        />

        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Adding..." : "Add Section"}
        </button>
      </form>
    </div>
  );
}
