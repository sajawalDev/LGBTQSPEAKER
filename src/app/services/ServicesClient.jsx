"use client";

import { useState } from "react";
import Styles from "@/styles/ServicesPage.module.css";

export default function ServicesClient({ services }) {
  const [activeService, setActiveService] = useState(
    services?.[0] || null
  );

  if (!activeService) return null;

  return (
    <section className={Styles.ServicespageSection}>
      {/* TOP HEADING */}
      <h1 className={Styles.pageHeading}>Services</h1>

      {/* SERVICES ROW */}
      <div className={Styles.servicesTabs}>
        {services.map((service) => (
          <button
            key={service._id}
            className={`${Styles.serviceItem} ${activeService._id === service._id ? Styles.active : ""
              }`}
            onClick={() => setActiveService(service)}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* ACTIVE SERVICE CONTENT */}
      <div className={Styles.serviceContent}>
        {activeService.heading && <h2>{activeService.heading}</h2>}
        {activeService.subHeading && (
          <h4 className={Styles.subHeading}>
            {activeService.subHeading}
          </h4>
        )}

        {activeService.blocks?.map((block, index) => {
          if (block.type === "heading") {
            return <h3 key={index} className="my-4">{block.value}</h3>;
          }
          if (block.type === "list") {
            return (
              <ul key={index} className="fw-semibold ps-3">
                {(block.items || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "paragraph") {
            return <p key={index}>{block.value}</p>;
          }

          if (block.type === "image") {
            return (
              <img
                key={index}
                src={block.image?.url}
                alt=""
                className={Styles.serviceImage}
              />
            );
          }



          return null;
        })}

        {activeService.button?.text &&
          activeService.button?.slug && (
            <a
              href={activeService.button.slug}
              className={Styles.ctaButton}
            >
              {activeService.button.text}
            </a>
          )}
      </div>
    </section>
  );
}
