import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export type Donation = typeof donations.$inferSelect
