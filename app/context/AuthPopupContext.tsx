'use client';

import Auth from '@/app/components/form/auth/Auth';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthPopupState {
	isOpen: boolean;
	isSignIn: boolean;
}

interface AuthPopupContextProps {
	authPopup: AuthPopupState;
	openAuthPopup: (isSignIn: boolean) => void;
	closeAuthPopup: () => void;
}

const AuthPopupContext = createContext<AuthPopupContextProps | undefined>(
	undefined,
);

export const AuthPopupProvider = ({ children }: { children: ReactNode }) => {
	const [authPopup, setAuthPopup] = useState<AuthPopupState>({
		isOpen: false,
		isSignIn: true,
	});

	const openAuthPopup = (isSignIn: boolean) => {
		setAuthPopup({ isOpen: true, isSignIn });
	};

	const closeAuthPopup = () => {
		setAuthPopup({ isOpen: false, isSignIn: true });
	};

	return (
		<AuthPopupContext.Provider
			value={{ authPopup, openAuthPopup, closeAuthPopup }}
		>
			{children}
			{authPopup.isOpen && (
				<Auth isSignIn={authPopup.isSignIn} onClose={closeAuthPopup} />
			)}
		</AuthPopupContext.Provider>
	);
};

export const useAuthPopup = () => {
	const context = useContext(AuthPopupContext);
	if (!context) {
		throw new Error('useAuthPopup must be used within an AuthPopupProvider');
	}
	return context;
};
