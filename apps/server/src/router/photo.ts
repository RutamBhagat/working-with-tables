import { zValidator } from "@hono/zod-validator";
import {
  and,
  asc,
  avg,
  count,
  db,
  desc,
  eq,
  gt,
  inArray,
  lt,
  or,
  sql,
} from "@working-with-tables/db";
import { comment, photo, user } from "@working-with-tables/db/schema";
import { Hono } from "hono";
import { z } from "zod";

export const photoRouter = new Hono();

photoRouter.get("/count-photos", async (c) => {
  try {
    const photoCount = await db
      .select({
        photoCount: count(),
      })
      .from(photo);
    return c.json({ success: true, data: photoCount });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get("/count-comments-per-photo", async (c) => {
  try {
    const commentCountPerPhoto = await db
      .select({
        photoId: comment.photoId,
        commentCount: count(comment.id),
      })
      .from(comment)
      .groupBy(comment.photoId)
      .orderBy(desc(count(comment.id)));
    if (commentCountPerPhoto.length === 0) {
      return c.json(
        {
          success: false,
          message: "No comments found",
          error: new Error("No comments found"),
        },
        404
      );
    }
    return c.json({ success: true, data: commentCountPerPhoto });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get("/count-comments-per-photo-with-filter", async (c) => {
  try {
    const commentCountPerPhoto = await db
      .select({
        photoId: comment.photoId,
        commentCount: count(comment.id),
      })
      .from(comment)
      .where(lt(comment.photoId, 3))
      .groupBy(comment.photoId)
      .having(gt(count(), 2));

    if (commentCountPerPhoto.length === 0) {
      return c.json(
        {
          success: false,
          message: "No comments found",
          error: new Error("No comments found"),
        },
        404
      );
    }

    return c.json({ success: true, data: commentCountPerPhoto });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get(
  "/user-commented-on-first-two-photos-with-filter",
  async (c) => {
    try {
      const firstTwoPhotos = await db
        .select()
        .from(photo)
        .orderBy(asc(photo.id))
        .limit(2);

      const userCommentedOnFirstTwoPhotos = await db
        .select({
          userId: comment.userId,
          commentCount: count(comment.id),
        })
        .from(comment)
        .where(
          inArray(
            comment.photoId,
            firstTwoPhotos.map((photo) => photo.id)
          )
        )
        .groupBy(comment.userId)
        .having(gt(count(comment.id), 2));

      if (userCommentedOnFirstTwoPhotos.length === 0) {
        return c.json(
          {
            success: false,
            message: "No users found",
            error: new Error("No users found"),
          },
          404
        );
      }

      return c.json({ success: true, data: userCommentedOnFirstTwoPhotos });
    } catch (error) {
      return c.json(
        { success: false, message: "Internal server error", error: error },
        500
      );
    }
  }
);

photoRouter.get("/most-active-user", async (c) => {
  try {
    const [mostActiveUser] = await db
      .select({
        id: user.id,
        username: user.username,
        activityScore: sql<number>`${photo.id} + ${comment.id}`,
      })
      .from(user)
      .leftJoin(photo, eq(user.id, photo.userId))
      .leftJoin(comment, eq(user.id, comment.userId))
      .orderBy(desc(sql<number>`${photo.id} + ${comment.id}`));

    if (!mostActiveUser) {
      return c.json(
        {
          success: false,
          message: "No users found",
          error: new Error("No users found"),
        },
        404
      );
    }

    return c.json({ success: true, data: mostActiveUser });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get("/most-commented-photo", async (c) => {
  try {
    const [mostCommentedPhoto] = await db
      .select({
        id: photo.id,
        url: photo.url,
        userId: photo.userId,
        commentCount: count(comment.id),
      })
      .from(photo)
      .leftJoin(comment, eq(photo.id, comment.photoId))
      .orderBy(desc(count(comment.id)))
      .groupBy(photo.id);

    if (!mostCommentedPhoto) {
      return c.json(
        {
          success: false,
          message: "No photos found",
          error: new Error("No photos found"),
        },
        404
      );
    }

    return c.json({ success: true, data: mostCommentedPhoto });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get("/average-character-count-per-comment", async (c) => {
  try {
    const [averageCharacterCountPerComment] = await db
      .select({
        averageCharacterCountPerComment: avg(
          sql<number>`length(${comment.content})`
        ),
      })
      .from(comment);

    if (!averageCharacterCountPerComment) {
      return c.json(
        {
          success: false,
          message: "No comments found",
          error: new Error("No comments found"),
        },
        404
      );
    }

    return c.json({ success: true, data: averageCharacterCountPerComment });
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error", error: error },
      500
    );
  }
});

photoRouter.get("/with-user", async (c) => {
  try {
    const photos = await db.query.photo.findMany({
      with: {
        comments: true,
        user: true,
      },
    });
    if (photos.length === 0) {
      return c.json(
        {
          success: false,
          message: "No photos found",
          error: new Error("No photos found"),
        },
        404
      );
    }
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

photoRouter.get("/average-comments-per-photo", async (c) => {
  try {
    const [averageCommentsPerPhoto] = await db
      .select({
        averageCommentsPerPhoto: avg(comment.id),
      })
      .from(photo)
      .leftJoin(comment, eq(photo.id, comment.photoId));

    if (!averageCommentsPerPhoto) {
      return c.json(
        {
          success: false,
          message: "No photos found",
          error: new Error("No photos found"),
        },
        404
      );
    }

    return c.json({ success: true, data: averageCommentsPerPhoto });
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
