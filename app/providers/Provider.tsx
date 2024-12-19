'use client';

import { AuthPopupProvider } from '@/app/context/AuthPopupContext';
// import useDetectColorScheme from '@/app/hooks/useDetectColorScheme';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
// import { useEffect } from 'react';

export function Provider({ children }: { children: React.ReactNode }) {
	// Определяем текущую тему
	// const colorScheme = useDetectColorScheme('light');

	// Применяем тему к <html> через data-theme
	// useEffect(() => {
	// 	if (typeof window !== 'undefined') {
	// 		document.documentElement.setAttribute('data-theme', colorScheme);
	// 	}
	// }, [colorScheme]);

	return (
		<SessionProvider>
			<AuthPopupProvider>
				<Toaster />
				{children}
			</AuthPopupProvider>
		</SessionProvider>
	);
}
