"use client";

import Styles from "@/styles/about.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faGear,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";

export default function AboutClient({ about }) {
  if (!about) return null;

  return (
    <>
      <Head>
        <title>About _ Whittington Consulting</title>
      </Head>

      <section className={Styles.About}>
        <div className={Styles.AboutHeading}>
          <p>
            Home <FontAwesomeIcon icon={faCaretRight} /> About
          </p>
          <h1>{about.mainHeading}</h1>
        </div>

        <div className="container">
          <div className="row">
            {/* IMAGE */}
            <div className="col-md-4">
              <div className={Styles.ShannonImg}>
                {about.image?.url && (
                  <img
                    src={about.image.url}
                    alt="About Image"
                    className={Styles.Image}
                  />
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div className="col-md-8">
              <div className={Styles.AboutContent}>
                <h6>{about.mainHeading}</h6>

                {about.introParagraph && (
                  <p>{about.introParagraph}</p>
                )}

                {about.boldText && (
                  <span>
                    <b>{about.boldText}</b>
                  </span>
                )}

                {about.paragraphs?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {/* MISSION / COMMITMENT */}
                <div className={Styles.Ourmision}>
                  {about.missionSections?.map((sec, i) => (
                    <div
                      key={i}
                      className={
                        i === 0
                          ? Styles.comitment
                          : Styles.mission
                      }
                    >
                      <p>
                        <span>
                          <FontAwesomeIcon icon={faGear} />
                        </span>
                        {sec.title}
                      </p>
                      <content>{sec.content}</content>
                    </div>
                  ))}
                </div>

                {/* BUTTON + EMAIL */}
                <div className={Styles.ContentButton}>
                  {about.button?.label && (
                    <Link href={about.button.slug || "#"}>
                      <button>{about.button.label}</button>
                    </Link>
                  )}

                  <span>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>{" "}
                  for Consultation

                  {about.email && (
                    <p>
                      <b>{about.email}</b>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section className={Styles.GetinTouch}>
        <h5>{about.getInTouch?.heading}</h5>
        <h1>{about.getInTouch?.subHeading}</h1>
        <p>{about.getInTouch?.content}</p>

        <button>
          <span>
            <FontAwesomeIcon icon={faPhone} />
          </span>
          {about.getInTouch?.buttonText}
        </button>
      </section>
    </>
  );
}
