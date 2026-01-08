import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().unique().notNull(),
  email: text().unique().notNull(),
});

export const photo = pgTable("photo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: text().notNull(),
  userId: integer().references(() => user.id),
});

export const comment = pgTable("comment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  userId: integer().references(() => user.id),
  photoId: integer().references(() => photo.id),
});

export const like = pgTable("like", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => user.id),
  photoId: integer().references(() => photo.id),
});
