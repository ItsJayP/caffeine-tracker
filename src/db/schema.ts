import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const customDrinks = sqliteTable("custom_drinks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  caffeineMg: real("caffeine_mg").notNull(),
  servingSizeMl: integer("serving_size_ml"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const drinkLogs = sqliteTable("drink_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
  drinkType: text("drink_type").notNull(),
  caffeineMg: real("caffeine_mg").notNull(),
  customDrinkId: integer("custom_drink_id").references(() => customDrinks.id, {
    onDelete: "set null",
  }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const userSettings = sqliteTable("user_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  weightKg: real("weight_kg"),
  sensitivity: text("sensitivity", { enum: ["low", "medium", "high"] })
    .notNull()
    .default("medium"),
  cutoffTime: text("cutoff_time").notNull().default("14:00"),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type CustomDrink = typeof customDrinks.$inferSelect;
export type NewCustomDrink = typeof customDrinks.$inferInsert;
export type DrinkLog = typeof drinkLogs.$inferSelect;
export type NewDrinkLog = typeof drinkLogs.$inferInsert;
export type UserSettings = typeof userSettings.$inferSelect;
export type NewUserSettings = typeof userSettings.$inferInsert;
