"use client";

import { useEffect, useState } from "react";

export default function AdminMediaEditor() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSections = async () => {
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setSections(data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleSubmit = async (e, id = null) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    if (id) formData.append("id", id);

    await fetch("/api/admin/media", {
      method: id ? "PUT" : "POST",
      body: formData,
    });

    e.target.reset();
    await fetchSections();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this section?")) return;

    await fetch("/api/admin/media", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchSections();
  };

  return (
    <div className="container">
      <h2 className="mb-4">Media Page Manager</h2>

      {/* ADD NEW */}
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <h5>Add New Section</h5>
        <input type="file" name="image" className="form-control mb-2" />
        <input
          type="text"
          name="heading"
          placeholder="Heading"
          className="form-control mb-2"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="buttonText"
          placeholder="Button Text"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="buttonSlug"
          placeholder="Button Slug"
          className="form-control mb-2"
        />
        <button className="btn btn-primary" disabled={loading}>
          Add Section
        </button>
      </form>

      {/* EXISTING */}
      {sections.map((sec) => (
        <form
          key={sec._id}
          onSubmit={(e) => handleSubmit(e, sec._id)}
          className="card p-4 mb-3"
        >
          {sec.image?.url && (
            <img
              src={sec.image.url}
              alt=""
              style={{ maxWidth: 200 }}
              className="mb-2"
            />
          )}
          <input type="file" name="image" className="form-control mb-2" />
          <input
            type="text"
            name="heading"
            defaultValue={sec.heading}
            className="form-control mb-2"
          />
          <textarea
            name="content"
            defaultValue={sec.content}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="buttonText"
            defaultValue={sec.buttonText}
            className="form-control mb-2"
          />
          <input
            type="text"
            name="buttonSlug"
            defaultValue={sec.buttonSlug}
            className="form-control mb-2"
          />

          <div className="d-flex gap-2">
            <button className="btn btn-success">Update</button>
            <button
              type="button"
              onClick={() => handleDelete(sec._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </form>
      ))}
    </div>
  );
}
