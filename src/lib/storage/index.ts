import type { StorageAdapter } from "./types";
import { localAdapter } from "./local-adapter";
import { s3Adapter } from "./s3-adapter";
import { gcsAdapter } from "./gcs-adapter";

/**
 * Punto único de cambio: STORAGE_PROVIDER decide a dónde van las fotos
 * que suben los invitados. "local" (default) no requiere configuración.
 */
export function getStorageAdapter(): StorageAdapter {
  switch (process.env.STORAGE_PROVIDER) {
    case "s3":
      return s3Adapter;
    case "gcs":
      return gcsAdapter;
    default:
      return localAdapter;
  }
}

export type { StorageAdapter, UploadInput, UploadResult } from "./types";
