"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import { FaArrowRight } from "react-icons/fa";

const name = "Mwangiri";
const nameVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.6, // delay before letters start animating (0.7 + 0.9)
    },
  },
};
const letterVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const copyrightVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.5 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 2 }, // 1.2 + 0.9
  },
};
const btnVariants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 1.7 } },
};
const contentVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.9 } },
};

export default function HeroSection() {
  const NameRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const strength = 7;
    const applyMagnet = (el: HTMLElement | null) => {
      if (!el) return;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      };
      const resetPosition = () => {
        el.style.transform = "translate(0, 0)";
      };
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", resetPosition);
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", resetPosition);
      };
    };
    const cleanups: Array<() => void> = [];
    cleanups.push(applyMagnet(buttonRef.current)!);
    cleanups.push(applyMagnet(iconRef.current)!);
    return () => {
      cleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, []);

  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.name}
        variants={nameVariants}
        initial="initial"
        animate="animate"
        ref={NameRef}
      >
        {name.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          className={styles.copyright}
          variants={copyrightVariants}
          initial="initial"
          animate="animate"
        >
          ©
        </motion.span>
      </motion.h1>

      <motion.div
        className={styles.infoRow}
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <motion.a
          href="/CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          ref={buttonRef}
          className={styles.cvButton}
          variants={btnVariants}
          initial="initial"
          animate="animate"
        >
          <span className={styles.circle} ref={iconRef}>
            <FaArrowRight className={styles.icon} />
          </span>
          <span>Curriculum Vitae</span>
        </motion.a>
        <motion.p
          className={styles.bio}
          ref={bioRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
        >
          He helps brands to stand out in the digital era. Together they set the
          new status quo. No nonsense, always on the cutting edge.
        </motion.p>
      </motion.div>
    </section>
  );
}
