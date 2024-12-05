import { toast } from '@/hooks/use-toast';

interface SignInData {
	email: string;
	password: string;
}

interface SignUpData extends SignInData {
	name: string;
}

export const handleSignIn = async (data: SignInData) => {
	try {
		console.log('Submitting sign-in data:', data);
		const response = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to sign in');
		}

		const result = await response.json();
		console.log('Sign-in successful:', result);

		toast({
			title: 'Login Successful',
			description: 'You have successfully logged in.',
		});
	} catch (error: any) {
		console.error('Sign-in error:', error);
		toast({
			title: 'Login Failed',
			description: error.message,
			variant: 'destructive',
		});
	}
};

export const handleSignUp = async (data: SignUpData) => {
	try {
		console.log('Submitting sign-up data:', data);
		const { confirmPassword, ...userData } = data;

		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to sign up');
		}

		const result = await response.json();
		console.log('Sign-up successful:', result);

		toast({
			title: 'Registration Successful',
			description: 'You have successfully registered.',
		});
	} catch (error: any) {
		console.error('Sign-up error:', error);
		toast({
			title: 'Registration Failed',
			description: error.message,
			variant: 'destructive',
		});
	}
};
