'use client';

import { useEffect, useState } from 'react';
import Loader from './Loader';

export default function LoaderWrapper({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Таймер для имитации загрузки
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		// Чистим таймер при размонтировании компонента
		return () => clearTimeout(timer);
	}, []);

	return <>{isLoading ? <Loader /> : children}</>;
}
