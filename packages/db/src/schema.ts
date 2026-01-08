import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().unique().notNull(),
});

export const photo = pgTable("photo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: text().notNull(),
  userId: integer().references(() => user.id, { onDelete: "cascade" }),
});

export const comment = pgTable("comment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: text().notNull(),
  userId: integer().references(() => user.id, { onDelete: "cascade" }),
  photoId: integer().references(() => photo.id, { onDelete: "cascade" }),
});

export const like = pgTable("like", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => user.id, { onDelete: "cascade" }),
  photoId: integer().references(() => photo.id, { onDelete: "cascade" }),
});
