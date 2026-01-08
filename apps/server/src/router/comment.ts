import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db, eq } from "@working-with-tables/db";
import { comment, photo, user } from "@working-with-tables/db/schema";

export const commentRouter = new Hono();

commentRouter.get(
  "/",
  zValidator(
    "query",
    z.object({
      photoId: z.coerce.number(),
    })
  ),
  async (c) => {
    try {
      const { photoId } = c.req.valid("query");
      const comments = await db.query.comment.findMany({
        where: {
          photoId: photoId,
        },
        with: {
          user: true,
        },
      });
      return c.json({ success: true, data: comments });
    } catch (error) {
      return c.json(
        { success: false, message: "Internal server error", error: error },
        500
      );
    }
  }
);

commentRouter.get("/with-photo-url", async (c) => {
  try {
    // Query API
    // const comments = await db.query.comment.findMany({
    //   with: {
    //     photo: true,
    //   },
    // });

    // Query Builder
    const comments = await db
      .select({
        id: comment.id,
        content: comment.content,
        photoUrl: photo.url,
      })
      .from(comment)
      .leftJoin(photo, eq(comment.photoId, photo.id));

    return c.json({ success: true, data: comments });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

commentRouter.get(
  "/with-query-builder",
  zValidator(
    "query",
    z.object({
      photoId: z.coerce.number(),
    })
  ),
  async (c) => {
    try {
      const { photoId } = c.req.valid("query");
      const comments = await db
        .select({
          id: comment.id,
          content: comment.content,
          userId: comment.userId,
          photoId: comment.photoId,
          user: {
            ...user,
          },
        })
        .from(comment)
        .leftJoin(user, eq(comment.userId, user.id))
        .where(eq(comment.photoId, photoId));
      return c.json({ success: true, data: comments });
    } catch (error) {
      return c.json(
        { success: false, message: "Internal server error", error: error },
        500
      );
    }
  }
);
