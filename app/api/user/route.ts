import prisma from '@/app/lib/db'; // Проверьте правильность пути к Prisma клиенту
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const userId = searchParams.get('id');

		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 },
			);
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			// Можете выбрать конкретные поля, которые хотите вернуть
			select: {
				id: true,
				name: true,
				email: true,
				// image: true,
				// Добавьте другие поля при необходимости
			},
		});
		console.log('Found user:', user);

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (error) {
		console.error('Error fetching user data:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
