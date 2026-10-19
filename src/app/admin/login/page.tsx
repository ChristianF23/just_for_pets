import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { login } from "../actions";
import { buttonClass, Field, inputClass, Notice } from "../ui";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-bold text-gray-900">Entrar</h1>
      {!adminConfigured() ? (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Falta configurar la clave del panel. Agrega la variable ADMIN_PASSWORD en
          Vercel (Settings → Environment Variables) y vuelve a publicar.
        </p>
      ) : (
        <form action={login} className="mt-6 grid gap-4">
          <Notice error={error} />
          <Field label="Clave">
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className={inputClass}
            />
          </Field>
          <button className={buttonClass}>Entrar</button>
        </form>
      )}
    </div>
  );
}
