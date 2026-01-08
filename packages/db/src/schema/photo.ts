import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";
import { user } from "./user";

export const photo = pgTable("photo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: text().notNull(),
  userId: integer().references(() => user.id),
  ...timestamps,
});
