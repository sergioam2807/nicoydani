"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/config/site";

type MusicContextValue = {
  playing: boolean;
  muted: boolean;
  toggleMuted: () => void;
  togglePlaying: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.play().catch(() => {
        // La mayoría de navegadores bloquean el autoplay con sonido.
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  return (
    <MusicContext.Provider
      value={{
        playing,
        muted,
        toggleMuted: () => setMuted((m) => !m),
        togglePlaying: () => setPlaying((p) => !p),
      }}
    >
      <audio ref={audioRef} src={siteConfig.music.src} loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic debe usarse dentro de <MusicProvider>");
  return ctx;
}
