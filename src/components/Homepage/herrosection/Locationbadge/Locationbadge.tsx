import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Locationbadge.module.css";

export default function LocationBadge() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2.2, delay: 0.6, ease: "easeOut" }}
    >
      <div className={styles.locationText}>
        <span>Located in Kenya</span>
      </div>
      <div className={styles.icon}>
        <img src="/Assets/globe.png" alt="Globe Icon" />
      </div>
    </motion.div>
  );
}
