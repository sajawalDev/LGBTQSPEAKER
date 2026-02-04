"use client";

import Styles from "@/styles/contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";

export default function ContactClient({ data }) {
  if (!data) return null;

  return (
    <>
      <Head>
        <title>Contact - Whittington Consulting</title>
      </Head>

      <section className={Styles.ContactSection}>
        <div className={Styles.ContactContainer}>
          <p>
            Home <span><FontAwesomeIcon icon={faCaretRight} /></span> Contact
          </p>
          <h1>Contact</h1>
        </div>

        <div className="container">
          <div className="row mt-5">
            {/* LEFT */}
            <div className="col-md-7">
              <div className={Styles.ContactContent}>
                <h5>{data.heroHeading}</h5>
                <h2>{data.heroSubHeading}</h2>
                <p>{data.heroContent}</p>

                <div className={Styles.ContactCard}>
                  <div className={Styles.ContactC}>
                    <p>
                      <FontAwesomeIcon icon={faPhone} />
                    </p>
                    <span>
                      {data.phoneHeading}
                      <br />
                      <b>{data.phoneNumber}</b>
                    </span>
                  </div>

                  <div className={Styles.ContactC}>
                    <p>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </p>
                    <span>
                      {data.emailHeading}
                      <br />
                      <b>{data.emailAddress}</b>
                    </span>
                  </div>
                </div>
              </div>

              {/* SOCIAL MEDIA – untouched */}
              <div className={Styles.SocialMedia}>
                <h5>Social Media :</h5>
                <p>
                  <span>
                    <a href="https://www.linkedin.com/in/shannonwhittington/">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </span>
                  <span>
                    <a href="https://www.youtube.com/@shannonwhittingtonconsulting/videos">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </span>
                  <span>
                    <a href="https://www.instagram.com/shannonwhittingtonconsulting">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faTwitter} />
                  </span>
                  <span>
                    <a href="https://www.tiktok.com/@shannonwhittingtonsheher">
                      <FontAwesomeIcon icon={faTiktok} />
                    </a>
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-md-5 my-lg-0 my-md-0 my-3">
              <div className={Styles.ContactForm}>
                <h3>{data.formHeading}</h3>

                <form>
                  {data.inputs.map((input, i) => (
                    <div key={i} className={Styles.FormGroup}>
                      {input.type === "textarea" ? (
                        <textarea
                          placeholder={input.placeholder}
                          rows="5"
                          required
                        />
                      ) : (
                        <input
                          type={input.type}
                          placeholder={input.placeholder}
                          required
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className={Styles.SendBtn}
                  >
                    {data.buttonText}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
