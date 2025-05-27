import bcrypt from "bcrypt";
import { Role } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserRole,
} from "@/actions/users";

jest.mock("bcrypt");
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  },
}));

const mockUser = {
  id: "1",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  role: "USER" as Role,
  password: "hashed-password",
  image: "/default-avatar.svg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("createUser", () => {
  it("creates a user when one doesn't exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await createUser("test@example.com", "Test", "User", "USER", "password");
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
    expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: "test@example.com",
        firstName: "Test",
        lastName: "User",
        role: "USER",
        password: "hashed-password",
        image: "/default-avatar.svg",
      },
    });
    expect(result).toEqual(mockUser);
  });

  it("throws error if user already exists", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    await expect(
      createUser("test@example.com", "Test", "User", "USER", "password")
    ).rejects.toThrow("User already exists");
  });

  it("throws error on unexpected error", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error("DB error"));
    await expect(
      createUser("test@example.com", "Test", "User", "USER", "password")
    ).rejects.toThrow("DB error");
  });
});

describe("getUserByEmail", () => {
  it("returns user if found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    const result = await getUserByEmail("test@example.com");
    expect(result).toEqual(mockUser);
  });

  it("returns null if not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getUserByEmail("unknown@example.com");
    expect(result).toBeNull();
  });

  it("returns null on error", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error("DB error"));
    const result = await getUserByEmail("error@example.com");
    expect(result).toBeNull();
  });
});

describe("getUserById", () => {
  it("returns user if found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    const result = await getUserById("1");
    expect(result).toEqual(mockUser);
  });

  it("returns null if not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await getUserById("999");
    expect(result).toBeNull();
  });

  it("returns null on error", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error("fail"));
    const result = await getUserById("error");
    expect(result).toBeNull();
  });
});

describe("getUsers", () => {
  it("returns list of users", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([mockUser]);
    const result = await getUsers();
    expect(result).toEqual([mockUser]);
  });

  it("returns empty array on error", async () => {
    (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error("fail"));
    const result = await getUsers();
    expect(result).toEqual([]);
  });
});

describe("updateUserRole", () => {
  it("updates the role of a user", async () => {
    (prisma.user.update as jest.Mock).mockResolvedValue({
      ...mockUser,
      role: "ADMIN",
    });

    const result = await updateUserRole("1", "ADMIN");
    expect(result).not.toBeNull(); // Додано
    expect(result?.role).toBe("ADMIN");
  });


  it("returns null on error", async () => {
    (prisma.user.update as jest.Mock).mockRejectedValue(new Error("fail"));
    const result = await updateUserRole("1", "ADMIN");
    expect(result).toBeNull();
  });
});
