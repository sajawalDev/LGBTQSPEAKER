"use client";

import { useEffect, useState } from "react";

const emptyBlock = { type: "paragraph", value: "" };

export default function AdminServicesEditor() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((data) =>
        setServices(
          data.map((s) => ({
            ...s,
            blocks: (s.blocks || []).map((b) => ({
              ...b,
              items: b.type === "list" ? b.items || [""] : undefined,
            })),
          }))
        )
      );
  }, []);


  const addService = () => {
    setServices([
      ...services,
      {
        name: "New Service",
        heading: "",
        subHeading: "",
        blocks: [],
        button: { text: "", slug: "" },
      },
    ]);
  };

  const updateService = (i, key, value) => {
    const copy = [...services];
    copy[i][key] = value;
    setServices(copy);
  };

  const addBlock = (i, type) => {
    const copy = [...services];

    if (!copy[i].blocks) copy[i].blocks = [];

    copy[i].blocks = [
      ...copy[i].blocks,
      type === "list"
        ? { type, items: [""] }
        : { type, value: "" }
    ];

    setServices(copy);
  };


  const saveService = async (service) => {
    await fetch("/api/admin/services", {
      method: service._id ? "PUT" : "POST",
      body: JSON.stringify(service),
    });
    alert("Saved");
  };

  const deleteService = async (id) => {
    await fetch("/api/admin/services", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setServices(services.filter((s) => s._id !== id));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Services Manager</h2>

      <button className="btn btn-primary mb-4" onClick={addService}>
        + Add Service
      </button>

      {services.map((s, i) => (
        <div className="card mb-4" key={i}>
          <div className="card-body">
            <input
              className="form-control mb-2"
              placeholder="Service Tab Name"
              value={s.name}
              onChange={(e) =>
                updateService(i, "name", e.target.value)
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Heading"
              value={s.heading}
              onChange={(e) =>
                updateService(i, "heading", e.target.value)
              }
            />

            <textarea
              className="form-control mb-3"
              placeholder="Sub Heading"
              value={s.subHeading}
              onChange={(e) =>
                updateService(i, "subHeading", e.target.value)
              }
            />

            <div className="mb-3">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => addBlock(i, "heading")}
              >
                + Heading
              </button>
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => addBlock(i, "paragraph")}
              >
                + Paragraph
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => addBlock(i, "image")}
              >
                + Image
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => addBlock(i, "list")}
              >
                + List
              </button>

            </div>
            {s.blocks?.map((block, bi) => (
              <div key={bi} className="mb-2">
                {block.type === "heading" && (
                  <input
                    className="form-control"
                    placeholder="Heading text"
                    value={block.value}
                    onChange={(e) => {
                      const copy = [...services];
                      copy[i].blocks[bi].value = e.target.value;
                      setServices(copy);
                    }}
                  />
                )}

                {block.type === "paragraph" && (
                  <textarea
                    className="form-control"
                    placeholder="Paragraph text"
                    value={block.value}
                    onChange={(e) => {
                      const copy = [...services];
                      copy[i].blocks[bi].value = e.target.value;
                      setServices(copy);
                    }}
                  />
                )}

                {block.type === "image" && (
                  <input
                    className="form-control"
                    placeholder="Image URL"
                    value={block.value}
                    onChange={(e) => {
                      const copy = [...services];
                      copy[i].blocks[bi].value = e.target.value;
                      setServices(copy);
                    }}
                  />
                )}
                {block.type === "list" && (
                  <div className="border rounded p-3 bg-light">
                    <strong className="d-block mb-2">Unordered List</strong>

                    {(block.items || []).map((item, li) => (
                      <div key={li} className="input-group mb-2">
                        <span className="input-group-text fw-bold">•</span>

                        <input
                          className="form-control"
                          placeholder="List item"
                          value={item}
                          onChange={(e) => {
                            const copy = [...services];
                            copy[i].blocks[bi].items[li] = e.target.value;
                            setServices(copy);
                          }}
                        />

                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            const copy = [...services];
                            copy[i].blocks[bi].items.splice(li, 1);
                            setServices(copy);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        const copy = [...services];
                        copy[i].blocks[bi].items.push("");
                        setServices(copy);
                      }}
                    >
                      + Add Item
                    </button>
                  </div>
                )}

              </div>
            ))}


            <input
              className="form-control mb-2"
              placeholder="Button Text"
              value={s.button?.text || ""}
              onChange={(e) =>
                updateService(i, "button", {
                  ...s.button,
                  text: e.target.value,
                })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Button Slug"
              value={s.button?.slug || ""}
              onChange={(e) =>
                updateService(i, "button", {
                  ...s.button,
                  slug: e.target.value,
                })
              }
            />

            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => saveService(s)}
              >
                Save
              </button>
              {s._id && (
                <button
                  className="btn btn-danger"
                  onClick={() => deleteService(s._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
