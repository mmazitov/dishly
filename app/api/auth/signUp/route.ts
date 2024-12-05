import prisma from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, password, name } = body;

		if (!email || !password || !name) {
			return NextResponse.json(
				{ message: 'All fields are required' },
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: 'User already exists' },
				{ status: 400 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		return NextResponse.json(
			{ message: 'User created successfully', user: newUser },
			{ status: 201 },
		);
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 500 },
		);
	}
}
