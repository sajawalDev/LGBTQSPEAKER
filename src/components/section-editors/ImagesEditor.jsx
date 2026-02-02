"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import Styles from "@/styles/AdminImages.module.css";

export default function ImagesAdmin() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    const res = await fetch("/api/admin/images");
    setImages(await res.json());
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/admin/images", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    fetchImages();
  };

const deleteImage = async (id) => {
  await fetch(`/api/admin/images/${id}`, { method: "DELETE" });
  fetchImages(); // re-sync with MongoDB
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Images Manager</h2>

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="mb-5"
      />

      {uploading && <p>Uploading...</p>}

      {/* ✅ SAME ROW LAYOUT AS ImagesClient */}
      <div className={Styles.imagesContainer}>
        {images.map((img) => (
          <div key={img._id} className={Styles.imageWrapper}>
            {/* Image */}
            <img
              src={img.url}
              alt="Uploaded"
              className={Styles.image}
            />

            {/* ❌ Delete */}
            <button
              className={Styles.deleteBtn}
              onClick={() => deleteImage(img._id)}
              title="Delete image"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
