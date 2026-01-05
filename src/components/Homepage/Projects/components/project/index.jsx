"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";

export default function index({ index, title, manageModal, link }) {
  const router = useRouter();
  return (
    <div
      onMouseEnter={(e) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className={styles.project}
      onClick={() => link && router.push(link)}
      style={{ cursor: link ? "pointer" : "default" }}
    >
      <h2>{title}</h2>
      <p>Design & Development</p>
    </div>
  );
}
