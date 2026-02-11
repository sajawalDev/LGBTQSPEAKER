"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import FullScreenSpinner from "../FullScreenSpinner";
const EMPTY_SLIDE = {
  image: "",
  blur: "",
  title: "",
  desc: "",
  buttonText: "",
  buttonLink: "",
};

export default function BannerSectionEditor() {
  const { slug, sectionId } = useParams();

  const [slides, setSlides] = useState([EMPTY_SLIDE]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ FETCH EXISTING SECTION DATA
  useEffect(() => {
    async function loadSection() {
      try {
        const res = await fetch(
          `/api/admin/pages/${slug}/sections/${sectionId}`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const section = await res.json();

        if (section?.data?.slides?.length) {
          setSlides(section.data.slides);
        }
      } catch (err) {
        console.error("Failed to load section", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug && sectionId) {
      loadSection();
    }
  }, [slug, sectionId]);

  function updateSlide(index, key, value) {
    const updated = [...slides];
    updated[index][key] = value;
    setSlides(updated);
  }

  function addSlide() {
    setSlides([...slides, { ...EMPTY_SLIDE }]);
  }

  function removeSlide(index) {
    setSlides(slides.filter((_, i) => i !== index));
  }

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dajnvtjci/image/upload",
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url;
  }

  async function handleImageChange(e, index, key) {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);
    updateSlide(index, key, url);
  }

  async function handleSave() {
    setSaving(true);

    await fetch(`/api/admin/pages/${slug}/sections/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    });

    setSaving(false);
    alert("Section updated");
  }

  if (loading) {
    return <FullScreenSpinner/>;
  }

  return (
    <div className="container py-4">
      <h2>Edit Banner / Carousel Section</h2>

      {slides.map((slide, index) => (
        <div key={index} className="card p-3 mb-3">
          <h5>Slide {index + 1}</h5>

          <label>Image</label>
          <input type="file" onChange={(e) => handleImageChange(e, index, "image")} className="form-control mb-2" />

          <label>Blur Image</label>
          <input type="file" onChange={(e) => handleImageChange(e, index, "blur")} className="form-control mb-2" />

          <input
            placeholder="Title"
            value={slide.title}
            onChange={(e) => updateSlide(index, "title", e.target.value)}
            className="form-control mb-2"
          />

          <textarea
            placeholder="Description"
            value={slide.desc}
            onChange={(e) => updateSlide(index, "desc", e.target.value)}
            className="form-control mb-2"
          />

          <input
            placeholder="Button Text"
            value={slide.buttonText}
            onChange={(e) => updateSlide(index, "buttonText", e.target.value)}
            className="form-control mb-2"
          />

          <input
            placeholder="Button Link"
            value={slide.buttonLink}
            onChange={(e) => updateSlide(index, "buttonLink", e.target.value)}
            className="form-control mb-2"
          />

          <button className="btn btn-danger" onClick={() => removeSlide(index)}>
            Remove Slide
          </button>
        </div>
      ))}

      <button className="btn btn-secondary mb-3" onClick={addSlide}>
        + Add Slide
      </button>

      <br />

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Section"}
      </button>
    </div>
  );
}
