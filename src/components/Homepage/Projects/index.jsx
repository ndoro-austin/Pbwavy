"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "./components/project";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRouter } from "next/navigation";
import MobileProjects from "./MobileProjects";

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
    color: "#32271eff",
    link: "/wave/wizards", // Update to new route
  },
  {
    title: "Safaricom",
    src: "safaricomd.png",
    color: "#15350fff",
    link: "/wave/safaricom",
  },
  {
    title: "M.Katana",
    src: "M.Katan.png",
    color: "#3b3836ff",
    link: "/wave/katana",
  },
  {
    title: "KingKIDD",
    src: "kingg.png",
    color: "#252524ff",
    link: "/wave/kingkidd",
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

export default function Home() {
  const isMobile = useIsMobile();
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);
  const router = useRouter();

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
  const handleMoreWorkClick = () => {
    router.push("/work");
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
                textAlign: "left",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                color: "#222222ac",
                marginLeft: "7rem",
                marginTop: "-1.5rem",
                marginBottom: "3rem",
              }}
            >
              RECENT WORK
            </div>

            {projects.map((project, index) => {
              return (
                <Project
                  index={index}
                  title={project.title}
                  manageModal={manageModal}
                  link={project.link}
                  key={index}
                />
              );
            })}
          </div>
          <Rounded className={styles.button}>
            <p style={{ cursor: "pointer" }} onClick={handleMoreWorkClick}>
              More work <sup className={styles.countSup}>9</sup>
            </p>
          </Rounded>
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
              {projects.map((project, index) => {
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
            whileTap={{
              scale: 1.5,
              transition: { type: "spring", stiffness: 500, damping: 20 },
            }}
          >
            View
          </motion.div>
        </>
      )}
    </main>
  );
}
