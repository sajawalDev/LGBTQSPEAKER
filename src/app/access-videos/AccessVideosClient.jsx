"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "@/styles/AccessVideos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle
} from "@fortawesome/free-solid-svg-icons";


const EmailSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function AccessVideosClient({ videos }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_videos_token");
    if (token) setHasAccess(true);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await fetch("/api/access-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      localStorage.setItem("access_videos_token", data.token);
      setHasAccess(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* 🔒 EMAIL GATE */
  if (!hasAccess) {
    return (
      <div className={styles.gateWrapper}>
        <div className={styles.gateCard}>
          <h2>Exclusive Video Access</h2>
          <p>
            Enter your email to unlock our private video library.
            We’ll notify you when new videos drop.
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={EmailSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.button}
                >
                  {isSubmitting ? (
                    <div className={styles.spinner}></div>
                  ) : (
                    "Access Videos"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  /* 🎥 VIDEO GRID */
  return (
    <>
    <h2 className="my-4 pt-4 text-center">Our Videos</h2>
      <div className={styles.videoGrid}>
        {videos.map((video) => (
          <div
            key={video._id}
            className={styles.videoCard}
            onClick={() => setActiveVideo(video.videoUrl)}
          >
            <video src={video.videoUrl} muted />
            <div className={styles.overlay}></div>
            <div className={styles.playIcon}><FontAwesomeIcon icon={faPlayCircle} /></div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div
          className={styles.modal}
          onClick={() => setActiveVideo(null)}
        >
          <video src={activeVideo} controls autoPlay />
        </div>
      )}
    </>
  );
}
