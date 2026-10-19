import Link from "next/link";
import { listProducts } from "@/lib/admin";
import { requireAdmin } from "@/lib/auth";
import { buttonClass } from "./ui";

export default async function AdminHome() {
  await requireAdmin();
  const rows = await listProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <Link href="/admin/productos/nuevo" className={buttonClass}>
          Nuevo producto
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Para</th>
              <th className="px-4 py-3 font-medium">Variantes</th>
              <th className="px-4 py-3 font-medium">Stock total</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/productos/${p.id}`}
                    className="font-medium text-gray-900 hover:text-amber-700"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3 capitalize text-gray-700">{p.species}</td>
                <td className="px-4 py-3 text-gray-700">{p.variantCount}</td>
                <td className="px-4 py-3 text-gray-700">{p.totalStock ?? 0}</td>
                <td className="px-4 py-3">
                  {p.active ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Visible
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      Oculto
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Todavía no hay productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
