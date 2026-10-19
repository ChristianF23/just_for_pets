import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductForEdit } from "@/lib/admin";
import { requireAdmin } from "@/lib/auth";
import { formatCop } from "@/lib/products";
import {
  addVariant,
  deleteVariant,
  updateProduct,
  updateVariant,
} from "../../actions";
import {
  buttonClass,
  inputClass,
  Notice,
  ProductFields,
  secondaryButtonClass,
} from "../../ui";

type VariantValues = {
  size: string;
  color: string;
  sku: string;
  priceCop: number;
  stock: number;
};

function VariantInputs({ variant }: { variant?: VariantValues }) {
  return (
    <>
      <input name="size" required placeholder="M" defaultValue={variant?.size} aria-label="Talla" className={inputClass} />
      <input name="color" required placeholder="Rojo" defaultValue={variant?.color} aria-label="Color" className={inputClass} />
      <input name="sku" required placeholder="STC-ROJ-M" defaultValue={variant?.sku} aria-label="Referencia" className={inputClass} />
      <input name="priceCop" required inputMode="numeric" placeholder="59900" defaultValue={variant?.priceCop} aria-label="Precio" className={inputClass} />
      <input name="stock" required inputMode="numeric" placeholder="5" defaultValue={variant?.stock} aria-label="Stock" className={inputClass} />
    </>
  );
}

const variantGrid = "grid grid-cols-2 gap-2 sm:grid-cols-[4rem_1fr_1fr_7rem_5rem_10rem] sm:items-center";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  await requireAdmin();
  const id = Number((await params).id);
  const product = Number.isInteger(id) ? await getProductForEdit(id) : undefined;
  if (!product) notFound();
  const { error, ok } = await searchParams;

  return (
    <div>
      <Link href="/admin" className="text-sm text-gray-500 hover:text-amber-700">
        ← Productos
      </Link>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        {product.active && (
          <Link href={`/productos/${product.slug}`} className="text-sm text-amber-700 hover:underline">
            Ver en la tienda →
          </Link>
        )}
      </div>

      <div className="mt-6">
        <Notice error={error} ok={ok} />
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-gray-900">Datos del producto</h2>
        <form action={updateProduct.bind(null, product.id)} className="mt-4 max-w-xl">
          <ProductFields product={product} />
          <button className={`${buttonClass} mt-6`}>Guardar producto</button>
        </form>
      </section>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-gray-900">Tallas, colores, precio y stock</h2>
        <p className="mt-1 text-sm text-gray-500">
          Cada fila es una combinación de talla y color. Escribe los precios en pesos, sin puntos.
        </p>

        <div className={`${variantGrid} mt-4 hidden text-xs font-medium text-gray-500 sm:grid`}>
          <span>Talla</span>
          <span>Color</span>
          <span>Referencia</span>
          <span>Precio</span>
          <span>Stock</span>
          <span />
        </div>

        <div className="mt-2 divide-y divide-gray-100">
          {product.variants.map((v) => (
            <div key={v.id} className="py-2">
              <form action={updateVariant.bind(null, product.id, v.id)} className={variantGrid}>
                <VariantInputs variant={v} />
                <div className="col-span-2 flex gap-2 sm:col-span-1">
                  <button className={secondaryButtonClass} title={`Guardar (${formatCop(v.priceCop)})`}>
                    Guardar
                  </button>
                  <button
                    formAction={deleteVariant.bind(null, product.id, v.id)}
                    formNoValidate
                    className="rounded-lg px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    Borrar
                  </button>
                </div>
              </form>
            </div>
          ))}
          {product.variants.length === 0 && (
            <p className="py-4 text-sm text-gray-500">
              Este producto todavía no tiene variantes, así que no aparece en la tienda.
            </p>
          )}
        </div>

        <h3 className="mt-6 text-sm font-semibold text-gray-900">Agregar variante</h3>
        <form action={addVariant.bind(null, product.id)} className={`${variantGrid} mt-2`}>
          <VariantInputs />
          <button className={`${buttonClass} col-span-2 sm:col-span-1`}>Agregar</button>
        </form>
      </section>
    </div>
  );
}
