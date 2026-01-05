"use client";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "typeface-inter";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader/index.jsx";
import PageTransition from "../components/common/PageTransition";
import AudioPlayer from "../components/common/AudioPlayer/AudioPlayer";
import { PreloaderProvider } from "../components/Preloader/PreloaderContext";
import { NavigationProvider } from "../components/common/NavigationProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * PRELOADER, CURSOR & RESET SCROLL
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => setIsPlaying((prev) => !prev);

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <title>Engineered by Austin</title>
        
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <link rel="icon" href="/images/wavy.png" type="image/png" />
      </head>

      <body className="antialiased font-inter responsive-layout">
        <PreloaderProvider>
          <NavigationProvider isPlaying={isPlaying} toggleMusic={toggleMusic}>
            <AnimatePresence mode="wait">
              {isLoading && <Preloader />}
            </AnimatePresence>

            {!isLoading && <PageTransition>{children}</PageTransition>}

            {/* 🎵 Invisible audio element controlled programmatically */}
            <AudioPlayer isPlaying={isPlaying} isMuted={false} volume={0.8} />
          </NavigationProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
