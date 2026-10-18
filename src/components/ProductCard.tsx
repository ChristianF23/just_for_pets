import Link from "next/link";
import { formatCop, minPrice, productColors, type Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const colors = productColors(product);
  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <ProductImage
        species={product.species}
        color={colors[0]}
        className="transition group-hover:scale-[1.02]"
      />
      <div className="mt-3">
        <h3 className="font-medium text-gray-900 group-hover:text-amber-700">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">
          {colors.length} {colors.length === 1 ? "color" : "colores"}
        </p>
        <p className="mt-1 font-semibold text-gray-900">
          Desde {formatCop(minPrice(product))}
        </p>
      </div>
    </Link>
  );
}
