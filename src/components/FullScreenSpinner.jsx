"use client";

import styles from "@/styles/FullScreenSpinner.module.css"

export default function FullScreenSpinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}
