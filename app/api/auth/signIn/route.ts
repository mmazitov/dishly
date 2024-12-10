import prisma from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { signIn, signOut } from 'next-auth/react';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ message: 'Email and password are required' },
				{ status: 400 },
			);
		}

		// Найти пользователя по email
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json(
				{ message: 'Invalid email or password' },
				{ status: 401 },
			);
		}

		// Проверить пароль
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json(
				{ message: 'Invalid email or password' },
				{ status: 401 },
			);
		}

		// Возврат успешного ответа
		return NextResponse.json(
			{ message: 'Login successful', user },
			{ status: 200 },
		);
	} catch (error) {
		console.error('Error during sign-in:', error);
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 500 },
		);
	}
}
