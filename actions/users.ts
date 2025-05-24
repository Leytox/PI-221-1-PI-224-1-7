"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma";

export async function createUser(
  email: string,
  firstName: string,
  lastName: string,
  role: Role,
  password: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) throw new Error("User already exists");
    password = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        password,
        image: "/default-avatar.svg",
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export async function getUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export async function updateUserRole(userId: string, role: Role) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  } catch (error) {
    console.error("Failed to update user role:", error);
    return null;
  }
}
