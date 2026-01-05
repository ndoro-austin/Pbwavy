import Rounded from "../../common/RoundedButton";
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const projects = [
  {
    title: "Wizards",
    src: "wizard.png",
    color: "#32271eff",
    work: "Design & Development",
    year: "2025",
    link: "/wave/wizards",
  },
  {
    title: "Safaricom",
    src: "safaricomd.png",
    color: "#15350fff",
    work: "Design & Interaction",
    year: "2025",
    link: "/wave/safaricom",
  },
];

const MobileProjects = () => {
  const router = useRouter();
  return (
    <div
      className={`${styles.mobileProjectsContainer} ${styles.mobileOnly}`}
      style={{ zIndex: 20, background: "#fff" }}
    >
      {projects.map((project, idx) => (
        <div
          className={styles.mobileProjectCard}
          key={idx}
          onClick={() => project.link && router.push(project.link)}
          style={{
            marginBottom: "3.8rem",
            cursor: project.link ? "pointer" : "default",
          }}
        >
          <div
            style={{
              backgroundColor: project.color,
              width: "380px",
              height: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Image
              src={`/images/${project.src}`}
              alt={project.title}
              width={320}
              height={320}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.mobileProjectTitle}>{project.title}</div>
          <hr className={styles.mobileDivider} />
          <div className={styles.mobileProjectInfo}>
            <span>{project.work}</span>
            <span>{project.year}</span>
          </div>
        </div>
      ))}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            padding: "1rem 2.5rem",
            borderRadius: "32px",
            border: "1px solid #222",
            background: "#fff",
            color: "#222",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#222";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#222";
          }}
          onClick={() => router.push("/work")}
        >
          More work
        </button>
      </div>
      <motion.div className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
    
  );
};

export default MobileProjects;
