"use client";

import { useState } from "react";
import { Heart, Copy, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function GiftEnvelope() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyAccount() {
    navigator.clipboard.writeText(siteConfig.gift.accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="regalo" className="bg-brand-50 px-6 py-24 text-center">
      <h2 className="font-display text-3xl text-brand-900 sm:text-4xl">
        Regalo de novios
      </h2>
      <p className="mx-auto mt-3 max-w-md text-brand-600">
        {siteConfig.gift.message}
      </p>

      {/* Alto extra reservado para que la carta pueda salir del sobre sin
          encimarse con el texto de arriba. */}
      <div className="relative mx-auto mt-10 h-[30rem] w-full max-w-sm">
        <div
          className="absolute inset-x-0 bottom-0 h-72"
          style={{ perspective: "1400px" }}
        >
          {/* Carta */}
          <div
            className={cn(
              "absolute inset-x-4 bottom-3 flex flex-col items-center justify-center gap-2 rounded-lg bg-paper p-6 shadow-md transition-transform duration-700 ease-out",
              open ? "-translate-y-[78%]" : "translate-y-0"
            )}
            style={{ height: "80%", zIndex: open ? 30 : 10 }}
          >
            <p className="font-display text-xl text-brand-900">
              {siteConfig.gift.bank}
            </p>
            <p className="text-sm text-brand-600">
              {siteConfig.gift.accountType}
            </p>
            <button
              type="button"
              onClick={copyAccount}
              className="mt-1 flex items-center gap-2 rounded-full border border-brand-300 px-4 py-2 font-mono text-lg tracking-wider text-brand-900 transition-colors hover:bg-brand-50"
            >
              {siteConfig.gift.accountNumber}
              {copied ? (
                <Check size={16} className="text-accent-600" />
              ) : (
                <Copy size={16} className="text-brand-500" />
              )}
            </button>
            <p className="mt-2 text-sm text-brand-700">
              {siteConfig.gift.holderName}
            </p>
            <p className="text-xs text-brand-500">RUT {siteConfig.gift.rut}</p>
            <p className="text-xs text-brand-500">{siteConfig.gift.email}</p>
          </div>

          {/* Cuerpo/frente del sobre (opaco, oculta la carta por completo) */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-xl bg-brand-200 shadow-xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, transparent 49.5%, rgb(0 0 0 / 0.07) 50%, transparent 50.5%), linear-gradient(to bottom left, transparent 49.5%, rgb(0 0 0 / 0.07) 50%, transparent 50.5%)",
            }}
          />

          {/* Solapa superior (se abre) */}
          <div
            className="absolute inset-x-0 top-0 z-40 h-[55%] origin-top rounded-t-xl bg-brand-400 transition-transform duration-700 ease-out [backface-visibility:hidden]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: open ? "rotateX(-180deg)" : "rotateX(0deg)",
            }}
          />

          {/* Sello */}
          {!open && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir sobre"
              className="absolute left-1/2 top-[38%] z-50 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-500 text-paper shadow-lg transition-transform hover:scale-110"
            >
              <Heart size={22} fill="currentColor" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
