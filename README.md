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

El esquema está en `src/db/schema.ts`. Los precios se guardan como enteros en pesos.

```bash
npm run db:generate   # crea una migración a partir del esquema
npm run db:migrate    # aplica las migraciones en la base de datos
npm run db:studio     # explora los datos en el navegador
```

## Estructura

```
src/
  app/        páginas de la tienda (y luego el panel de administración)
  db/         esquema y conexión a la base de datos
drizzle/      migraciones generadas
```
