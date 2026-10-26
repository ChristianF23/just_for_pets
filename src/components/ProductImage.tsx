import Image from "next/image";
import { COLOR_SWATCHES, type Species } from "@/lib/products";

// Muestra la foto del producto, o una imagen provisional si todavía no tiene fotos.
export function ProductImage({
  species,
  color,
  src,
  alt = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  className = "",
}: {
  species: Species;
  color: string;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative aspect-square overflow-hidden rounded-2xl bg-gray-100 ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`flex aspect-square items-center justify-center rounded-2xl ${className}`}
      style={{ backgroundColor: `${COLOR_SWATCHES[color] ?? "#e5e7eb"}33` }}
    >
      <span className="text-7xl" aria-hidden>
        {species === "perro" ? "🐶" : "🐱"}
      </span>
    </div>
  );
}
