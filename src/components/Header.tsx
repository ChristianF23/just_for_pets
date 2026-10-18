import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-amber-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-amber-900">
          Just For Pets
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-gray-700">
          <Link href="/?especie=perro#catalogo" className="hover:text-amber-700">
            Perros
          </Link>
          <Link href="/?especie=gato#catalogo" className="hover:text-amber-700">
            Gatos
          </Link>
        </nav>
      </div>
    </header>
  );
}
