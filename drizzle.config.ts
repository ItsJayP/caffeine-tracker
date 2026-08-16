import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.SUPABASE_DB_URL) {
  throw new Error("Missing SUPABASE_DB_URL in your .env file.");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL,
  },
} satisfies Config;
