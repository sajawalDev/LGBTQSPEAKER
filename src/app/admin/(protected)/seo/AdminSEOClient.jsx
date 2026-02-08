"use client";

import { useEffect, useState } from "react";

const PAGES = [
  { label: "Home", value: "home" },
  { label: "About", value: "about" },
  { label: "Media", value: "media" },
  { label: "Services", value: "services" },
  { label: "Blog", value: "blog" },
  { label: "Contact", value: "contact" },
  { label: "Terms & Conditions", value: "terms&condtions" },
  { label: "Cookie Policy", value: "cookiepolicy" },
  { label: "Privacy Policy", value: "privacypolicy" },
];

const EMPTY_SEO = {
  page: "home",
  title: "",
  description: "",
  keywords: "",
  canonical: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  noIndex: false,
  noFollow: false,
};

export default function AdminSEOClient() {
  const [seo, setSeo] = useState(EMPTY_SEO);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  /* ---------------- FETCH SEO BY PAGE ---------------- */
  useEffect(() => {
    fetch(`/api/admin/seo?page=${seo.page}`)
      .then(res => res.json())
      .then(data => {
        if (data) setSeo(prev => ({ ...prev, ...data }));
      });
  }, [seo.page]);

  /* ---------------- HANDLE INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSeo({ ...seo, [name]: type === "checkbox" ? checked : value });
  };

  /* ---------------- CLOUDINARY UPLOAD ---------------- */
  const handleOGImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setSeo(prev => ({
        ...prev,
        ogImage: data.secure_url,
      }));
    } catch (err) {
      console.error("OG Image upload failed", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SAVE SEO ---------------- */
  const saveSEO = async () => {
    setLoading(true);
    setStatus("");

    const res = await fetch("/api/admin/seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seo),
    });

    setLoading(false);
    setStatus(res.ok ? "SEO settings saved successfully." : "Failed to save SEO.");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        {/* PAGE SELECTOR */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Select Page</label>
          <select
            className="form-select"
            value={seo.page}
            onChange={(e) => setSeo({ ...EMPTY_SEO, page: e.target.value })}
          >
            {PAGES.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* BASIC SEO */}
        <h5 className="fw-bold mb-3">Basic SEO</h5>

        <div className="mb-3">
          <label className="form-label">Meta Title</label>
          <input
            name="title"
            className="form-control"
            value={seo.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Meta Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            value={seo.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Keywords</label>
          <input
            name="keywords"
            className="form-control"
            value={seo.keywords}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Canonical URL</label>
          <input
            name="canonical"
            className="form-control"
            value={seo.canonical}
            onChange={handleChange}
          />
        </div>

        {/* OPEN GRAPH */}
        <h5 className="fw-bold mb-3">Open Graph (Social Sharing)</h5>

        <div className="mb-3">
          <label className="form-label">OG Title</label>
          <input
            name="ogTitle"
            className="form-control"
            value={seo.ogTitle}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">OG Description</label>
          <textarea
            name="ogDescription"
            className="form-control"
            rows={2}
            value={seo.ogDescription}
            onChange={handleChange}
          />
        </div>

        {/* OG IMAGE UPLOAD */}
        <div className="mb-4">
          <label className="form-label">OG Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleOGImageUpload(e.target.files[0])}
          />

          {uploading && (
            <div className="small text-muted mt-2">Uploading image...</div>
          )}

          {seo.ogImage && !uploading && (
            <img
              src={seo.ogImage}
              alt="OG Preview"
              className="img-fluid rounded mt-3"
              style={{ maxHeight: "200px" }}
            />
          )}
        </div>

        {/* INDEXING */}
        <h5 className="fw-bold mb-3">Search Engine Controls</h5>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            name="noIndex"
            checked={seo.noIndex}
            onChange={handleChange}
          />
          <label className="form-check-label">No Index</label>
        </div>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            name="noFollow"
            checked={seo.noFollow}
            onChange={handleChange}
          />
          <label className="form-check-label">No Follow</label>
        </div>

        {/* SAVE */}
        <button
          className="btn btn-dark px-4"
          disabled={loading}
          onClick={saveSEO}
        >
          {loading ? "Saving..." : "Save SEO"}
        </button>

        {status && (
          <div className="alert alert-info mt-3 mb-0">
            {status}
          </div>
        )}

      </div>
    </div>
  );
}
