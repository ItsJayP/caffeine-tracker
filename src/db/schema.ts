import { sql } from "drizzle-orm";
import {
  doublePrecision,
  integer,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Supabase's built-in auth schema, not managed by our migrations.
const authSchema = pgSchema("auth");
const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const customDrinks = pgTable("custom_drinks", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  caffeineMg: doublePrecision("caffeine_mg").notNull(),
  servingSizeMl: integer("serving_size_ml"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const drinkLogs = pgTable("drink_logs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  drinkType: text("drink_type").notNull(),
  caffeineMg: doublePrecision("caffeine_mg").notNull(),
  customDrinkId: uuid("custom_drink_id").references(() => customDrinks.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export const userSettings = pgTable("user_settings", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  weightKg: doublePrecision("weight_kg"),
  sensitivity: text("sensitivity", { enum: ["low", "medium", "high"] })
    .notNull()
    .default("medium"),
  cutoffTime: text("cutoff_time").notNull().default("14:00"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export type CustomDrink = typeof customDrinks.$inferSelect;
export type NewCustomDrink = typeof customDrinks.$inferInsert;
export type DrinkLog = typeof drinkLogs.$inferSelect;
export type NewDrinkLog = typeof drinkLogs.$inferInsert;
export type UserSettings = typeof userSettings.$inferSelect;
export type NewUserSettings = typeof userSettings.$inferInsert;
