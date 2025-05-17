"use server";
import { Book, BookType } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getBooksCount(): Promise<number | null> {
  return await prisma.book.count();
}

export async function getAllBooks(): Promise<Book[] | null> {
  return await prisma.book.findMany();
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
  price: number,
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
  price: number,
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
