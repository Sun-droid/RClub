import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import getServerSession from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function middleware(req: NextRequest, res:NextResponse) {
    const authSecret = process.env.AUTH_SECRET;
    const session =  getServerSession(authConfig);
    // Allow access to the API
    const isApiRoute = req.nextUrl.pathname.startsWith('/api/');
    if (isApiRoute) {
        return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    const isModalAdd = url.searchParams.get('addmodalform') === 'true';
    const isModalDelete = url.searchParams.get('deletemodal') === 'true';
    const isModalLogin = url.searchParams.get('signmodal') === 'true';
    const isModalReserve = url.searchParams.get('reservemodalform');
    const isModalReservationTicket = url.searchParams.get('reservationticket');

    // Handle redirection for root path when not a modal
    if (url.pathname === '/' && !isModalAdd && !isModalLogin && !isModalReserve && !isModalReservationTicket && !isModalDelete /*&& !isReqBookings*/) {
        url.pathname = '/events'
        return NextResponse.redirect(url)
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.jpeg$).*)'],
};