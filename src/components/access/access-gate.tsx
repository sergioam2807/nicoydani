"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/components/providers/music-provider";

export function AccessGate({ children }: { children: ReactNode }) {
  // En el servidor no hay localStorage, así que siempre partimos mostrando
  // la portada (que es justamente el comportamiento deseado); si el
  // invitado ya había ingresado el código, se desbloquea apenas monta.
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const { playFromGesture } = useMusic();

  useEffect(() => {
    const stored = window.localStorage.getItem(siteConfig.access.storageKey);
    if (stored === "true") setUnlocked(true);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (normalized === siteConfig.access.code.toUpperCase()) {
      window.localStorage.setItem(siteConfig.access.storageKey, "true");
      setUnlocked(true);
      setError(false);
      playFromGesture();
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-brand-800 via-brand-700 to-brand-900 px-6 text-center text-paper">
      <p className="font-display text-sm uppercase tracking-[0.35em] text-accent-400">
        Nos casamos
      </p>
      <h1 className="font-display mt-4 text-4xl sm:text-6xl">
        {siteConfig.couple.groom} &amp; {siteConfig.couple.bride}
      </h1>
      <p className="mt-3 text-brand-100">
        {siteConfig.event.date.toLocaleDateString("es-CL", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex w-full max-w-xs flex-col items-center gap-3"
      >
        <label htmlFor="access-code" className="text-sm text-brand-100">
          Ingresa el código de tu invitación
        </label>
        <input
          id="access-code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false);
          }}
          placeholder="Código de acceso"
          autoComplete="off"
          className="w-full rounded-full border border-brand-300/40 bg-paper/10 px-5 py-3 text-center tracking-widest text-paper placeholder:text-brand-200 focus:border-accent-400 focus:outline-none"
        />
        {error && (
          <p className="text-sm text-red-300">
            Código incorrecto, inténtalo de nuevo.
          </p>
        )}
        <Button type="submit" variant="accent" size="lg" className="w-full">
          Ingresar
        </Button>
      </form>
    </div>
  );
}
