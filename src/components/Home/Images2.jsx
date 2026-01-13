"use client";

import { useRef, useEffect, useState } from "react";
import Styles from "@/styles/Images2.module.css";

const images = [
  "/images/img1.png", "/images/img2.png", "/images/img3.png",
  "/images/img4.jpeg", "/images/img5.png", "/images/img6.png",
  "/images/img7.png", "/images/img8.png", "/images/img9.png",
  "/images/img10.jpg", "/images/img11.png", "/images/img12.png",
  "/images/img13.jpg", "/images/img14.jpg", "/images/img15.png",
  "/images/img16.png", "/images/img17.png", "/images/img18.png",
  "/images/img19.png", "/images/img20.png", "/images/img21.png",
  "/images/img22.jpg", "/images/img23.jpg", "/images/img24.png",
  "/images/img25.png", "/images/img26.jpg", "/images/img27.png",
  "/images/img28.png", "/images/img29.jpg", "/images/img30.webp",
  "/images/img31.png", "/images/img32.png", "/images/img33.png",
  "/images/img34.png", "/images/img35.png", "/images/img36.png",
];

export default function Images() {
  const marqueeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrame;

    const autoScroll = () => {
      if (!isDragging) {
        marquee.scrollLeft += 0.6; // speed (mobile-friendly)

        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  // Touch/drag events
  function handleStart(e) {
    setIsDragging(true);
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  }

  function handleMove(e) {
    if (!isDragging) return;
    e.preventDefault();

    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const x = pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  }

  function handleEnd() {
    setIsDragging(false);
  }

  return (
    <div
      ref={marqueeRef}
      className={Styles.marqueeContainer}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >

      <div className={Styles.marquee}>
        {images.map((src, index) => (
          <div key={index} className={Styles.imageWrapper}>
            <img src={src} alt={`image-${index}`} />
          </div>
        ))}
        {images.map((src, index) => (
          <div key={`dup-${index}`} className={Styles.imageWrapper}>
            <img src={src} alt={`image-dup-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
