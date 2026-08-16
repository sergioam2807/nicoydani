"use client";

import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/components/providers/music-provider";
import { cn } from "@/lib/cn";

export function MusicPlayer() {
  const { playing, muted, togglePlaying, toggleMuted } = useMusic();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={toggleMuted}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full bg-brand-800/80 text-paper shadow-lg backdrop-blur transition-transform hover:scale-105"
        )}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <button
        type="button"
        onClick={togglePlaying}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-paper shadow-lg transition-transform hover:scale-105"
      >
        {playing ? (
          <Pause size={18} />
        ) : (
          <Music size={18} className="animate-pulse" />
        )}
      </button>
    </div>
  );
}
