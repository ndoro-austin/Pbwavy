'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useNavigation } from '../NavigationProvider';
import './style.scss';

// Route mapping
const routes = {
  "/": "Home",
  "/home": "Home",
  "/work": "Work", 
  "/about": "About",
  "/contact": "Contact"
};

// Animation helper
const anim = (variants) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit"
  }
};

// Route text animation - improved timing and easing
const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]},
    transitionEnd: {top: "47.5%"}
  },
  exit: {
    opacity: 1,
    top: "40%",
    transition: {duration: .5, delay: .4, ease: [0.33, 1, 0.68, 1]}
  }
};

// Curve animation factory
const curve = (initialPath, targetPath) => {
  return {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
      d: initialPath,
      transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
    }
  }
};

// SVG translate animation
const translate = {
  initial: {
    top: "-300px"
  },
  enter: {
    top: "-100vh",
    transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]},
    transitionEnd : {
      top: "100vh"
    }
  },
  exit: {
    top: "-300px",
    transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
  }
};

// SVG Component for curved transition
const SVG = ({height, width}) => {
  // Ensure we have valid dimensions
  if (!height || !width) return null;
  
  const initialPath = `
    M0 300 
    Q${width/2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width/2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width/2} 0 ${width} 300
    L${width} ${height}
    Q${width/2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg {...anim(translate)} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      fill: '#000',
      pointerEvents: 'none',
      zIndex: 1000
    }}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const { isInitialLoad } = useNavigation();
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null
  });

  useEffect(() => {
    function resize(){
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    // Set initial dimensions
    resize();
    
    // Add resize listener
    window.addEventListener("resize", resize);
    
    return () => {
      window.removeEventListener("resize", resize);
    }
  }, []);

  // Skip transitions on initial load
  if (isInitialLoad) {
    return (
      <div className="page-content">
        {children}
      </div>
    );
  }

  return (
    <div className='page-transition-container'>
      <div style={{opacity: dimensions.width == null ? 1 : 0}} className='transition-background'/>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="page-wrapper"
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {/* Route text animation */}
          <motion.p className='route-text' {...anim(text)}>
            {routes[pathname] || "Page"}
          </motion.p>
          
          {/* Curved SVG transition */}
          {dimensions.width != null && <SVG {...dimensions}/>}
          
          {/* Page content */}
          <div className="page-content">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}