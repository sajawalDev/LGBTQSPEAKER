"use client";

import { useEffect, useState } from "react";

const EMPTY_STATE = {
  image: null,
  imagePreview: "",

  mainHeading: "",
  introParagraph: "",
  boldText: "",

  paragraphs: [],

  missionSections: [
    { title: "", content: "" },
    { title: "", content: "" },
  ],

  button: {
    label: "",
    slug: "",
  },

  email: "",

  getInTouch: {
    heading: "",
    subHeading: "",
    content: "",
    buttonText: "",
  },
};

export default function AdminAboutEditor() {
  const [aboutData, setAboutData] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  /* ---------------- FETCH (GET) ---------------- */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/admin/about", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data) {
          setAboutData({
            ...EMPTY_STATE,
            ...data,
            image: null,
            imagePreview: data.image?.url || "",
          });
        }
      } catch (err) {
        console.error("Failed to load about page", err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAbout();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const updateField = (field, value) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (parent, field, value) => {
    setAboutData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    setAboutData((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  /* -------- Paragraphs -------- */
  const addParagraph = () => {
    setAboutData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }));
  };

  const updateParagraph = (index, value) => {
    const updated = [...aboutData.paragraphs];
    updated[index] = value;
    setAboutData({ ...aboutData, paragraphs: updated });
  };

  const deleteParagraph = (index) => {
    setAboutData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  /* -------- Mission Sections -------- */
  const updateMission = (index, field, value) => {
    const updated = [...aboutData.missionSections];
    updated[index][field] = value;
    setAboutData({ ...aboutData, missionSections: updated });
  };

  /* ---------------- SAVE (POST) ---------------- */
  const handleSave = async () => {
    setLoading(true);

    const formData = new FormData();
    if (aboutData.image) formData.append("image", aboutData.image);

    const payload = { ...aboutData };
    delete payload.image;
    delete payload.imagePreview;

    formData.append("data", JSON.stringify(payload));

    await fetch("/api/admin/about", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    alert("About page saved successfully");
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete About page content?"))
      return;

    await fetch("/api/admin/about", {
      method: "DELETE",
    });

    setAboutData(EMPTY_STATE);
    alert("About page deleted");
  };

  if (initialLoading) {
    return <p className="p-4">Loading About Editor...</p>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>About Page Editor</h2>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete About Page
        </button>
      </div>

      {/* IMAGE */}
      <div className="card mb-4">
        <div className="card-body">
          <label>About Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          {aboutData.imagePreview && (
            <img
              src={aboutData.imagePreview}
              alt="Preview"
              className="mt-3"
              style={{ width: 220, borderRadius: 8 }}
            />
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="card mb-4">
        <div className="card-body">
          <input
            className="form-control mb-2"
            placeholder="Main Heading"
            value={aboutData.mainHeading}
            onChange={(e) =>
              updateField("mainHeading", e.target.value)
            }
          />

          <textarea
            className="form-control mb-2"
            placeholder="Intro Paragraph"
            value={aboutData.introParagraph}
            onChange={(e) =>
              updateField("introParagraph", e.target.value)
            }
          />

          <textarea
            className="form-control mb-3"
            placeholder="Bold Content"
            value={aboutData.boldText}
            onChange={(e) => updateField("boldText", e.target.value)}
          />

          <h6>Paragraphs</h6>
          {aboutData.paragraphs.map((p, i) => (
            <div key={i} className="d-flex gap-2 mb-2">
              <textarea
                className="form-control"
                value={p}
                onChange={(e) =>
                  updateParagraph(i, e.target.value)
                }
              />
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteParagraph(i)}
              >
                ✕
              </button>
            </div>
          ))}

          <button className="btn btn-secondary" onClick={addParagraph}>
            + Add Paragraph
          </button>
        </div>
      </div>

      {/* MISSION */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Mission Sections</h5>
          {aboutData.missionSections.map((m, i) => (
            <div key={i} className="mb-3">
              <input
                className="form-control mb-2"
                placeholder="Heading"
                value={m.title}
                onChange={(e) =>
                  updateMission(i, "title", e.target.value)
                }
              />
              <textarea
                className="form-control"
                placeholder="Content"
                value={m.content}
                onChange={(e) =>
                  updateMission(i, "content", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* BUTTON + EMAIL */}
      <div className="card mb-4">
        <div className="card-body">
          <input
            className="form-control mb-2"
            placeholder="Button Label"
            value={aboutData.button.label}
            onChange={(e) =>
              updateNested("button", "label", e.target.value)
            }
          />
          <input
            className="form-control mb-2"
            placeholder="Button Slug"
            value={aboutData.button.slug}
            onChange={(e) =>
              updateNested("button", "slug", e.target.value)
            }
          />
          <input
            className="form-control"
            placeholder="Email"
            value={aboutData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
      </div>

      {/* GET IN TOUCH */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Get In Touch</h5>
          <input
            className="form-control mb-2"
            placeholder="Heading"
            value={aboutData.getInTouch.heading}
            onChange={(e) =>
              updateNested("getInTouch", "heading", e.target.value)
            }
          />
          <input
            className="form-control mb-2"
            placeholder="Sub Heading"
            value={aboutData.getInTouch.subHeading}
            onChange={(e) =>
              updateNested(
                "getInTouch",
                "subHeading",
                e.target.value
              )
            }
          />
          <textarea
            className="form-control mb-2"
            placeholder="Content"
            value={aboutData.getInTouch.content}
            onChange={(e) =>
              updateNested("getInTouch", "content", e.target.value)
            }
          />
          <input
            className="form-control"
            placeholder="Button Text"
            value={aboutData.getInTouch.buttonText}
            onChange={(e) =>
              updateNested(
                "getInTouch",
                "buttonText",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={handleSave}
      >
        {loading ? "Saving..." : "Save About Page"}
      </button>
    </div>
  );
}
