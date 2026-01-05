"use client";
import Navbar from "./../components/common/Navbar/Navbar";
import GridBackground from "./../components/Homepage/herrosection/Gridbackground/GridBackground";
import Content from "./../components/Homepage/herrosection/Content";
import LocationBadge from "./../components/Homepage/herrosection/Locationbadge/Locationbadge";
import Description from "./../components/Homepage/description";
import Projects from "./../components/Homepage/Projects";
import Sliding from "./../components/Homepage/Sliding";
import Footer from "./../components/common/Footer";

import { useEffect, useState } from "react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return null; // Or you can return a loader/spinner here
  }

  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>
        <main
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#d7d7d7ff",
            position: "relative",
          }}
        >
          <Navbar />
          <Content />
          <GridBackground />
          <LocationBadge />
        </main>
        <div style={{ background: "#fff", paddingTop: "32px" }}>
          <Description />
          <Projects />
          <Sliding />
        </div>
      </div>
      <Footer />
    </>
  );
}
