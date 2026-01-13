"use client";
import { useState, useEffect } from "react";
import Styles from "@/styles/VideoTestimonials.module.css";

const videos = [
  { id: 1, src: "/videoReviews/v1.mp4" },
  { id: 2, src: "/videoReviews/v2.mp4" },
  { id: 3, src: "/videoReviews/v3.mp4" },
];

export default function VideoTestimonials() {
  const [currentVideo, setCurrentVideo] = useState(videos[0].src);
  const [durations, setDurations] = useState({});

  // Load video durations
  useEffect(() => {
    videos.forEach((video) => {
      const vid = document.createElement("video");
      vid.src = video.src;
      vid.onloadedmetadata = () => {
        setDurations((prev) => ({
          ...prev,
          [video.id]: formatTime(vid.duration),
        }));
      };
    });
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <section className={Styles.VideoTestimonialsSection}>
      <div className="container">
        <div className={Styles.testimonialsHeading}>
          <h6>VIDEO TESTIMONIALS</h6>
          <h1 className="my-3">Video Reviews</h1>
          <p>
            Discover what others have to say about Shannon Whittington’s impactful presentations, workshops, and services. Watch these video testimonials to gain insights into the transformative experiences of past clients and event attendees.
          </p>
        </div>

        <div className={Styles.videoRow}>
          {/* Main Video */}
          <div className={Styles.mainVideoCol}>
            <video
              src={currentVideo}
              controls
              
              width="100%"
              height="400px"
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
          </div>

          {/* Video Thumbnails */}
          <div className={Styles.thumbnailCol}>
            <h6 className={Styles.VideoHeader}>Testimonial Videos</h6>
            {videos.map((video) => (
              <div
                key={video.id}
                className={Styles.videoThumbnailRow}
                onClick={() => setCurrentVideo(video.src)}
              >
                {/* Thumbnail */}
                <video
                  src={video.src}
                  width="80px"
                  height="50px"
                  muted
                  style={{ borderRadius: "5px", objectFit: "cover" }}
                />
                {/* Title */}
                <span>Testimonial</span>
                {/* Duration */}
                <span className={Styles.duration}>
                  {durations[video.id] || "0:00"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
