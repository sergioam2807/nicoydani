import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { StorageAdapter } from "./types";

/**
 * Adapter por defecto: guarda las fotos en /public/uploads.
 * Útil para desarrollo/demo sin depender de credenciales de nube.
 * Para producción real, configura STORAGE_PROVIDER=s3 (o completa el
 * adapter de GCS) ya que este disco es efímero en la mayoría de hosts.
 */
export const localAdapter: StorageAdapter = {
  async upload({ buffer, fileName }) {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    await writeFile(path.join(uploadsDir, safeName), buffer);

    return { url: `/uploads/${safeName}` };
  },
};
