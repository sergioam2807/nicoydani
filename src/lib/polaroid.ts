import fs from "node:fs";
import path from "node:path";
import type { Card } from "@ikefakis/react-polaroid-photo-deck";
import { siteConfig } from "@/config/site";

const POLAROID_DIR = path.join(process.cwd(), "public", "polaroid");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

// Lee todas las fotos dentro de /public/polaroid y genera las cartas del Deck.
// Agrega o quita fotos en esa carpeta y aparecerán/desaparecerán automáticamente.
// El orden sigue siteConfig.gallery.photoOrder; el resto va después, alfabético.
export function getPolaroidCards(): Card[] {
  if (!fs.existsSync(POLAROID_DIR)) return [];

  const order = siteConfig.gallery.photoOrder;

  const files = fs
    .readdirSync(POLAROID_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => {
      const indexA = order.indexOf(a);
      const indexB = order.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  return files.map((file) => ({ url: `/polaroid/${encodeURIComponent(file)}` }));
}
