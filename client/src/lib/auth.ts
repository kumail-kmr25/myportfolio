import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@portfolio/database";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const admin = await prisma.admin.findFirst({
                    where: { email: credentials.email.toLowerCase() },
                });

                if (!admin) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    userId: admin.userId,
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, // 2 hours to match existing session length
    },
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.userId = user.userId;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token && session.user) {
                session.user.userId = token.userId;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
};
