import { motion } from "framer-motion";
import styles from "./ImageSection.module.css";
import { FaArrowRight } from "react-icons/fa";

const fadeInTop = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1 } },
};
const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.9 } },
};
const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 1.4 } },
};
const fadeInBottom = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 1.9 } },
};
const fadeInArrow = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 2.4 } },
};

export default function ImageSection() {
  return (
    <motion.div
      className={styles.imageSection}
      initial="initial"
      animate="animate"
    >
      <motion.span
        className={styles.year}
        variants={fadeInLeft}
        initial="initial"
        animate="animate"
      >
        /22
      </motion.span>
      <motion.img
        src="/Assets/logoa.png"
        alt="Logo"
        className={styles.image}
        variants={fadeInRight}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className={styles.captionWrapper}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className={styles.caption}
          variants={fadeInBottom}
          initial="initial"
          animate="animate"
        >
          <p>
            Creative
            <br />
            Designer & Engineer
          </p>
        </motion.div>
        <motion.div variants={fadeInArrow} initial="initial" animate="animate">
          <FaArrowRight className={styles.icon} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
