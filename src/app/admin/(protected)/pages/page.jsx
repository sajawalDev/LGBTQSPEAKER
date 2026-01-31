"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPagesList() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPages() {
            try {
                const res = await fetch("/api/admin/pages", { cache: "no-store" });
                const data = await res.json();
                setPages(data);
            } catch (err) {
                console.error("Failed to fetch pages", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPages();
    }, []);

    async function handleDelete(slug) {
        if (!confirm("Are you sure you want to delete this page?")) return;

        await fetch(`/api/admin/pages/${slug}`, {
            method: "DELETE",
        });
        setPages((prev) => prev.filter((p) => p.slug !== slug));
    }

    if (loading) return <p>Loading pages...</p>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Pages</h2>
                <Link href="/admin/pages/new" className="btn btn-primary">
                    + New Page
                </Link>
            </div>

            <table className="table table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Page Name</th>
                        <th>Slug</th>
                        <th style={{ width: 220 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page) => (
                        <tr key={page._id}>
                            <td>{page.title}</td>
                            <td>/{page.slug}</td>
                            <td className="d-flex gap-2">
                                <Link
                                    href={`/admin/pages/${page.slug}`}
                                    className="btn btn-sm btn-warning"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(page.slug)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
