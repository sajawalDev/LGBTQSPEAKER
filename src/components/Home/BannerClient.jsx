"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Styles from "@/styles/Banner.module.css";

export default function BannerClient({ slides }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const placeholderBlur =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    return (
        <section className={Styles.bannerWrapper}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${Styles.slide} ${index === active ? Styles.active : ""
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title || "Slide"}
                        fill
                        priority
                        sizes="100vw"
                        placeholder={slide.blur ? "blur" : "empty"}
                        blurDataURL={slide.blur || placeholderBlur}
                        className={Styles.bannerImg}
                    />

                    <div className={Styles.overlay} />

                    <div className={Styles.titleBox}>
                        <h1>{slide.title}</h1>
                    </div>

                    <div className={Styles.descBox}>
                        {slide.buttonText && slide.buttonLink && (
                            <a href={slide.buttonLink} className="btn btn-primary mt-2">
                                {slide.buttonText}
                            </a>
                        )}
                        <p>{slide.desc}</p>
                    </div>
                </div>
            ))}

            {/* ✅ DOTS CLICKABLE */}
            <div className={Styles.dotsWrapper}>
                {slides.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => setActive(i)}
                        className={`${Styles.dot} ${i === active ? Styles.activeDot : ""
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
