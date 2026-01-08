import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";

export const user = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  ...timestamps,
});
