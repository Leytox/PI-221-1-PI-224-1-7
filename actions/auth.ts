"use server";
import { Role } from "@/generated/prisma";
import { signIn, signOut } from "@/auth";
import { createUser } from "@/actions/users";

export async function signUp(
  email: string,
  firstName: string,
  lastName: string,
  role: Role,
  password: string
) {
  try {
    await createUser(email, firstName, lastName, role, password);
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function signInCredentials(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function signOutAll() {
  return await signOut({ redirectTo: "/login", redirect: true });
}
