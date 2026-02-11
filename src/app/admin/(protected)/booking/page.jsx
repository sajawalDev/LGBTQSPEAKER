"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/adminHireToSpeak.module.css";

export default function AdminHireToSpeak() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("/api/admin/hiretospeak");
    const data = await res.json();
    if (data.success) setBookings(data.bookings);
  };

  const markAsDone = async (id) => {
    await fetch("/api/admin/hiretospeak", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "done" } : b))
    );
  };

  const filtered = bookings.filter((b) => b.status === activeTab);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Hire To Speak Bookings</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "pending" ? styles.activePending : ""
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === "done" ? styles.activeDone : ""
          }`}
          onClick={() => setActiveTab("done")}
        >
          Done
        </button>
      </div>

      <div className={styles.cards}>
        {filtered.length === 0 && (
          <p className={styles.empty}>No bookings found.</p>
        )}

        {filtered.map((booking) => (
          <div key={booking._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>
                {booking.firstName} {booking.lastName}
              </h3>
              <span className={styles.date}>
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.details}>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Event Date:</strong> {booking.eventDate}</p>
              <p><strong>Location:</strong> {booking.eventLocation}</p>
              <p><strong>Audience:</strong> {booking.audienceSize}</p>
              <p><strong>Topic:</strong> {booking.eventTopic}</p>
              <p><strong>Additional Info:</strong> {booking.additionalInfo}</p>
            </div>

            {activeTab === "pending" && (
              <div className={styles.actions}>
                <button
                  className={styles.doneBtn}
                  onClick={() => markAsDone(booking._id)}
                >
                  Mark as Performed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
