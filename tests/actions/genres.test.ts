import { prisma } from "@/lib/prisma";
import { getAllGenres, createGenre, updateGenre, deleteGenre } from "@/actions/genres";
import { Genre } from "@/generated/prisma";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    genre: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Genre CRUD functions", () => {
  const mockGenre: Genre = { id: "1", name: "Rock" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllGenres", () => {
    it("should return all genres", async () => {
      (prisma.genre.findMany as jest.Mock).mockResolvedValue([mockGenre]);
      const result = await getAllGenres();
      expect(prisma.genre.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockGenre]);
    });

    it("should handle empty list", async () => {
      (prisma.genre.findMany as jest.Mock).mockResolvedValue([]);
      const result = await getAllGenres();
      expect(result).toEqual([]);
    });
  });

  describe("createGenre", () => {
    it("should create and return a new genre", async () => {
      (prisma.genre.create as jest.Mock).mockResolvedValue(mockGenre);
      const result = await createGenre("Rock");
      expect(prisma.genre.create).toHaveBeenCalledWith({
        data: { name: "Rock" },
      });
      expect(result).toEqual(mockGenre);
    });

    it("should throw if prisma.create throws", async () => {
      (prisma.genre.create as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(createGenre("")).rejects.toThrow("DB error");
    });
  });

  describe("updateGenre", () => {
    it("should update and return the genre", async () => {
      (prisma.genre.update as jest.Mock).mockResolvedValue({ ...mockGenre, name: "Jazz" });
      const result = await updateGenre("1", "Jazz");
      expect(prisma.genre.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { name: "Jazz" },
      });
      expect(result.name).toBe("Jazz");
    });

    it("should throw if genre to update does not exist", async () => {
      (prisma.genre.update as jest.Mock).mockRejectedValue(new Error("Not found"));
      await expect(updateGenre("999", "Jazz")).rejects.toThrow("Not found");
    });

    it("should throw if prisma.update throws for other reasons", async () => {
      (prisma.genre.update as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(updateGenre("1", "")).rejects.toThrow("DB error");
    });
  });

  describe("deleteGenre", () => {
    it("should delete and return the genre", async () => {
      (prisma.genre.delete as jest.Mock).mockResolvedValue(mockGenre);
      const result = await deleteGenre("1");
      expect(prisma.genre.delete).toHaveBeenCalledWith({ where: { id: "1" } });
      expect(result).toEqual(mockGenre);
    });

    it("should throw if genre to delete does not exist", async () => {
      (prisma.genre.delete as jest.Mock).mockRejectedValue(new Error("Not found"));
      await expect(deleteGenre("999")).rejects.toThrow("Not found");
    });

    it("should throw if prisma.delete throws for other reasons", async () => {
      (prisma.genre.delete as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(deleteGenre("1")).rejects.toThrow("DB error");
    });
  });
});
