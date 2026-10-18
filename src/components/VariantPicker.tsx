"use client";

import { useState } from "react";
import {
  COLOR_SWATCHES,
  formatCop,
  productColors,
  type Product,
} from "@/lib/products";
import { ProductImage } from "./ProductImage";

export function VariantPicker({ product }: { product: Product }) {
  const colors = productColors(product);
  const [color, setColor] = useState(colors[0]);
  const sizes = product.variants.filter((v) => v.color === color);
  const [size, setSize] = useState(sizes[0].size);
  const variant = sizes.find((v) => v.size === size) ?? sizes[0];

  return (
    <div className="mt-4 grid gap-8 md:grid-cols-2">
      <ProductImage species={product.species} color={color} />

      <div>
        <p className="text-sm uppercase tracking-wide text-amber-700">
          {product.species === "perro" ? "Para perro" : "Para gato"}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="mt-3 text-2xl font-semibold text-gray-900">
          {formatCop(variant.priceCop)}
        </p>
        <p className="mt-4 text-gray-600">{product.description}</p>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-gray-900">
            Color: <span className="font-normal">{color}</span>
          </legend>
          <div className="mt-2 flex gap-3">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-label={c}
                aria-pressed={c === color}
                className={`h-9 w-9 rounded-full border-2 ${
                  c === color ? "border-gray-900" : "border-white ring-1 ring-gray-300"
                }`}
                style={{ backgroundColor: COLOR_SWATCHES[c] }}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-gray-900">Talla</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((v) => (
              <button
                key={v.size}
                type="button"
                onClick={() => setSize(v.size)}
                disabled={v.stock === 0}
                aria-pressed={v.size === size}
                className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-medium disabled:opacity-40 ${
                  v.size === size
                    ? "border-amber-700 bg-amber-700 text-white"
                    : "border-gray-300 text-gray-800 hover:border-amber-700"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="mt-4 text-sm text-gray-500">
          {variant.stock > 0
            ? `${variant.stock} disponibles · Ref. ${variant.sku}`
            : "Agotado"}
        </p>

        <button
          type="button"
          disabled
          className="mt-6 w-full rounded-full bg-amber-700 px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Muy pronto podrás comprar aquí
        </button>
      </div>
    </div>
  );
}
