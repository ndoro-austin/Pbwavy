import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";
import { getMediaUrl } from "@/lib/cloudinary";

const slider1 = [
  {
    color: "#e3e5e7",
    src: "/Assets/portfolio/images/image4.jpg",
    type: "image",
  },
  {
    color: "#d6d7dc",
    src: "/Assets/portfolio/videos/video3.mp4",
    type: "video",
  },
  {
    color: "#e3e3e3",
    src: "/Assets/portfolio/images/image2.jpeg",
    type: "image",
  },
  {
    color: "#21242b",
    src: "/Assets/portfolio/videos/video2.mp4",
    type: "video",
  },
];

const slider2 = [
  {
    color: "#d4e3ec",
    src: "/Assets/portfolio/videos/video5.mp4",
    type: "video",
  },
  {
    color: "#e5e0e1",
    src: "/Assets/portfolio/images/image3.jpeg",
    type: "image",
  },
  {
    color: "#d7d4cf",
    src: "/Assets/portfolio/videos/video6.mp4",
    type: "video",
  },
  {
    color: "#e1dad6",
    src: "/Assets/portfolio/images/image1.jpeg",
    type: "image",
  },
];

export default function index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  // Hide on mobile
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  if (isMobile) return null;

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => (
          <div key={index} className={styles.project}>
            <div className={styles.imageContainer}>
              {project.type === "image" ? (
                <Image
                  fill
                  alt="portfolio"
                  src={project.src}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <video src={getMediaUrl(project.src)} autoPlay loop muted playsInline />
              )}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => (
          <div
            key={index}
            className={styles.project}
            style={{ backgroundColor: project.color }}
          >
            <div className={styles.imageContainer}>
              {project.type === "image" ? (
                <Image
                  fill
                  alt="portfolio"
                  src={project.src}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <video
                  src={getMediaUrl(project.src)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.videoContent}
                />
              )}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
