"use client";
import React, { useRef, useState } from "react";

import styles from "./style.module.scss";
import Navbar from "../common/Navbar/Navbar";
import RoundedButton from "../common/RoundedButton";
import Projects from "./Projects";
import MobileProjects from "./Projects/MobileProjects";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../common/Footer";

const navLinks = [
  { label: "Work", active: true },
  { label: "About" },
  { label: "Contact" },
];

const filterButtons = [
  { label: "All", active: true },
  { label: "Design", count: 7 },
  { label: "Development", count: 11 },
  { icon: "≡" },
  { icon: "▦" },
];

export default function Workpage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  const [filter, setFilter] = useState("All");
  const [showMobile, setShowMobile] = React.useState(false);

  // Handlers for button clicks
  const handleGridClick = () => setShowMobile(true);
  const handleMenuClick = () => setShowMobile(false);

  return (
    <>
      {/* Navbar with white background */}
      <div style={{ background: "#fff", width: "100%" }}>
              <Navbar />
            </div>
      <div ref={container} className={styles.workpageWrapper}>
        <div className={styles.headingWrapper}>
          <motion.p
            className={styles.heading}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            Creating next level
            <br />
            Digital products
          </motion.p>
        </div>

        {/* Filter Buttons - Left (Work Types) and Right (Display Types) */}
        <div className={styles.filterButtonsRow}>
          <div className={styles.filterButtonsLeft}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
              <RoundedButton
                className={`${styles.filterButton} ${
                  filter === "All" ? styles.active : ""
                }`}
                onClick={() => setFilter("All")}
              >
                <p>All</p>
              </RoundedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <RoundedButton
                className={`${styles.filterButton} ${
                  filter === "Design" ? styles.active : ""
                }`}
                onClick={() => setFilter("Design")}
              >
                <p>Design</p> <sup className={styles.countSup}>3</sup>
              </RoundedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            >
              <RoundedButton
                className={`${styles.filterButton} ${
                  filter === "Development" ? styles.active : ""
                }`}
                onClick={() => setFilter("Development")}
              >
                <p>Development</p> <sup className={styles.countSup}>6</sup>
              </RoundedButton>
            </motion.div>
          </div>
          <motion.div
            className={styles.filterButtonsRight}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          >
            <RoundedButton
              className={
                styles.filterButton +
                " " +
                styles.iconButton +
                (!showMobile ? " " + styles.active : "")
              }
              onClick={handleMenuClick}
            >
              <span className={styles.iconMenu}>
                <span className="line2" />
                <span />
                <span className="line4" />
              </span>
            </RoundedButton>
            <RoundedButton
              className={
                styles.filterButton +
                " " +
                styles.iconButton +
                (showMobile ? " " + styles.active : "")
              }
              onClick={handleGridClick}
            >
              <span className={styles.iconGrid}>
                <span className="box1" />
                <span className="box2" />
                <span className="box3" />
                <span className="box4" />
              </span>
            </RoundedButton>
          </motion.div>
        </div>
      </div>
      {/* Projects Section (toggle) */}
      <div style={{ position: "relative", background: "#fff", zIndex: 10 }}>
        <motion.div
          key={showMobile ? "mobile" : "projects"}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        >
          {showMobile ? (
            <MobileProjects filter={filter} />
          ) : (
            <Projects filter={filter} />
          )}
        </motion.div>
      </div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
      {/* Lower z-index for Footer */}
      <Footer className={styles.footerBehind} />
    </>
  );
}
