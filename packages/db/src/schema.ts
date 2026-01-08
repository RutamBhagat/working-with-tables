import { integer, pgTable, text } from "drizzle-orm/pg-core";

import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const user = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  ...timestamps,
});

export const like = pgTable("like", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commentId: integer().references(() => comment.id),
  userId: integer().references(() => user.id),
  photoId: integer().references(() => photo.id),
  ...timestamps,
});

export const comment = pgTable("comment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
  userId: integer().references(() => user.id),
  photoId: integer().references(() => photo.id),
  ...timestamps,
});

export const photo = pgTable("photo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: text().notNull(),
  userId: integer().references(() => user.id),
  ...timestamps,
});
