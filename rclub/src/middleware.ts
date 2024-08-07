import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export default async function middleware(request: NextRequest) {
    const auth = await NextAuth(authConfig).auth(request);
    // Allow access to the API
    const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
    if (isApiRoute) {
        return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    const isModalAdd = url.searchParams.get('addmodalform') === 'true';
    const isModalLogin = url.searchParams.get('signmodal') === 'true';
    const isModalReserve = url.searchParams.get('reservemodalform');
    const isModalReservationTicket = url.searchParams.get('reservationticket');

    // Handle redirection for root path when not a modal
    if (url.pathname === '/' && !isModalAdd && !isModalLogin && !isModalReserve && !isModalReservationTicket /*&& !isReqBookings*/) {
        url.pathname = '/events'
        return NextResponse.redirect(url)
    }

    return auth;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$).*)'],
};