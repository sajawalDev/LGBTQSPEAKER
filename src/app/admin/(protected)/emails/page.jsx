"use client";

import { useState ,useEffect} from "react";
import Styles from "@/styles/adminEmails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function AdminEmailsPage() {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaSlug, setCtaSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSend = async () => {
    if (!heading || !content) {
      alert("Heading and Content are required!");
      return;
    }

    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/send-announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heading, content, ctaText, ctaSlug }),
      });

      if (res.ok) {
        setSuccessMsg("Announcement sent to all subscribers successfully!");
        setHeading("");
        setContent("");
        setCtaText("");
        setCtaSlug("");
      } else {
        alert("Failed to send announcement. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending announcement.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (!successMsg) return;

  const timer = setTimeout(() => {
    setSuccessMsg("");
  }, 5000); // 5 seconds

  return () => clearTimeout(timer);
}, [successMsg]);


  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Send Announcement</h1>

      <div className={Styles.formGroup}>
        <label>Heading</label>
        <input
          type="text"
          placeholder="Enter heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>

      <div className={Styles.formGroup}>
        <label>Content</label>
        <textarea
          placeholder="Enter announcement content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={Styles.formGroup}>
        <label>CTA Button Text (optional)</label>
        <input
          type="text"
          placeholder="Button text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
        />
      </div>

      <div className={Styles.formGroup}>
        <label>CTA Slug / URL (optional)</label>
        <input
          type="text"
          placeholder="https://example.com/page"
          value={ctaSlug}
          onChange={(e) => setCtaSlug(e.target.value)}
        />
      </div>

      <button className={Styles.sendButton} onClick={handleSend} disabled={loading}>
        {loading ? (
          <span className={Styles.spinner}></span>
        ) : (
          <>
            <FontAwesomeIcon icon={faPaperPlane} /> Send
          </>
        )}
      </button>

      {successMsg && <div className={Styles.successPopup}>{successMsg}</div>}
    </div>
  );
}
