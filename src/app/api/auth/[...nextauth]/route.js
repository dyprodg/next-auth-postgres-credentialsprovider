import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user || !await bcrypt.compare(password, user.password)) {
                        return null;
                    }

                    return user; // Das komplette Benutzerobjekt wird zurückgegeben
                } catch (error) {
                    console.log('Error:', error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 0,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
                token.username = user.username; 
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id; 
            session.user.username = token.username; 
            return session;
        }
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
