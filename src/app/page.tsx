import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, type Species } from "@/lib/catalog";

const FILTERS: { label: string; value?: Species }[] = [
  { label: "Todos" },
  { label: "Perros", value: "perro" },
  { label: "Gatos", value: "gato" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ especie?: string }>;
}) {
  const { especie } = await searchParams;
  const species = especie === "perro" || especie === "gato" ? especie : undefined;
  const products = getProducts(species);

  return (
    <main>
      <section className="bg-amber-50">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
          <h1 className="text-4xl font-bold text-amber-950 sm:text-5xl">
            Abrigo y estilo para tu mascota
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-amber-900/80">
            Sacos y abrigos para perros y gatos, con envíos a toda Colombia.
          </p>
          <a
            href="#catalogo"
            className="mt-8 inline-block rounded-full bg-amber-700 px-6 py-3 font-medium text-white hover:bg-amber-800"
          >
            Ver catálogo
          </a>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-4 px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Catálogo</h2>
          <div className="flex gap-2">
            {FILTERS.map((f) => {
              const active = f.value === species;
              return (
                <Link
                  key={f.label}
                  href={f.value ? `/?especie=${f.value}#catalogo` : "/#catalogo"}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                    active
                      ? "bg-amber-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
