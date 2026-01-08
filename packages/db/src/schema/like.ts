import { integer, pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";
import { user } from "./user";
import { photo } from "./photo";
import { comment } from "./comment";

export const like = pgTable("like", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commentId: integer().references(() => comment.id),
  userId: integer().references(() => user.id),
  photoId: integer().references(() => photo.id),
  ...timestamps,
});
