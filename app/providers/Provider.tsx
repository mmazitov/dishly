'use client';

import { AuthPopupProvider } from '@/app/context/AuthPopupContext';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

export function Provider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<AuthPopupProvider>
				<Toaster />
				{children}
			</AuthPopupProvider>
		</SessionProvider>
	);
}
