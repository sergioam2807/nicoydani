import fs from "node:fs";
import path from "node:path";
import type { Card } from "@ikefakis/react-polaroid-photo-deck";

const POLAROID_DIR = path.join(process.cwd(), "public", "polaroid");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

// Lee todas las fotos dentro de /public/polaroid y genera las cartas del Deck.
// Agrega o quita fotos en esa carpeta y aparecerán/desaparecerán automáticamente.
// El orden sigue el nombre de archivo (ver comentario en siteConfig.gallery).
export function getPolaroidCards(): Card[] {
  if (!fs.existsSync(POLAROID_DIR)) return [];

  return fs
    .readdirSync(POLAROID_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => ({ url: `/polaroid/${encodeURIComponent(file)}` }));
}
