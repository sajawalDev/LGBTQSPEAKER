"use client";

import { useEffect, useState } from "react";

export default function AdminContactEditor() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/admin/contact");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return null;

  const updateField = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const updateInput = (index, key, value) => {
    const inputs = [...data.inputs];
    inputs[index][key] = value;
    setData({ ...data, inputs });
  };

  const addInput = () => {
    setData({
      ...data,
      inputs: [...data.inputs, { label: "", type: "text", placeholder: "" }],
    });
  };

  const deleteInput = (index) => {
    const inputs = data.inputs.filter((_, i) => i !== index);
    setData({ ...data, inputs });
  };

  const save = async () => {
    await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Saved");
  };

  return (
    <div className="container">
      <h2>Contact Page Manager</h2>

      <input
        className="form-control my-2"
        value={data.heroHeading}
        onChange={(e) => updateField("heroHeading", e.target.value)}
        placeholder="Heading"
      />

      <input
        className="form-control my-2"
        value={data.heroSubHeading}
        onChange={(e) => updateField("heroSubHeading", e.target.value)}
        placeholder="Sub Heading"
      />

      <textarea
        className="form-control my-2"
        value={data.heroContent}
        onChange={(e) => updateField("heroContent", e.target.value)}
        placeholder="Content"
      />

      <h5 className="mt-4">Phone Card</h5>
      <input
        className="form-control my-2"
        value={data.phoneHeading}
        onChange={(e) => updateField("phoneHeading", e.target.value)}
        placeholder="Phone Heading"
      />
      <input
        className="form-control my-2"
        value={data.phoneNumber}
        onChange={(e) => updateField("phoneNumber", e.target.value)}
        placeholder="Phone Number"
      />

      <h5>Email Card</h5>
      <input
        className="form-control my-2"
        value={data.emailHeading}
        onChange={(e) => updateField("emailHeading", e.target.value)}
        placeholder="Email Heading"
      />
      <input
        className="form-control my-2"
        value={data.emailAddress}
        onChange={(e) => updateField("emailAddress", e.target.value)}
        placeholder="Email"
      />

      <h5 className="mt-4">Form</h5>
      <input
        className="form-control my-2"
        value={data.formHeading}
        onChange={(e) => updateField("formHeading", e.target.value)}
        placeholder="Form Heading"
      />

      {data.inputs.map((input, i) => (
        <div key={i} className="border p-2 my-2">
          <input
            className="form-control mb-1"
            value={input.label}
            onChange={(e) => updateInput(i, "label", e.target.value)}
            placeholder="Label"
          />
          <select
            className="form-control mb-1"
            value={input.type}
            onChange={(e) => updateInput(i, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="textarea">Textarea</option>
          </select>
          <input
            className="form-control mb-1"
            value={input.placeholder}
            onChange={(e) =>
              updateInput(i, "placeholder", e.target.value)
            }
            placeholder="Placeholder"
          />
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteInput(i)}
          >
            Delete Input
          </button>
        </div>
      ))}

      <button className="btn btn-secondary my-2" onClick={addInput}>
        Add Input
      </button>

      <input
        className="form-control my-2"
        value={data.buttonText}
        onChange={(e) => updateField("buttonText", e.target.value)}
        placeholder="Button Text"
      />

      <button className="btn btn-primary mt-3" onClick={save}>
        Save Contact Page
      </button>
    </div>
  );
}
