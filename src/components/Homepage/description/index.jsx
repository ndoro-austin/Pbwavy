import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { slideUp, opacity } from "./animation";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";

export default function index() {
  const router = useRouter();
  const phrase =
    "He has partnered with major organizations including Safaricom, Kenya Ports Authority (KPA), and other established brands to deliver impactful, scalable solutions.";
  const highlightedWords = [
    "partnered",
    "Safaricom,",
    "(KPA),",
    "organizations",
    "brands",
    "impactful,",
    "scalable",
  ];
  const description = useRef(null);
  const isInView = useInView(description);

  const handleAboutClick = () => {
    router.push("/about");
  };
  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            const isHighlighted = highlightedWords.includes(word);
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                  className={isHighlighted ? styles.highlighted : ""}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
          The journey hasn't been easy. And what's behind the work might
          surprise you.
        </motion.p>
        <div onClick={handleAboutClick}>
          <Rounded className={styles.button}>
            <Magnetic>
              <p style={{ cursor: "pointer" }}>About me</p>
            </Magnetic>
          </Rounded>
        </div>
      </div>
    </div>
  );
}
