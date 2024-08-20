import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/?signmodal=true',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/events');
            const isModal = nextUrl.searchParams.get('addmodalform') === 'true';
            const isModalReserve = nextUrl.searchParams.get('reservemodalform');
            const isModalReservationTicket = nextUrl.searchParams.get('reservationticket');
            const isModalDelete = nextUrl.searchParams.get('deletemodal');

            if (isOnDashboard && isLoggedIn) {
                if (isLoggedIn) {
                    return true;
                }
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && !isModal && !isModalReserve && !isModalReservationTicket && !isModalDelete/*&& !isReqBookings*/) {
                return Response.redirect(new URL('/events', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: process.env.NEXT_PUBLIC_,
} satisfies NextAuthConfig;

export const authBoolVal = authConfig;
