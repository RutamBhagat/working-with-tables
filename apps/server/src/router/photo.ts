import { zValidator } from "@hono/zod-validator";
import { count, db, eq, sql } from "@working-with-tables/db";
import { comment, photo, user } from "@working-with-tables/db/schema";
import { Hono } from "hono";
import { z } from "zod";

export const photoRouter = new Hono();

photoRouter.get("/with-user", async (c) => {
  try {
    const photos = await db.query.photo.findMany({
      with: {
        user: true,
      },
    });
    return c.json({ success: true, data: photos });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get("/with-user-query-builder", async (c) => {
  try {
    const photos = await db
      .select({
        id: photo.id,
        url: photo.url,
        userId: photo.userId,
        user: {
          ...user,
        },
      })
      .from(photo)
      .leftJoin(user, eq(photo.userId, user.id));
    return c.json({ success: true, data: photos });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get(
  "/:id",
  zValidator("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const photo = await db.query.photo.findFirst({
        where: {
          id: id,
        },
        with: {
          comments: true,
        },
      });

      if (!photo) {
        return c.json(
          {
            success: false,
            error: new Error("Photo not found"),
            message: "Photo not found",
          },
          404
        );
      }

      const commentCount = photo.comments.length;

      return c.json({
        success: true,
        data: {
          id: photo.id,
          url: photo.url,
          userId: photo.userId,
          commentCount,
        },
      });
    } catch (error) {
      return c.json(
        { success: false, message: "Internal server error", error: error },
        500
      );
    }
  }
);

photoRouter.get(
  "/:id/query-builder",
  zValidator("param", z.object({ id: z.coerce.number() })),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const [photoResult] = await db
        .select({
          id: photo.id,
          url: photo.url,
          userId: photo.userId,
          commentCount: count(comment.id),
        })
        .from(photo)
        .leftJoin(comment, eq(photo.id, comment.photoId))
        .where(eq(photo.id, id))
        .groupBy(photo.id);

      if (!photoResult) {
        return c.json(
          {
            success: false,
            error: new Error("Photo not found"),
            message: "Photo not found",
          },
          404
        );
      }

      return c.json({ success: true, data: photoResult });
    } catch (error) {
      return c.json(
        { success: false, message: "Internal server error", error: error },
        500
      );
    }
  }
);
