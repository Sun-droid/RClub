import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/events');

            if (isOnDashboard && isLoggedIn) {
                return isLoggedIn;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const authBoolVal = authConfig;
