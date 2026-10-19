# Just For Pets

Tienda online de sacos y abrigos para perros y gatos, con ventas en Colombia (COP).

## Stack

- **Next.js 15** (App Router) con **TypeScript**
- **Tailwind CSS** para estilos
- **PostgreSQL** en Neon, con **Drizzle ORM** para el esquema y las migraciones
- Pagos con **Wompi** y despliegue en **Vercel** (próximos pasos)

## Empezar en tu computador

```bash
npm install
cp .env.example .env.local   # y completa DATABASE_URL
npm run dev                  # abre http://localhost:3000
```

## Base de datos

La base de datos es PostgreSQL en Neon, conectada desde Vercel (variable `DATABASE_URL`).
El esquema está en `src/db/schema.ts` y las migraciones en `drizzle/`. Los precios se guardan como enteros en pesos.

`npm run build` aplica primero las migraciones pendientes, así que cada publicación en Vercel deja las tablas al día.

```bash
npm run db:generate   # crea una migración a partir del esquema
npm run db:migrate    # aplica las migraciones en la base de datos
npm run db:studio     # explora los datos en el navegador
```

## Panel de administración

En `/admin` se crean y editan productos, tallas, colores, precios y stock.
La clave de entrada es la variable `ADMIN_PASSWORD`, que se configura en Vercel
(Settings → Environment Variables). Si se cambia la clave, se cierran las sesiones abiertas.

## Estructura

```
src/
  app/        páginas de la tienda
  app/admin/  panel de administración
  db/         esquema y conexión a la base de datos
drizzle/      migraciones generadas
```
