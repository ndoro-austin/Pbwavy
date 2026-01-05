"use client";
import React, { useRef } from "react";
import styles from "./style.module.scss";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Aboutpage = () => {
  const [lineAnimated, setLineAnimated] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setLineAnimated(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  return (
    <div ref={container}>
      <div style={{ background: "#fff", width: "100%" }}>
              <Navbar />
            </div>
      <section className={styles.aboutSection}>
        <div className={styles.headerContainer}>
          <div className={styles.textContainer}>
            <motion.h1
              className={styles.heading}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            >
              My passion, <span className={styles.bacheloretteFont}>Your </span>
              business
            </motion.h1>
            <motion.p
              className={styles.subheading}
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
            >
              Helping brands thrive in the digital World
            </motion.p>
          </div>
          <div className={styles.lineIconContainer}>
            <motion.div
              className={styles.line}
              initial={{ width: "0%" }}
              animate={{ width: "70%" }}
              transition={{
                duration: 0.07,
                ease: [0.65, 0, 0.35, 1],
                delay: 1,
              }}
            />
            <motion.div
              className={styles.iconCircle}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
            >
              <Image
                src="/Assets/gloc.png"
                alt="Globe"
                width={150}
                height={150}
                className={styles.globeImg}
              />
            </motion.div>
          </div>
        </div>
        <motion.div
          className={styles.lowerContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        >
          <div className={styles.leftContent}>
            <div className={styles.arrowTextRow}>
              <span className={styles.arrowIcon}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18H27"
                    stroke="#0f0e0cff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M21 12L27 18L21 24"
                    stroke="#6b5a4a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className={styles.arrowText}>
                I help companies from all over the world with tailor-made
                solutions. With each project,
                <br />I push my work to new horizons, always putting quality
                first.
              </div>
            </div>
            <div className={styles.exploring}>Always exploring...</div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.profileImgWrapper}>
              <Image
                src="/images/about.png"
                alt="Profile"
                width={580}
                height={520}
                className={styles.profileImg}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Help Section */}
      <section className={styles.helpSection}>
        <h2 className={styles.helpHeading}>
          I can help you with
          <span className={styles.dotsLoader}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </span>
        </h2>
        <div className={styles.helpGrid}>
          {/* 01 Design */}
          <div className={styles.helpCol}>
            <div className={styles.helpNum}>01</div>
            <div className={styles.helpLine}></div>
            <div className={styles.helpTitle}>Design</div>
            <div className={styles.helpDesc}>
              With a solid track record in crafting impactful and user-centered designs, 
              I create strong, engaging, and functional visual experiences across digital 
              and physical platforms. 
            </div>
          </div>
          {/* 02 Development */}
          <div className={styles.helpCol}>
            <div className={styles.helpNum}>02</div>
            <div className={styles.helpLine}></div>
            <div className={styles.helpTitle}>Development</div>
            <div className={styles.helpDesc}>
             With a proven background in building efficient and scalable solutions, I deliver 
             strong, high-performing, and user-focused digital experiences. 
             (Since 2020, integrating development seamlessly with design expertise.)
            </div>
          </div>
          {/* 03 The Full Package */}
          <div className={styles.helpCol}>
            <div className={styles.helpNum}>03</div>
            <div className={styles.helpLine}></div>
            <div className={styles.helpTitleRow}>
              <span className={styles.helpStar}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2 L18.5 12 H29 L20 18 L22.5 28 L16 22 L9.5 28 L12 18 L3 12 H13.5 Z"
                    fill="#181818"
                  />
                </svg>
              </span>
              <span className={styles.helpTitle}>The Full Package</span>
            </div>
            <div className={styles.helpDesc}>
              Blending strategy, design, and technology, I craft powerful digital 
              experiences that are as functional as they are visually striking. 
              With a strong foundation in both design and development.
            </div>
          </div>
        </div>
      </section>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
      <Footer style={{ zIndex: -5 }} />
    </div>
  );
};

export default Aboutpage;
