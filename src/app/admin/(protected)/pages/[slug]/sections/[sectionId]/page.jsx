"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BannerSectionEditor from "@/components/section-editors/BannerEditor";
import WhoAmISectionEditor from "@/components/section-editors/WhoIamEditor";
import ServicesEditor from "@/components/section-editors/ServicesEditor";
import ReviewsEditor from "@/components/section-editors/ReviewsEditor";
export default function SectionEditorPage() {
  const { slug, sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSection() {
      const res = await fetch(`/api/admin/pages/${slug}/sections/${sectionId}`);
      const data = await res.json();
      setSection(data);
      setLoading(false);
    }
    loadSection();
  }, [slug, sectionId]);

  if (loading) return <p>Loading section...</p>;
  if (!section) return <p>Section not found</p>;

  // 🔑 SWITCH BASED ON SECTION TYPE
  switch (section.type) {
    case "hero":
    case "carousel":
      return <BannerSectionEditor section={section} />;

    case "Who I Am":
      return <WhoAmISectionEditor section={section} />;

    case "Services":
      return <ServicesEditor section={section}/>  ;
    case "Reviews":
      return <ReviewsEditor section={section}/>
    default:
      return <p>Unknown section type: {section.type}</p>;
  }
}
