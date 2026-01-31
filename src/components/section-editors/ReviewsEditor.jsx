"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const emptyTestimonial = {
  text: "",
  name: "",
  company: "",
  rating: 5,
};

export default function ReviewsEditor() {
  const { slug, sectionId } = useParams();

  const [form, setForm] = useState({
    heading: "Testimonials & Reviews",
    videos: [],
    testimonials: [],
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // LOAD EXISTING DATA
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/pages/${slug}/sections/${sectionId}`);
      const data = await res.json();
      if (data?.data) setForm(data.data);
    }
    load();
  }, [slug, sectionId]);

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  /* ---------------- VIDEO UPLOAD (CLOUDINARY) ---------------- */
  async function uploadVideo(file) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dajnvtjci/video/upload",
      { method: "POST", body: fd }
    );

    const data = await res.json();
    return data.secure_url;
  }

  async function handleVideoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const videoUrl = await uploadVideo(file);

    update("videos", [
      ...form.videos,
      { id: crypto.randomUUID(), videoUrl },
    ]);

    setUploading(false);
  }

  /* ---------------- TESTIMONIALS ---------------- */
  function addTestimonial() {
    update("testimonials", [...form.testimonials, emptyTestimonial]);
  }

  function updateTestimonial(i, key, value) {
    const arr = [...form.testimonials];
    arr[i][key] = value;
    update("testimonials", arr);
  }

  function removeTestimonial(i) {
    update(
      "testimonials",
      form.testimonials.filter((_, idx) => idx !== i)
    );
  }

  async function handleSave() {
    setSaving(true);

    await fetch(`/api/admin/pages/${slug}/sections/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    alert("Reviews section saved");
  }

  return (
    <div className="container py-4">
      <h2>Reviews & Testimonials</h2>

      <input
        className="form-control mb-3"
        value={form.heading}
        onChange={e => update("heading", e.target.value)}
        placeholder="Section Heading"
      />

      {/* VIDEO UPLOAD */}
      <h5>Video Reviews</h5>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {uploading && <p>Uploading video...</p>}

      <ul className="mt-2">
        {form.videos.map(v => (
          <li key={v.id}>{v.videoUrl}</li>
        ))}
      </ul>

      {/* TEXT TESTIMONIALS */}
      <h5 className="mt-4">Text Testimonials</h5>

      {form.testimonials.map((t, i) => (
        <div key={i} className="border p-3 mb-3">
          <textarea
            className="form-control mb-2"
            placeholder="Testimonial text"
            value={t.text}
            onChange={e => updateTestimonial(i, "text", e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Name"
            value={t.name}
            onChange={e => updateTestimonial(i, "name", e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Company"
            value={t.company}
            onChange={e => updateTestimonial(i, "company", e.target.value)}
          />

          <input
            type="number"
            min="1"
            max="5"
            className="form-control mb-2"
            placeholder="Rating"
            value={t.rating}
            onChange={e => updateTestimonial(i, "rating", e.target.value)}
          />

          <button className="btn btn-danger btn-sm" onClick={() => removeTestimonial(i)}>
            Remove
          </button>
        </div>
      ))}

      <button className="btn btn-secondary mb-3" onClick={addTestimonial}>
        + Add Testimonial
      </button>

      <br />

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Reviews Section"}
      </button>
    </div>
  );
}
