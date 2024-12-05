import NextAuth from 'next-auth';
import authOptions from './authOptions';

const bcrypt = require('bcrypt');
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
