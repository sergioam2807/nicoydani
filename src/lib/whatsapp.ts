import { siteConfig } from "@/config/site";

export type RsvpAnswer = {
  name: string;
  attending: "si" | "no";
  guests: number;
  message?: string;
};

export function buildRsvpWhatsappUrl(answer: RsvpAnswer) {
  const lines = [
    `Hola! Soy ${answer.name}.`,
    answer.attending === "si"
      ? `Confirmo mi asistencia al matrimonio${answer.guests > 1 ? ` (seremos ${answer.guests})` : ""}.`
      : "Lamentablemente no podré asistir al matrimonio.",
    answer.message ? `Mensaje: ${answer.message}` : "",
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${siteConfig.rsvp.whatsappNumber}?text=${text}`;
}
