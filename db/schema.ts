import { pgTable, integer, text, timestamp, index } from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: integer("id")
      .generatedAlwaysAsIdentity({ name: "links_id_seq" })
      .primaryKey(),
    userId: text("user_id").notNull(),
    shortCode: text("short_code").notNull().unique(),
    originalUrl: text("original_url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    userIdIdx: index("idx_user_id").on(table.userId),
  }),
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
