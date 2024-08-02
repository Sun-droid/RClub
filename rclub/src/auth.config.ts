import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
//    signIn: '/events',
        signIn: 'http://localhost:3000/admin/login?modal=true',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/events');
            if (isOnDashboard && isLoggedIn) {
                if (isLoggedIn) {
                    return true;
                }
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/events', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: process.env.NEXT_PUBLIC_,
} satisfies NextAuthConfig;

export const authBoolVal = authConfig;
