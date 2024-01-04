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
                    // Verwenden Sie Prisma, um den Benutzer zu finden
                    const user = await prisma.user.findUnique({
                        where: { email }
                    });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log('Error:', error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 Tage in Sekunden
        updateAge: 0, // Erneuert die Session bei jeder Anmeldung
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };