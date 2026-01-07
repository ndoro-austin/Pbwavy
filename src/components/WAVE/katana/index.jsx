"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SidenavbarHeader from "../../common/Sidenavbar/Header/index";
import { motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "../../common/Navbar/Navbar";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import { getMediaUrl } from "@/lib/cloudinary";
import styles from "./style.module.scss";
import gsap from "gsap";

import RoundedButton from "../../common/RoundedButton";

export default function WizardsWave() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [scrollInstance, setScrollInstance] = useState(null);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showMaintenancePopup, setShowMaintenancePopup] = useState(false);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");
      setCurrentTime(
        `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm} EAT`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      });
      setScrollInstance(scroll);
      scroll.on("scroll", (obj) => {
        // Adjust scroll threshold based on device type
        const threshold = isMobile ? 100 : 50;
        setScrolledDown(obj.scroll.y > threshold);
      });
      return () => {
        scroll.destroy();
      };
    }
  }, [isMobile]);

  // Update Locomotive Scroll when scrollInstance or content changes
  useEffect(() => {
    if (scrollInstance) {
      scrollInstance.update();
    }
  }, [scrollInstance]);

  // Update Locomotive Scroll after images and videos load
  useEffect(() => {
    if (!scrollInstance) return;

    const images = document.querySelectorAll("img");
    const videos = document.querySelectorAll("video");
    let loadedCount = 0;
    const totalMedia = images.length + videos.length;

    const handleMediaLoad = () => {
      loadedCount++;
      // Update on each load and especially when all media is loaded
      scrollInstance.update();

      if (loadedCount === totalMedia) {
        // Final update after all media loaded
        setTimeout(() => scrollInstance.update(), 100);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleMediaLoad();
      } else {
        img.addEventListener("load", handleMediaLoad);
        img.addEventListener("error", handleMediaLoad);
      }
    });

    videos.forEach((video) => {
      if (video.readyState >= 2) {
        handleMediaLoad();
      } else {
        video.addEventListener("loadeddata", handleMediaLoad);
        video.addEventListener("error", handleMediaLoad);
      }
    });

    // Fallback: Update after a delay regardless
    const fallbackTimer = setTimeout(() => {
      scrollInstance.update();
    }, 1000);

    return () => {
      clearTimeout(fallbackTimer);
      images.forEach((img) => {
        img.removeEventListener("load", handleMediaLoad);
        img.removeEventListener("error", handleMediaLoad);
      });
      videos.forEach((video) => {
        video.removeEventListener("loadeddata", handleMediaLoad);
        video.removeEventListener("error", handleMediaLoad);
      });
    };
  }, [scrollInstance]);

  // Setup cursor movement with GSAP
  useEffect(() => {
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

  const moveCursor = (x, y) => {
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };

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

  const handleMouseEnter = (e) => {
    if (imageRef.current) {
      imageRef.current.style.transform = "translateY(20%)";
    }
    moveCursor(e.clientX, e.clientY);
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    if (imageRef.current) {
      imageRef.current.style.transform = "translateY(60%)";
    }
    moveCursor(e.clientX, e.clientY);
    setIsHovered(false);
  };

  const moveItems = (x, y) => {
    moveCursor(x, y);
  };

  return (
    <>
      {scrolledDown && !isMobile && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            top: 0,
            right: 0,

            zIndex: 1000,
          }}
        >
          <SidenavbarHeader />
        </motion.div>
      )}
      <div
        ref={scrollRef}
        data-scroll-container
        style={{ background: "#fff", minHeight: "100vh", width: "100%" }}
      >
        <Navbar style={{ background: "#fff" }} activeSection="work" />
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            M.KATANA
          </motion.div>
          <motion.div
            className={styles.detailsRow}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.detail}>
              <div className={styles.detailLabel}>Role / Services</div>
              3D Design & Modeling
            </div>
            <div className={styles.detail}>
              <div className={styles.detailLabel}>Credits</div>
              Interaction: Mvoo
            </div>
            <div className={styles.detail}>
              <div className={styles.detailLabel}>Location & Year</div>
              Nyeri © 2025
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ zIndex: 10, position: "relative" }}
          data-scroll
          data-scroll-speed="2"
          data-scroll-direction="vertical"
        >
          <div
            onClick={() => setShowMaintenancePopup(true)}
            style={{ cursor: "pointer" }}
          >
            <RoundedButton className={styles.liveSiteButton}>
              <span style={{ position: "relative", zIndex: 2 }}>MVOO</span>
              <span
                style={{
                  display: "inline-block",
                  transform: "rotate(-45deg)",
                  marginLeft: "0.3em",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <svg
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </RoundedButton>
          </div>
        </motion.div>

        <div className={styles.coverContainer}>
          <img
            src="/images/mlogo.png"
            alt="M.Katana Logo"
            data-scroll
            data-scroll-speed={isMobile ? "2" : "3"}
            data-scroll-direction="vertical"
            className={styles.logoImage}
          />
          <motion.img
            src="/images/mcover.jpg"
            alt="Wizards Cover"
            data-scroll
            data-scroll-speed="1"
            data-scroll-direction="vertical"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className={styles.coverImage}
          />
        </div>

        <div className={styles.fullWidthRectangle}>
          <img
            src="/images/mlap.png"
            alt="Laptop"
            data-scroll
            data-scroll-speed="2"
            data-scroll-direction="vertical"
            className={styles.laptopImage}
          />
        </div>

        <video
          src={getMediaUrl("/images/mcv.mp4")}
          autoPlay
          loop
          muted
          playsInline
          data-scroll
          data-scroll-speed="2"
          data-scroll-direction="vertical"
          className={styles.laptopImage}
        />

        {/* Row of 3 images */}
        <div className={styles.imageGrid}>
          <video
            src={getMediaUrl("/images/m1.mp4")}
            autoPlay
            loop
            muted
            playsInline
            data-scroll
            data-scroll-speed={isMobile ? "1" : "4"}
            data-scroll-direction="vertical"
            className={styles.gridImage}
          />
          <video
            src={getMediaUrl("/images/m2.mp4")}
            autoPlay
            loop
            muted
            playsInline
            data-scroll
            data-scroll-speed={isMobile ? "0.5" : "2"}
            data-scroll-direction="vertical"
            className={styles.gridImage}
          />
          <video
            src={getMediaUrl("/images/m3.mp4")}
            autoPlay
            loop
            muted
            playsInline
            data-scroll
            data-scroll-speed={isMobile ? "0.5" : "1"}
            data-scroll-direction="vertical"
            className={styles.gridImage}
          />
        </div>

        {/* Next Case Section - Outside scroll container */}
        <div
          className={styles.fullWidthRectangl}
          onMouseMove={(e) => {
            moveItems(e.clientX, e.clientY);
          }}
        >
          <div
            className={styles.nextCaseSection}
            style={{
              background: "#141414",
              minHeight: "100vh",
              width: "100%",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className={styles.nextCaseLabel}>Next case</div>

            <div
              className={styles.nextCaseContent}
              onMouseEnter={(e) => {
                handleMouseEnter(e);
                moveCursor(e.clientX, e.clientY);
              }}
              onMouseLeave={(e) => {
                handleMouseLeave(e);
              }}
              onMouseMove={(e) => {
                moveCursor(e.clientX, e.clientY);
              }}
              onClick={() => router.push("/wave/kingkidd")}
              style={{ cursor: "pointer" }}
            >
              <h2 className={styles.nextCaseTitle}>KINGKIDD</h2>

              <div
                className={styles.nextCaseImageWrapper}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  marginTop: "-12rem",
                }}
              >
                <div
                  ref={imageRef}
                  style={{
                    width: "400px",
                    height: "300px",
                    background: "#2e2e2eff",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    transform: "translateY(60%)",
                    transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(20%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(60%)";
                  }}
                >
                  <img
                    src="/images/kingcover.png"
                    alt="KINGKIDD"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>

            <Rounded
              className={styles.button}
              onClick={() => router.push("/work")}
            >
              <p style={{ cursor: "pointer" }}>
                All work <span className={styles.countSup}>23</span>
              </p>
            </Rounded>

            <div className={styles.footer}>
              <div className={styles.footerLeft}>
                <div className={styles.footerSection}>
                  <h3>VERSION</h3>
                  <p>2022 © Edition</p>
                </div>
                <div className={styles.footerSection}>
                  <h3>LOCAL TIME</h3>
                  <p>{currentTime}</p>
                </div>
              </div>

              <div className={styles.footerRight}>
                <h3>SOCIALS</h3>
                <div className={styles.socialLinks}>
                  <Magnetic>
                    <a href="#">Awwwards</a>
                  </Magnetic>
                  <Magnetic>
                    <a href="#">Instagram</a>
                  </Magnetic>
                  <Magnetic>
                    <a href="#">Dribbble</a>
                  </Magnetic>
                  <Magnetic>
                    <a href="#">LinkedIn</a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor following button - Outside scroll container for fixed positioning */}
      <motion.div
        ref={cursor}
        className={styles.cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={isHovered ? "enter" : "closed"}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        className={styles.cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={isHovered ? "enter" : "closed"}
      >
        Next case
      </motion.div>

      {/* Maintenance Popup */}
      {showMaintenancePopup && (
        <div
          className={styles.maintenanceOverlay}
          onClick={() => setShowMaintenancePopup(false)}
        >
          <div
            className={styles.maintenancePopup}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setShowMaintenancePopup(false)}
            >
              ×
            </button>
            <div className={styles.popupContent}>
              <div className={styles.popupText}>
                <h2>We're currently performing scheduled maintenance.</h2>
                <p>We'll be back shortly with an improved experience.</p>
                <p className={styles.thanks}>Thanks for your patience.</p>
              </div>
              <div className={styles.popupImage}>
                <img src="/images/me.jpg" alt="Maintenance" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
