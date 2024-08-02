import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {authConfig} from './auth.config';
import {z} from 'zod';
import type {User} from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import {promises as fs} from 'fs';

async function getUser(email: string): Promise<User | undefined> {
    const fileUserJson = await fs.readFile(process.cwd() + '/src/app/lib/data/users.json', 'utf8');
    const dataUserJson = JSON.parse(fileUserJson)
    const dataProp = dataUserJson.array_elem[0]
    const userPasswordData: string = dataProp.password
    const userMailData: string = dataProp.email
    try {
        if (dataProp.email === email) {
            return {email: userMailData, password: userPasswordData};
        }

    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    if (user.password) {
                        const hashp = "$2a$06$aZ70J9zZMXNJSz48N6QfX.WGaryXcsc3uSWe9CAL2igHl0gkCDwIi"
                        const passwordsMatch = await bcrypt.compare(password, hashp);
                        if (passwordsMatch) return user;
                    }
                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});

