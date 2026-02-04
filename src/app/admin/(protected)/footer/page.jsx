// "use client";

// import { useState, useEffect } from "react";

// export default function FooterAdmin() {
//   const [footer, setFooter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [logoFile, setLogoFile] = useState(null);

//   // Fetch existing footer data
//   useEffect(() => {
//   const initFooter = async () => {
//     const res = await fetch("/api/admin/footer");
//     let data = await res.json();

//     if (!data) {
//       // No footer exists, create default one
//       const createRes = await fetch("/api/admin/footer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           description: "",
//           logoUrl: "",
//           logoPublicId: "",
//           sections: [],
//         }),
//       });
//       data = await createRes.json();
//     }

//     setFooter(data);
//   };

//   initFooter();
// }, []);


//   // Upload new logo
//   const handleLogoUpload = async () => {
//     if (!logoFile) return alert("Select a logo file first");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("logo", logoFile);

//     const res = await fetch("/api/admin/footer", {
//       method: "PUT",
//       body: formData,
//     });

//     const data = await res.json();
//     setFooter(data);
//     setLogoFile(null);
//     setLoading(false);
//   };

//   // Update description
//   const handleDescriptionUpdate = async (e) => {
//     const description = e.target.value;
//     setFooter({ ...footer, description });
//     await fetch("/api/admin/footer", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ description }),
//     });
//   };

//   // Add new section
//   const handleAddSection = () => {
//     const newSection = {
//       heading: "New Section",
//       type: "links",
//       items: [],
//       content: [],
//     };
//     const updatedSections = [...footer.sections, newSection];
//     setFooter({ ...footer, sections: updatedSections });
//     updateSections(updatedSections);
//   };

//   const updateSections = async (sections) => {
//     await fetch("/api/admin/footer", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ sections }),
//     });
//   };

//   const handleDeleteSection = (index) => {
//     if (!confirm("Delete this section?")) return;
//     const updatedSections = footer.sections.filter((_, i) => i !== index);
//     setFooter({ ...footer, sections: updatedSections });
//     updateSections(updatedSections);
//   };

//   const handleAddItem = (sectionIndex) => {
//     const updatedSections = [...footer.sections];
//     if (updatedSections[sectionIndex].type === "links") {
//       updatedSections[sectionIndex].items.push({ label: "New Item", slug: "" });
//     } else {
//       updatedSections[sectionIndex].content.push("New Contact Info");
//     }
//     setFooter({ ...footer, sections: updatedSections });
//     updateSections(updatedSections);
//   };

//   const handleUpdateItem = (sectionIndex, itemIndex, value, field = "label") => {
//     const updatedSections = [...footer.sections];
//     if (updatedSections[sectionIndex].type === "links") {
//       if (field === "heading") {
//         updatedSections[sectionIndex].heading = value;
//       } else if (itemIndex !== null) {
//         updatedSections[sectionIndex].items[itemIndex][field] = value;
//       }
//     } else {
//       if (itemIndex !== null) {
//         updatedSections[sectionIndex].content[itemIndex] = value;
//       }
//     }
//     setFooter({ ...footer, sections: updatedSections });
//     updateSections(updatedSections);
//   };

//   const handleDeleteItem = (sectionIndex, itemIndex) => {
//     if (!confirm("Delete this item?")) return;
//     const updatedSections = [...footer.sections];
//     if (updatedSections[sectionIndex].type === "links") {
//       updatedSections[sectionIndex].items.splice(itemIndex, 1);
//     } else {
//       updatedSections[sectionIndex].content.splice(itemIndex, 1);
//     }
//     setFooter({ ...footer, sections: updatedSections });
//     updateSections(updatedSections);
//   };

//   if (!footer) return <p className="text-center mt-5">Loading footer admin...</p>;

//   return (
//     <div className="container my-5">
//       <h1 className="text-center mb-4">Footer Admin Panel</h1>

//       {/* Logo */}
//       <div className="card mb-4 p-3">
//         <h2 className="h5">Logo</h2>
//         {footer.logoUrl && (
//           <img
//             src={footer.logoUrl}
//             alt="Footer Logo"
//             className="img-fluid mb-2"
//             style={{ maxHeight: "80px" }}
//           />
//         )}
//         <div className="d-flex align-items-center gap-2">
//           <input
//             type="file"
//             className="form-control"
//             onChange={(e) => setLogoFile(e.target.files[0])}
//           />
//           <button className="btn btn-primary" onClick={handleLogoUpload} disabled={loading}>
//             {loading ? "Uploading..." : "Upload / Replace Logo"}
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="card mb-4 p-3">
//         <h2 className="h5">Description</h2>
//         <textarea
//           className="form-control"
//           value={footer.description || ""}
//           onChange={handleDescriptionUpdate}
//           rows={3}
//         />
//       </div>

//       {/* Sections */}
//       <div className="card mb-4 p-3">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h2 className="h5">Sections</h2>
//           <button className="btn btn-success" onClick={handleAddSection}>
//             Add Section
//           </button>
//         </div>

//         {footer.sections.map((section, sIdx) => (
//           <div key={sIdx} className="card mb-3 p-3 border-secondary">
//             <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
//               <input
//                 type="text"
//                 className="form-control flex-grow-1"
//                 value={section.heading}
//                 placeholder="Section Heading"
//                 onChange={(e) => handleUpdateItem(sIdx, null, e.target.value, "heading")}
//               />
//               <select
//                 className="form-select w-auto"
//                 value={section.type}
//                 onChange={(e) => {
//                   const updatedSections = [...footer.sections];
//                   updatedSections[sIdx].type = e.target.value;
//                   setFooter({ ...footer, sections: updatedSections });
//                   updateSections(updatedSections);
//                 }}
//               >
//                 <option value="links">Links</option>
//                 <option value="contact">Contact</option>
//               </select>
//               <button className="btn btn-danger" onClick={() => handleDeleteSection(sIdx)}>
//                 Delete Section
//               </button>
//             </div>

//             {/* Items */}
//             <div className="ms-3">
//               {section.type === "links" &&
//                 section.items.map((item, iIdx) => (
//                   <div key={iIdx} className="d-flex gap-2 mb-2 align-items-center flex-wrap">
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={item.label}
//                       placeholder="Label"
//                       onChange={(e) => handleUpdateItem(sIdx, iIdx, e.target.value, "label")}
//                     />
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={item.slug}
//                       placeholder="Slug / URL"
//                       onChange={(e) => handleUpdateItem(sIdx, iIdx, e.target.value, "slug")}
//                     />
//                     <button className="btn btn-outline-danger" onClick={() => handleDeleteItem(sIdx, iIdx)}>
//                       Delete Item
//                     </button>
//                   </div>
//                 ))}

//               {section.type === "contact" &&
//                 section.content.map((content, iIdx) => (
//                   <div key={iIdx} className="d-flex gap-2 mb-2 align-items-center flex-wrap">
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={content}
//                       placeholder="Contact Info"
//                       onChange={(e) => handleUpdateItem(sIdx, iIdx, e.target.value)}
//                     />
//                     <button className="btn btn-outline-danger" onClick={() => handleDeleteItem(sIdx, iIdx)}>
//                       Delete Item
//                     </button>
//                   </div>
//                 ))}

//               <button className="btn btn-secondary btn-sm mt-1" onClick={() => handleAddItem(sIdx)}>
//                 Add Item
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";

export default function FooterAdmin() {
  const [footer, setFooter] = useState(null);       // saved footer
  const [localFooter, setLocalFooter] = useState(null); // unsaved changes
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize footer from DB or create default
  useEffect(() => {
    const initFooter = async () => {
      const res = await fetch("/api/admin/footer");
      let data = await res.json();

      if (!data) {
        // No footer exists, create default one
        const createRes = await fetch("/api/admin/footer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: "",
            logoUrl: "",
            logoPublicId: "",
            sections: [],
          }),
        });
        data = await createRes.json();
      }

      setFooter(data);
      setLocalFooter(data); // start with a copy for editing
    };

    initFooter();
  }, []);

  // Upload logo immediately
  const handleLogoUpload = async () => {
    if (!logoFile) return alert("Select a logo file first");
    setLoading(true);

    const formData = new FormData();
    formData.append("logo", logoFile);

    const res = await fetch("/api/admin/footer", {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    setFooter(data);
    setLocalFooter(data);
    setLogoFile(null);
    setLoading(false);
  };

  // Local edits only
  const handleLocalChange = (callback) => setLocalFooter(callback(localFooter));

  // Save all changes to DB
  const handleSaveAll = async () => {
    if (!localFooter) return;
    setLoading(true);

    const res = await fetch("/api/admin/footer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: localFooter.description,
        sections: localFooter.sections,
      }),
    });

    const data = await res.json();
    setFooter(data);
    setLocalFooter(data);
    setLoading(false);
    alert("Footer updated successfully!");
  };

  if (!footer || !localFooter) return <p className="text-center mt-5">Loading footer admin...</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Footer Admin Panel</h1>

      {/* Logo */}
      <div className="card mb-4 p-3">
        <h2 className="h5">Logo</h2>
        {footer.logoUrl && (
          <img
            src={footer.logoUrl}
            alt="Footer Logo"
            className=" mb-2"
            style={{ maxWidth: "80px" }}
          />
        )}
        <div className="d-flex align-items-center gap-2">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setLogoFile(e.target.files[0])}
          />
          <button
            className="btn btn-primary"
            onClick={handleLogoUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload / Replace Logo"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="card mb-4 p-3">
        <h2 className="h5">Description</h2>
        <textarea
          className="form-control"
          value={localFooter.description || ""}
          onChange={(e) =>
            handleLocalChange(prev => ({ ...prev, description: e.target.value }))
          }
          rows={3}
        />
      </div>

      {/* Sections */}
      <div className="card mb-4 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5">Sections</h2>
          <button
            className="btn btn-success"
            onClick={() =>
              handleLocalChange(prev => ({
                ...prev,
                sections: [
                  ...prev.sections,
                  { heading: "New Section", type: "links", items: [], content: [] },
                ],
              }))
            }
          >
            Add Section
          </button>
        </div>

        {localFooter.sections.map((section, sIdx) => (
          <div key={sIdx} className="card mb-3 p-3 border-secondary">
            <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
              <input
                type="text"
                className="form-control flex-grow-1"
                value={section.heading}
                placeholder="Section Heading"
                onChange={(e) =>
                  handleLocalChange(prev => {
                    const newSections = [...prev.sections];
                    newSections[sIdx].heading = e.target.value;
                    return { ...prev, sections: newSections };
                  })
                }
              />
              <select
                className="form-select w-auto"
                value={section.type}
                onChange={(e) =>
                  handleLocalChange(prev => {
                    const newSections = [...prev.sections];
                    newSections[sIdx].type = e.target.value;
                    return { ...prev, sections: newSections };
                  })
                }
              >
                <option value="links">Links</option>
                <option value="contact">Contact</option>
              </select>
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleLocalChange(prev => {
                    const newSections = [...prev.sections];
                    newSections.splice(sIdx, 1);
                    return { ...prev, sections: newSections };
                  })
                }
              >
                Delete Section
              </button>
            </div>

            {/* Items */}
            <div className="ms-3">
              {section.type === "links" &&
                section.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="d-flex gap-2 mb-2 align-items-center flex-wrap"
                  >
                    <input
                      type="text"
                      className="form-control"
                      value={item.label}
                      placeholder="Label"
                      onChange={(e) =>
                        handleLocalChange(prev => {
                          const newSections = [...prev.sections];
                          newSections[sIdx].items[iIdx].label = e.target.value;
                          return { ...prev, sections: newSections };
                        })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      value={item.slug}
                      placeholder="Slug / URL"
                      onChange={(e) =>
                        handleLocalChange(prev => {
                          const newSections = [...prev.sections];
                          newSections[sIdx].items[iIdx].slug = e.target.value;
                          return { ...prev, sections: newSections };
                        })
                      }
                    />
                  </div>
                ))}

              {section.type === "contact" &&
                section.content.map((content, iIdx) => (
                  <div
                    key={iIdx}
                    className="d-flex gap-2 mb-2 align-items-center flex-wrap"
                  >
                    <input
                      type="text"
                      className="form-control"
                      value={content}
                      placeholder="Contact Info"
                      onChange={(e) =>
                        handleLocalChange(prev => {
                          const newSections = [...prev.sections];
                          newSections[sIdx].content[iIdx] = e.target.value;
                          return { ...prev, sections: newSections };
                        })
                      }
                    />
                  </div>
                ))}

              <button
                className="btn btn-secondary btn-sm mt-1"
                onClick={() =>
                  handleLocalChange(prev => {
                    const newSections = [...prev.sections];
                    if (section.type === "links") {
                      newSections[sIdx].items.push({ label: "New Item", slug: "" });
                    } else {
                      newSections[sIdx].content.push("New Contact Info");
                    }
                    return { ...prev, sections: newSections };
                  })
                }
              >
                Add Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save All Changes */}
      <div className="text-center mb-5">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSaveAll}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
