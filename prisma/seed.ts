import { PrismaClient } from "@/generated/prisma";
import books from "../mock/books.json";
import genres from "../mock/genres.json";
import { BookType } from "@/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // First, create all genres
  console.log("📚 Creating genres...");
  for (const genre of genres.genres) {
    await prisma.genre.create({
      data: {
        name: genre.name,
      },
    });
  }
  console.log("✅ Genres created");

  // Then, create all books
  console.log("📖 Creating books...");
  for (const book of books.books) {
    // Find the genre by name
    const genre = await prisma.genre.findUnique({
      where: { name: book.genreId },
    });

    if (!genre) {
      console.error(`❌ Genre not found: ${book.genreId}`);
      continue;
    }

    await prisma.book.create({
      data: {
        title: book.title,
        slug: book.slug,
        author: book.author,
        description: book.description,
        image: book.image,
        isbn: book.isbn,
        pages: book.pages,
        language: book.language,
        publishedAt: new Date(book.publishedAt),
        type: book.type as BookType,
        price: book.price,
        rating: book.rating,
        genreId: genre.id,
      },
    });
  }
  console.log("✅ Books created");

  console.log("🌱 Seeding finished");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
