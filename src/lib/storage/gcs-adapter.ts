import type { StorageAdapter } from "./types";

/**
 * Adapter para Google Cloud Storage — implementa el mismo contrato que
 * s3-adapter.ts, así que cambiar de proveedor es solo cambiar
 * STORAGE_PROVIDER=gcs y completar esta función. Pasos:
 *
 * 1. npm install @google-cloud/storage
 * 2. Configura GCS_BUCKET_NAME y credenciales (GOOGLE_APPLICATION_CREDENTIALS
 *    apuntando a tu service account JSON, o Application Default Credentials).
 * 3. Reemplaza el cuerpo de abajo con la implementación real (ejemplo comentado).
 */
export const gcsAdapter: StorageAdapter = {
  async upload(): Promise<{ url: string }> {
    throw new Error(
      "El adapter de Google Cloud Storage no está implementado todavía. " +
        "Completa src/lib/storage/gcs-adapter.ts (ver comentarios) o usa STORAGE_PROVIDER=s3 / local."
    );

    // Ejemplo de implementación una vez instalado @google-cloud/storage:
    //
    // const { Storage } = await import("@google-cloud/storage");
    // const storage = new Storage();
    // const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);
    // const key = `wedding-photos/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    // const file = bucket.file(key);
    // await file.save(buffer, { contentType });
    // await file.makePublic();
    // return { url: `https://storage.googleapis.com/${bucket.name}/${key}` };
  },
};
