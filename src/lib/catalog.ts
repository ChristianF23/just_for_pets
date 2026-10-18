import "server-only";
import { cache } from "react";
import { and, asc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { products, productVariants } from "@/db/schema";
import type { Product, Species } from "./products";

export async function getProducts(species?: Species): Promise<Product[]> {
  const rows = await db
    .select()
    .from(products)
    .where(
      species
        ? and(eq(products.active, true), eq(products.species, species))
        : eq(products.active, true),
    )
    .orderBy(asc(products.id));
  return withVariants(rows);
}

// cache() evita consultar dos veces el mismo producto (metadatos y página) en una visita.
export const getProduct = cache(async function getProduct(
  slug: string,
): Promise<Product | undefined> {
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.active, true)));
  return (await withVariants(rows))[0];
});

async function withVariants(
  rows: (typeof products.$inferSelect)[],
): Promise<Product[]> {
  if (rows.length === 0) return [];
  const variants = await db
    .select()
    .from(productVariants)
    .where(
      inArray(
        productVariants.productId,
        rows.map((r) => r.id),
      ),
    )
    .orderBy(asc(productVariants.id));
  return rows
    .map((r) => ({
      slug: r.slug,
      name: r.name,
      description: r.description,
      species: r.species,
      variants: variants
        .filter((v) => v.productId === r.id)
        .map(({ sku, size, color, priceCop, stock }) => ({
          sku,
          size,
          color,
          priceCop,
          stock,
        })),
    }))
    .filter((p) => p.variants.length > 0);
}
