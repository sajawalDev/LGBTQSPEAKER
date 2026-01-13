"use client";

import Styles from "@/styles/Images.module.css";
import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/img1.png",
  "/images/img2.png",
  "/images/img3.png",
  "/images/img4.jpeg",
  "/images/img5.png",
  "/images/img6.png",
  "/images/img7.png",
  "/images/img8.png",
  "/images/img9.png",
  "/images/img10.jpg",
  "/images/img11.png",
  // "/images/img12.png",
  "/images/img13.jpg",
  "/images/img14.jpg",
  "/images/img15.png",
  "/images/img16.png",
  "/images/img17.png",
  "/images/img18.png",
  "/images/img19.png",
  "/images/img20.png",
  "/images/img21.png",
  "/images/img22.jpg",
  "/images/img23.jpg",
  "/images/img24.png",
  "/images/img25.png",
  "/images/img26.jpg",
  "/images/img27.png",
  "/images/img28.png",
  "/images/img29.jpg",
  "/images/img30.webp",
  "/images/img31.png",
  "/images/img32.png",
  "/images/img33.png",
  "/images/img34.png",
  "/images/img35.png",
  "/images/img36.png",
];

export default function ImagesSection() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <>
      <div
        className={`${Styles.imagesContainer} ${selectedImg ? Styles.blurBackground : ""
          }`}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={Styles.imageWrapper}
            onClick={() => setSelectedImg(img)}
          >
            <img
              src={img}
              alt={`Image ${index + 1}`}
              loading="lazy"
              className={Styles.image}
            /> 
            
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className={Styles.lightbox} onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} className={Styles.lightboxImage} />
        </div>
      )}
    </>
  );
}
