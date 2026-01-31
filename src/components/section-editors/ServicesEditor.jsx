"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const emptyCard = {
  icon: "faMicrophone",
  title: "",
  desc: "",
  link: "/hire-to-speak",
};

export default function ServicesEditor() {
  const { slug, sectionId } = useParams();

  const [form, setForm] = useState({
    headingTag: "Services",
    heading: "",
    description: "",
    tagline: "",
    cards: Array.from({ length: 6 }, () => ({ ...emptyCard })),
  });

  const [saving, setSaving] = useState(false);

  // LOAD EXISTING DATA
  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/admin/pages/${slug}/sections/${sectionId}`
      );
      const data = await res.json();
      if (data?.data) setForm(data.data);
    }
    load();
  }, [slug, sectionId]);

  function update(key, value) {
    setForm({ ...form, [key]: value });
  }

  function updateCard(index, key, value) {
    const cards = [...form.cards];
    cards[index][key] = value;
    update("cards", cards);
  }

  async function handleSave() {
    setSaving(true);

    await fetch(`/api/admin/pages/${slug}/sections/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    alert("Services section saved");
  }

  return (
    <div className="container py-4">
      <h2>Services Section</h2>

      <input
        className="form-control mb-2"
        placeholder="Heading Tag (e.g. Services)"
        value={form.headingTag}
        onChange={e => update("headingTag", e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Main Heading"
        value={form.heading}
        onChange={e => update("heading", e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Description"
        value={form.description}
        onChange={e => update("description", e.target.value)}
      />

      <h5>Service Cards</h5>

      {form.cards.map((card, i) => (
        <div key={i} className="border rounded p-3 mb-3">
          <h6>Card {i + 1}</h6>

          <input
            className="form-control mb-2"
            placeholder="FontAwesome Icon (faMicrophone)"
            value={card.icon}
            onChange={e => updateCard(i, "icon", e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Title"
            value={card.title}
            onChange={e => updateCard(i, "title", e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={card.desc}
            onChange={e => updateCard(i, "desc", e.target.value)}
          />

          <input
            className="form-control"
            placeholder="Button Link"
            value={card.link}
            onChange={e => updateCard(i, "link", e.target.value)}
          />
        </div>
      ))}

      <textarea
        className="form-control mb-3"
        placeholder="Bottom Tagline"
        value={form.tagline}
        onChange={e => update("tagline", e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Services Section"}
      </button>
    </div>
  );
}
