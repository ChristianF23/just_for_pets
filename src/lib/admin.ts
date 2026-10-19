import "server-only";
import { asc, count, eq, sum } from "drizzle-orm";
import { db } from "@/db";
import { products, productVariants } from "@/db/schema";

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
  return { ...product, variants };
}
