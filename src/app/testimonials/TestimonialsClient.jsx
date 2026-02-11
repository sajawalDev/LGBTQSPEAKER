"use client";

import Styles from "@/styles/testimonials.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function TestimonialsClient({ data }) {
  const testimonials = data?.testimonials || [];

  if (!testimonials.length) return null;

  return (
    <section className={Styles.wrapper}>
      <div className={Styles.grid}>
        {testimonials.map((item, index) => (
          <div key={index} className={Styles.card}>
            
            {/* Content */}
            <p className={Styles.text}>
              "{item.text}"
            </p>

            {/* Rating */}
            <div className={Styles.stars}>
              {Array.from({ length: item.rating }).map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>

            {/* Name */}
            <h4 className={Styles.name}>{item.name}</h4>

            {/* Company */}
            <span className={Styles.company}>{item.company}</span>

            {/* Optional extra info */}
            {item.position && (
              <div className={Styles.position}>{item.position}</div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
