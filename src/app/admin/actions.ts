"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { products, productVariants } from "@/db/schema";
import {
  checkPassword,
  endSession,
  requireAdmin,
  startSession,
} from "@/lib/auth";

// --- Utilidades de formulario ---

function text(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function wholeNumber(form: FormData, key: string): number | null {
  const raw = text(form, key).replace(/[.\s$]/g, "");
  if (!/^\d+$/.test(raw)) return null;
  return Number(raw);
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isUniqueViolation(error: unknown): boolean {
  const e = error as { code?: string; cause?: { code?: string } };
  return e?.code === "23505" || e?.cause?.code === "23505";
}

function isForeignKeyViolation(error: unknown): boolean {
  const e = error as { code?: string; cause?: { code?: string } };
  return e?.code === "23503" || e?.cause?.code === "23503";
}

function fail(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function refreshStore(slug?: string) {
  revalidatePath("/");
  if (slug) revalidatePath(`/productos/${slug}`);
}

// --- Sesión ---

export async function login(form: FormData) {
  if (!checkPassword(text(form, "password"))) {
    fail("/admin/login", "Clave incorrecta");
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// --- Productos ---

function readProduct(form: FormData, path: string) {
  const name = text(form, "name");
  const species = text(form, "species");
  const slug = slugify(text(form, "slug") || name);
  if (!name) fail(path, "El nombre es obligatorio");
  if (!slug) fail(path, "La dirección web no es válida");
  if (species !== "perro" && species !== "gato") {
    fail(path, "Escoge perro o gato");
  }
  return {
    name,
    slug,
    species: species as "perro" | "gato",
    description: text(form, "description"),
    active: form.get("active") === "on",
  };
}

export async function createProduct(form: FormData) {
  await requireAdmin();
  const path = "/admin/productos/nuevo";
  const values = readProduct(form, path);
  let id: number;
  try {
    [{ id }] = await db
      .insert(products)
      .values(values)
      .returning({ id: products.id });
  } catch (error) {
    if (isUniqueViolation(error)) fail(path, "Ya existe un producto con esa dirección web");
    throw error;
  }
  refreshStore(values.slug);
  redirect(`/admin/productos/${id}?ok=${encodeURIComponent("Producto creado. Ahora agrega sus tallas y colores.")}`);
}

export async function updateProduct(id: number, form: FormData) {
  await requireAdmin();
  const path = `/admin/productos/${id}`;
  const values = readProduct(form, path);
  const [before] = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.id, id));
  try {
    await db.update(products).set(values).where(eq(products.id, id));
  } catch (error) {
    if (isUniqueViolation(error)) fail(path, "Ya existe un producto con esa dirección web");
    throw error;
  }
  refreshStore(before?.slug);
  refreshStore(values.slug);
  redirect(`${path}?ok=${encodeURIComponent("Producto guardado")}`);
}

// --- Variantes (talla + color) ---

function readVariant(form: FormData, path: string) {
  const size = text(form, "size").toUpperCase();
  const color = text(form, "color");
  const sku = text(form, "sku").toUpperCase();
  const priceCop = wholeNumber(form, "priceCop");
  const stock = wholeNumber(form, "stock");
  if (!size || !color || !sku) fail(path, "Talla, color y referencia son obligatorios");
  if (priceCop === null || priceCop <= 0) fail(path, "El precio debe ser un número mayor que cero");
  if (stock === null) fail(path, "El stock debe ser un número entero (0 o más)");
  return { size, color, sku, priceCop, stock };
}

async function productSlug(productId: number) {
  const [row] = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.id, productId));
  return row?.slug;
}

export async function addVariant(productId: number, form: FormData) {
  await requireAdmin();
  const path = `/admin/productos/${productId}`;
  const values = readVariant(form, path);
  try {
    await db.insert(productVariants).values({ productId, ...values });
  } catch (error) {
    if (isUniqueViolation(error)) {
      fail(path, "Ya existe esa combinación de talla y color, o esa referencia");
    }
    throw error;
  }
  refreshStore(await productSlug(productId));
  redirect(`${path}?ok=${encodeURIComponent("Variante agregada")}`);
}

export async function updateVariant(
  productId: number,
  variantId: number,
  form: FormData,
) {
  await requireAdmin();
  const path = `/admin/productos/${productId}`;
  const values = readVariant(form, path);
  try {
    await db
      .update(productVariants)
      .set(values)
      .where(
        and(
          eq(productVariants.id, variantId),
          eq(productVariants.productId, productId),
        ),
      );
  } catch (error) {
    if (isUniqueViolation(error)) {
      fail(path, "Ya existe esa combinación de talla y color, o esa referencia");
    }
    throw error;
  }
  refreshStore(await productSlug(productId));
  redirect(`${path}?ok=${encodeURIComponent("Variante guardada")}`);
}

export async function deleteVariant(productId: number, variantId: number) {
  await requireAdmin();
  const path = `/admin/productos/${productId}`;
  try {
    await db
      .delete(productVariants)
      .where(
        and(
          eq(productVariants.id, variantId),
          eq(productVariants.productId, productId),
        ),
      );
  } catch (error) {
    if (isForeignKeyViolation(error)) {
      fail(path, "Esta variante ya tiene pedidos. En vez de borrarla, ponle stock 0.");
    }
    throw error;
  }
  refreshStore(await productSlug(productId));
  redirect(`${path}?ok=${encodeURIComponent("Variante borrada")}`);
}
