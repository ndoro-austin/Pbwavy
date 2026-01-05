import React, { useRef } from "react";
import styles from "./MobileContact.module.scss";
import Magnetic from "../common/Magnetic";
import RoundedButton from "../common/RoundedButton";
import Navbar from "../common/Navbar/Navbar";

export default function MobileContact({
  form,
  handleChange,
  handleSubmit,
  isSubmitting,
  submitStatus,
}) {
  const container = useRef(null);
  const [localTime, setLocalTime] = React.useState("");

  React.useEffect(() => {
    function updateTime() {
      const now = new Date();
      // Nairobi, Kenya is GMT+3
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Africa/Nairobi",
      };
      setLocalTime(now.toLocaleTimeString("en-GB", options) + " GMT+3");
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Navbar />

      <div ref={container} className={styles.mobilePageBg}>
        <div className={styles.mobileContactContainer}>
          {/* Header Section: image and title horizontally aligned */}
          <div className={styles.mobileHeaderRow}>
            <div className={styles.headerTopRow}>
              <img
                src="/images/Austin.png"
                alt="Profile"
                className={styles.profileImg}
              />
              <h2 className={styles.titleText}>Let's start a</h2>
            </div>
            <span className={styles.projectTogetherText}>project together</span>
          </div>
          {/* Details Section */}
          <div className={styles.mobileDetailsSection}>
            <div className={styles.detailsBlock}>
              <div className={styles.detailsTitle}>BUSINESS DETAILS</div>
              <div className={styles.detailsText}>
                Austin Ndoro B.V.
                <br />
                CoC:896111
                <br />
                Location:  Kenya
              </div>
            </div>
            <div className={styles.detailsBlock}>
              <div className={styles.detailsTitle}>CONTACT DETAILS</div>
              <div className={styles.detailsText}>
                <ul>
                  <li>
                    <Magnetic>
                      <span className={styles.socialLink}>
                        info@austinwavy.com
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
          </div>
          {/* Divider */}
          <hr className={styles.mobileDivider} />

          {/* Status message */}
          {submitStatus && submitStatus.message && (
            <div
              className={
                submitStatus.type === "success"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {submitStatus.message}
            </div>
          )}

          {/* Form Section with numbering */}
          <form className={styles.mobileFormSection} onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <span className={styles.formNumber}>01</span>
              <label htmlFor="name">What's your name?</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Austin Ndoro Mwangiri*"
                required
              />
            </div>
            <div className={styles.formItem}>
              <span className={styles.formNumber}>02</span>
              <label htmlFor="email">What's your email?</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="austinndoro03@gmail.com*"
                required
              />
            </div>
            <div className={styles.formItem}>
              <span className={styles.formNumber}>03</span>
              <label htmlFor="organization">
                What's the name of your organization?
              </label>
              <input
                type="text"
                name="organization"
                id="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Pbwavy®"
                required
              />
            </div>
            <div className={styles.formItem}>
              <span className={styles.formNumber}>04</span>
              <label htmlFor="services">
                What services are you looking for?
              </label>
              <input
                type="text"
                name="services"
                id="services"
                value={form.services}
                onChange={handleChange}
                placeholder="Brand optimization, Branding..."
                required
              />
            </div>
            <div className={styles.formItem}>
              <span className={styles.formNumber}>05</span>
              <label htmlFor="message">Your message</label>
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hello Austin, can you help me with...*"
                required
              />
            </div>
            <div className={styles.buttonWrapper}>
              <div
                onClick={handleSubmit}
                style={{
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <RoundedButton
                  
                  className={styles.button}
                >
                  <p>{isSubmitting ? "Sending..." : "Send it!"}</p>
                </RoundedButton>
              </div>
            </div>
          </form>
          <hr className={styles.bottomDivider} />
          <div>
            <div className={styles.socialsLabel}>SOCIALS</div>
            <div className={styles.socialsRow}>
              <span>Awwwards</span>
              <span>Instagram</span>
              <span>Twitter</span>
              <span>LinkedIn</span>
            </div>
          </div>
          <hr className={styles.bottomDivide} />
          <div className={styles.mobileInfoSection}>
            <div>
              <div className={styles.infoLabel}>VERSION</div>
              <div className={styles.infoValue}>2022 © Edition</div>
            </div>
            <div>
              <div className={styles.infoLabel}>LOCAL TIME</div>
              <div className={styles.infoValue}>{localTime}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
