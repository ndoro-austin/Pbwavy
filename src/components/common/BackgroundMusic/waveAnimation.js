import gsap from "gsap";

export const initWaveAnimation = (waveRef, isPlaying) => {
  if (!waveRef.current) return;

  // Kill any existing animations first
  gsap.killTweensOf(waveRef.current);

  if (isPlaying) {
    // Oscillating wave animation - smooth up and down motion
    gsap.to(waveRef.current, {
      keyframes: [
        { attr: { d: "M2 10 Q 8 2 12 8 Q 16 14 22 6" }, duration: 0.3 },
        { attr: { d: "M2 8 Q 8 0 12 8 Q 16 16 22 4" }, duration: 0.3 },
        { attr: { d: "M2 10 Q 8 2 12 8 Q 16 14 22 6" }, duration: 0.3 },
      ],
      repeat: -1,
      ease: "sine.inOut",
    });
  }
};

