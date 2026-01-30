"use client"; // <- add this at the top

import PageSectionsEditor from "@/components/PageSectionsEditor";

export default function PageEditor({ params }) {
  const { slug } = params;

  // Ensure this is always an array
  const initialSections = [
    { type: "Carousel", slides: [{ image: "", title: "", description: "", buttonText: "" }] },
    // You can add other sections here if needed
  ];

  return (
    <div className="container mt-4">
      <h2>Edit Page: {slug}</h2>
      <PageSectionsEditor initialSections={initialSections || []} />
    </div>
  );
}
