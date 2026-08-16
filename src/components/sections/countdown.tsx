"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { AddToCalendarButton } from "@/components/sections/add-to-calendar-button";

function getTimeLeft() {
  const diff = siteConfig.event.date.getTime() - Date.now();
  const clamped = Math.max(diff, 0);

  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    done: diff <= 0,
  };
}

const UNITS: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
];

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="cuenta-regresiva"
      className="bg-brand-900 px-6 py-24 text-center text-paper"
    >
      <h2 className="font-display text-3xl sm:text-4xl">Falta poco para celebrar</h2>

      <div className="mt-10 flex justify-center gap-4 sm:gap-8">
        {UNITS.map(({ key, label }) => (
          <div
            key={key}
            className="flex w-16 flex-col items-center rounded-card bg-paper/10 py-4 sm:w-24"
          >
            <span className="font-display text-3xl sm:text-5xl">
              {timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest text-brand-200">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <AddToCalendarButton />
      </div>
    </section>
  );
}
