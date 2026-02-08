"use client";

import { useEffect, useState } from "react";

const CLOUDINARY_UPLOAD_URL =
    "https://api.cloudinary.com/v1_1/dajnvtjci/video/upload";

const UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function AdminVideoEditor() {
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    /* =========================
       Fetch videos
    ========================= */
    const fetchVideos = async () => {
        try {
            const res = await fetch("/api/admin/free-videos");
            const data = await res.json();
            setVideos(data);
        } catch (err) {
            console.error("Fetch failed", err);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    /* =========================
       Upload video
    ========================= */
    const handleUpload = async () => {
        if (!file || !title) {
            alert("Title & video required");
            return;
        }

        setLoading(true);

        try {
            /* 1️⃣ Upload video to Cloudinary */
            const fd = new FormData();
            fd.append("file", file);
            fd.append("upload_preset", UPLOAD_PRESET);
            fd.append("folder", "free-videos");

            const cloudRes = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: "POST",
                body: fd,
            });

            const cloudData = await cloudRes.json();

            if (!cloudRes.ok || !cloudData.secure_url) {
                throw new Error(
                    cloudData.error?.message || "Cloudinary upload failed"
                );
            }

            /* 2️⃣ Save metadata in backend */
            const apiRes = await fetch("/api/admin/free-videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    videoUrl: cloudData.secure_url,
                    publicId: cloudData.public_id,
                    duration: cloudData.duration,
                }),
            });

            if (!apiRes.ok) {
                throw new Error("Backend save failed");
            }

            setTitle("");
            setFile(null);
            fetchVideos();
        } catch (err) {
            alert(err.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       Delete video
    ========================= */
    const handleDelete = async (id) => {
        if (!confirm("Delete this video?")) return;

        try {
            await fetch("/api/admin/free-videos", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            fetchVideos();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="container py-6">
            <h2 className="text-xl font-semibold mb-4">Free Videos</h2>

            {/* Upload Card */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <input
                    type="text"
                    placeholder="Video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full mb-2"
                />

                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-3"
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Add Video"}
                </button>
            </div>

            {/* Videos List */}
            <div className="grid md:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video._id} className="bg-white p-3 rounded shadow">
                        <video
                            src={video.videoUrl}
                            controls
                            preload="metadata"
                            className="w-100 mb-2 rounded"
                            style={{
                                maxWidth: "300px",
                                height: "200px",
                                objectFit: "cover",
                                backgroundColor: "#000",
                            }}
                        />

                        <p className="font-medium">{video.title}</p>

                        <button
                            onClick={() => handleDelete(video._id)}
                            className="btn btn-sm btn-outline-danger mt-2"
                        >
                            Delete
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}
