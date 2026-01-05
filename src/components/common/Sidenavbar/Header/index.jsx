
'use client'
import styles from './style.module.scss'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '../nav';
import { usePathname } from 'next/navigation';
import Magnetic from '../../Magnetic';
import Rounded from '../../RoundedButton';
import BackgroundMusic from '../../BackgroundMusic/BackgroundMusic';

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false); // New state for scroll

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  // Effect to toggle body scroll lock
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isActive]);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // New useEffect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 50); // Set scrolledDown if scroll position is > 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          {isMobile ? (
            scrolledDown ? (
              <div className={styles.mobileHeaderContainer}>
                <BackgroundMusic />
                <Rounded onClick={() => { setIsActive(!isActive); }} className={`${styles.button} ${styles.scrolledMenuButton}`}>
                  <Magnetic>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                  </Magnetic>
                </Rounded>
              </div>
            ) : (
              <div className={styles.mobileHeaderContainer}>
                <BackgroundMusic />
                <motion.div
                  className={`${styles.menuButton}`}
                  onClick={() => setIsActive(!isActive)}
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
                >
                  <span className={styles.dot} />
                  <span className={styles.menuLabel}>Menu</span>
                </motion.div>
              </div>
            )
          ) : (
            <Rounded onClick={() => { setIsActive(!isActive); }} className={`${styles.button}`}>
              <Magnetic>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
              </Magnetic>
            </Rounded>
          )}
        </div>
      </div>
      
      {/* Overlay for preventing clicks and closing sidenav */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={styles.overlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsActive(false)} // Close sidenav on overlay click
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  );
}