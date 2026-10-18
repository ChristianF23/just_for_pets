// Catálogo de ejemplo mientras conectamos la base de datos (Neon).
// La forma de los datos sigue el esquema de src/db/schema.ts para que el cambio sea directo.

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

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;

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

function variants(
  prefix: string,
  colors: string[],
  sizes: readonly string[],
  priceCop: number,
): Variant[] {
  return colors.flatMap((color) =>
    sizes.map((size) => ({
      sku: `${prefix}-${color.slice(0, 3).toUpperCase()}-${size}`,
      size,
      color,
      priceCop,
      stock: 5,
    })),
  );
}

const products: Product[] = [
  {
    slug: "saco-tejido-clasico-perro",
    name: "Saco tejido clásico",
    description:
      "Saco tejido de cuello alto, suave y abrigador para los días fríos. Fácil de poner y lavable a máquina.",
    species: "perro",
    variants: variants("STC", ["Rojo", "Azul", "Gris"], SIZES, 59900),
  },
  {
    slug: "buzo-polar-perro",
    name: "Buzo polar con capota",
    description:
      "Buzo en tela polar con capota y bolsillo trasero. Ideal para paseos en la mañana y la noche.",
    species: "perro",
    variants: variants("BPP", ["Gris", "Verde"], SIZES, 69900),
  },
  {
    slug: "chaqueta-impermeable-perro",
    name: "Chaqueta impermeable",
    description:
      "Chaqueta liviana que protege de la lluvia, con forro interior suave y abertura para el arnés.",
    species: "perro",
    variants: variants("CIP", ["Mostaza", "Azul"], SIZES, 89900),
  },
  {
    slug: "saco-tejido-gato",
    name: "Saco tejido para gato",
    description:
      "Saco tejido liviano que abriga sin incomodar. Pensado para gatos que sienten frío en casa.",
    species: "gato",
    variants: variants("STG", ["Rosado", "Gris"], ["XS", "S", "M"], 49900),
  },
  {
    slug: "buzo-suave-gato",
    name: "Buzo suave para gato",
    description:
      "Buzo de algodón suave y elástico, cómodo para dormir y jugar. Cierre de velcro en el pecho.",
    species: "gato",
    variants: variants("BSG", ["Beige", "Azul"], ["XS", "S", "M"], 54900),
  },
];

export function getProducts(species?: Species): Product[] {
  return species ? products.filter((p) => p.species === species) : products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

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
