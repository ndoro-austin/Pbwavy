"use client";
import { useNavigation } from "../NavigationProvider";
import styles from "./BackgroundMusic.module.css";
import Rounded from "../RoundedButton";
import { motion } from "framer-motion";

const BackgroundMusic = () => {
  const { isPlaying, toggleMusic } = useNavigation();

  return (
    <Rounded onClick={toggleMusic} className={styles.musicButton}>
      {isPlaying ? (
        <motion.svg
          width="19"
          height="12"
          viewBox="0 0 19 12"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 19 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
        >
          {/* WAVE LINE 1 */}
          <motion.path
            d="M2.5 6 Q6 0 9.5 6 T16.5 6"
            animate={{
              d: [
                "M2.5 6 Q6 0 9.5 6 T16.5 6",
                "M2.5 6 Q6 10 9.5 6 T16.5 6",
                "M2.5 6 Q6 0 9.5 6 T16.5 6",
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      ) : (
        // Flat Line When Muted
        <motion.svg
          width="19"
          height="12"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
        >
          <line
            x1="2.5"
            y1="6"
            x2="16.5"
            y2="6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
      )}
    </Rounded>
  );
};

export default BackgroundMusic;
