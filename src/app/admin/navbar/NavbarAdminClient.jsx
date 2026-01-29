"use client";

import { useState } from "react";

export default function NavbarAdminPage({ initialNavbar }) {
    const [navbar, setNavbar] = useState(initialNavbar);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    /* ================= SAVE ================= */
    const saveNavbar = async () => {
        setSaving(true);
        await fetch("/api/navbar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(navbar),
        });
        setSaving(false);
        alert("Navbar updated successfully");
    };

    /* ================= MENU ================= */
    const addMenuItem = () => {
        setNavbar({
            ...navbar,
            menuItems: [
                ...navbar.menuItems,
                { label: "", href: "", order: navbar.menuItems.length + 1, isActive: true },
            ],
        });
    };

    const updateMenuItem = (index, field, value) => {
        const items = [...navbar.menuItems];
        items[index][field] = value;
        setNavbar({ ...navbar, menuItems: items });
    };

    const deleteMenuItem = (index) => {
        const items = navbar.menuItems.filter((_, i) => i !== index);
        setNavbar({ ...navbar, menuItems: items });
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload-logo", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setNavbar({ ...navbar, logo: { ...navbar.logo, url: data.url } });
            } else {
                alert("Upload failed: " + data.error);
            }
        } catch (err) {
            alert("Upload error: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 fw-bold mb-0">Navbar Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={saveNavbar}
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* LOGO */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header fw-semibold">Logo</div>
                <div className="card-body row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Upload Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleLogoUpload}
                        />
                        {uploading && <div className="mt-2">Uploading...</div>}
                        {navbar.logo?.url && (
                            <img src={navbar.logo.url} alt="Logo Preview" className="mt-2" style={{ maxWidth: "150px" }} />
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Alt Text</label>
                        <input
                            className="form-control"
                            value={navbar.logo?.alt || ""}
                            onChange={(e) =>
                                setNavbar({ ...navbar, logo: { ...navbar.logo, alt: e.target.value } })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* MENU ITEMS */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Menu Items</span>
                    <button className="btn btn-sm btn-outline-primary" onClick={addMenuItem}>
                        + Add Menu Item
                    </button>
                </div>

                <div className="card-body">
                    {navbar.menuItems.length === 0 && (
                        <p className="text-muted">No menu items added.</p>
                    )}

                    {navbar.menuItems.map((item, index) => (
                        <div key={index} className="row g-2 align-items-center mb-2">
                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="Label"
                                    value={item.label}
                                    onChange={(e) =>
                                        updateMenuItem(index, "label", e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="/path"
                                    value={item.href}
                                    onChange={(e) =>
                                        updateMenuItem(index, "href", e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={item.order}
                                    onChange={(e) =>
                                        updateMenuItem(index, "order", Number(e.target.value))
                                    }
                                />
                            </div>
                            <div className="col-md-2">
                                <select
                                    className="form-select"
                                    value={item.isActive ? "1" : "0"}
                                    onChange={(e) =>
                                        updateMenuItem(index, "isActive", e.target.value === "1")
                                    }
                                >
                                    <option value="1">Active</option>
                                    <option value="0">Hidden</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button
                                    className="btn btn-outline-danger btn-sm w-100"
                                    onClick={() => deleteMenuItem(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA BUTTON */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header fw-semibold">Navbar Button</div>
                <div className="card-body row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Button Text</label>
                        <input
                            className="form-control"
                            value={navbar.button?.text || ""}
                            onChange={(e) =>
                                setNavbar({
                                    ...navbar,
                                    button: { ...navbar.button, text: e.target.value },
                                })
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Button Link</label>
                        <input
                            className="form-control"
                            value={navbar.button?.href || ""}
                            onChange={(e) =>
                                setNavbar({
                                    ...navbar,
                                    button: { ...navbar.button, href: e.target.value },
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
