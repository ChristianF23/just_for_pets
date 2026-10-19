// Piezas visuales compartidas por las páginas del panel.

export function Notice({ error, ok }: { error?: string; ok?: string }) {
  if (error) {
    return (
      <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
    );
  }
  if (ok) {
    return (
      <p className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">{ok}</p>
    );
  }
  return null;
}

export const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700";

export const buttonClass =
  "rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800";

export const secondaryButtonClass =
  "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="mt-1 block text-xs text-gray-500">{hint}</span>}
    </label>
  );
}

type ProductValues = {
  name: string;
  slug: string;
  description: string;
  species: "perro" | "gato";
  active: boolean;
};

export function ProductFields({ product }: { product?: ProductValues }) {
  return (
    <div className="grid gap-4">
      <Field label="Nombre">
        <input name="name" required defaultValue={product?.name} className={inputClass} />
      </Field>
      <Field
        label="Dirección web"
        hint="Se usa en el enlace del producto. Si la dejas vacía, se crea a partir del nombre."
      >
        <input
          name="slug"
          defaultValue={product?.slug}
          placeholder="saco-tejido-clasico-perro"
          className={inputClass}
        />
      </Field>
      <Field label="Descripción">
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description}
          className={inputClass}
        />
      </Field>
      <Field label="Para">
        <select
          name="species"
          defaultValue={product?.species ?? "perro"}
          className={inputClass}
        >
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>
      </Field>
      <label className="flex items-center gap-2 text-sm text-gray-800">
        <input
          type="checkbox"
          name="active"
          defaultChecked={product?.active ?? true}
          className="h-4 w-4 accent-amber-700"
        />
        Visible en la tienda
      </label>
    </div>
  );
}
