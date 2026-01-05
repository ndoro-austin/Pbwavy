"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../common/Navbar/Navbar";
import styles from "./style.module.scss";
import Magnetic from "../common/Magnetic";
import RoundedButton from "../common/RoundedButton";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import MobileContact from "./MobileContact"; // Import MobileContact

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

export default function ContactPage() {
  const isMobile = useIsMobile(); // Use the hook
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const [kenyaTime, setKenyaTime] = React.useState("");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({
    type: "",
    message: "",
  });

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

  // Auto-dismiss message after 4 seconds
  React.useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.message]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        // Reset form
        setForm({
          name: "",
          email: "",
          organization: "",
          services: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isMobile) {
    return (
      <MobileContact
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
      />
    );
  }

  return (
    <div ref={container} className={styles.pageBg}>
      <Navbar />

      <div className={styles.contactContainer}>
        <motion.div
          className={styles.leftSection}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className={styles.title}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          >
            <span className={styles.bacheloretteFont}>Your</span> next big
            <br />
            project starts here{" "}
          </motion.div>
          <motion.div
            className={styles.formList}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
          >
            <div className={styles.formItem}>
              <span className={styles.number}>01</span>
              <div>
                <label className={styles.label} htmlFor="name">
                  What's your name?
                </label>
                <div style={{ marginTop: "0.5em" }}>
                  <input
                    className={styles.value}
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Austin Ndoro Mwangiri*"
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.formItem}>
              <span className={styles.number}>02</span>
              <div>
                <label className={styles.label} htmlFor="email">
                  What's your email?
                </label>
                <div style={{ marginTop: "0.5em" }}>
                  <input
                    className={styles.value}
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="austinndoro03@gmail.com*"
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.formItem}>
              <span className={styles.number}>03</span>
              <div>
                <label className={styles.label} htmlFor="organization">
                  What's the name of your organization?
                </label>
                <div style={{ marginTop: "0.5em" }}>
                  <input
                    className={styles.value}
                    type="text"
                    name="organization"
                    id="organization"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Pbwavy®"
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.formItem}>
              <span className={styles.number}>04</span>
              <div>
                <label className={styles.label} htmlFor="services">
                  What services are you looking for?
                </label>
                <div style={{ marginTop: "0.5em" }}>
                  <input
                    className={styles.value}
                    type="text"
                    name="services"
                    id="services"
                    value={form.services}
                    onChange={handleChange}
                    placeholder="Brand optimization, Branding..."
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.formItem}>
              <span className={styles.number}>05</span>
              <div>
                <label className={styles.label} htmlFor="message">
                  Your message
                </label>
                <div style={{ marginTop: "0.5em" }}>
                  <textarea
                    className={styles.value}
                    name="message"
                    id="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hello Austin, can you help me with...*"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.rightSection}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          <div className={styles.profileWrapper}>
            <img
              src="/images/Austin.png"
              alt="Profile"
              className={styles.profileImg}
            />
            <div className={styles.arrow}>&#8595;</div>
          </div>
          <div className={styles.detailsWrapper}>
            <div className={styles.detailsBlock}>
              <div className={styles.detailsTitle}>CONTACT DETAILS</div>
              <div className={styles.detailsText}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li>
                    <Magnetic>
                      <span className={styles.socialLink}>
                        austinndoro03@gmail.com
                      </span>
                    </Magnetic>
                  </li>
                  <li>
                    <Magnetic>
                      <span className={styles.socialLink}>
                        +254 759 261 332
                      </span>
                    </Magnetic>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.detailsBlock}>
              <div className={styles.detailsTitle}>BUSINESS DETAILS</div>
              <div className={styles.detailsText}>
                Austin Ndoro B.V.
                <br />
                CoC:896111
                <br />
                VAT:NL78394455A02
                <br />
                Location: Nairobi Kenya
              </div>
            </div>
            <div className={styles.detailsBlock}>
              <div className={styles.detailsTitle}>SOCIALS</div>
              <div className={styles.detailsText}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li>
                    <Magnetic>
                      <span className={styles.socialLink}>Awwwards</span>
                    </Magnetic>
                  </li>
                  <li>
                    <Magnetic>
                      <span className={styles.socialLink}>Instagram</span>
                    </Magnetic>
                  </li>
                  <li>
                    <Magnetic>
                      <span className={styles.socialLink}>Twitter X</span>
                    </Magnetic>
                  </li>
                  <li>
                    <Magnetic>
                      <span className={styles.socialLink}>LinkedIn</span>
                    </Magnetic>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status message */}
      {submitStatus.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={
            submitStatus.type === "success"
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {submitStatus.message}
        </motion.div>
      )}

      {/* Title, image, and nav section above info */}
      <div className={styles.title}>
        <div className={styles.line}></div>
        <motion.div style={{ x }} className={styles.buttonContainer}>
          <div
            onClick={handleSubmit}
            style={{
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            <RoundedButton
              backgroundColor={"#334BD3"}
              className={styles.button}
            >
              <p>{isSubmitting ? "Sending..." : "Send it!"}</p>
            </RoundedButton>
          </div>
        </motion.div>
        <motion.svg
          style={{ rotate, scale: 2 }}
          className={styles.svgRight}
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

      {/* Info section below main container */}
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
              {/* kenyaTime should be defined in the component if you want live time */}
              {typeof kenyaTime !== "undefined" ? kenyaTime : "EAT"}
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
      {/* Close main pageBg container */}
    </div>
  );
}
