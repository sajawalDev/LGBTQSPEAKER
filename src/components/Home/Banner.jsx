"use client";

import Styles from '@/styles/Banner.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function Banner() {
  const slides = [
    {
      image: "/images/banner/img1.jpg",
      blur: "/images/banner/blur-img1.jpg", // tiny blurred image
      title: 'Book Shannon Whittington Today',
      desc: 'Shannon helps healthcare organizations and corporations operationalize LGBTQ+ psychological safety and patient-centered, people-centered practices, improving engagement, retention, experience metrics, and measurable organizational performance.'
    },
    {
      image: "/images/banner/img2.jpg",
      blur: "/images/banner/blur-img2.jpg",
      title: 'Discover Inclusive Solutions',
      desc: 'Unlock the power of diversity and inclusion in your organization. Our expert guidance will lead you to a more inclusive and equitable future.'
    },
    {
      image: "/images/banner/img3.jpg",
      blur: "/images/banner/blur-img3.jpg",
      title: 'Elevate Your LGBTQ+ Awareness',
      desc: 'Join us on a journey to expand your knowledge of LGBTQ+ issues. Together we can create a space of welcoming and belonging.'
    }
  ];

  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <section className={Styles.bannerWrapper}>
      {slides.map((slide, index) => {
        // Only render the first slide or the currently active slide
        if (index !== 0 && index !== current) return null;

        return (
          <div
            key={index}
            className={`${Styles.slide} ${index === current ? Styles.active : ""}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}          // preload first image
              sizes="100vw"                   // responsive width hint
              quality={85}                    // sharp but optimized
              placeholder="blur"              // use blur placeholder
              blurDataURL={slide.blur}        // tiny blurred image
              className={Styles.bannerImg}
            />

            <div className={Styles.overlay}></div>

            <div className={Styles.content}>
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
              <Link href="/hire-to-speak">
                <button className={Styles.speakBtn}>HIRE TO SPEAK</button>
              </Link>
            </div>
          </div>
        );
      })}

      <div className={Styles.dotsWrapper}>
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`${Styles.dot} ${index === current ? Styles.activeDot : ""}`}
          ></span>
        ))}
      </div>
    </section>
  );
}
