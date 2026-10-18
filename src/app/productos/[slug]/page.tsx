import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VariantPicker } from "@/components/VariantPicker";
import { getProduct, getProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: `${product.name} | Just For Pets` } : {};
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href={`/?especie=${product.species}#catalogo`}
        className="text-sm text-gray-500 hover:text-amber-700"
      >
        ← Volver al catálogo
      </Link>
      <VariantPicker product={product} />
    </main>
  );
}
