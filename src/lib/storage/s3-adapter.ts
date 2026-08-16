import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { StorageAdapter } from "./types";

/**
 * Adapter para AWS S3. Configura estas variables de entorno:
 * - STORAGE_PROVIDER=s3
 * - AWS_REGION
 * - S3_BUCKET_NAME
 * - AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (o credenciales del entorno)
 * - S3_PUBLIC_BASE_URL (opcional, ej. tu dominio de CloudFront)
 */
export const s3Adapter: StorageAdapter = {
  async upload({ buffer, fileName, contentType }) {
    const bucket = process.env.S3_BUCKET_NAME;
    if (!bucket) {
      throw new Error("Falta configurar S3_BUCKET_NAME en las variables de entorno.");
    }

    const client = new S3Client({ region: process.env.AWS_REGION });
    const key = `wedding-photos/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    const publicBaseUrl =
      process.env.S3_PUBLIC_BASE_URL || `https://${bucket}.s3.amazonaws.com`;

    return { url: `${publicBaseUrl}/${key}` };
  },
};
