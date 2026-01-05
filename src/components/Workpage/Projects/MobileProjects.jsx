import Rounded from "../../common/RoundedButton";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import PopupMessage from "../../pop";

const projects = [
  {
    title: "Wizards",
    src: "wizard.png",
    color: "#252525ff",
    work: "Design & Development",
    location: "Nairobi",
    year: "2025",
  },
  {
    title: "Safaricom",
    src: "safaricomd.png",
    color: "#15350fff",
    work: "Design & Development",
    location: "Nairobi",
    year: "2025",
  },
  {
    title: "M.Katana",
    src: "M.Katan.png",
    color: "#3b3836ff",
    work: "Design & Development",
    location: "Nyeri",
    year: "2025",
  },
  {
    title: "KingKIDD",
    src: "kingg.png",
    color: "#252524ff",
    work: "Design & Interaction",
    location: "Mombasa",
    year: "2025",
  },
  {
    title: "Inlink",
    src: "inlinkcv.png",
    color: "#a0a0a0ff",
    work: "Design & Interaction",
    location: "Mombasa",
    year: "2025",
  },
  {
    title: "Kenya Ports",
    src: "kppa.png",
    color: "#171844ff",
    work: "Design & Interaction",
    location: "Mombasa",
    year: "2025",
  },
  {
    title: "Aroma Caf'e",
    src: "arom.jpg",
    color: "#000000ff",
    work: "Design & Development",
    location: "Mombasa",
    year: "2025",
  },
  {
    title: "ATEI Devops",
    src: "atei.jpg",
    color: "#000000ff",
    work: "Design & Development",
    location: "Chuka",
    year: "2024",
  },
];

const MobileProjects = ({ filter }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Design") return project.work === "Design & Interaction";
    if (filter === "Development")
      return project.work === "Design & Development";
    return true;
  });

  return (
    <div
      className={`${styles.mobileProjectsContainer} ${styles.mobileOnly}`}
      style={{ zIndex: 20, background: "#fff" }}
    >
      {filteredProjects.map((project, idx) => (
        <div
          className={styles.mobileProjectCard}
          key={idx}
          style={{ marginBottom: "3.8rem", cursor: "pointer" }}
          onClick={() => handleProjectClick(project)}
        >
          <div
            className={styles.mobileProjectImageContainer}
            style={{ backgroundColor: project.color }}
          >
            <Image
              className={styles.mobileProjectImage}
              src={`/images/${project.src}`}
              alt={project.title}
              width={320}
              height={320}
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
      ></div>
      <motion.div className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>

      <PopupMessage isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default MobileProjects;
