"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addImage } from "./actions";

// Sube las fotos directo del navegador a Vercel Blob y luego las asocia al producto.
export function ImageUploader({ productId }: { productId: number }) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const files = Array.from(input.files ?? []);
    if (files.length === 0) return;
    setError(null);
    try {
      for (const [i, file] of files.entries()) {
        setStatus(`Subiendo ${i + 1} de ${files.length}…`);
        const blob = await upload(`productos/${productId}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/admin/api/upload",
        });
        await addImage(productId, blob.url);
      }
      router.refresh();
    } catch (e) {
      setError((e as Error).message || "No se pudo subir la foto");
    } finally {
      setStatus(null);
      input.value = "";
    }
  }

  return (
    <div>
      <label className="inline-flex cursor-pointer items-center rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 has-[:disabled]:opacity-60">
        {status ?? "Subir fotos"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={status !== null}
          onChange={onChange}
          className="sr-only"
        />
      </label>
      <p className="mt-2 text-xs text-gray-500">
        JPG, PNG o WebP de hasta 10 MB. Lo ideal son fotos cuadradas.
      </p>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
