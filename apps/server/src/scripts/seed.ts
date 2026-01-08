import { db } from "@working-with-tables/db";
import { comment, photo, user } from "@working-with-tables/db/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(comment);
  await db.delete(photo);
  await db.delete(user);

  // Create users
  console.log("Creating users...");
  const users = await db
    .insert(user)
    .values([
      { username: "Reyna.Marvin" },
      { username: "Micah.Cremin" },
      { username: "Alfredo66" },
      { username: "Gerard_Mitchell42" },
      { username: "Frederique_Donnelly" },
    ])
    .returning();

  console.log(`Created ${users.length} users`);

  // Create photos
  console.log("Creating photos...");
  const photos = await db
    .insert(photo)
    .values([
      { url: "https://santina.net", userId: users[2]!.id },
      { url: "https://alayna.net", userId: users[4]!.id },
      { url: "https://kailyn.name", userId: users[2]!.id },
      { url: "http://marjolaine.name", userId: users[0]!.id },
      { url: "http://chet.net", userId: users[4]!.id },
      { url: "http://jerrold.org", userId: users[1]!.id },
      { url: "https://meredith.net", userId: users[3]!.id },
      { url: "http://isaias.net", userId: users[3]!.id },
      { url: "http://dayne.com", userId: users[3]!.id },
      { url: "http://colten.net", userId: users[1]!.id },
      { url: "https://adelbert.biz", userId: users[4]!.id },
      { url: "http://kolby.org", userId: users[0]!.id },
      { url: "https://deon.biz", userId: users[1]!.id },
      { url: "https://marina.com", userId: users[4]!.id },
      { url: "http://johnson.info", userId: users[0]!.id },
      { url: "https://linda.info", userId: users[1]!.id },
      { url: "https://tyrique.info", userId: users[3]!.id },
      { url: "http://buddy.info", userId: users[4]!.id },
      { url: "https://elinore.name", userId: users[1]!.id },
      { url: "http://sasha.com", userId: users[2]!.id },
    ])
    .returning();

  console.log(`Created ${photos.length} photos`);

  // Create comments
  console.log("Creating comments...");
  const comments = await db
    .insert(comment)
    .values([
      { content: "Quo velit iusto ducimus quos a incidunt nesciunt facilis.", userId: users[1]!.id, photoId: photos[3]!.id },
      { content: "Non est totam.", userId: users[4]!.id, photoId: photos[4]!.id },
      { content: "Fuga et iste beatae.", userId: users[2]!.id, photoId: photos[2]!.id },
      { content: "Molestias tempore est.", userId: users[0]!.id, photoId: photos[4]!.id },
      { content: "Est voluptatum voluptatem voluptatem est ullam quod quia in.", userId: users[0]!.id, photoId: photos[4]!.id },
      { content: "Aut et similique porro ullam.", userId: users[0]!.id, photoId: photos[2]!.id },
      { content: "Fugiat cupiditate consequatur sit magni at non ad omnis.", userId: users[0]!.id, photoId: photos[1]!.id },
      { content: "Accusantium illo maiores et sed maiores quod natus.", userId: users[1]!.id, photoId: photos[4]!.id },
      { content: "Perferendis cumque eligendi.", userId: users[0]!.id, photoId: photos[1]!.id },
      { content: "Nihil quo voluptatem placeat.", userId: users[4]!.id, photoId: photos[4]!.id },
      { content: "Rerum dolor sunt sint.", userId: users[4]!.id, photoId: photos[1]!.id },
      { content: "Id corrupti tenetur similique reprehenderit qui sint qui nulla tenetur.", userId: users[1]!.id, photoId: photos[0]!.id },
      { content: "Maiores quo quia.", userId: users[0]!.id, photoId: photos[4]!.id },
      { content: "Culpa perferendis qui perferendis eligendi officia neque ex.", userId: users[0]!.id, photoId: photos[3]!.id },
      { content: "Reprehenderit voluptates rerum qui veritatis ut.", userId: users[0]!.id, photoId: photos[0]!.id },
      { content: "Aut ipsum porro deserunt maiores sit.", userId: users[4]!.id, photoId: photos[2]!.id },
      { content: "Aut qui eum eos soluta pariatur.", userId: users[0]!.id, photoId: photos[0]!.id },
      { content: "Praesentium tempora rerum necessitatibus aut.", userId: users[3]!.id, photoId: photos[2]!.id },
      { content: "Magni error voluptas veniam ipsum enim.", userId: users[3]!.id, photoId: photos[1]!.id },
      { content: "Et maiores libero quod aliquam sit voluptas.", userId: users[1]!.id, photoId: photos[2]!.id },
      { content: "Eius ab occaecati quae eos aut enim rem.", userId: users[4]!.id, photoId: photos[3]!.id },
      { content: "Et sit occaecati.", userId: users[3]!.id, photoId: photos[2]!.id },
      { content: "Illum omnis et excepturi totam eum omnis.", userId: users[0]!.id, photoId: photos[4]!.id },
      { content: "Nemo nihil rerum alias vel.", userId: users[4]!.id, photoId: photos[0]!.id },
      { content: "Voluptas ab eius.", userId: users[4]!.id, photoId: photos[0]!.id },
      { content: "Dolor soluta quisquam voluptatibus delectus.", userId: users[2]!.id, photoId: photos[4]!.id },
      { content: "Consequatur neque beatae.", userId: users[3]!.id, photoId: photos[4]!.id },
      { content: "Aliquid vel voluptatem.", userId: users[3]!.id, photoId: photos[4]!.id },
      { content: "Maiores nulla ea non autem.", userId: users[3]!.id, photoId: photos[4]!.id },
      { content: "Enim doloremque delectus.", userId: users[0]!.id, photoId: photos[3]!.id },
      { content: "Facere vel assumenda.", userId: users[1]!.id, photoId: photos[4]!.id },
      { content: "Fugiat dignissimos dolorum iusto fugit voluptas et.", userId: users[1]!.id, photoId: photos[0]!.id },
      { content: "Sed cumque in et.", userId: users[0]!.id, photoId: photos[2]!.id },
      { content: "Doloribus temporibus hic eveniet temporibus corrupti et voluptatem et sint.", userId: users[4]!.id, photoId: photos[3]!.id },
      { content: "Quia dolorem officia explicabo quae.", userId: users[2]!.id, photoId: photos[0]!.id },
      { content: "Ullam ad laborum totam veniam.", userId: users[0]!.id, photoId: photos[1]!.id },
      { content: "Et rerum voluptas et corporis rem in hic.", userId: users[1]!.id, photoId: photos[2]!.id },
      { content: "Tempora quas facere.", userId: users[2]!.id, photoId: photos[0]!.id },
      { content: "Rem autem corporis earum necessitatibus dolores explicabo iste quo.", userId: users[4]!.id, photoId: photos[4]!.id },
      { content: "Animi aperiam repellendus in aut eum consequatur quos.", userId: users[0]!.id, photoId: photos[1]!.id },
      { content: "Enim esse magni.", userId: users[3]!.id, photoId: photos[2]!.id },
      { content: "Saepe cumque qui pariatur.", userId: users[3]!.id, photoId: photos[3]!.id },
      { content: "Sit dolorem ipsam nisi.", userId: users[3]!.id, photoId: photos[0]!.id },
      { content: "Dolorem veniam nisi quidem.", userId: users[1]!.id, photoId: photos[4]!.id },
      { content: "Porro illum perferendis nemo libero voluptatibus vel.", userId: users[2]!.id, photoId: photos[2]!.id },
      { content: "Dicta enim rerum culpa a quo molestiae nam repudiandae at.", userId: users[1]!.id, photoId: photos[3]!.id },
      { content: "Consequatur magnam autem voluptas deserunt.", userId: users[4]!.id, photoId: photos[0]!.id },
      { content: "Incidunt cum delectus sunt tenetur et.", userId: users[3]!.id, photoId: photos[2]!.id },
      { content: "Non vel eveniet sed molestiae tempora.", userId: users[1]!.id, photoId: photos[0]!.id },
      { content: "Ad placeat repellat et veniam ea asperiores.", userId: users[4]!.id, photoId: photos[0]!.id },
      { content: "Eum aut magni sint.", userId: users[2]!.id, photoId: photos[0]!.id },
      { content: "Aperiam voluptates quis velit explicabo ipsam vero eum.", userId: users[0]!.id, photoId: photos[2]!.id },
      { content: "Error nesciunt blanditiis quae quis et tempora velit repellat sint.", userId: users[1]!.id, photoId: photos[3]!.id },
      { content: "Blanditiis saepe dolorem enim eos sed ea.", userId: users[0]!.id, photoId: photos[1]!.id },
      { content: "Ab veritatis est.", userId: users[1]!.id, photoId: photos[1]!.id },
      { content: "Vitae voluptatem voluptates vel nam.", userId: users[2]!.id, photoId: photos[0]!.id },
      { content: "Neque aspernatur est non ad vitae nisi ut nobis enim.", userId: users[3]!.id, photoId: photos[2]!.id },
      { content: "Debitis ut amet.", userId: users[3]!.id, photoId: photos[1]!.id },
      { content: "Pariatur beatae nihil cum molestiae provident vel.", userId: users[3]!.id, photoId: photos[3]!.id },
      { content: "Aperiam sunt aliquam illum impedit.", userId: users[0]!.id, photoId: photos[3]!.id },
      { content: "Aut laudantium necessitatibus harum eaque.", userId: users[4]!.id, photoId: photos[2]!.id },
      { content: "Debitis voluptatum nesciunt quisquam voluptatibus fugiat nostrum sed dolore quasi.", userId: users[2]!.id, photoId: photos[1]!.id },
      { content: "Praesentium velit voluptatem distinctio ut voluptatum at aut.", userId: users[1]!.id, photoId: photos[1]!.id },
      { content: "Voluptates nihil voluptatum quia maiores dolorum molestias occaecati.", userId: users[0]!.id, photoId: photos[3]!.id },
      { content: "Quisquam modi labore.", userId: users[2]!.id, photoId: photos[1]!.id },
      { content: "Fugit quia perferendis magni doloremque dicta officia dignissimos ut necessitatibus.", userId: users[0]!.id, photoId: photos[3]!.id },
      { content: "Tempora ipsam aut placeat ducimus ut exercitationem quis provident.", userId: users[4]!.id, photoId: photos[2]!.id },
      { content: "Expedita ducimus cum quibusdam.", userId: users[4]!.id, photoId: photos[0]!.id },
      { content: "In voluptates doloribus aut ut libero possimus adipisci iste.", userId: users[2]!.id, photoId: photos[1]!.id },
      { content: "Sit qui est sed accusantium quidem id voluptatum id.", userId: users[0]!.id, photoId: photos[4]!.id },
      { content: "Libero eius quo consequatur laudantium reiciendis reiciendis aliquid nemo.", userId: users[0]!.id, photoId: photos[1]!.id },
      { content: "Officia qui reprehenderit ut accusamus qui voluptatum at.", userId: users[1]!.id, photoId: photos[1]!.id },
      { content: "Ad similique quo.", userId: users[3]!.id, photoId: photos[0]!.id },
      { content: "Commodi culpa aut nobis qui illum deserunt reiciendis.", userId: users[1]!.id, photoId: photos[2]!.id },
      { content: "Tenetur quam aut rerum doloribus est ipsa autem.", userId: users[3]!.id, photoId: photos[1]!.id },
      { content: "Est accusamus aut nisi sit aut id non natus assumenda.", userId: users[1]!.id, photoId: photos[3]!.id },
      { content: "Et sit et vel quos recusandae quo qui.", userId: users[0]!.id, photoId: photos[2]!.id },
      { content: "Velit nihil voluptatem et sed.", userId: users[3]!.id, photoId: photos[3]!.id },
      { content: "Sunt vitae expedita fugiat occaecati.", userId: users[0]!.id, photoId: photos[2]!.id },
      { content: "Consequatur quod et ipsam in dolorem.", userId: users[3]!.id, photoId: photos[1]!.id },
      { content: "Magnam voluptatum molestias vitae voluptatibus beatae nostrum sunt.", userId: users[2]!.id, photoId: photos[4]!.id },
      { content: "Alias praesentium ut voluptatem alias praesentium tempora voluptas debitis.", userId: users[1]!.id, photoId: photos[4]!.id },
      { content: "Ipsam cumque aut consectetur mollitia vel quod voluptates provident suscipit.", userId: users[2]!.id, photoId: photos[4]!.id },
      { content: "Ad dignissimos quia aut commodi vel ut nisi.", userId: users[2]!.id, photoId: photos[2]!.id },
      { content: "Fugit ut architecto doloremque neque quis.", userId: users[3]!.id, photoId: photos[4]!.id },
      { content: "Repudiandae et voluptas aut in excepturi.", userId: users[4]!.id, photoId: photos[2]!.id },
      { content: "Aperiam voluptatem animi.", userId: users[4]!.id, photoId: photos[0]!.id },
      { content: "Et mollitia vel soluta fugiat.", userId: users[3]!.id, photoId: photos[0]!.id },
      { content: "Ut nemo voluptas voluptatem voluptas.", userId: users[4]!.id, photoId: photos[1]!.id },
      { content: "At aut quidem voluptatibus rem.", userId: users[4]!.id, photoId: photos[0]!.id },
      { content: "Temporibus voluptates iure fuga alias minus eius.", userId: users[1]!.id, photoId: photos[2]!.id },
      { content: "Non autem laboriosam consectetur officiis aut excepturi nobis commodi.", userId: users[3]!.id, photoId: photos[2]!.id },
      { content: "Esse voluptatem sed deserunt ipsum eaque maxime rerum qui.", userId: users[4]!.id, photoId: photos[4]!.id },
      { content: "Debitis ipsam ut pariatur molestiae ut qui aut reiciendis.", userId: users[3]!.id, photoId: photos[3]!.id },
      { content: "Illo atque nihil et quod consequatur neque pariatur delectus.", userId: users[2]!.id, photoId: photos[2]!.id },
      { content: "Qui et hic accusantium odio quis necessitatibus et magni.", userId: users[3]!.id, photoId: photos[1]!.id },
      { content: "Debitis repellendus inventore omnis est facere aliquam.", userId: users[2]!.id, photoId: photos[2]!.id },
      { content: "Occaecati eos possimus deleniti itaque aliquam accusamus.", userId: users[2]!.id, photoId: photos[3]!.id },
      { content: "Molestiae officia architecto eius nesciunt.", userId: users[4]!.id, photoId: photos[3]!.id },
      { content: "Minima dolorem reiciendis excepturi culpa sapiente eos deserunt ut.", userId: users[2]!.id, photoId: photos[2]!.id },
    ])
    .returning();

  console.log(`Created ${comments.length} comments`);

  console.log("Seeding completed successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
