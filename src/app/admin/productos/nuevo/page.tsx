import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { createProduct } from "../../actions";
import { buttonClass, Notice, ProductFields } from "../../ui";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireAdmin();
  const { error } = await searchParams;

  return (
    <div className="max-w-xl">
      <Link href="/admin" className="text-sm text-gray-500 hover:text-amber-700">
        ← Productos
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">Nuevo producto</h1>
      <form action={createProduct} className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <Notice error={error} />
        <ProductFields />
        <button className={`${buttonClass} mt-6`}>Crear producto</button>
      </form>
    </div>
  );
}
