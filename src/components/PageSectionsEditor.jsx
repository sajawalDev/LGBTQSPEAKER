"use client";
import { useState } from "react";

export default function PageSectionsEditor({ initialSections }) {
  const [sections, setSections] = useState(initialSections || []);

  // Function to add a new section
  const addSection = (type) => {
    let newSection;
    if (type === "Carousel") {
      newSection = {
        type: "Carousel",
        slides: [
          { image: "", title: "", description: "", buttonText: "" },
        ],
      };
    }
    // You can add other section types here later
    setSections([...sections, newSection]);
  };

  // Function to add a new slide to a carousel
  const addSlide = (index) => {
    const newSections = [...sections];
    newSections[index].slides.push({ image: "", title: "", description: "", buttonText: "" });
    setSections(newSections);
  };

  // Function to update a slide
  const updateSlide = (sectionIndex, slideIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].slides[slideIndex][field] = value;
    setSections(newSections);
  };

  // Function to remove a slide
  const removeSlide = (sectionIndex, slideIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].slides.splice(slideIndex, 1);
    setSections(newSections);
  };

  return (
    <div>
      <div className="mb-4">
        <button
          className="btn btn-primary"
          onClick={() => addSection("Carousel")}
        >
          Add Carousel
        </button>
      </div>

      {sections.map((section, sIdx) => (
        <div key={sIdx} className="mb-4 p-3 border">
          <h4>{section.type} Section</h4>

          {section.type === "Carousel" && (
            <div>
              {section.slides.map((slide, idx) => (
                <div key={idx} className="mb-3 p-2 border bg-light">
                  <h5>Slide {idx + 1}</h5>
                  <div className="mb-2">
                    <label>Image URL:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={slide.image}
                      onChange={(e) =>
                        updateSlide(sIdx, idx, "image", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label>Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={slide.title}
                      onChange={(e) =>
                        updateSlide(sIdx, idx, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label>Description:</label>
                    <textarea
                      className="form-control"
                      value={slide.description}
                      onChange={(e) =>
                        updateSlide(sIdx, idx, "description", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label>Button Text:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={slide.buttonText}
                      onChange={(e) =>
                        updateSlide(sIdx, idx, "buttonText", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeSlide(sIdx, idx)}
                  >
                    Remove Slide
                  </button>
                </div>
              ))}
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => addSlide(sIdx)}
              >
                Add Slide
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="mt-4">
        <button
          className="btn btn-success"
          onClick={() => console.log("Sections to save:", sections)}
        >
          Save Sections
        </button>
      </div>
    </div>
  );
}
