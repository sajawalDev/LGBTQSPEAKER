// "use client";

// import { useEffect, useState } from "react";

// export default function BlogEditor() {
//   const [blog, setBlog] = useState({
//     title: "",
//     author: "Shannon Whittington",
//     publishedAt: "",
//     coverImage: "",
//     coverImagePublicId: "",
//     blocks: [],
//   });

//   const [uploading, setUploading] = useState(false);

//   /* ================= FETCH EXISTING BLOG ================= */
//   useEffect(() => {
//     fetch("/api/blog")
//       .then(res => res.json())
//       .then(data => {
//         if (data) setBlog(data);
//       });
//   }, []);

//   /* ================= IMAGE UPLOAD / REPLACE ================= */
//   const handleImageUpload = async (file) => {
//     if (!file) return;

//     setUploading(true);

//     // If image already exists → delete first
//     if (blog.coverImagePublicId) {
//       await fetch("/api/upload", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           publicId: blog.coverImagePublicId,
//         }),
//       });
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     setBlog(prev => ({
//       ...prev,
//       coverImage: data.url,
//       coverImagePublicId: data.publicId,
//     }));

//     setUploading(false);
//   };

//   /* ================= IMAGE DELETE ================= */
//   const deleteImage = async () => {
//     if (!blog.coverImagePublicId) return;

//     await fetch("/api/upload", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         publicId: blog.coverImagePublicId,
//       }),
//     });

//     setBlog(prev => ({
//       ...prev,
//       coverImage: "",
//       coverImagePublicId: "",
//     }));
//   };

//   /* ================= CONTENT BLOCKS ================= */
//   const addBlock = (type) => {
//     setBlog(prev => ({
//       ...prev,
//       blocks: [...prev.blocks, { type, value: "" }],
//     }));
//   };

//   const updateBlock = (index, value) => {
//     const updated = [...blog.blocks];
//     updated[index].value = value;
//     setBlog({ ...blog, blocks: updated });
//   };

//   const removeBlock = (index) => {
//     const updated = blog.blocks.filter((_, i) => i !== index);
//     setBlog({ ...blog, blocks: updated });
//   };

//   /* ================= SAVE BLOG ================= */
//   const saveBlog = async () => {
//     await fetch("/api/blog", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(blog),
//     });

//     alert("Blog saved successfully ✅");
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Blog Editor</h2>

//       {/* TITLE */}
//       <input
//         className="form-control mb-3"
//         placeholder="Blog Title"
//         value={blog.title}
//         onChange={e => setBlog({ ...blog, title: e.target.value })}
//       />

//       {/* DATE */}
//       <input
//         type="date"
//         className="form-control mb-3"
//         value={blog.publishedAt?.slice(0, 10)}
//         onChange={e =>
//           setBlog({ ...blog, publishedAt: e.target.value })
//         }
//       />

//       {/* COVER IMAGE */}
//       <label className="form-label">Cover Image</label>

//       <input
//         type="file"
//         className="form-control mb-3"
//         onChange={e => handleImageUpload(e.target.files[0])}
//       />

//       {uploading && <p>Uploading image...</p>}

//       {blog.coverImage && (
//         <div className="mb-4">
//           <img
//             src={blog.coverImage}
//             className="img-fluid rounded mb-2"
//             style={{ maxHeight: 250 }}
//           />
//           <br />
//           <button
//             className="btn btn-sm btn-danger"
//             onClick={deleteImage}
//           >
//             Delete Image
//           </button>
//         </div>
//       )}


//       {/* CONTENT BLOCKS */}
//       <h5 className="mb-3">Blog Content</h5>

//       {blog.blocks.map((block, i) => (
//         <div key={i} className="mb-3">
//           <textarea
//             className="form-control mb-2"
//             rows={block.type === "heading" ? 2 : 4}
//             placeholder={
//               block.type === "heading" ? "Heading" : "Paragraph"
//             }
//             value={block.value}
//             onChange={e => updateBlock(i, e.target.value)}
//           />
//           <button
//             className="btn btn-sm btn-outline-danger"
//             onClick={() => removeBlock(i)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <div className="mb-4">
//         <button
//           className="btn btn-outline-secondary me-2"
//           onClick={() => addBlock("heading")}
//         >
//           + Heading
//         </button>
//         <button
//           className="btn btn-outline-secondary"
//           onClick={() => addBlock("paragraph")}
//         >
//           + Paragraph
//         </button>
//       </div>

//       {/* SAVE */}
//       <button className="btn btn-primary" onClick={saveBlog}>
//         Save Blog
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function BlogEditor() {
  const [blog, setBlog] = useState({
    slug: "main-blog",
    title: "",
    author: "Shannon Whittington",
    publishedAt: "",
    coverImage: "",
    coverImagePublicId: "",
    intro: "",
    blocks: [],
    tags: [],
  });

  const [uploading, setUploading] = useState(false);

  /* FETCH BLOG */
  useEffect(() => {
    fetch("/api/blog/")
      .then(res => res.json())
      .then(data => data && setBlog(data));
  }, []);

  /* IMAGE UPLOAD */
  const handleImageUpload = async file => {
    if (!file) return;
    setUploading(true);

    

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setBlog(prev => ({
      ...prev,
      coverImage: data.url,
      coverImagePublicId: data.publicId,
    }));

    setUploading(false);
  };

    const deleteImage = async () => {
  if (!blog.coverImagePublicId) return;

  await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      publicId: blog.coverImagePublicId,
    }),
  });

  const updatedBlog = {
    ...blog,
    coverImage: "",
    coverImagePublicId: "",
  };

  setBlog(updatedBlog);

  // 🔥 SAVE TO DB
  await fetch("/api/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBlog),
  });
};


  /* BLOCKS */
  const addBlock = type => {
    setBlog(prev => ({
      ...prev,
      blocks: [...prev.blocks, { type, value: "", bold: false }],
    }));
  };

  const updateBlock = (i, key, value) => {
    const updated = [...blog.blocks];
    updated[i][key] = value;
    setBlog({ ...blog, blocks: updated });
  };

  const removeBlock = async (i) => {
  const updatedBlog = {
    ...blog,
    blocks: blog.blocks.filter((_, index) => index !== i),
  };

  setBlog(updatedBlog);

  // 🔥 SAVE TO DB
  await fetch("/api/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBlog),
  });
};


  /* SAVE */
  const saveBlog = async () => {
    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });

    alert("Blog saved ✅");
  };

  return (
    <div className="container mt-4">
      <h2>Blog Editor</h2>

      <input
        className="form-control mb-3"
        placeholder="Title"
        value={blog.title}
        onChange={e => setBlog({ ...blog, title: e.target.value })}
      />

      <input
        type="date"
        className="form-control mb-3"
        value={blog.publishedAt?.slice(0, 10)}
        onChange={e =>
          setBlog({ ...blog, publishedAt: e.target.value })
        }
      />

     <label className="form-label">Cover Image</label>

      <input
        type="file"
        className="form-control mb-3"
        onChange={e => handleImageUpload(e.target.files[0])}
      />

      {uploading && <p>Uploading image...</p>}

      {blog.coverImage && (
        <div className="mb-4">
          <img
            src={blog.coverImage}
            className="img-fluid rounded mb-2"
            style={{ maxHeight: 250 }}
          />
          <br />
          <button
            className="btn btn-sm btn-danger"
            onClick={deleteImage}
          >
            Delete Image
          </button>
        </div>
      )}


      
      <textarea
        className="form-control mb-4"
        rows={4}
        placeholder="Intro paragraph"
        value={blog.intro}
        onChange={e => setBlog({ ...blog, intro: e.target.value })}
      />

      {/* BLOCKS */}
      {blog.blocks.map((block, i) => (
        <div key={i} className="border p-3 mb-3 rounded">
          <textarea
            className="form-control mb-2"
            rows={block.type === "heading" ? 2 : 4}
            placeholder={block.type}
            value={block.value}
            onChange={e => updateBlock(i, "value", e.target.value)}
          />

          {block.type === "paragraph" && (
            <label>
              <input
                type="checkbox"
                checked={block.bold}
                onChange={e =>
                  updateBlock(i, "bold", e.target.checked)
                }
              />{" "}
              Bold
            </label>
          )}

          <button
            className="btn btn-sm btn-danger mt-2"
            onClick={() => removeBlock(i)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        className="btn btn-outline-secondary me-2"
        onClick={() => addBlock("heading")}
      >
        + Heading
      </button>

      <button
        className="btn btn-outline-secondary"
        onClick={() => addBlock("paragraph")}
      >
        + Paragraph
      </button>

      <br />
      <br />

      <button className="btn btn-primary" onClick={saveBlog}>
        Save Blog
      </button>
    </div>
  );
}
