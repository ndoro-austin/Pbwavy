import styles from "./GridBackground.module.css";
import { motion } from "framer-motion";


import { useEffect, useState } from 'react';

function useResponsiveGridCount(desktopCount: number, mobileCount: number) {
  const [count, setCount] = useState(desktopCount);
  useEffect(() => {
    function handleResize() {
      setCount(window.innerWidth <= 600 ? mobileCount : desktopCount);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktopCount, mobileCount]);
  return count;
}

export default function GridBackground() {
  const numLines = useResponsiveGridCount(8, 4);
  const numSecondaryLines = useResponsiveGridCount(8, 4);

  return (
    <div className={styles.grid}>
      {/* Main grid */}
      <div className={styles.mainGrid}>
        {[...Array(numLines)].map((_, i) => (
          <motion.div
            key={`main-${i}`}
            className={styles.gridLine}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100%', opacity: 1 }}
            transition={{
              delay: i * 0.15,
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Secondary grid */}
      <div className={styles.secondaryGrid}>
        {[...Array(numSecondaryLines)].map((_, i) => (
          <motion.div
            key={`secondary-${i}`}
            className={styles.secondaryGridLine}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100%', opacity: 1 }}
            transition={{
              delay: i * 0.15, // faster sequence
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

