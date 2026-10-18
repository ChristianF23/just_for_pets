import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// La integración de Neon en Vercel crea DATABASE_URL (y POSTGRES_URL como respaldo).
export const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

export const db = drizzle(databaseUrl!, { schema });
