import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
//        signIn: '/admin/login',
        signIn: '/?signmodal=true',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
//            const isOnDashboard = nextUrl.pathname.startsWith('/events');
            const isOnDashboard = nextUrl.pathname.startsWith('/events');
            const isAdminRoute = nextUrl.pathname.startsWith('/events') ||
                nextUrl.searchParams.has('addmodalform') ||
                nextUrl.searchParams.has('deletemodal');

            console.log("Auth callback - isLoggedIn:", isLoggedIn);
            console.log("Auth callback - isOnDashboard:", isOnDashboard);
            console.log("Auth callback - isAdminRoute:", isAdminRoute);

            if (isAdminRoute) {
                return isLoggedIn;
            }
//            if (isOnDashboard && isLoggedIn) {
//                return isLoggedIn;
//            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const authBoolVal = authConfig;
