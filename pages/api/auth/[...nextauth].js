import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // ✅ Use Prisma Adapter
import bcrypt from "bcrypt";
import { setCookie } from "nookies"; // ✅ Handle cookies

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma), // ✅ Add the adapter properly
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        let role = "non-member";
        if (user.email.endsWith("_ecoswateadmin@gmail.com")) role = "admin";
        else if (user.email.endsWith("_ecoswate@gmail.com")) role = "member";

        return { id: user.id, name: user.name, email: user.email, role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;

        // ✅ Store JWT in an HTTP-only cookie for persistence
        setCookie(null, "nextauth-token", JSON.stringify(token), {
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: "/",
          httpOnly: true, // Prevents JavaScript access (security)
          secure: process.env.NODE_ENV === "production", // Secure in production
          sameSite: "strict",
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
