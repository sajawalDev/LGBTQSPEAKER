"use client";

import { useEffect, useState } from "react";

const EMPTY_STATE = {
    heading: "",
    subHeading: "",
    boldText: "",
    content: "",
    button: {
        label: "",
        slug: "",
    },
    cards: [
        { icon: "faHandshake", title: "", content: "" },
        { icon: "faShieldAlt", title: "", content: "" },
        { icon: "faGraduationCap", title: "", content: "" },
    ],
};

export default function WhyChooseUsEditor() {
    const [wcuData, setWcuData] = useState(EMPTY_STATE);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    /* ---------------- FETCH ---------------- */
    useEffect(() => {
        const fetchWcu = async () => {
            try {
                const res = await fetch("/api/admin/wcu");
                const section = await res.json();
                const data = section?.data || EMPTY_STATE;
                setWcuData(data);
            } catch (err) {
                console.error(err);
                setWcuData(EMPTY_STATE);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchWcu();
    }, []);


    /* ---------------- HANDLERS ---------------- */
    const updateField = (field, value) =>
        setWcuData((prev) => ({ ...prev, [field]: value }));

    const updateButton = (field, value) =>
        setWcuData((prev) => ({
            ...prev,
            button: { ...prev.button, [field]: value },
        }));

    const updateCard = (index, field, value) => {
        const updated = [...wcuData.cards];
        updated[index][field] = value;
        setWcuData({ ...wcuData, cards: updated });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await fetch("/api/admin/wcu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(wcuData),
            });
            alert("Why Choose Us section saved successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to save section");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete Why Choose Us section?")) return;
        await fetch("/api/admin/wcu", { method: "DELETE" });
        setWcuData(EMPTY_STATE);
    };

    if (initialLoading) return <p>Loading...</p>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Why Choose Us Editor</h2>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Section
                </button>
            </div>

            {/* Heading / Content */}
            <div className="card mb-3">
                <div className="card-body">
                    <input
                        className="form-control mb-2"
                        placeholder="Heading"
                        value={wcuData.heading}
                        onChange={(e) => updateField("heading", e.target.value)}
                    />
                    <input
                        className="form-control mb-2"
                        placeholder="Subheading"
                        value={wcuData.subHeading}
                        onChange={(e) => updateField("subHeading", e.target.value)}
                    />
                    <input
                        className="form-control mb-2"
                        placeholder="Bold Text"
                        value={wcuData.boldText}
                        onChange={(e) => updateField("boldText", e.target.value)}
                    />
                    <textarea
                        className="form-control mb-2"
                        placeholder="Content"
                        rows={3}
                        value={wcuData.content}
                        onChange={(e) => updateField("content", e.target.value)}
                    />
                    <input
                        className="form-control mb-2"
                        placeholder="Button Label"
                        value={wcuData.button.label}
                        onChange={(e) => updateButton("label", e.target.value)}
                    />
                    <input
                        className="form-control"
                        placeholder="Button Slug"
                        value={wcuData.button.slug}
                        onChange={(e) => updateButton("slug", e.target.value)}
                    />
                </div>
            </div>

            {/* Cards */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5>Cards</h5>
                    {wcuData.cards.map((card, i) => (
                        <div key={i} className="mb-3 border p-2 rounded">
                            <input
                                className="form-control mb-1"
                                placeholder="Card Title"
                                value={card.title}
                                onChange={(e) => updateCard(i, "title", e.target.value)}
                            />
                            <textarea
                                className="form-control mb-1"
                                placeholder="Card Content"
                                rows={2}
                                value={card.content}
                                onChange={(e) => updateCard(i, "content", e.target.value)}
                            />
                            <small className="text-muted">
                                Icon: <b>{card.icon}</b> (fixed)
                            </small>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSave}
            >
                {loading ? "Saving..." : "Save Why Choose Us"}
            </button>
        </div>
    );
}
