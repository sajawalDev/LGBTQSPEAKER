"use client";

import Styles from "@/styles/Banner.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Banner() {
  const slides = [
    {
      image: "/images/banner/img1.jpg",
      blur: "/images/banner/blur-img1.jpg",
      title: "The Hidden Barrier to Revenue, Retention, and Quality:",
      desc: "What if missed revenue, retention, and quality targets aren’t about effort, but about a workplace where people don’t feel safe, included, or able to fully contribute?",
    },
    {
      image: "/images/banner/img2.jpg",
      blur: "/images/banner/blur-img2.jpg",
      title: "Discover Inclusive Solutions",
      desc: "Unlock the power of diversity and inclusion in your organization.",
    },
    {
      image: "/images/banner/img3.jpg",
      blur: "/images/banner/blur-img3.jpg",
      title: "Elevate Your LGBTQ+ Awareness",
      desc: "Together we can create a space of welcoming and belonging.",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section className={Styles.bannerWrapper}>
      {slides.map((slide, index) =>
        index === current ? (
          <div key={index} className={`${Styles.slide} ${Styles.active}`}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={slide.blur}
              className={Styles.bannerImg}
            />

            <div className={Styles.overlay} />

            {/* TOP LEFT TITLE */}
            <div className={Styles.titleBox}>
              <h1>{slide.title}</h1>
            </div>

            {/* BOTTOM LEFT DESCRIPTION */}
            <div className={Styles.descBox}>
              <p>{slide.desc}</p>
            </div>
          </div>
        ) : null
      )}

      <div className={Styles.dotsWrapper}>
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`${Styles.dot} ${i === current ? Styles.activeDot : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
