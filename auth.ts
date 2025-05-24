import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getUserByEmail } from "@/actions/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success)
          throw new AuthError("Incorrect data format");

        const { email, password } = parsedCredentials.data;
        const user = await getUserByEmail(email);

        if (!user) throw new AuthError("No user found");
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if (!passwordsMatch) throw new AuthError("Password is incorrect");

        return {
          id: user.id,
          name: user.firstName,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
});
