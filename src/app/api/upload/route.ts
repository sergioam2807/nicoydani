import { NextResponse } from "next/server";
import { getStorageAdapter } from "@/lib/storage";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const adapter = getStorageAdapter();

  try {
    const result = await adapter.upload({
      buffer,
      fileName: file.name,
      contentType: file.type || "application/octet-stream",
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error subiendo foto:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al subir la foto." },
      { status: 500 }
    );
  }
}
