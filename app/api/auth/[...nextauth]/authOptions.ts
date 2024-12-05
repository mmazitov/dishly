import prisma from '@/app/lib/db';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { AuthOptions } from 'next-auth';

const authOptions: AuthOptions = {
	session: {
		strategy: 'jwt', // Убедитесь, что значение соответствует ожидаемому
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials');
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					throw new Error('No user found');
				}

				const isValidPassword = await bcrypt.compare(
					credentials.password,
					user.password,
				);
				if (!isValidPassword) {
					throw new Error('Invalid password');
				}
				return { id: user.id, email: user.email, name: user.name };
			},
		}),
	],
};

export default authOptions;
