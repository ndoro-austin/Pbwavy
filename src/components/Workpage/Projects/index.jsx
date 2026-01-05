"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import MobileProjects from "./MobileProjects";
import PopupMessage from "../../pop";

// Custom hook to detect mobile device
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

const projects = [
  {
    title: "Wizards",
    src: "wizard.png",
    color: "#252525ff",
    design: "Design & Development",
    location: "Nairobi",
    year: "2025",
  },
  {
    title: "Safaricom",
    src: "safaricomd.png",
    color: "#15350fff",
    design: "Design & Development",
    location: "Nairobi",
    year: "2025",
  },
  {
    title: "M.Katana",
    src: "M.Katan.png",
    color: "#3b3836ff",
    design: "Design & Development",
    location: "Nyeri",
    year: "2025",
  },
  {
    title: "KingKIDD",
    src: "kingg.png",
    color: "#252524ff",
    design: "Design & Interaction",
    location: "Mombasa",
    year: "2025",
  },
  {
    title: "Inlink",
    src: "inlinkcv.png",
    color: "#a0a0a0ff",
    design: "Design & Interaction",
    location: "Mombasa",
    year: "2025",
  },
  {
    title: "Kenya Ports",
    src: "kppa.png",
    color: "#171844ff",
    design: "Design & Interaction",
    location: "Mombasa",
    year: "2025",
  },
  {
    title: "Aroma Caf'e",
    src: "arom.jpg",
    color: "#000000ff",
    design: "Design & Development",
    location: "Nairobi",
    year: "2025",
  },
  {
    title: "ATEI Devops",
    src: "atei.jpg",
    color: "#000000ff",
    design: "Design & Development",
    location: "Chuka",
    year: "2024",
  },
  {
    title: "Explore world",
    src: "explore.jpg",
    color: "#54697cff",
    design: "Design & Development",
    location: "Tharakanithi",
    year: "2024",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Home({ filter }) {
  const isMobile = useIsMobile();
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Design") return project.design === "Design & Interaction";
    if (filter === "Development")
      return project.design === "Design & Development";
    return true;
  });

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}
    >
      {isMobile ? (
        <MobileProjects />
      ) : (
        <>
          <div className={styles.body}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#464646ac",
                marginTop: "-7rem",
                marginBottom: "1rem",
                background: "#fff",
                paddingLeft: "75px", // Match .project padding-left
                // Match .project padding-right
                boxSizing: "border-box",
              }}
            >
              <span style={{ flex: "2 1 0", minWidth: 200, textAlign: "left" }}>
                CLIENT
              </span>
              <span
                style={{
                  flex: "1.5 1 0",
                  paddingLeft: "225px",
                  textAlign: "left",
                }}
              >
                LOCATION
              </span>
              <span
                style={{
                  flex: "2 1 0",
                  paddingLeft: "25px",
                  textAlign: "left",
                }}
              >
                SERVICES
              </span>
              <span
                style={{
                  flex: "1 1 0",
                  paddingRight: "35px",
                  textAlign: "left",
                }}
              >
                YEAR
              </span>
            </div>

            {filteredProjects.map((project, index) => {
              return (
                <div
                  onMouseEnter={(e) => {
                    manageModal(true, index, e.clientX, e.clientY);
                  }}
                  onMouseLeave={(e) => {
                    manageModal(false, index, e.clientX, e.clientY);
                  }}
                  onClick={() => setIsPopupOpen(true)}
                  className={styles.project}
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <div className={styles.projectDetails}>
                    <p className={styles.projectLocation}>{project.location}</p>
                    <p className={styles.projectType}>{project.design}</p>
                    <p className={styles.projectYear}>{project.year}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className={styles.modalContainer}
          >
            <div
              style={{ top: index * -100 + "%" }}
              className={styles.modalSlider}
            >
              {filteredProjects.map((project, index) => {
                const { src, color } = project;
                return (
                  <div
                    className={styles.modal}
                    style={{ backgroundColor: color }}
                    key={`modal_${index}`}
                  >
                    <Image
                      src={`/images/${src}`}
                      width={300}
                      height={0}
                      alt="image"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            ref={cursor}
            className={styles.cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          ></motion.div>
          <motion.div
            ref={cursorLabel}
            className={styles.cursorLabel}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          >
            View
          </motion.div>
          <Rounded className={styles.button} 
          onClick={() => setIsPopupOpen(true)}>
            <p>
              Archived <sup className={styles.countSup}>23</sup>
            </p>
          </Rounded>

          <PopupMessage
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />
        </>
      )}
    </main>
  );
}
