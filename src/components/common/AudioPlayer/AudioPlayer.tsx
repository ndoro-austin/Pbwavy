"use client";

import { useRef, useEffect } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  isMuted,
  volume,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let fadeInterval: NodeJS.Timeout | null = null;
    // Set fade durations
    const fadeInDuration = 4000; // 4 seconds for fade in
    const fadeOutDuration = 2500; // 2.5 seconds for fade out
    const fadeTarget = isPlaying ? volume : 0;
    const fadeStep = isPlaying
      ? volume / (fadeInDuration / 100)
      : volume / (fadeOutDuration / 100);

    if (isPlaying) {
      audio.currentTime = 0; // Always start from beginning
      audio.play().catch((error) => console.error("Playback error:", error));
    }

    fadeInterval = setInterval(() => {
      if (!audio) return;
      if (isPlaying && audio.volume < fadeTarget) {
        audio.volume = Math.min(audio.volume + fadeStep, fadeTarget);
        if (audio.volume >= fadeTarget) {
          clearInterval(fadeInterval!);
        }
      } else if (!isPlaying && audio.volume > fadeTarget) {
        audio.volume = Math.max(audio.volume - fadeStep, fadeTarget);
        if (audio.volume <= fadeTarget) {
          clearInterval(fadeInterval!);
          audio.pause();
          audio.currentTime = 0; // Reset to start on pause
        }
      } else {
        clearInterval(fadeInterval!);
      }
    }, 100);

    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, [isPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.volume = volume;
  }, [isMuted, volume]);

  return (
    <audio ref={audioRef} loop preload="auto" crossOrigin="anonymous">
      <source src="/music/Outro - M83.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
