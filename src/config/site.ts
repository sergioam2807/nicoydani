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
    date: new Date("2026-11-21T14:00:00-04:00"), // 21 de noviembre, 15:00 hrs
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
    name: "Los Laureles",
    address: "Los Laureles Poste 148 el Maqui camino Tabolango",
    // Si tienes coordenadas exactas, complétalas para links más precisos
    lat: null as number | null,
    lng: null as number | null,
  },

  // Confirmación de asistencia vía WhatsApp
  rsvp: {
    // Número en formato internacional sin '+' ni espacios, ej: 56912345678
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56974280077",
  },

  // Música de fondo
  music: {
    src: "/audio/background-music.mp3",
    title: "Nuestra canción",
  },

  // Datos de cuenta para regalo de novios (se muestran dentro del sobre)
  gift: {
    message:
      "Tu presencia es el mejor regalo, pero si quieres tener un detalle con nosotros, aquí tienes nuestros datos.",
    holderName: "Daniel Alvarez Medina",
    rut: "15.764.000-3",
    bank: "Banco de Chile",
    accountType: "Cuenta Corriente",
    accountNumber: "001471703003",
    email: "daniel.alvarez.medina@gmail.com",
  },

  // Código de vestimenta
  dressCode: {
    title: "Formal",
    description:
      "Nos encantaría que nos acompañaras con un look formal para esta noche tan especial.",
    note: "Por favor evita el blanco y tonos muy similares; están reservados para la novia.",
  },

  // Las fotos del deck se leen automáticamente desde /public/polaroid/.
} as const;

export type SiteConfig = typeof siteConfig;
