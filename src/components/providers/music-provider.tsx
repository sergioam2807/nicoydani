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
  playFromGesture: () => void;
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

  // Llamar audio.play() directamente dentro del handler de un clic (no en un
  // useEffect posterior) para que navegadores estrictos (ej. WebView de
  // WhatsApp/Instagram) lo reconozcan como iniciado por un gesto del usuario.
  function playFromGesture() {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }

  return (
    <MusicContext.Provider
      value={{
        playing,
        muted,
        toggleMuted: () => setMuted((m) => !m),
        togglePlaying: () => setPlaying((p) => !p),
        playFromGesture,
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
