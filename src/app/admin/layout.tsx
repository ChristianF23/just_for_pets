import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Administración | Just For Pets",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = await isAdmin();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link href="/admin" className="font-semibold text-gray-900">
            Panel de administración
          </Link>
          {loggedIn && (
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-600 hover:text-amber-700">
                Ver tienda
              </Link>
              <form action={logout}>
                <button className="text-gray-600 hover:text-amber-700">Salir</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
