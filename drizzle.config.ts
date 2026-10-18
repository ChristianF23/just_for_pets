import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env.local", ".env"] });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Las migraciones usan la conexión directa (sin pooler) cuando Neon la ofrece.
    url: (process.env.DATABASE_URL_UNPOOLED ??
      process.env.DATABASE_URL ??
      process.env.POSTGRES_URL)!,
  },
});
