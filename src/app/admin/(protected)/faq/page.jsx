'use client';

import { useState, useEffect } from "react";
import axios from "axios";

export default function FAQEditor() {
  const [faqId, setFaqId] = useState(null);
  const [sectionHeading, setSectionHeading] = useState("");
  const [sectionSubHeading, setSectionSubHeading] = useState("");
  const [sectionParagraph, setSectionParagraph] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Track which QA is being edited

  // Load latest FAQ section on mount
  useEffect(() => {
    async function loadFAQs() {
      try {
        const res = await axios.get("/api/admin/faqs");
        if (res.data.length) {
          const latest = res.data[0];
          setFaqId(latest._id);
          setSectionHeading(latest.sectionHeading);
          setSectionSubHeading(latest.sectionSubHeading);
          setSectionParagraph(latest.sectionParagraph);
          setFaqs(latest.questions);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to load FAQs");
      }
    }
    loadFAQs();
  }, []);

  // Add or Save QA
  const handleQA = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    if (editingIndex !== null) {
      // Save edits for existing QA
      const updatedFaqs = [...faqs];
      updatedFaqs[editingIndex] = { question: newQuestion, answer: newAnswer };
      setFaqs(updatedFaqs);

      // Optional: update backend via PUT
      try {
        await axios.put("/api/admin/faqs", {
          faqId,
          questionIndex: editingIndex,
          question: newQuestion,
          answer: newAnswer,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to update QA");
      }

      setEditingIndex(null); // reset edit mode
    } else {
      // Add new QA
      setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
    }

    setNewQuestion("");
    setNewAnswer("");
  };

  // Delete a QA
  const deleteQA = async (index) => {
    if (!faqId) return;

    try {
      await axios.delete("/api/admin/faqs", {
        data: { faqId, questionIndex: index },
      });
      setFaqs(faqs.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
      alert("Failed to delete question");
    }
  };

  // Edit a QA
  const editQA = (index) => {
    setNewQuestion(faqs[index].question);
    setNewAnswer(faqs[index].answer);
    setEditingIndex(index);
  };

  // Save all FAQs (section info)
  const saveFAQs = async () => {
    try {
      const payload = {
        sectionHeading,
        sectionSubHeading,
        sectionParagraph,
        faqs,
      };
      await axios.post("/api/admin/faqs", payload);
      alert("FAQs saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save FAQs");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">FAQ Admin Panel</h2>

      {/* Section Info */}
      <div className="mb-3">
        <label className="form-label">Section Heading</label>
        <input
          type="text"
          className="form-control"
          value={sectionHeading}
          onChange={(e) => setSectionHeading(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Section Subheading</label>
        <input
          type="text"
          className="form-control"
          value={sectionSubHeading}
          onChange={(e) => setSectionSubHeading(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Section Paragraph</label>
        <textarea
          className="form-control"
          rows="3"
          value={sectionParagraph}
          onChange={(e) => setSectionParagraph(e.target.value)}
        />
      </div>

      <hr />

      {/* Add / Edit QA */}
      <h4>{editingIndex !== null ? "Edit Question & Answer" : "Add New Question & Answer"}</h4>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Question"
          className="form-control mb-2"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <textarea
          placeholder="Answer"
          className="form-control mb-2"
          rows="3"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleQA}>
          {editingIndex !== null ? "Save Edit" : "Add QA"}
        </button>
      </div>

      <hr />

      {/* Existing Questions */}
      <h4>Existing Questions</h4>
      {faqs.length === 0 && <p>No questions yet.</p>}
      {faqs.map((qa, idx) => (
        <div
          key={idx}
          className="border p-3 mb-2 rounded d-flex justify-content-between align-items-start"
        >
          <div>
            <strong>Q:</strong> {qa.question} <br />
            <strong>A:</strong> {qa.answer}
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => editQA(idx)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteQA(idx)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <button className="btn btn-success mt-3" onClick={saveFAQs}>
        Save All Section
      </button>
    </div>
  );
}
