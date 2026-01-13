"use client";

import { useState, useEffect } from "react";
import Styles from "@/styles/Reviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { testimonialData } from "@/data/TestimonialsData";

const videos = [
  "/videoReviews/v1.mp4",
  "/videoReviews/v2.mp4",
  "/videoReviews/v3.mp4",
];

export default function Reviews() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [videoDurations, setVideoDurations] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Load durations ONCE (fast)
  useEffect(() => {
    videos.forEach((video) => {
      if (videoDurations[video]) return;

      const tempVideo = document.createElement("video");
      tempVideo.src = video;
      tempVideo.preload = "metadata";

      tempVideo.onloadedmetadata = () => {
        setVideoDurations((prev) => ({
          ...prev,
          [video]: tempVideo.duration,
        }));
      };
    });
  }, []);

  // Auto testimonial slider
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === testimonialData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className={Styles.ReviewsSection}>
      <div className="container">
        <h2 className="text-center my-3">Testimonials & Reviews</h2>

        <div className={Styles.Reviews}>
          {/* LEFT – VIDEO REVIEWS */}
          <div className={Styles.VideoReviews}>
            <div className={Styles.MainVideo}>
              <video
                key={activeVideo}
                src={activeVideo}
                controls
                preload="auto"
              />
            </div>

            <div className={Styles.VideoList}>
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={Styles.VideoRow}
                  onClick={() => setActiveVideo(video)}
                >
                  <div className={Styles.ThumbWrapper}>
                    <img
                      src={`/videoReviews/v${index + 1}.jpg`}
                      alt="Video thumbnail"
                      loading="lazy"
                    />
                    <FontAwesomeIcon icon={faPlay} />
                  </div>

                  <span className={Styles.VideoTime}>
                    {formatTime(videoDurations[video])}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – TESTIMONIALS */}
          <div
            className={Styles.TestimonialsReviews}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={Styles.TestimonialCard}>
              <p>{testimonialData[activeTestimonial].text}</p>

              <div className={Styles.Stars}>
                {Array.from({
                  length: testimonialData[activeTestimonial].ratting,
                }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>

              <h4>{testimonialData[activeTestimonial].name}</h4>
              <span>{testimonialData[activeTestimonial].company}</span>
            </div>

            <div className={Styles.Dots}>
              {testimonialData.map((_, i) => (
                <span
                  key={i}
                  className={i === activeTestimonial ? Styles.active : ""}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
