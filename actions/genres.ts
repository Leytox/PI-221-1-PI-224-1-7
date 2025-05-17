import { Genre } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getAllGenres(): Promise<Genre[]> {
  return await prisma.genre.findMany();
}

export async function createGenre(name: string): Promise<Genre> {
  return await prisma.genre.create({
    data: {
      name,
    },
  });
}

export async function updateGenre(id: string, name: string): Promise<Genre> {
  return await prisma.genre.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteGenre(id: string): Promise<Genre> {
  return await prisma.genre.delete({
    where: {
      id,
    },
  });
}
