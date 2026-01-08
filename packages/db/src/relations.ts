import * as schema from "./schema/index";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (r) => ({
  user: {
    followers: r.many.user({
      from: r.user.id,
      to: r.user.id,
    }),
    following: r.many.user({
      from: r.user.id,
      to: r.user.id,
    }),
    photos: r.many.photo({
      from: r.user.id,
      to: r.photo.userId,
    }),
    comments: r.many.comment({
      from: r.user.id,
      to: r.comment.userId,
    }),
    likes: r.many.like({
      from: r.user.id,
      to: r.like.userId,
    }),
  },
  photo: {
    user: r.one.user({
      from: r.photo.userId,
      to: r.user.id,
    }),
    comments: r.many.comment({
      from: r.photo.id,
      to: r.comment.photoId,
    }),
    likes: r.many.like({
      from: r.photo.id,
      to: r.like.photoId,
    }),
  },
  comment: {
    user: r.one.user({
      from: r.comment.userId,
      to: r.user.id,
    }),
    photo: r.one.photo({
      from: r.comment.photoId,
      to: r.photo.id,
    }),
    comment: r.one.comment({
      from: r.comment.id,
      to: r.comment.id,
    }),
    likes: r.many.like({
      from: r.comment.id,
      to: r.like.commentId,
    }),
  },
  like: {
    user: r.one.user({
      from: r.like.userId,
      to: r.user.id,
    }),
    photo: r.one.photo({
      from: r.like.photoId,
      to: r.photo.id,
    }),
    comment: r.one.comment({
      from: r.like.commentId,
      to: r.comment.id,
    }),
  },
}));
