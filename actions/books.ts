"use server";
import { Book, BookType, Genre } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getBooksCount(): Promise<number | null> {
  return await prisma.book.count();
}

export async function getAllBooks(): Promise<Book[] | null> {
  return await prisma.book.findMany();
}

export async function getNewTitles(limit: number = 3): Promise<Book[] | null> {
  try {
    return await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  } catch (error) {
    console.error("Error fetching new titles:", error);
    return null;
  }
}

export async function getPopularBooks(
  limit: number = 3
): Promise<Book[] | null> {
  try {
    return await prisma.book.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: limit,
    });
  } catch (error) {
    console.error("Error fetching popular books:", error);
    return null;
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  return await prisma.book.findUnique({
    where: {
      id,
    },
  });
}

export async function createBook(
  title: string,
  author: string,
  description: string,
  genreId: string,
  type: BookType,
  price: number
): Promise<Book | null> {
  return await prisma.book.create({
    data: {
      title,
      author,
      description,
      genreId,
      type,
      price,
    },
  });
}

export async function updateBook(
  id: string,
  title: string,
  author: string,
  description: string,
  genreId: string,
  type: BookType,
  price: number
): Promise<Book | null> {
  return await prisma.book.update({
    where: {
      id,
    },
    data: {
      title,
      author,
      description,
      genreId,
      type,
      price,
    },
  });
}

export async function deleteBook(id: string): Promise<Book | null> {
  return await prisma.book.delete({
    where: {
      id,
    },
  });
}

export async function getBookBySlug(
  slug: string
): Promise<(Book & { genre: Genre }) | null> {
  try {
    return await prisma.book.findUnique({
      where: {
        slug,
      },
      include: {
        genre: true,
      },
    });
  } catch (error) {
    console.error("Error fetching book by slug:", error);
    return null;
  }
}
