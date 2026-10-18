// Tipos y utilidades del catálogo que se pueden usar tanto en el servidor como en el navegador.

export type Species = "perro" | "gato";

export type Variant = {
  sku: string;
  size: string;
  color: string;
  priceCop: number;
  stock: number;
};

export type Product = {
  slug: string;
  name: string;
  description: string;
  species: Species;
  variants: Variant[];
};

// Color de fondo de la imagen provisional para cada color de saco.
export const COLOR_SWATCHES: Record<string, string> = {
  Rojo: "#dc2626",
  Azul: "#2563eb",
  Gris: "#6b7280",
  Rosado: "#f472b6",
  Verde: "#16a34a",
  Mostaza: "#ca8a04",
  Beige: "#d6c3a3",
};

export function minPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.priceCop));
}

export function productColors(product: Product): string[] {
  return [...new Set(product.variants.map((v) => v.color))];
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatCop(value: number): string {
  return copFormatter.format(value);
}
