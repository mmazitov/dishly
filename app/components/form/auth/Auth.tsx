'use client';

import SignIn from '@/app/components/form/auth/signIn/SignIn';
import SignUp from '@/app/components/form/auth/signUp/SignUp';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Интерфейс пропсов компонента Auth
interface AuthProps {
	isSignIn: boolean;
	onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({
	isSignIn: initialSignInState,
	onClose,
}) => {
	const [isSignIn, setIsSignIn] = useState(initialSignInState);
	const popupRef = useRef<HTMLDivElement>(null);

	// Close popup when clicking outside or pressing Escape
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popupRef.current &&
				!popupRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	const popupVariants = {
		initial: { opacity: 0, scale: 0.5 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.5 },
	};

	return (
		<div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-black/50 w-full h-full">
			<motion.div
				initial="initial"
				animate="animate"
				exit="exit"
				variants={popupVariants}
				transition={{ duration: 0.3 }}
				ref={popupRef}
				className="bg-white shadow-lg rounded-lg w-[350px] max-w-sm"
			>
				<Card className="py-2">
					<CardHeader className="pt-3 pb-0">
						{isSignIn ? (
							<>
								<CardTitle className="font-bold text-[22px]">Login</CardTitle>
								<CardDescription>
									Enter your email below to login to your account.
								</CardDescription>
							</>
						) : (
							<>
								<CardTitle className="font-bold text-[22px]">Sign Up</CardTitle>
								<CardDescription>
									Enter your information to create an account.
								</CardDescription>
							</>
						)}
					</CardHeader>

					<CardContent>{isSignIn ? <SignIn /> : <SignUp />}</CardContent>

					<CardFooter className="pb-3">
						{isSignIn ? (
							<div className="flex justify-center items-center gap-1 text-sm">
								<span>Don&apos;t have an account?</span>
								<Label
									className="text-primary cursor-pointer"
									onClick={() => setIsSignIn(false)}
								>
									Sign up
								</Label>
							</div>
						) : (
							<div className="flex justify-center items-center gap-1 text-sm">
								<span>Already have an account?</span>
								<Label
									className="text-primary cursor-pointer"
									onClick={() => setIsSignIn(true)}
								>
									Sign in
								</Label>
							</div>
						)}
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};

export default Auth;
