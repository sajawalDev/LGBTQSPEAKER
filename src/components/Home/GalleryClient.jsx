// "use client";

// import { useState, useEffect } from "react";
// import Styles from "@/styles/Gallery.module.css";


// export default function GallerySection() {
//   const images = [
//     "/Gallery/img1.jpg",
//     "/Gallery/img2.jpg",
//     "/Gallery/img3.jpg",
//     "/Gallery/img4.jpg",
//     "/Gallery/img5.jpg",
//     "/Gallery/img6.jpg",
//     "/Gallery/img7.jpg",
//     "/Gallery/img8.jpg",
//     "/Gallery/img9.jpg",
//     "/Gallery/img10.jpg",
//     "/Gallery/img11.jpg",
//     "/Gallery/img12.jpg",
//     "/Gallery/img13.jpg",
//     "/Gallery/img14.jpg",
//     "/Gallery/img15.jpg",

//   ];

//   const [visibleImages, setVisibleImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Animate images when component is scrolled into view
//   useEffect(() => {
//     const handleScroll = () => {
//       const galleryEl = document.getElementById("gallery-section");
//       if (!galleryEl) return; // <-- SAFETY CHECK

//       const galleryTop = galleryEl.getBoundingClientRect().top;
//       const windowHeight = window.innerHeight;

//       if (galleryTop < windowHeight - 100) {
//         setVisibleImages(images);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <section id="gallery-section" className={Styles.Gallery}>
//         <div className={Styles.GalleryHeading}>
//           <h5>MISC GALLERY</h5>
//           <h2>Gallery</h2>
//           <p>
//             Explore our gallery to witness the beauty of diversity, inclusion, and our journey.
//             These images reflect the heart and soul of our work.
//           </p>
//         </div>

//         <div className={Styles.GalleryImages}>
//           {images.map((img, index) => {
//             // Determine the pattern: square or tall
//             const patternIndex = index % 7; // repeat every 7 images
//             let isTall = false;

//             // 2nd and 5th images in 7-image block are tall
//             if (patternIndex === 1 || patternIndex === 4) isTall = true;

//             return (
//               <div
//                 key={index}
//                 className={`${Styles.GalleryItem} ${visibleImages.includes(img) ? Styles.show : ""} ${isTall ? Styles.tall : ""}`}
//                 onClick={() => setSelectedImage(img)}
//               >
//                 <img src={img} alt={`Gallery ${index + 1}`} />
//               </div>
//             );
//           })}
//         </div>


//         {selectedImage && (
//           <div className={Styles.ImageOverlay} onClick={() => setSelectedImage(null)}>
//             <img src={selectedImage} alt="Selected" className={Styles.CenteredImage} />
//           </div>
//         )}

//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Styles from "@/styles/Gallery.module.css";

export default function GalleryClient({ gallery }) {
  const [visibleImages, setVisibleImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Animate images on scroll
  useEffect(() => {
    const handleScroll = () => {
      const galleryEl = document.getElementById("gallery-section");
      if (!galleryEl) return;

      const galleryTop = galleryEl.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (galleryTop < windowHeight - 100) {
        setVisibleImages(gallery.images.map(img => img._id));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [gallery.images]);

  if (!gallery) return null;

  return (
    <section id="gallery-section" className={Styles.Gallery}>
      {/* Section Heading */}
      <div className={Styles.GalleryHeading}>
        <h5>{gallery.sectionSubHeading}</h5>
        <h2>{gallery.sectionHeading}</h2>
        <p>{gallery.sectionParagraph}</p>
      </div>

      {/* Masonry Images */}
      <div className={Styles.GalleryImages}>
        {gallery.images.map((img, index) => {
          // Tall pattern: 2nd and 5th image in 7-image block
          const patternIndex = index % 7;
          const isTall = patternIndex === 1 || patternIndex === 4;

          return (
            <div
              key={img._id}
              className={`${Styles.GalleryItem} ${
                visibleImages.includes(img._id) ? Styles.show : ""
              } ${isTall ? Styles.tall : ""}`}
              onClick={() => setSelectedImage(img.imageUrl)}
            >
              <img src={img.imageUrl} alt={`Gallery ${index + 1}`} />
            </div>
          );
        })}
      </div>

      {/* Image Overlay */}
      {selectedImage && (
        <div
          className={Styles.ImageOverlay}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className={Styles.CenteredImage}
          />
        </div>
      )}
    </section>
  );
}
