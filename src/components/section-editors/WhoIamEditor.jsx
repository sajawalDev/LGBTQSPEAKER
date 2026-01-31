"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function WhoAmISectionEditor() {
  const { slug, sectionId } = useParams();

  const [form, setForm] = useState({
    tagLine: "",
    heading: "",
    subHeading: "",
    image: "",
    description: "",
    playButtonText: "",
    playButtonLink: "",
    downloadText: "",
    downloadLink: "",
  });

  const [saving, setSaving] = useState(false);

  // 🔹 Load existing data (IMPORTANT)
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

  // 🔹 Cloudinary upload
  async function uploadImage(file) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dajnvtjci/image/upload",
      { method: "POST", body: fd }
    );

    const data = await res.json();
    return data.secure_url;
  }

  async function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    update("image", url);
  }

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/admin/pages/${slug}/sections/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    alert("Who Am I section saved");
  }

  return (
    <div className="container py-4">
      <h2>Who Am I Section</h2>

      <input className="form-control mb-2" placeholder="Tag line"
        value={form.tagLine} onChange={e => update("tagLine", e.target.value)} />

      <input className="form-control mb-2" placeholder="Heading"
        value={form.heading} onChange={e => update("heading", e.target.value)} />

      <input className="form-control mb-2" placeholder="Sub heading"
        value={form.subHeading} onChange={e => update("subHeading", e.target.value)} />

      <input type="file" className="form-control mb-2" onChange={handleImage} />
      {form.image && <img src={form.image} width={120} />}

      <textarea className="form-control mb-2" placeholder="Description"
        value={form.description} onChange={e => update("description", e.target.value)} />

      <input className="form-control mb-2" placeholder="Play button text"
        value={form.playButtonText} onChange={e => update("playButtonText", e.target.value)} />

      <input className="form-control mb-2" placeholder="Play button link"
        value={form.playButtonLink} onChange={e => update("playButtonLink", e.target.value)} />

      <input className="form-control mb-2" placeholder="Download text"
        value={form.downloadText} onChange={e => update("downloadText", e.target.value)} />

      <input className="form-control mb-2" placeholder="Download link"
        value={form.downloadLink} onChange={e => update("downloadLink", e.target.value)} />

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Section"}
      </button>
    </div>
  );
}
