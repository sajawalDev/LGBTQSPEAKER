"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to create page");
      return;
    }

    router.push("/admin/pages");
  }

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h2>Create New Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Page Title (Home, About...)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Slug (home, about, services)"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase())}
          required
        />

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Page"}
        </button>
      </form>
    </div>
  );
}
