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
