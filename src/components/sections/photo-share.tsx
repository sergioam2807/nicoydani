"use client";

import { useRef, useState } from "react";
import { Check, Copy, ImageUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type UploadedPhoto = {
  fileName: string;
  url: string;
};

export function PhotoShare() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedPhoto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    const results: UploadedPhoto[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al subir la foto.");
        results.push({ fileName: file.name, url: data.url });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al subir la foto.");
      }
    }

    setUploaded((prev) => [...results, ...prev]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function copyLink(url: string) {
    const absoluteUrl = new URL(url, window.location.origin).toString();
    await navigator.clipboard.writeText(absoluteUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  return (
    <section id="compartir-fotos" className="bg-paper px-6 py-24 text-center">
      <h2 className="font-display text-3xl text-brand-900 sm:text-4xl">
        Comparte tus fotos
      </h2>
      <p className="mx-auto mt-3 max-w-md text-brand-600">
        ¿Tomaste fotos o videos ese día? Súbelos aquí y quedarán guardados
        junto a los del resto de invitados.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button
          type="button"
          variant="accent"
          size="lg"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImageUp size={18} />}
          {uploading ? "Subiendo..." : "Subir fotos"}
        </Button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {uploaded.length > 0 && (
          <ul className="mt-4 w-full max-w-md space-y-2 text-left">
            {uploaded.map((photo) => (
              <li
                key={photo.url}
                className="flex items-center justify-between gap-3 rounded-full border border-brand-200 bg-brand-50 px-4 py-2"
              >
                <span className="truncate text-sm text-brand-700">{photo.fileName}</span>
                <button
                  type="button"
                  onClick={() => copyLink(photo.url)}
                  className="flex shrink-0 items-center gap-1 text-sm text-brand-800 hover:text-accent-600"
                >
                  {copiedUrl === photo.url ? (
                    <>
                      <Check size={16} /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copiar link
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
