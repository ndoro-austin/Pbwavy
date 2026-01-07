"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaArrowRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Magnetic from "../../common/Magnetic";
import { useEffect, useState } from "react";
import Header from "../Sidenavbar/Header";
import RoundedButton from "../RoundedButton";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useNavigation } from "../NavigationProvider";
import BackgroundMusic from "../BackgroundMusic/BackgroundMusic";

export default function Navbar() {
  const router = useRouter();
  const { isPlaying, toggleMusic } = useNavigation();
  const scaleAnimation: Variants = {
    initial: { scale: 0, opacity: 0 },
    enter: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
    closed: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    },
  };
  const pathname = usePathname();
  const [showMinimal, setShowMinimal] = useState(false);

  useEffect(() => {
    const handleScrollOrResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile || window.scrollY > 50) {
        setShowMinimal(true);
      } else {
        setShowMinimal(false);
      }
    };
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);
    handleScrollOrResize(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <AnimatePresence>
          {(showMinimal ||
            (typeof window !== "undefined" && window.innerWidth <= 768)) && (
            <motion.div
              variants={scaleAnimation}
              initial="initial"
              animate="enter"
              exit="closed"
            >
              <Header />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.nav
        className={styles.nav}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      >
        <Magnetic>
          <div className={styles.logo}>
            <div className={styles.name}>
              <p className={styles.Austin}>Austin</p>
              <p className={styles.Ndoro}>Ndoro</p>
            </div>
          </div>
        </Magnetic>

        <AnimatePresence>
          {!showMinimal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <ul className={styles.links}>
                <Magnetic>
                  <li
                    className={pathname === "/" ? styles.active : ""}
                    onClick={() => router.push("/")}
                    style={{ cursor: "pointer" }}
                  >
                    HOME
                  </li>
                </Magnetic>
                <span>/</span>
                <Magnetic>
                  <li
                    className={
                      pathname === "/work" || pathname.startsWith("/wave")
                        ? styles.active
                        : ""
                    }
                    onClick={() => router.push("/work")}
                    style={{ cursor: "pointer" }}
                  >
                    WORK
                  </li>
                </Magnetic>
                <span>/</span>
                <Magnetic>
                  <li
                    className={pathname === "/about" ? styles.active : ""}
                    onClick={() => router.push("/about")}
                    style={{ cursor: "pointer" }}
                  >
                    ABOUT
                  </li>
                </Magnetic>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!showMinimal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.contactContainer}
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              <BackgroundMusic />
              <RoundedButton
                className={styles.button}
                onClick={() => router.push("/contact")}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.contact}>
                  <span>CONTACT</span>
                  <FaArrowRight className={styles.icon} />
                </div>
              </RoundedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
