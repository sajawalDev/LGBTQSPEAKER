"use client";

import { useEffect, useState } from "react";

export default function NewsletterAdmin() {
  const [form, setForm] = useState({
    _id: null,
    heading: "",
    subHeading: "",
    buttonText: "",
    fields: [],
  });

  const [label, setLabel] = useState("");
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [editingLabel, setEditingLabel] = useState("");

  // FETCH
  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then(res => res.json())
      .then(data => {
        if (data.length) setForm(data[0]);
      });
  }, []);

  // ADD FIELD
  const addField = () => {
    if (!label.trim()) return;

    setForm(prev => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          label,
          name: label.toLowerCase().replace(/\s+/g, ""),
          type: "text",
        },
      ],
    }));

    setLabel("");
  };

  // DELETE FIELD
  const deleteField = id => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f._id !== id),
    }));
  };

  // START EDIT
  const startEdit = field => {
    setEditingFieldId(field._id);
    setEditingLabel(field.label);
  };

  // SAVE EDIT
  const saveEdit = id => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields.map(f =>
        f._id === id ? { ...f, label: editingLabel } : f
      ),
    }));

    setEditingFieldId(null);
    setEditingLabel("");
  };

  // SAVE DOCUMENT (POST or PUT)
  const saveData = async () => {
    const method = form._id ? "PUT" : "POST";

    await fetch("/api/admin/newsletter", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Newsletter saved successfully");
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Newsletter Management</h3>

      <input
        className="form-control mb-2"
        placeholder="Heading"
        value={form.heading}
        onChange={e => setForm({ ...form, heading: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Sub Heading"
        value={form.subHeading}
        onChange={e => setForm({ ...form, subHeading: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Button Text"
        value={form.buttonText}
        onChange={e => setForm({ ...form, buttonText: e.target.value })}
      />

      {/* ADD FIELD */}
      <div className="card p-3 mb-3">
        <h6>Add Input Field</h6>
        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="Label"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addField}>
            Add
          </button>
        </div>
      </div>

      {/* FIELD LIST */}
      {form.fields.map(field => (
        <div
          key={field._id || field.name}
          className="d-flex align-items-center justify-content-between border p-2 mb-2"
        >
          {editingFieldId === field._id ? (
            <>
              <input
                className="form-control me-2"
                value={editingLabel}
                onChange={e => setEditingLabel(e.target.value)}
              />
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => saveEdit(field._id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>{field.label}</span>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => startEdit(field)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteField(field._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <button className="btn btn-success mt-3" onClick={saveData}>
        Save Newsletter
      </button>
    </div>
  );
}
