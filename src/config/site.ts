/**
 * Configuración central del sitio de la boda.
 * Todo el contenido (nombres, fecha, ubicación, WhatsApp, código de acceso)
 * vive aquí. Editar este archivo actualiza toda la web.
 */

export const siteConfig = {
  couple: {
    groom: "Daniel",
    bride: "Nicol",
    hashtag: "#DanielYNicolSeCasan",
  },

  hero: {
    backgroundImage: "/hero/portada.jpg",
  },

  // Fecha y hora del matrimonio (usada por countdown y "agregar al calendario")
  event: {
    date: new Date("2026-11-21T15:00:00-04:00"), // 21 de noviembre, 15:00 hrs
    title: "Matrimonio de Daniel & Nicol",
    description: "¡Acompáñanos a celebrar nuestro matrimonio!",
    durationHours: 6,
  },

  // Código de acceso fijo para ver la invitación completa
  access: {
    code: process.env.NEXT_PUBLIC_ACCESS_CODE || "BODA2026",
    storageKey: "wedding-access-granted",
  },

  // Ubicación del lugar
  venue: {
    name: "Nombre del Lugar / Salón",
    address: "Dirección completa del lugar, Comuna, Ciudad",
    // Si tienes coordenadas exactas, complétalas para links más precisos
    lat: null as number | null,
    lng: null as number | null,
  },

  // Confirmación de asistencia vía WhatsApp
  rsvp: {
    // Número en formato internacional sin '+' ni espacios, ej: 56912345678
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56900000000",
  },

  // Música de fondo
  music: {
    src: "/audio/background-music.mp3",
    title: "Nuestra canción",
  },

  gallery: {
    credit: "Fotografía por Karla",
    // Las fotos del deck se leen automáticamente desde /public/polaroid/.
  },
} as const;

export type SiteConfig = typeof siteConfig;
