"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma";

export async function createUser(
  login: string,
  firstName: string,
  lastName: string,
  role: Role,
  password: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        login,
      },
    });
    if (user) throw new Error("User already exists");
    password = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        login,
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

export async function getUserByLogin(login: string) {
  try {
    return await prisma.user.findUnique({
      where: { login },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
