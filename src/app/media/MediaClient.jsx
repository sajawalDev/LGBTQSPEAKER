"use client";

import Styles from "@/styles/media.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";

export default function MediaClient({ sections }) {
  return (
    <>
      <Head>
        <title>Media - Whittington Consulting</title>
      </Head>

      <section className={Styles.MediaSection}>
        <div className={Styles.MediaContainer}>
          <p>
            Home
            <span>
              <FontAwesomeIcon icon={faCaretRight} />
            </span>
            Media
          </p>
          <h1>Media & Press</h1>
        </div>

        <div className="container">
          {sections.map((item, index) => (
            <div
              key={item._id}
              className="row my-3 align-items-center"
            >
              {/* IMAGE */}
              <div className="col-md-6">
                <div className={Styles.MediaImg}>
                  <img
                    src={item.image?.url}
                    alt={item.heading}
                    className={Styles.Image}
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="col-md-6 my-lg-0 my-md-0 my-2">
                <div className={Styles.MediaContent}>
                  <h5>{item.heading}</h5>

                  {item.content && <p>{item.content}</p>}

                  {item.buttonText && item.buttonSlug && (
                    <Link href={item.buttonSlug}>
                      <button>{item.buttonText}</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
