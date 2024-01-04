import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();
        

        if (!email) {
            return NextResponse.json({ message: 'Email is required' });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return NextResponse.json({ message: 'E-Mail already taken' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ status : 201});
    } catch (error) {
        console.error('An error accoured', error);
        return NextResponse.json({ message: 'An error accoured' });
    } finally {
        await prisma.$disconnect();
    }
}
