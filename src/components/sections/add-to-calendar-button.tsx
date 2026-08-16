"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadIcsFile, googleCalendarUrl } from "@/lib/calendar";
import { cn } from "@/lib/cn";

export function AddToCalendarButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <Button
        type="button"
        variant="accent"
        size="lg"
        onClick={() => setOpen((o) => !o)}
      >
        <CalendarPlus size={18} />
        Agregar al calendario
      </Button>

      {open && (
        <div className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-card border border-brand-200 bg-paper text-left shadow-xl">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block px-4 py-3 text-sm text-brand-800 hover:bg-brand-50"
            )}
            onClick={() => setOpen(false)}
          >
            Google Calendar
          </a>
          <button
            type="button"
            onClick={() => {
              downloadIcsFile();
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left text-sm text-brand-800 hover:bg-brand-50"
          >
            Descargar .ics (Apple / Outlook)
          </button>
        </div>
      )}
    </div>
  );
}
