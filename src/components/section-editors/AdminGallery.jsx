"use client";

import { useEffect, useState } from "react";
import Styles from "@/styles/AdminGallery.module.css";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState(null); // may be null initially
  const [form, setForm] = useState({
    sectionHeading: "",
    sectionSubHeading: "",
    sectionParagraph: "",
  });

  // Fetch gallery from API
  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (!data) return; // keep gallery null if DB empty
        setGallery(data);
        setForm({
          sectionHeading: data.sectionHeading || "",
          sectionSubHeading: data.sectionSubHeading || "",
          sectionParagraph: data.sectionParagraph || "",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // Save heading/subheading/paragraph
  const updateText = async () => {
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setGallery(data);
  };

  // Upload image
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: reader.result }),
      });
      const data = await res.json();
      setGallery(data);
    };
    reader.readAsDataURL(file);
  };

  // Delete specific image
  const deleteImage = async (publicId) => {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });

    setGallery((prev) => ({
      ...prev,
      images: prev?.images?.filter((img) => img.publicId !== publicId) || [],
    }));
  };

  return (
    <div className={Styles.container}>
      <h2>Gallery Section (Admin)</h2>

      {/* ===== TEXT FORM ===== */}
      <div className={Styles.form}>
        <input
          placeholder="Section Heading"
          value={form.sectionHeading}
          onChange={(e) =>
            setForm({ ...form, sectionHeading: e.target.value })
          }
        />
        <input
          placeholder="Sub Heading"
          value={form.sectionSubHeading}
          onChange={(e) =>
            setForm({ ...form, sectionSubHeading: e.target.value })
          }
        />
        <textarea
          placeholder="Paragraph"
          value={form.sectionParagraph}
          onChange={(e) =>
            setForm({ ...form, sectionParagraph: e.target.value })
          }
        />
        <button onClick={updateText}>Save Section</button>
      </div>

      {/* ===== IMAGE UPLOAD ===== */}
      <input type="file" accept="image/*" onChange={uploadImage} />

      {/* ===== IMAGE GRID ===== */}
      <div className={Styles.grid}>
        {gallery?.images?.length > 0 ? (
          gallery.images.map((img) => (
            <div key={img._id} className={Styles.imageBox}>
              <img src={img.imageUrl} alt="" />
              <button
                className={Styles.delete}
                onClick={() => deleteImage(img.publicId)}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
