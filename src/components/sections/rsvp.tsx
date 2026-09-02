"use client";

import { useState, type FormEvent } from "react";
import { Check, MessageCircle, MessageSquare, User, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildRsvpWhatsappUrl, type RsvpAnswer } from "@/lib/whatsapp";

export function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<RsvpAnswer["attending"]>("si");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const url = buildRsvpWhatsappUrl({
      name: name.trim(),
      attending,
      guests,
      message: message.trim() || undefined,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="confirmar" className="bg-brand-900 px-6 py-24 text-paper">
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Confirma tu asistencia</h2>
        <p className="mt-3 text-brand-200">
          Cuéntanos si nos acompañarás. Al confirmar se abrirá WhatsApp con tu
          mensaje listo para enviar.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
          <div>
            <label
              htmlFor="rsvp-name"
              className="flex items-center gap-2 text-sm text-brand-200"
            >
              <User size={16} />
              Nombre completo
            </label>
            <input
              id="rsvp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-full border border-brand-300/40 bg-paper/10 px-5 py-3 text-paper placeholder:text-brand-300 focus:border-accent-400 focus:outline-none"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <span className="text-sm text-brand-200">¿Asistirás?</span>
            <div className="mt-2 flex gap-3">
              {(["si", "no"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAttending(option)}
                  className={`flex-1 rounded-full border px-4 py-2 text-sm transition-colors ${
                    attending === option
                      ? "border-accent-400 bg-accent-500 text-paper"
                      : "border-brand-300/40 text-brand-200 hover:bg-paper/10"
                  }`}
                >
                  {option === "si" ? "Sí, asistiré" : "No podré ir"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="rsvp-message" className="text-sm text-brand-200">
              Mensaje (opcional)
            </label>
            <textarea
              id="rsvp-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-2xl border border-brand-300/40 bg-paper/10 px-5 py-3 text-paper placeholder:text-brand-300 focus:border-accent-400 focus:outline-none"
              placeholder="Un mensaje para los novios..."
            />
          </div>

          <Button type="submit" variant="accent" size="lg" className="mt-2 w-full">
            <MessageCircle size={18} />
            Confirmar por WhatsApp
          </Button>
        </form>
      </div>
    </section>
  );
}
