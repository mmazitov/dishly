import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
	/* eslint-disable @typescript-eslint/no-var */
	var prisma: PrismaClient | undefined;
	/* eslint-enable @typescript-eslint/no-var */
}

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}

	prisma = global.prisma;
}

export default prisma;
