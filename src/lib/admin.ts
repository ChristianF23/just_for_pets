import "server-only";
import { asc, count, eq, sum } from "drizzle-orm";
import { db } from "@/db";
import { productImages, products, productVariants } from "@/db/schema";

export async function listProducts() {
  return db
    .select({
      id: products.id,
      name: products.name,
      species: products.species,
      active: products.active,
      variantCount: count(productVariants.id),
      totalStock: sum(productVariants.stock).mapWith(Number),
    })
    .from(products)
    .leftJoin(productVariants, eq(productVariants.productId, products.id))
    .groupBy(products.id)
    .orderBy(asc(products.id));
}

export async function getProductForEdit(id: number) {
  const [product] = await db.select().from(products).where(eq(products.id, id));
  if (!product) return undefined;
  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, id))
    .orderBy(asc(productVariants.id));
  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, id))
    .orderBy(asc(productImages.position), asc(productImages.id));
  return { ...product, variants, images };
}

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}
