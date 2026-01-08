import { db } from "@working-with-tables/db";
import { comment, like, photo, user } from "@working-with-tables/db/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(like);
  await db.delete(comment);
  await db.delete(photo);
  await db.delete(user);

  // Create users
  console.log("Creating users...");
  const users = await db
    .insert(user)
    .values([
      { username: "alice", email: "alice@example.com" },
      { username: "bob", email: "bob@example.com" },
      { username: "charlie", email: "charlie@example.com" },
      { username: "diana", email: "diana@example.com" },
      { username: "eve", email: "eve@example.com" },
    ])
    .returning();

  console.log(`Created ${users.length} users`);

  // Create photos
  console.log("Creating photos...");
  const photos = await db
    .insert(photo)
    .values([
      { url: "https://picsum.photos/600/400?random=1", userId: users[0]!.id },
      { url: "https://picsum.photos/600/400?random=2", userId: users[0]!.id },
      { url: "https://picsum.photos/600/400?random=3", userId: users[1]!.id },
      { url: "https://picsum.photos/600/400?random=4", userId: users[1]!.id },
      { url: "https://picsum.photos/600/400?random=5", userId: users[2]!.id },
      { url: "https://picsum.photos/600/400?random=6", userId: users[2]!.id },
      { url: "https://picsum.photos/600/400?random=7", userId: users[3]!.id },
      { url: "https://picsum.photos/600/400?random=8", userId: users[3]!.id },
      { url: "https://picsum.photos/600/400?random=9", userId: users[4]!.id },
      { url: "https://picsum.photos/600/400?random=10", userId: users[4]!.id },
    ])
    .returning();

  console.log(`Created ${photos.length} photos`);

  // Create comments
  console.log("Creating comments...");
  const comments = await db
    .insert(comment)
    .values([
      { text: "Amazing photo!", userId: users[1]!.id, photoId: photos[0]!.id },
      { text: "Love this!", userId: users[2]!.id, photoId: photos[0]!.id },
      { text: "Great shot", userId: users[0]!.id, photoId: photos[2]!.id },
      { text: "Beautiful", userId: users[3]!.id, photoId: photos[2]!.id },
      { text: "So cool!", userId: users[4]!.id, photoId: photos[4]!.id },
      { text: "Nice work", userId: users[0]!.id, photoId: photos[5]!.id },
      { text: "Stunning", userId: users[1]!.id, photoId: photos[6]!.id },
      { text: "Incredible!", userId: users[2]!.id, photoId: photos[7]!.id },
      { text: "Perfect timing", userId: users[3]!.id, photoId: photos[8]!.id },
      { text: "Wow!", userId: users[4]!.id, photoId: photos[9]!.id },
    ])
    .returning();

  console.log(`Created ${comments.length} comments`);

  // Create likes
  console.log("Creating likes...");
  const likes = await db
    .insert(like)
    .values([
      { userId: users[1]!.id, photoId: photos[0]!.id },
      { userId: users[2]!.id, photoId: photos[0]!.id },
      { userId: users[3]!.id, photoId: photos[0]!.id },
      { userId: users[0]!.id, photoId: photos[2]!.id },
      { userId: users[4]!.id, photoId: photos[2]!.id },
      { userId: users[1]!.id, photoId: photos[4]!.id },
      { userId: users[3]!.id, photoId: photos[4]!.id },
      { userId: users[0]!.id, photoId: photos[6]!.id },
      { userId: users[2]!.id, photoId: photos[6]!.id },
      { userId: users[4]!.id, photoId: photos[8]!.id },
      { userId: users[0]!.id, photoId: photos[9]!.id },
      { userId: users[1]!.id, photoId: photos[9]!.id },
    ])
    .returning();

  console.log(`Created ${likes.length} likes`);

  console.log("Seeding completed successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
