import React, { useRef } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRouter } from "next/navigation";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";

export default function index() {
  const container = useRef(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  // Kenya time (Africa/Nairobi)
  const [kenyaTime, setKenyaTime] = React.useState("");
  React.useEffect(() => {
    function updateTime() {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Africa/Nairobi",
      };
      setKenyaTime(now.toLocaleTimeString("en-GB", options) + " EAT");
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleContactClick = () => {
    router.push("/contact");
  };
  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true} alt={"logo"} src={"/images/Austin.png"} />
            </div>
            <h2 style={{ marginBottom: "-2rem" }}>Let's work</h2>
          </span>
          <h2 style={{ marginBottom: "2rem" }}>together</h2>
          <motion.div style={{ x }} className={styles.buttonContainer} onClick={handleContactClick}>
            <Rounded backgroundColor={"#334BD3"} className={styles.button}>
              <p style={{ cursor: "pointer" }} >
                Get in touch
              </p>
            </Rounded>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded className={styles.button}>
            <a
              href="mailto:austinndoro03@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                display: "block",
              }}
            >
              <p>austinndoro03@gmail.com</p>
            </a>
          </Rounded>
          <Rounded className={styles.button}>
            <a
              href="https://truecaller.com/search/254759261332"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                display: "block",
              }}
            >
              <p>+254 759 261 332</p>
            </a>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <h3>VERSION</h3>
              <p>2023 © Edition</p>
            </span>
            <span>
              <h3>LOCAL TIME</h3>
              <p
                style={{
                  fontSize: "0.9em",
                  margin: 0,
                  padding: "2.5px",
                  cursor: "pointer",
                }}
              >
                {kenyaTime}
              </p>
            </span>
          </div>
          <div className={styles.socialsContainer}>
            <span>
              <h3>SOCIALS</h3>
              <div className={styles.socialsRow}>
                <Magnetic>
                  <a
                    href="https://www.awwwards.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                      display: "block",
                    }}
                  >
                    <p>Awwwards</p>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="https://www.instagram.com/_pb_wavy?igsh=Z3F2NG1qZmczNmpw"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                      display: "block",
                    }}
                  >
                    <p>Instagram</p>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="https://dribbble.com/austin-ndoro"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                      display: "block",
                    }}
                  >
                    <p>Dribbble</p>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="https://www.linkedin.com/in/austin-ndoro-3b22512ab?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Be3tFDYKSTzaFGybSW28YfQ%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                      display: "block",
                    }}
                  >
                    <p>Linkedin</p>
                  </a>
                </Magnetic>
              </div>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
