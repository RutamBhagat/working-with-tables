import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";
import { user } from "./user";
import { photo } from "./photo";

export const comment = pgTable("comment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  userId: integer().references(() => user.id),
  photoId: integer().references(() => photo.id),
  ...timestamps,
});
