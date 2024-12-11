'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Типизируем пользователя более точно
interface User {
	id: string;
	name: string | null;
	email: string | null;
	image: string | null;
}

const ProfilePage = () => {
	const [userData, setUserData] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { data: session, status } = useSession();

	useEffect(() => {
		const fetchUserData = async () => {
			if (status === 'authenticated' && session?.user?.id) {
				try {
					setIsLoading(true);
					const response = await axios.get<User>(
						`/api/user?id=${session.user.id}`,
					);
					setUserData(response.data);
					setError(null);
				} catch (err: any) {
					console.error('Error fetching user data:', err);
					setError(
						err.response?.data?.error ||
							'Не удалось загрузить данные пользователя',
					);
				} finally {
					setIsLoading(false);
				}
			}
		};

		fetchUserData();
	}, [status, session]);

	if (status === 'loading' || isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!userData) {
		return <div>Пользователь не найден</div>;
	}

	return (
		<div className="bg-white shadow-md mx-auto mt-10 p-6 rounded-lg max-w-md">
			<h1 className="mb-4 font-bold text-2xl">Профиль пользователя</h1>
			{userData.image && (
				<img
					src={userData.image}
					alt="Аватар пользователя"
					className="mx-auto mb-4 rounded-full w-24 h-24"
				/>
			)}
			<div className="space-y-2">
				<p>
					<strong>Имя:</strong> {userData.name || 'Не указано'}
				</p>
				<p>
					<strong>Email:</strong> {userData.email || 'Не указано'}
				</p>
			</div>
		</div>
	);
};

export default ProfilePage;
