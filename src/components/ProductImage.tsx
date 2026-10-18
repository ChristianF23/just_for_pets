import { COLOR_SWATCHES, type Species } from "@/lib/products";

// Imagen provisional hasta que tengamos las fotos reales de los sacos.
export function ProductImage({
  species,
  color,
  className = "",
}: {
  species: Species;
  color: string;
  className?: string;
}) {
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
