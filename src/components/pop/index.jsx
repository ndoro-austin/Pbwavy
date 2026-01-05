"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";

export default function PopupMessage({ isOpen, onClose }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "error1.png",
    "e01.png",
    "e2.png",
    "e3.png",
    "e4.png",
    "e5.png",
    "e6.png",
  ];

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9500);

    return () => clearInterval(interval);
  }, [isOpen, images.length]);

  const handleSubmit = () => {
    if (!noThanks && email) {
      // Handle email submission
      console.log("Email submitted:", email);
    }
    // Navigate to safaricom page immediately
    router.push("/wave/safaricom");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.popup}
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>

            <div className={styles.content}>
              {/* Left side - Image */}
              <div className={styles.imageSection}>
                <motion.img
                  key={currentImageIndex}
                  src={`/images/${images[currentImageIndex]}`}
                  alt="Austin with coffee"
                  className={styles.popupImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Right side - Content */}
              <div className={styles.textSection}>
                <h2 className={styles.heading}>
                  Tuning a few things... back in a flash
                </h2>

                <p className={styles.subtext}>
                  A little pause while we roll out a big upgrade to improve your
                  experience.
                </p>

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  disabled={noThanks}
                />

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={noThanks}
                    onChange={(e) => setNoThanks(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>NO, THANK YOU</span>
                </label>

                <button
                  className={styles.recentWorkButton}
                  onClick={handleSubmit}
                >
                  Recent Work
                </button>

                <p className={styles.footer}>
                  Always Designing the next version.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
